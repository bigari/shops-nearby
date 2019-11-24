export const Reaction = {
  getters: {},
  mutations: {
    /**
     * For each shop set its reaction
     * @param  {State} state Vuex state
     * @param  {Array} reactions List of reactions
     */
    SET_SHOP_REACTIONS: (state, reactions) => {
      const shops = [...state.shops];
      const indexedShops = {};
      state.shops.forEach(shop => {
        indexedShops[shop.id] = shop;
      });
      reactions.forEach(reaction => {
        const shop = indexedShops[reaction.shopId];
        if (shop) {
          shop.likedAt = reaction.likedAt;
          shop.dislikedAt = reaction.dislikedAt;
        }
      });
      state.shops = shops;
    },
    /**
     * Add a Like Reaction to state or update
     * it if already present
     * @param  {State} state Vuex state
     * @param  {Object} reaction
     */
    UPDATE_REACTION: (state, reaction) => {
      const shops = [...state.shops];
      const shop = shops.find(reaction.shopId);
      if (shop === undefined) {
        return;
      }
      shop.likedAt = reaction.likedAt;
      shop.dislikedAt = reaction.dislikedAt;
      state.shops = shops;
    }
  },
  actions: {
    FETCH_REACTIONS: async context => {
      return await context.dispatch("FETCH", {
        url: `shoppers/${context.state.user.id}/reactions`,
        mutation: "SET_SHOP_REACTIONS"
      });
    },

    POST_LIKE: async (context, shop) => {
      return await context.dispatch("POST", {
        url: `shoppers/${context.state.user.id}/reactions`,
        mutation: "UPDATE_REACTION",
        jsonBody: {
          userId: context.state.user.id,
          shopId: shop.id,
          likedAt: new Date().toISOString()
        }
      });
    }
  }
};