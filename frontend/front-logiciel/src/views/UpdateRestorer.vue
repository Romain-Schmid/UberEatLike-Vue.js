<template>
  <div class="home">
    <h1>Mise à jours de votre restaurant</h1>
    <span class="center"
      >Veuillez modifier les valeurs du formulaire pour mettre a jours votre
      restaurant.
    </span>
    <b-form id="form" @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Titre du restaurant :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.titre"
          type="text"
          placeholder="Entrer le titre de votre restaurant"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Description du restaurant :"
        label-for="input-2"
      >
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Description de votre restaurant ..."
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Type de restaurant :"
        label-for="input-3"
      >
        <b-form-select
          v-model="form.type"
          required
          :options="options"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Mail propriétaire du restaurant :">
        <b-form-input v-model="user.email" disabled></b-form-input>
      </b-form-group>

      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Addresse du restaurant"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label="Rue :"
            label-for="nested-rue"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="nested-rue"
              v-model="form.rue"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Ville:"
            label-for="nested-ville"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="nested-ville"
              v-model="form.ville"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Code Postale :"
            label-for="nested-code_postale"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="nested-code_postale"
              v-model="form.code_postale"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Pays:"
            label-for="nested-pays"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="nested-pays"
              v-model="form.pays"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </b-form-group>
      </b-card>

      <b-form-group
        id="input-group-5"
        label="Note du restaurant :"
        label-for="input-5"
        description="La note changera avec les notes données par les clients"
      >
        <b-form-rating variant="success" v-model="form.note"></b-form-rating>
      </b-form-group>

      <b-button type="submit" variant="success">Envoyer</b-button>
    </b-form>
    <b-button variant="danger" v-on:click="erase()">Supprimer</b-button>
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
        rue: "",
        ville: "",
        code_postale: "",
        pays: "",
        note: "",
      },
      options: [
        { value: null, text: "Please select an option" },
        { value: "Fast-food", text: "Fast-food" },
        { value: "Thai", text: "Thaĩ" },
        { value: "Italien", text: "Italien" },
        { value: "Sushi", text: "Sushi" },
        { value: "Asiatique", text: "Asiatique" },
        { value: "Americain", text: "Américain" },
        { value: "Indien", text: "Indien" },
        { value: "Street-food", text: "Street-food" },
        { value: "Mexicain", text: "Mexicain" },
        { value: "Français", text: "Français" },
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
      RestorerService.getRestaurant(this.$route.params.id).then((data) => {
        this.form.titre = data.titre;
        this.form.description = data.description;
        this.form.type = data.type;
        this.form.rue = data.rue;
        this.form.ville = data.ville;
        this.form.code_postale = data.code_postale;
        this.form.pays = data.pays;
        this.form.note = data.note;
      });
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout", this.user);
    },
    onSubmit(event) {
      event.preventDefault();
      RestorerService.putUpdateRestorer(this.form, this.$route.params.id).then(
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
    erase() {
      RestorerService.delRestorer(
        this.$route.params.id,
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
