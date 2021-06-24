<template>
  <div class="home">    

    <div class="list">
      <b-card-group deck>
        <div v-for="restaurant in listRestaurant" :key="restaurant.titre">
          <b-card 
            v-bind:title=restaurant.titre
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{restaurant.description}}
            </b-card-text>

            <b-button v-bind:href="'/restaurant/' + restaurant._id" variant="success"> Commander </b-button>
          </b-card>
        </div>
      </b-card-group>
    </div>
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
      listRestaurant : [], 
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
      getRestaurant.getAllRestaurants().then( data => { this.listRestaurant = data})
    }
  }
};
</script>

<style scoped>
.card-deck{
  align-items: center;
  justify-content: center;
  column-gap : 2em;
}

.card{
  margin-left: auto;
  margin-right: auto;
}
</style>