<template>
  <div class="container">
    <Navbar v-bind:user="this.user" />
    <b-container>
      <h1>Connexion</h1>
      <p>
        Tu n'a pas encore de compte ?
        <router-link to="/inscription">Créer un compte</router-link>
      </p>
    </b-container>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
        <b-form-select-option value="DeliveryMan">Livreur</b-form-select-option>
        <b-form-select-option value="Restorer"
          >Restaurateur</b-form-select-option
        >
      </b-form-select>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="button" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user }}</pre>
    </b-card>
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
      user: new User("", ""),
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
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.user.email = "";
      this.user.password = "";
      this.user.role = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
