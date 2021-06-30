<template>
  <div>
        <b-button id="show-btn" @click="showModal()" >Cart</b-button>

        <b-modal ref="cart" hide-footer>
          <p v-for="article in currentOrder.orderList" :key="article.titre" >
            {{article.titre}} x {{article.nb}} = {{article.price * article.nb}} €
            <b-button class="mt-3" variant="danger" block @click="deleteArtcile(article.id)" inline>Supprimer</b-button>
          </p>
          <p>Total : {{currentOrder.totalPrice}} €</p>
          <b-button class="mt-3" variant="success" block @click="takeOrder()">Commander</b-button>
          <b-button class="mt-3" variant="danger" block @click="deleteOrder()">Tout supprimer</b-button>
        </b-modal>
      </div>
</template>

<script>
export default {
  name: "CartModal",
  props:['currentOrder'],
  methods:{
      showModal(){
          this.$refs['cart'].show();
      },
      takeOrder(){
        this.$refs['cart'].hide();
        this.$router.push('/order');
      },
      deleteArtcile(id){
        this.currentOrder.deleteArticle(id);
        localStorage.setItem('order', JSON.stringify(this.currentOrder));
      },
      deleteOrder(){
        this.currentOrder.eraseOrder();
        localStorage.setItem('order', JSON.stringify(this.currentOrder));
      }
  },
};
</script>
