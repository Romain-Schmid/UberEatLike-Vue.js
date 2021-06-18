<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
        <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user.role }}</pre>
    </b-card>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import User from '../models/user';

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      user: new User,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/connexion');
    }
      this.user = localStorage.getItem('user')
      this.user = this.user && JSON.parse(this.user)
  }
};
</script>
