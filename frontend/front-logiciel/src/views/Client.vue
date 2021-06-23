<template>
  <div class="home">
        <Sidebar/>
        <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user.role }}</pre>
      <p> Liste des restaurants : {{listRestaurant}}</p>
    </b-card>
  </div>
  
</template>

<script>
// @ is an alias to /src
import User from '../models/user';
import getRestaurant from '../services/restaurant.services.js';
import Sidebar from '../components/Sidebar.vue';

export default {
  name: "Home",
    components: {
    Sidebar,
  },
  data() {
    return {
      user: new User,
      listRestaurant : null, 
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/connexion');
    }else{
      this.user = localStorage.getItem('user')
      this.user = this.user && JSON.parse(this.user)
      this.listRestaurant = getRestaurant.getAllRestaurants();
    }
  }
};
</script>
