<template>
  <div class="home">
    <h1>Création d'un Menu</h1>
    <span class="center"
      >Merci de remplire ce formulaire pour la création d'un menu de votre
      réstaurant
    </span>
    <span class="center"
      >Une image standars sera autaumatiquemment placé pour le menu
    </span>
    <b-form id="form" @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Titre du menu :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.titre"
          type="text"
          placeholder="Entrer le titre de votre menu"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Description du menu :"
        label-for="input-2"
      >
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Description de votre menu ..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Prix du menu en euros :"
        label-for="input-3"
        prepend="$"
      >
        <b-input-group prepend="€">
          <b-form-input
            id="input-3"
            v-model="form.prix"
            type="number"
            placeholder="Entrer le prix de votre article"
            required
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-button type="submit" variant="success">Envoyer</b-button>
    </b-form>
  </div>
</template>

<script>
// @ is an alias to /src
import User from "../models/user";
import RestorerService from "../services/restaurateur.services";

export default {
  name: "Home",
  data() {
    return {
      user: new User(),
      form: {
        titre: "",
        description: "",
        prix: "",
      },
      show: true,
    };
  },
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
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout", this.user);
    },
    onSubmit(event) {
      event.preventDefault();
      RestorerService.postArticle(this.form, this.$route.params.id).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          alert("Successe");
          this.$router.push("/restaurateur");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

h1 {
  color: #42b983;
}

#form {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 3px solid #42b983;
  padding: 1%;
}
</style>
