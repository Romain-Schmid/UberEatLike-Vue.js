<template>
  <div :key="user.role" id="app">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import User from "./models/user";

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

h1 {
  color: #42b983;
}

@media screen and (min-width: 800px) {
  #nav2 {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  #nav {
    display: none;
  }
}
</style>
