import Vue from "vue";
import Vuex from "vuex";
import { API } from "../utils/constants";
import { Shop } from "./shop";
import { User } from "./user";
import { Reaction } from "./reaction";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPosition: null,
    shops: [],
    categories: {},
    user: null,
    config: {
      headers: { ...API.HEADERS },
      endpoint: API.ENDPOINT
    }
  },
  getters: {
    ...User.getters,
    ...Shop.getters,
    ...Reaction.getters
  },
  mutations: {
    ...User.mutations,
    ...Shop.mutations,
    ...Reaction.mutations
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
     * Fetch resource at a given url and call the specified
     * mutation
     * @param  {ActionContext} context Vuex action context
     * @param  {Object} parameters Wrap url, mutation to call
     *                            and optionally get parameters
     * @return {ApiErrorResponse}
     */
    FETCH: async (context, parameters) => {
      const endpoint = context.state.config.endpoint;
      const response = await fetch(`${endpoint}/${parameters.url}`, {
        method: "GET",
        headers: context.state.config.headers
      });
      const data = await response.json();
      if (response.status === 200) {
        context.commit(parameters.mutation, data);
        return { hasError: false, error: null };
      }
      return { hasError: true, error: data.error };
    },
    ...User.actions,
    ...Shop.actions,
    ...Reaction.actions
  },
  modules: {}
});
