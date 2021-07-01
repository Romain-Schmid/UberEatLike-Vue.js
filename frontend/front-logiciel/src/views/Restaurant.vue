<template>
  <div class="home">
    <Navbar v-bind:user="this.user" />
    <div class="list">
      <b-card-group deck>
        <div v-for="restaurant in listRestaurant" :key="restaurant._id">
          <b-card
            v-bind:title="restaurant.titre"
            :img-src="restaurant.picture"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              {{ restaurant.description }}
            </b-card-text>

            <b-button
              v-bind:href="'/restaurant/' + restaurant._id"
              variant="success"
            >
              Commander
            </b-button>
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
import getRestaurant from "../services/restaurant.services.js";
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
      listRestaurant: [],
    };
  },
  methods: {},
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
      if (this.user.role != "Customer") {
        this.$router.push("/");
      }
      getRestaurant.getAllRestaurants().then((data) => {
        this.listRestaurant = data;
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
