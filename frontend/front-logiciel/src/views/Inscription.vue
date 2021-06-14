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
          v-model="form.email"
          type="email"
          placeholder="Entrer votre email"
          required
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Entrer Mot de passe"
          aria-describedby="password-help-block"
          required
        ></b-form-input>

                <b-form-input
          id="input-3"
          v-model="form.username"
          placeholder="Entrer nom d'utilisateur"
          required
        ></b-form-input>
      </b-form-group>

    <b-form-select v-model="form.role" required class="mb-3">
      <b-form-select-option :value="null">Please select an option</b-form-select-option>
      <b-form-select-option value="Customer">Client</b-form-select-option>
      <b-form-select-option value="DeliveryMan">Livreur</b-form-select-option>
      <b-form-select-option value="Restorer">Restaurateur</b-form-select-option>
    </b-form-select>


      <b-button type="submit" variant="primary">submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        role: null,
        username : "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      /*axios.get(`http://jsonplaceholder.typicode.com/posts`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.datas
      })
      .catch(e => {
        this.errors.push(e)
      })*/
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.role = null;
      this.form.username = "",
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
