import RestaurateurService from "../services/restaurateur.services";

const form = JSON.parse(localStorage.getItem("form"));
const initialState = form
  ? { status: { loggedIn: true }, form }
  : { status: { loggedIn: false }, form: null };

export const restorer = {
  namespaced: true,
  state: initialState,
  actions: {
    create({ commit }, form) {
      return RestaurateurService.postNewRestorer(form).then(
        (form) => {
          commit("createSuccess", form);
          return Promise.resolve(form);
        },
        (error) => {
          commit("createFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    createSuccess(state, form) {
      state.status.loggedIn = true;
      state.form = form;
    },
    createFailure(state) {
      state.status.loggedIn = false;
      state.form = null;
    },
  },
};
