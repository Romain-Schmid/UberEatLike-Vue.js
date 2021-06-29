<template>
  <div class="home">
    <h1>Menus :</h1>
    <b-button
      class="button"
      id="Create"
      v-bind:href="'/restaurateur/' + this.$route.params.id + '/createMenu'"
      variant="success"
    >
      Créez un Menu
    </b-button>
    <div class="list">
      <b-card-group deck>
        <div v-for="menu in listMenus" :key="menu.titre">
          <b-card
            v-bind:title="menu.titre"
            :img-src = menu.picture
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              <ul v-for="article in menu['article']" :key="article.titre">
                <li>
                  {{ article.titre }}
                </li>
              </ul>
            </b-card-text>
            <b-button href="" variant="success"> Modifier </b-button>
          </b-card>
        </div>
      </b-card-group>
    </div>
    <h1>Articles :</h1>
    <b-button
      class="button"
      id="Create"
      v-bind:href="'/restaurateur/' + this.$route.params.id + '/createArticle'"
      variant="success"
    >
      Créez un artcile
    </b-button>
    <div class="list">
      <b-card-group deck>
        <div v-for="article in listArticles" :key="article.titre">
          <b-card
            v-bind:title="article.titre"
            :img-src = article.picture
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              {{ article.description }}
            </b-card-text>
            <b-button
              v-bind:href="
                '/restaurateur/' +
                $route.params.id +
                '/updateArticle/' +
                article._id
              "
              variant="success"
            >
              Modifier
            </b-button>
          </b-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import User from "../models/user";
import RestorerService from "../services/restaurateur.services";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      user: new User(),
      listMenus: [],
      listArticles: [],
    };
  },
  methods: {},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/connexion");
    } else {
      this.user = localStorage.getItem("user");
      this.user = this.user && JSON.parse(this.user);
      RestorerService.getMenus(this.$route.params.id).then((data) => {
        this.listMenus = data;
      });
      RestorerService.getArticles(this.$route.params.id).then((data) => {
        this.listArticles = data;
      });
    }
  },
};
</script>
<style scoped>
.card-deck {
  align-items: center;
  justify-content: center;
  column-gap: 2em;
}
.card {
  margin-left: auto;
  margin-right: auto;
}

#Create {
  margin-bottom: 10px;
}
</style>
