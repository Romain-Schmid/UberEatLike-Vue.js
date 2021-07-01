<template>
  <div class="home">
    <Navbar v-bind:user="this.user" />
    <div v-if="user.role == 'Customer'">
      <div class="borderre" v-if="this.order.rest_id != null" :key="this.order">
        <p v-for="article in this.order.orderList" :key="article._id">
          {{ article.titre }} x {{ article.nb }} =
          {{ article.price * article.nb }} €
        </p>
        <p>Total : {{ this.order.totalPrice }} €</p>
        <b-container fluid="sm">
          <p>Adresse : <b-form-input v-model="rue"></b-form-input></p>
          <p>Code Postal: <b-form-input v-model="code"></b-form-input></p>
          <p>Ville : <b-form-input v-model="city"></b-form-input></p>
          <b-button class="mt-3" variant="success" block @click="command()"
            >Commander</b-button
          >
          <b-button class="mt-3" variant="danger" block @click="cancel()"
            >Supprimer tout</b-button
          >
        </b-container>
      </div>

      <div class="borderre" v-if="listOrder.length != 0">
        <h1>En attente de paiement :</h1>
        <div v-for="o in listOrder" :key="o._id">
          <div v-if="o.status == 'unpaid'">
            <p>
              {{ o._id }} --- Prix : {{ o.prix }} €
              <b-button v-on:click="delOrder(o._id)" variant="danger">
                Supprimer
              </b-button>
              <b-button v-on:click="pay(o._id)" variant="success">
                Payer
              </b-button>
            </p>
          </div>
        </div>

        <h1>En cours de livraison :</h1>
        <div v-for="o in listOrder" :key="o._id">
          <div v-if="o.status != 'unpaid'">
            <p>
              Commande n° {{ o._id }} --- Prix : {{ o.prix }} € --- Status :
              {{ statusById[o._id] }}
            </p>
          </div>
        </div>
      </div>
      <div class="borderre" v-else>
        Vous n'avez pas encore passez de commande.
      </div>
    </div>
    <div v-if="user.role == 'Restorer'">
      <div
        class="borderre"
        v-for="restaurant in listRestaurant"
        :key="restaurant.id"
      >
        <h1>Restaurant : {{ restaurant.titre }}</h1>
        <h2>Commandes à réaliser :</h2>
        <div v-for="commande in listOrder" :key="commande._id">
          <div
            v-if="
              commande.status == 'paid' &&
              commande.id_restaurant._id == restaurant._id
            "
          >
            <p>
              {{ commande._id }} --- Prix : {{ commande.prix }} €
              <b-button
                v-on:click="setReady(restaurant._id, commande._id)"
                variant="success"
              >
                Commande prête
              </b-button>
            </p>
          </div>
        </div>

        <h2>Commandes en attente de livreur :</h2>
        <div v-for="commande in listOrder" :key="commande._id">
          <div
            v-if="
              commande.status == 'ready' &&
              commande.id_restaurant._id == restaurant._id
            "
          >
            <p>{{ commande._id }} --- Prix : {{ commande.prix }} €</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="user.role == 'DeliveryMan'">
      <div class="borderre" v-if="myRun.length == 0" :key="myRun">
        <h1>Courses disponibles :</h1>
        <div v-for="commande in listOrder" :key="commande">
          <div v-if="commande.status == 'ready'">
            <p>
              Restaurant : {{ commande.id_restaurant.titre }} --- Adresse :
              {{ commande.rue }}, {{ commande.ville }}
              <b-button
                v-on:click="setOrderStatus(commande._id, commande.status)"
                variant="success"
              >
                Prendre la commande
              </b-button>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Ma livraison :</h1>
        Adresse : {{ myRun[0].rue }}, {{ myRun[0].ville }} --- Status :
        {{ myRun[0].status }}
        <b-button
          v-on:click="setOrderStatus(myRun[0]._id, myRun[0].status)"
          variant="success"
        >
          <p v-if="myRun[0].status == 'validate'">Début de la course</p>
          <p v-if="myRun[0].status == 'start'">Repas livré</p>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
