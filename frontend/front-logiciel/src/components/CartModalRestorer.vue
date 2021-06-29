<template>
  <div>
    <b-button class="dam" id="show-btn" @click="showModal()"
      >Afficher Menu</b-button
    >

    <b-modal ref="cart" hide-footer>
      <p v-for="article in currentOrder.orderList" :key="article.titre">
        {{ article.titre }} x {{ article.nb }} =
        {{ article.price * article.nb }} €
      </p>
      <p>Total : {{ currentOrder.totalPrice }} €</p>
      <b-button class="mt-3" variant="danger" block @click="deleteOrder()"
        >Supprimer les articles</b-button
      >
    </b-modal>
  </div>
</template>

<script>
//import getOrder from '../services/order.services.js';
export default {
  name: "CartModal",
  props: ["currentOrder"],
  methods: {
    showModal() {
      this.$refs["cart"].show();
    },
    deleteOrder() {
      this.currentOrder.eraseOrder();
      localStorage.setItem("order", JSON.stringify(this.currentOrder));
    },
  },
};
</script>

<style scoped>
.dam {
  margin-bottom: 10px;
}
</style>
