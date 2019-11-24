import Vue from "vue";
import Vuex from "vuex";
import { API } from "../utils/constants";
import { calcDistance } from "../utils/geoutil";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPosition: null,
    shops: [],
    categories: {},
    user: null,
    config: {
      headers: { ...API.HEADERS }
    }
  },
  getters: {
    sortedShops: state => {
      return [...state.shops].sort((a, b) => b.distance < a.distance);
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },

    SET_CURRENT_POSITION: (state, position) => {
      state.position = position;
      let shops = [...state.shops];

      shops.forEach(shop => {
        shop.distance = calcDistance(position, shop.location);
      });

      state.shops = shops;
    },
    /**
     * Set Authorization header
     * @param  {State} state Vuex state
     * @param  {Array} token Authentication token
     */
    ADD_AUTH: (state, token) => {
      state.config.headers.Authorization = `Bearer ${token}`;
    },

    /**
     * Populate categories
     * @param  {State} state Vuex state
     * @param  {Array} categories List of categories
     */
    SET_CATEGORIES: (state, categories) => {
      categories.forEach(
        category => (state.categories[category.id] = category.name)
      );
    },
    /**
     * Map each shop to its category and set state.shops
     * @param  {State} state Vuex state
     * @param  {Array} shops List of shops
     */
    SET_SHOPS: (state, shops) => {
      const categorizedShops = [...shops].map(shop => {
        shop.category = state.categories[shop.categoryId];
        if (state.position) {
          shop.distance = calcDistance(state.position, shop.location);
        }
        return shop;
      });
      state.shops = categorizedShops;
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
      const response = await fetch(`${API.ENDPOINT}/users/login`, {
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
          id: data.userId
        });
        context.commit("ADD_AUTH", data.id);
        return { hasError: false, error: null };
      }
      return { hasError: true, error: data.error }; // data wraps error payload
    },
    /**
     * Sign up the user with his credentials
     * and automatically sign him in
     * @param  {ActionContext} context Vuex action context
     * @param  {Object} credentials Wraps email and password strings
     * @return {ApiErrorResponse}
     */
    SIGNUP: async (context, credentials) => {
      const response = await fetch(`${API.ENDPOINT}/users`, {
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
      return { hasError: true, error: data.error };
    },
    /**
     * Fetch resource at a given url and call the specified
     * mutation
     * @param  {ActionContext} context Vuex action context
     * @param  {Object} parameters Wrap url, mutation to call
     *                            and optionally get parameters
     * @return {ApiErrorResponse}
     */
    FETCH: async (context, parameters) => {
      const response = await fetch(`${API.ENDPOINT}/${parameters.url}`, {
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

    /**
     * The following actions call FETCH for specific resources
     */
    FETCH_CATEGORIES: async context => {
      return await context.dispatch("FETCH", {
        url: "categories",
        mutation: "SET_CATEGORIES"
      });
    },

    FETCH_SHOPS: async context => {
      return await context.dispatch("FETCH", {
        url: "shops",
        mutation: "SET_SHOPS"
      });
    },

    QUERY_CURRENT_POSITION: async context => {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(position => {
          context.commit("SET_CURRENT_POSITION", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
        return true;
      } else {
        /* geolocation IS NOT available */
        return false;
      }
    }
  },
  modules: {}
});
