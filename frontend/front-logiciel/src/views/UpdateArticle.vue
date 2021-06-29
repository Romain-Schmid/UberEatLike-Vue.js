<template>
  <div class="home">
    <h1>Modification d'un article</h1>
    <span class="center"
      >Merci de remplire ce formulaire pour la modificatiob d'un article de
      votre réstaurant
    </span>
    <span class="center"
      >Une image standars sera autaumatiquemment placé en fonction du type
      d'image selectionner
    </span>
    <b-form id="form" @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Titre de l'article :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.titre"
          type="text"
          placeholder="Entrer le titre de votre article"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Description de l'article :"
        label-for="input-2"
      >
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Description de votre article ..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Type de l'article :"
        label-for="input-3"
      >
        <b-form-select
          v-model="form.type"
          required
          :options="options"
          v-on:change="onChange(form.type)"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Prix de l'article en euros :"
        label-for="input-4"
        prepend="$"
      >
        <b-input-group prepend="€">
          <b-form-input
            id="input-4"
            v-model="form.prix"
            type="number"
            placeholder="Entrer le prix de votre article"
            required
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="Image de l'article :"
        label-for="input-5"
      >
        <b-form-select
          v-model="form.specific"
          required
          :options="options2"
        ></b-form-select>
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
        type: null,
        prix: "",
        specific: "",
      },
      options: [
        { value: null, text: "Please select an option" },
        { value: "plat", text: "Plat" },
        { value: "entré", text: "Entrée" },
        { value: "accompagnement", text: "Accompagnemment" },
        { value: "dessert", text: "Dessert" },
        { value: "boisson", text: "Boisson" },
      ],
      options2: [
        { value: null, text: "Please select an option" },
      ],
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
      RestorerService.getOneArticles(
        this.$route.params.id,
        this.$route.params.id2
      ).then((data) => {
        this.form.titre = data.titre;
        this.form.description = data.description;
        this.form.type = data.type;
        this.form.prix = data.prix;
        this.form.specific = data.specific;
      });
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout", this.user);
    },
    onSubmit(event) {
      event.preventDefault();
      RestorerService.putArticle(
        this.form,
        this.$route.params.id,
        this.$route.params.id2
      ).then(
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
    onChange(type) {
      if (type == 'plat') {
        this.options2 = [
        { value: null, text: "Please select an option" },
        { value: "Burger", text: "Burger" },
        { value: "Sushi", text: "Sushi" },
        { value: "Viande", text: "Viande" },
        { value: "Poisson", text: "Poisson" },
      ]
      }else if (type == 'boisson') {
        this.options2 = [
        { value: null, text: "Please select an option" },
        { value: "Soda", text: "Soda" },
        { value: "Vin", text: "Vin" },
        { value: "Eau", text: "Eau" },
      ]
      }else if (type == 'entré') {
        this.options2 = [
        { value: null, text: "Please select an option" },
        { value: "Salade", text: "Salade" },
        { value: "Fdm", text: "Fruits de mer" },
      ]
      }else if (type == 'accompagnement') {
        this.options2 = [
        { value: null, text: "Please select an option" },
        { value: "Frite", text: "Frite" },
        { value: "Salade", text: "Salade" },
        { value: "Pates", text: "Pâtes" },
        { value: "Legumes", text: "Légumees" },
      ]
      }else if (type == 'dessert') {
        this.options2 = [
        { value: null, text: "Please select an option" },
        { value: "Gateaux", text: "Gateaux" },
        { value: "Glaces", text: "Glaces" },
      ]
      }
    }
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
