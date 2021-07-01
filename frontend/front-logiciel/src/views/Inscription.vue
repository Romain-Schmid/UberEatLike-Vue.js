<template>
  <div>
    <Navbar v-bind:user="this.user" />
    <div class="container">
      <b-container>
        <h1>Inscription</h1>
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
            required
          ></b-form-input>

          <b-form-input
            id="input-3"
            v-model="user.username"
            placeholder="Entrer nom d'utilisateur"
            required
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

        <b-button type="submit" variant="success">submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: new User("", "", "", null),
      submitted: false,
      successful: false,
      show: true,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.user));
      this.message = "";
      this.submitted = true;
      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          if (this.user.role == "Restorer") {
            this.$store.dispatch("auth/login", this.user).then(
              (data) => {
                this.message = data.message;
                this.successful = true;
                this.$router.push("/createRestorer");
              },
              (error) => {
                this.loading = false;
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              }
            );
          }
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
  },
};
</script>
