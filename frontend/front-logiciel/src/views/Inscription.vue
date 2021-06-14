<template>
  <div class="container">
    <b-container>
      <h1>Inscription</h1>
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
      <b-form-select-option :value="null">Please select an option</b-form-select-option>
      <b-form-select-option value="Customer">Client</b-form-select-option>
      <b-form-select-option value="DeliveryMan">Livreur</b-form-select-option>
      <b-form-select-option value="Restorer">Restaurateur</b-form-select-option>
    </b-form-select>


      <b-button type="submit" variant="primary">submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user }}</pre>
    </b-card>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      show: true,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      //alert(JSON.stringify(this.user));
      this.message = '';
      this.submitted = true;
      this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              alert(JSON.stringify(this.message))
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.user.email = "";
      this.user.password = "";
      this.user.role = null;
      this.user.username = "",
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
