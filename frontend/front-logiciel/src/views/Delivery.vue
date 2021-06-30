<template>
  <div class="home">    
    
    <div v-if="listOrder.length != 0">
      
        <h1>Livraison en attente d'un livreur :</h1>
        <div v-for="o in listOrder" :key="o._id">
          <div v-if='o.status == "unpaid"'>
            <p>{{o._id}}  --- Prix : {{o.prix}} €
              <b-button v-on:click="delOrder(o._id)" variant="danger"> Delete </b-button>
              <b-button v-on:click="pay(o._id)" variant="success"> Pay </b-button>
            </p>
          </div>
        </div>

        <h1>Vos livraison en attente:</h1>
        <div v-for="o in listOrder" :key="o._id">
          <div v-if='o.status == "paid"'>
            <p>{{o._id}}  --- Prix : {{o.prix}} € </p>
          </div>
        </div>
    </div>
    <div v-else> Il n'y a pas de commandes en attente</div>

  </div>
  
</template>

<script>
import User from '../models/user';
import getOrder from '../services/order.services.js';

export default {
  name: "Home",
    components: {},
  data() {
    return {
      user: new User,
      listOrder: [],
      addresse: [],
      rue:"",
      code:"",
      city:""
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
      this.user = localStorage.getItem('user');
      this.user = this.user && JSON.parse(this.user);
      getOrder.getOrder().then( data => { this.listOrder = data})
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