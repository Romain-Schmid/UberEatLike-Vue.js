<template>
  <div>
        <b-button id="show-btn" @click="showModal()" >Cart</b-button>

        <b-modal ref="cart" hide-footer>
          <p v-for="article in currentOrder.orderList" :key="article.titre" >
            {{article.titre}} x {{article.nb}} = {{article.price * article.nb}} €
          </p>
          <p>Total : {{currentOrder.totalPrice}} €</p>
          <b-button class="mt-3" variant="success" block @click="takeOrder()">Commander</b-button>
          <b-button class="mt-3" variant="danger" block @click="deleteOrder()">Delete All</b-button>
        </b-modal>
      </div>
</template>

<script>
import getOrder from '../services/order.services.js';

export default {
  name: "CartModal",
  props:['currentOrder'],
  methods:{
      showModal(){
          this.$refs['cart'].show();
      },
      takeOrder(){
        var feed = "";
        this.currentOrder.orderList.forEach(element => {
          console.log("id : " + element.id + " nb : " + element.nb);
          for(let i = 0; i < element.nb; i++){
            feed.concat(element.id , ",");
          }
        });
        console.log(feed, this.currentOrder.totalPrice, this.currentOrder.rest_id);
        getOrder.createOrder(feed, this.currentOrder.totalPrice, this.currentOrder.rest_id);
        this.$refs['cart'].hide();
      },
      deleteOrder(){
          this.currentOrder.eraseOrder();
          localStorage.setItem('order', JSON.stringify(this.currentOrder));
      }
  },
};
</script>
