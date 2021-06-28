<template>
  <div class="home">
    <Sidebar />
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
import Sidebar from "../components/Sidebar.vue";
import OwnRestaurant from "../components/OwnRestaurant.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    OwnRestaurant,
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
