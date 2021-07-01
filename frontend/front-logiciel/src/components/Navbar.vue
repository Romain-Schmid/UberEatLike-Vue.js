<template>
  <div :key="user.role" id="navbar">
    <div id="nav">
      <router-link to="/">Accueil | </router-link>
      <router-link to="/restaurateur" v-if="user.role == 'Restorer'"
        >Gestion Restaurants |
      </router-link>
      <router-link to="/restaurant" v-if="user.role == 'Customer'"
        >Commander |
      </router-link>
      <router-link to="/order">Mes Commandes</router-link>
    </div>

    <div id="nav2">
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand href="#">Menu</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Accueil</b-nav-item>
            <b-nav-item to="/restaurateur" v-if="user.role == 'Restorer'"
              >Gestion Restaurants</b-nav-item
            >
            <b-nav-item to="/restaurant" v-if="user.role == 'Customer'"
              >Commander</b-nav-item
            >
            <b-nav-item to="/order">Mes Commandes</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Navbar",
  props: ["user"],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
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
