<template>
  <div class="home">    
    
    <div v-if="this.order.rest_id != null">
      <p v-for="article in this.order.orderList" :key="article._id" >
        {{article.titre}} x {{article.nb}} = {{article.price * article.nb}} €
      </p>
      <p>Total : {{this.order.totalPrice}} €</p>
      <b-container fluid="sm">
        <p>Address : <b-form-input v-model="rue" ></b-form-input></p>
        <p>Postal code : <b-form-input v-model="code" ></b-form-input></p>
        <p>City : <b-form-input v-model="city" ></b-form-input></p>
        <b-button class="mt-3" variant="success" block @click="command()">Commander</b-button>
        <b-button class="mt-3" variant="danger" block @click="cancel()">Delete All</b-button>
      </b-container>
    </div>


    <div v-if="listOrder.length != 0">
      
        <h1>En attente de Payement :</h1>
        <div v-for="o in listOrder" :key="o._id">
          <div v-if='o.status == "unpaid"'>
            <p>{{o._id}}  --- Prix : {{o.prix}} €
              <b-button v-on:click="delOrder(o._id)" variant="danger"> Delete </b-button>
              <b-button v-on:click="pay(o._id)" variant="success"> Pay </b-button>
            </p>
          </div>
        </div>

        <h1>En cours de livraison :</h1>
        <div v-for="o in listOrder" :key="o._id">
          <div v-if='o.status == "paid"'>
            <p>{{o._id}}  --- Prix : {{o.prix}} € </p>
          </div>
        </div>
    </div>
    <div v-else> Vous n'avez pas encore passez de commandes.</div>

  </div>
  
</template>

<script>
import User from '../models/user';
import Order from '../models/order';
import getOrder from '../services/order.services.js';

export default {
  name: "Home",
    components: {},
  data() {
    return {
      user: new User,
      order: new Order,
      listOrder: [],
      addresse: [],
      rue:"",
      code:"",
      city:""
    };
  },
  methods: {
    delOrder(id){
      getOrder.deleteOrder(id);
      this.componentKey += 1;
    },
    pay(id){
      getOrder.payOrder(id);
      this.componentKey += 1;
    },
    command(){
      if(this.rue == "" || this.code =="" || this.city ==""){
        alert("Informations are missing");
      }else{
        var feed ="";
        this.order.orderList.forEach(element => {
           for(var i =0; i < element.nb; i++){
             feed += element.id + ","
           }
        })

        getOrder.createOrder(feed, this.order.totalPrice, this.order.rest_id, this.code, this.city, this.rue);
        this.order.eraseOrder();
        localStorage.setItem('order', JSON.stringify(this.order));
        this.componentKey += 1;
      }
    },
    cancel(){
      this.order.eraseOrder();
      localStorage.setItem('order', JSON.stringify(this.order));
    }
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

      if(localStorage.getItem('order') != null){
        this.order.getLocalStorage(JSON.parse(localStorage.getItem('order')));
        getOrder.getOrder().then( data => { this.listOrder = data})
      }else{
        localStorage.setItem('order', JSON.stringify(this.order));
      }
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