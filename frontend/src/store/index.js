import Vue from "vue";
import Vuex from "vuex";
import { API } from "../utils/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    SIGNIN: async (context, credentials) => {
      let response = await fetch(`${API.ENDPOINT}/users/login`, {
        method: "POST",
        headers: API.HEADERS,
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        context.commit("SET_USER", {
          email: credentials.email,
          token: data.id,
          id: data.userId
        });
        return false;
      }
      return data;
    },
    SIGNUP: async (context, credentials) => {
      let response = await fetch(`${API.ENDPOINT}/users`, {
        method: "POST",
        headers: API.HEADERS,
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        return await context.dispatch("SIGNIN", credentials);
      }
      return data;
    }
  },
  modules: {}
});
