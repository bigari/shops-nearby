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
    /**
     * @typedef {Object} ErrorPayload
     * @property {Number} statusCode The http status code
     * @property {String} message The rest api error message
     */

    /**
     * @typedef {Object} ApiErrorResponse
     * @property {Boolean} hasError
     * @property {ErrorPayload} error The response error
     */

    /**
     * Sign in the user with his credentials
     * @param  {ActionContext} context Vuex action context
     * @param  {Object} credentials Wraps email and password strings
     * @return {ApiErrorResponse}
     */
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
        return { hasError: false, error: null };
      }
      return { hasError: true, ...data }; // data wraps error payload
    },
    /**
     * Sign up the user with his credentials
     * and automatically sign him in
     * @param  {ActionContext} context Vuex action context
     * @param  {Object} credentials Wraps email and password strings
     * @return {ApiErrorResponse}
     */
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
      return { hasError: true, ...data }; // data wraps error payload
    }
  },
  modules: {}
});
