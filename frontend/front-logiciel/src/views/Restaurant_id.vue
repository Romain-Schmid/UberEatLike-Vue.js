<template>
  <div class="home">    
    <p>ID : {{this.$route.params.id}} est le restaurant {{restaurant.titre}}</p>
    
  </div>
  
</template>

<script>
// @ is an alias to /src
import User from '../models/user';
import getRestaurant from '../services/restaurant.services.js';

export default {
  name: "Home",
    components: {
  },
  data() {
    return {
      user: new User,
      restaurant : [], 
    };
  },
  methods: {
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
      getRestaurant.getOneRestaurant(this.$route.params.id).then( data => { this.restaurant = data})
    }
  }
};
</script>

<style scoped>

</style>