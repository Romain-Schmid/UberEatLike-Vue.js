<template>
  <div class="home">
    <Navbar v-bind:user="this.user" />
    <h1>{{ currentRestaurant.titre }}</h1>
    <cart-modal v-bind:currentOrder="this.order" />
    <h1>Menus :</h1>
    <div class="list">
      <b-card-group deck>
        <div v-for="menu in listMenus" :key="menu._id">
          <b-card
            v-bind:title="menu.titre"
            :img-src="menu.picture"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              <ul v-for="article in menu['article']" :key="article._id">
                <li>
                  {{ article.titre }}
                </li>
              </ul>
            </b-card-text>

            <b-button v-on:click="AddOrder(menu)" variant="success">
              Ajouter
            </b-button>
            <b-form-spinbutton
              min="0"
              max="10"
              placeholder="0"
              v-model="responses[menu._id]"
              inline
            ></b-form-spinbutton>
          </b-card>
        </div>
      </b-card-group>
    </div>
    <h1>Articles :</h1>
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
              Ajouter
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
  </div>
</template>

<script>
// @ is an alias to /src
import User from "../models/user";
import Order from "../models/order";
import CartModal from "../components/CartModal.vue";
import getRestaurant from "../services/restaurant.services.js";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
    CartModal,
    Navbar,
  },
  data() {
    return {
      user: new User(),
      order: new Order(),
      currentRestaurant: [],
      listMenus: [],
      listArticles: [],
      responses: {},
    };
  },
  methods: {
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

      //get Actual Restaurant, actual menues and articles
      getRestaurant.getOneRestaurant(this.$route.params.id).then((data) => {
        this.currentRestaurant = data;
      });
      getRestaurant.getMenus(this.$route.params.id).then((data) => {
        this.listMenus = data;
      });
      getRestaurant.getArticles(this.$route.params.id).then((data) => {
        this.listArticles = data;
      });

      if (localStorage.getItem("order") != null) {
        this.order.getLocalStorage(JSON.parse(localStorage.getItem("order")));
      } else {
        localStorage.setItem("order", JSON.stringify(this.order));
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
</style>
