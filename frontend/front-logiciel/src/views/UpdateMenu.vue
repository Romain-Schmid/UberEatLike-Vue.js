<template>
  <div class="home">
    <h1>Modification d'un Menu</h1>
    <span class="center"
      >Merci de remplire ce formulaire pour la modification d'un menu de votre
      réstaurant
    </span>
    <span class="center"
      >Une image standars sera autaumatiquemment placé pour le menu
    </span>
    <span class="center"
      >Veuillez remplire le "panier" avec les articles de votre menu
    </span>
    <b-form id="form" @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Titre du menu :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.titre"
          type="text"
          placeholder="Entrer le titre de votre menu"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Description du menu :"
        label-for="input-2"
      >
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Description de votre menu ..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Prix du menu en euros :"
        label-for="input-3"
        prepend="$"
      >
        <b-input-group prepend="€">
          <b-form-input
            id="input-3"
            v-model="form.prix"
            type="number"
            placeholder="Entrer le prix de votre article"
            required
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <cart-modal v-bind:currentOrder="this.order" />

      <div class="list">
        <b-card-group deck>
          <div v-for="article in listArticles" :key="article._id">
            <b-card
              v-bind:title="article.titre"
              :img-src="article.picture"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text>
                {{ article.description }}
              </b-card-text>
              <b-button v-on:click="AddOrder(article)" variant="success">
                Add
              </b-button>
              <b-form-spinbutton
                min="0"
                max="10"
                placeholder="0"
                v-model="responses[article._id]"
                inline
              ></b-form-spinbutton>
            </b-card>
          </div>
        </b-card-group>
      </div>
      <b-button type="submit" variant="success">Envoyer</b-button>
    </b-form>
    <b-button variant="danger" v-on:click="erase()">Supprimer</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import User from "../models/user";
import RestorerService from "../services/restaurateur.services";
import Order from "../models/order";
import CartModal from "../components/CartModalRestorer.vue";

export default {
  name: "Home",
  components: {
    CartModal,
  },
  data() {
    return {
      user: new User(),
      form: {
        titre: "",
        description: "",
        prix: "",
      },
      show: true,
      order: new Order(),
      listArticles: [],
      currentRestaurant: [],
      responses: {},
    };
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
      this.order.eraseOrder();
      this.user = localStorage.getItem("user");
      this.user = this.user && JSON.parse(this.user);

      RestorerService.getOneMenu(
        this.$route.params.id,
        this.$route.params.id2
      ).then((data) => {
        data.article.forEach((article) => {
          console.log(article);
          this.AddOrder2(article);
        });
        this.form.titre = data.titre;
        this.form.description = data.description;
        this.form.prix = data.prix;
      });

      //get Actual Restaurant, actual menues and articles
      RestorerService.getRestaurant(this.$route.params.id).then((data) => {
        this.currentRestaurant = data;
      });
      RestorerService.getArticles(this.$route.params.id).then((data) => {
        this.listArticles = data;
      });
      if (localStorage.getItem("order") != null) {
        this.order.getLocalStorage(JSON.parse(localStorage.getItem("order")));
      } else {
        localStorage.setItem("order", JSON.stringify(this.order));
      }
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout", this.user);
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(this.order);
      var feed = "";
      this.order.orderList.forEach((element) => {
        for (var i = 0; i < element.nb; i++) {
          feed += element.id + ",";
        }
      });
      feed = feed.slice(0, -1);
      RestorerService.putMenu(
        this.form,
        feed,
        this.$route.params.id,
        this.$route.params.id2
      ).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.order.eraseOrder();
          alert("Successe");
          this.$router.push("/restaurateur/" + this.$route.params.id);
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    AddOrder(article) {
      if (localStorage.getItem("order").rest_id == null) {
        this.order.setOrder(
          this.currentRestaurant._id,
          this.currentRestaurant.titre
        );
      }
      this.order.kevin(
        article._id,
        article.titre,
        this.responses[article._id],
        article.prix
      );
      localStorage.setItem("order", JSON.stringify(this.order));
    },
    AddOrder2(article) {
      if (localStorage.getItem("order").rest_id == null) {
        this.order.setOrder(
          this.currentRestaurant._id,
          this.currentRestaurant.titre
        );
      }
      this.order.kevin(article._id, article.titre, 1, article.prix);
      localStorage.setItem("order", JSON.stringify(this.order));
    },
    erase() {
      RestorerService.delMenu(
        this.$route.params.id,
        this.$route.params.id2
      ).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          alert("Successe");
          this.$router.push("/restaurateur/" + this.$route.params.id);
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

h1 {
  color: #42b983;
}

#form {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 3px solid #42b983;
  padding: 1%;
}

.card-deck {
  align-items: center;
  justify-content: center;
  column-gap: 2em;
}
.card {
  margin-left: auto;
  margin-right: auto;
}
</style>
