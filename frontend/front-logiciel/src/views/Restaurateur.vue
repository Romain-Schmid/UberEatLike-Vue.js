<template>
  <div class="home">
    <Navbar v-bind:user="this.user" />
    <h1>Choisissez votre restaurant</h1>
    <b-button
      class="button"
      id="Create"
      v-bind:href="'/createRestorer'"
      variant="success"
    >
      Créez un restaurant
    </b-button>
    <OwnRestaurant />
  </div>
</template>

<script>
// @ is an alias to /src
import User from "../models/user";
import Navbar from "../components/Navbar.vue";
import OwnRestaurant from "../components/OwnRestaurant.vue";

export default {
  name: "Home",
  components: {
    OwnRestaurant,
    Navbar,
  },
  data() {
    return {
      user: new User(),
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
    }
    this.user = localStorage.getItem("user");
    this.user = this.user && JSON.parse(this.user);
    if (this.user.role != "Restorer") {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
#Create {
  margin-bottom: 10px;
}
</style>
