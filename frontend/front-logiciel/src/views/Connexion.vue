<template>
  <div>
    <Navbar v-bind:user="this.user" />
    <div class="container">
      <b-container>
        <h1>Connexion</h1>
        <p>
          Tu n'a pas encore de compte ?
          <router-link to="/inscription">Créer un compte</router-link>
        </p>
      </b-container>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="Entrer votre email"
            required
          ></b-form-input>

          <b-form-input
            id="input-2"
            v-model="user.password"
            type="password"
            placeholder="Entrer Mot de passe"
            aria-describedby="password-help-block"
          ></b-form-input>
        </b-form-group>

        <b-form-select v-model="user.role" required class="mb-3">
          <b-form-select-option :value="null"
            >Please select an option</b-form-select-option
          >
          <b-form-select-option value="Customer">Client</b-form-select-option>
          <b-form-select-option value="DeliveryMan"
            >Livreur</b-form-select-option
          >
          <b-form-select-option value="Restorer"
            >Restaurateur</b-form-select-option
          >
        </b-form-select>

        <b-button type="submit" variant="success">Connexion</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import User from "../models/user.js";
import Navbar from "../components/Navbar.vue";
//import authHeader from '../services/auth-header';

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      user: new User("", "", "", ""),
      show: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("auth/login", this.user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.$router.push("/");
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
