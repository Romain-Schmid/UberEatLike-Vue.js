<template>
  <div class="home">
    <Navbar v-bind:user="this.user" />
    <img id="logo" alt="Vue logo" src="../assets/logo.png" />
    <h1>ꟻAF</h1>
    <h2>ꟻoodAsFast</h2>
    <span class="center">Bienvenue sur notre application FoodAsFast </span>
    <span class="center"
      >FoodAsFast vous permet en tant que client de trouver des restaurants près
      de chez vous, en tant que restaurateur de proposer vos services au plus
      grand nombre et pour les livreurs de se faire de l'argent aussi vite que
      vous livrez les commandes
    </span>
    <b-button id="button" v-on:click="onLogout" variant="danger"
      >Déconnexion</b-button
    >
  </div>
</template>

<script>
// @ is an alias to /src
import User from "../models/user";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
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
    } else {
      this.user = localStorage.getItem("user");
      this.user = this.user && JSON.parse(this.user);
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout", this.user);
      this.$router.push("/connexion");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arimo:wght@600&display=swap");
h1 {
  font-family: "Arimo", sans-serif;
}

h2 {
  font-family: "Arimo", sans-serif;
}

.center {
  margin-left: 10px;
  margin-right: 10px;
  display: block;
}

#button {
  margin-top: 5px;
}
</style>
