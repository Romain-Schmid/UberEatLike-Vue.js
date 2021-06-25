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
              {{restaurant.description}} : ID est {{restaurant._id}}
            </b-card-text>
            <b-button v-bind:href="'/restaurateur/' + restaurant._id" variant="success"> Modifier </b-button>
          </b-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
import RestorerService from "../services/restaurateur.services"

export default {
  name: "OwnRestaurant",
  /*props: {
    msg: String,
  },*/
    data() {
    return {
      user: new User(),
      listRestaurant:  [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.user = this.user && JSON.parse(this.user);
    RestorerService.getMine().then(data => {this.listRestaurant = data})
  },
};
</script>

<style scoped>
.card-deck{
  align-items: center;
  justify-content: center;
}
.card{
  margin-left: auto;
  margin-right: auto;
}
</style>