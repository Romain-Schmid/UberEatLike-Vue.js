<template>
  <div class="home">
    <h1>Menus :</h1>     
    <div class="list">
      <b-card-group deck>
        <div v-for="menu in listMenus" :key="menu.titre">
          <b-card 
            v-bind:title=menu.titre
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <ul v-for="article in menu['article']" :key="article.titre">
                <li>
                  {{article.titre}}
                </li>
              </ul>
            </b-card-text>

            <b-button href="" variant="success"> Ajouter </b-button>
            <b-form-spinbutton id="sb-inline"  min="0" max="10"  placeholder="0" inline></b-form-spinbutton>
          </b-card>
        </div>
      </b-card-group>
    </div>
    <h1>Articles :</h1>
    <div class="list">
      <b-card-group deck>
        <div v-for="article in listArticles" :key="article.titre">
          <b-card 
            v-bind:title=article.titre
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{article.description}}  
            </b-card-text>
              <b-button  v-on:click="AddOrder(article._id, article.titre, responses[article._id], article.prix)" variant="success"> Ajouter </b-button>
              <b-form-spinbutton  min="0" max="10" placeholder="0" v-model="responses[article._id]" inline></b-form-spinbutton>
          </b-card>
        </div>
      </b-card-group>
    </div>

    <h1>Panier</h1>
    <p v-for="article in listOrder" :key="article.titre">
      Titre : {{article.titre}}, ID: {{article.id}}, Prix: {{article.price}}, Nombre : {{article.nb}}
    </p>

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
      listMenus : [], 
      listArticles :[],
      responses: {},
      listOrder : [],
    };
  },
  methods: {
    AddOrder(id, titre, nb, price){
      var article = this.listOrder.find(article => article.id === id)

      if(article != null){
        article.nb += nb;
      }else{
        var feed = {id: id, titre: titre, nb: nb, price: price}
        this.listOrder.push(feed)
      }
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
      this.user = localStorage.getItem('user')
      this.user = this.user && JSON.parse(this.user)
      getRestaurant.getMenus(this.$route.params.id).then( data => { this.listMenus = data})
      getRestaurant.getArticles(this.$route.params.id).then( data => { this.listArticles = data})
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