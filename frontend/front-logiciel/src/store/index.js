import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module.js";
import { restorer } from "./restaurateur.module";
//import { restaurant } from './restaurant.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    restorer,
    //restaurant
  },
});
