<template>
  <div class="home">
    <hi>TU EST UN Restaurateur HARRY</hi>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user.role }}</pre>
    </b-card>
    <b-button v-on:click="onLogout" variant="danger">Logout</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import User from "../models/user";

export default {
  name: "Home",
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
    },
  },
};
</script>