import Order from "../models/order";
import getOrder from "../services/order.services.js";
import io from "socket.io-client";
import RestorerService from "../services/restaurateur.services";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      user: new User(),
      order: new Order(),
      socket: io("https://cesi.socket.fradetaxel.fr/", {
        withCredentials: true,
        transports: ["websocket", "polling"],
      }),
      listOrder: [],
      addresse: [],
      rue: "",
      code: "",
      city: "",
      message: "",
      statusById: [],
      listRestaurant: [],
      myRun: [],
    };
  },
  methods: {
    delOrder(id) {
      getOrder.deleteOrder(id);
    },
    pay(id) {
      getOrder.payOrder(id);
      this.socket.emit("OrderPaid", {
        id: id,
        email: this.user.email,
        role: this.user.role,
      });
      this.getOrderCustomer();
    },
    setReady(id, orderId) {
      getOrder.orderIsReady(id, orderId);
      this.socket.emit("OrderReady", {
        id: id,
        email: this.user.email,
        role: this.user.role,
      });
      this.refreshOrders();
    },
    setOrderStatus(id, status) {
      if (status == "ready") {
        getOrder.validateOrder(id);
        this.socket.emit("OrderValidate", {
          id: id,
          email: this.user.email,
          role: this.user.role,
        });
        this.refreshMyLivraison();
      } else if (status == "validate") {
        getOrder.startOrder(id);
        this.socket.emit("OrderStart", {
          id: id,
          email: this.user.email,
          role: this.user.role,
        });
        this.refreshMyLivraison();
      } else if (status == "start") {
        getOrder.finishOrder(id);
        this.socket.emit("OrderFinish", {
          id: id,
          email: this.user.email,
          role: this.user.role,
        });
        this.myRun = [];
        this.refreshLivraison();
      }
    },
    command() {
      if (this.rue == "" || this.code == "" || this.city == "") {
        alert("Informations are missing");
      } else {
        var feed = "";
        this.order.orderList.forEach((element) => {
          for (var i = 0; i < element.nb; i++) {
            feed += element.id + ",";
          }
        });

        getOrder.createOrder(
          feed,
          this.order.totalPrice,
          this.order.rest_id,
          this.code,
          this.city,
          this.rue
        );
        this.order.eraseOrder();
        localStorage.setItem("order", JSON.stringify(this.order));
        this.getOrderCustomer();
      }
    },
    cancel() {
      this.order.eraseOrder();
      localStorage.setItem("order", JSON.stringify(this.order));
    },
    refreshOrders() {
      RestorerService.getMine().then((data) => {
        // Récupère les restaurants
        this.listRestaurant = data;
        this.listRestaurant.forEach((resp) => {
          //pour chaque restaurant
          getOrder.getAllOrderRestaurant(resp._id).then((res) => {
            // je cherche les orders
            this.listOrder = res;
          });
        });
      });
    },
    refreshLivraison() {
      getOrder.getOrderready().then((data) => {
        this.listOrder = data;
      });
    },
    refreshMyLivraison() {
      getOrder.getMyOrder().then((data) => {
        this.myRun = data;
      });
    },
    getOrderCustomer() {
      getOrder.getOrder().then((data) => {
        this.listOrder = data;
        this.listOrder.forEach((element) => {
          this.statusById[element._id] = element.status;
        });
      });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/connexion");
    } else {
      this.user = localStorage.getItem("user");
      this.user = this.user && JSON.parse(this.user);

      if (localStorage.getItem("order") != null) {
        this.order.getLocalStorage(JSON.parse(localStorage.getItem("order")));
      } else {
        localStorage.setItem("order", JSON.stringify(this.order));
      }

      this.socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      if (this.user.role == "Customer") {
        this.getOrderCustomer();

        this.socket.on("OrderIsReady", (res) => {
          console.log(res);
          var data = JSON.parse(res.message);
          this.statusById[data.id] = data.status;
          this.getOrderCustomer();
          console.log("Je suis appelé");
        });

        this.socket.on("OrderIsValidate", (res) => {
          console.log(res);
          var data = JSON.parse(res.message);
          this.statusById[data.id] = data.status;
          this.getOrderCustomer();
          console.log("Je suis appelé");
        });

        this.socket.on("OrderIsStart", (res) => {
          console.log(res);
          var data = JSON.parse(res.message);
          this.statusById[data.id] = data.status;
          this.getOrderCustomer();
          console.log("Je suis appelé");
        });

        this.socket.on("OrderIsFinish", (res) => {
          console.log(res);
          var data = JSON.parse(res.message);
          this.statusById[data.id] = data.status;
          this.getOrderCustomer();
          console.log("Je suis appelé");
        });
      } else if (this.user.role == "Restorer") {
        this.refreshOrders();

        this.socket.on("OrderIsPaid", () => {
          this.refreshOrders();
        });

        this.socket.on("OrderIsValidate", () => {
          this.refreshOrders();
        });
      } else if (this.user.role == "DeliveryMan") {
        this.refreshMyLivraison();
        if (this.myRun.length == 0) {
          this.refreshLivraison();
        }

        this.socket.on("OrderIsReady", () => {
          if (this.myRun.length == 0) {
            this.refreshLivraison();
          }
        });
      }
    }
  },
};
</script>

<style scoped>
.card-deck {
  align-items: center;
  justify-content: center;
  column-gap: 2em;
}

.card {
  margin-left: auto;
  margin-right: auto;
}

.borderre {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 5px solid #42b983;
  padding: 1%;
}
</style>
