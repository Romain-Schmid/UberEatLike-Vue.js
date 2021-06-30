<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/connexion">Connexion</router-link> |
      <router-link to="/inscription">Inscription</router-link> |
      <router-link to="/restaurateur">Restaurateur</router-link> |
      <router-link to="/restaurant">Restaurants</router-link> | 
      <router-link to="/order">Mes Commandes</router-link> | 
      <router-link to="/delivery">Livreurs</router-link>
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
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/connexion">Connexion</b-nav-item>
        <b-nav-item href="/inscription">Inscription</b-nav-item>
        <b-nav-item href="/restaurateur">Restaurateur</b-nav-item>
        <b-nav-item href="/restaurant">Restaurants</b-nav-item>
        <b-nav-item href="/order">Mes Commandes</b-nav-item>
        <b-nav-item href="/delivery">Livreurs</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>

    <router-view />
  </div>
</template>

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
