export const User = {
  getters: {},
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    /**
     * Set Authorization header
     * @param  {State} state Vuex state
     * @param  {Array} token Authentication token
     */
    ADD_AUTH: (state, token) => {
      state.config.headers.Authorization = `Bearer ${token}`;
    }
  },

  actions: {
    /**
     * Sign in the user with his credentials
     * @param  {ActionContext} context Vuex action context
     * @param  {Object} credentials Wraps email and password strings
     * @return {import('./index').ApiErrorResponse}
     */
    SIGNIN: async (context, credentials) => {
      const endpoint = context.state.config.endpoint;
      const response = await fetch(`${endpoint}/shoppers/login`, {
        method: "POST",
        headers: context.state.config.headers,
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
     * @return {import('./index').ApiErrorResponse}
     */
    SIGNUP: async (context, credentials) => {
      const endpoint = context.state.config.endpoint;
      const response = await fetch(`${endpoint}/shoppers`, {
        method: "POST",
        headers: context.state.config.headers,
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
    }
  }
};
