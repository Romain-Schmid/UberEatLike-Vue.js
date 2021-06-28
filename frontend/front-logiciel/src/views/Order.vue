<template>
  <div class="home">    

    <cart-modal v-bind:currentOrder="this.order"/>
    
    <div v-if="listOrder.length != 0">
        <div v-for="o in listOrder" :key="o._id">
            <p>{{o._id}}</p>
        </div>
    </div>
    <div v-else> Vous n'avez pas encore passez de commandes.</div>

  </div>
  
</template>

<script>
// @ is an alias to /src
import User from '../models/user';
import Order from '../models/order';
import CartModal from '../components/CartModal.vue';
import getOrder from '../services/order.services.js';

export default {
  name: "Home",
    components: {
      CartModal,
  },
  data() {
    return {
      user: new User,
      order: new Order,
      listOrder: []
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
      this.order = JSON.parse(localStorage.getItem('order'));

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