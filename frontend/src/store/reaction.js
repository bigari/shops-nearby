export const Reaction = {
  getters: {
    likedShops: state => {
      //Trick for better performance
      //Building a "HashMap" of shops
      //It makes lookups from linear to constant
      //..time complexity wise
      const indexedShops = {};
      state.shops.forEach(shop => {
        indexedShops[shop.id] = shop;
      });

      const likedShops = [];

      state.reactions.forEach(reaction => {
        if (reaction.likedAt == null) {
          //Reaction is not a like
          return;
        }
        const shop = indexedShops[reaction.shopId];
        if (shop === undefined) {
          //Shop is not in state
          return;
        }
        likedShops.push(shop);
      });

      if (state.currentPosition === null) {
        return likedShops;
      }
      return likedShops.sort((a, b) => b.distance < a.distance);
    }
  },
  mutations: {
    /**
     * Set Reactions in state
     * @param  {State} state Vuex state
     * @param  {Array} reactions List of reactions
     */
    SET_REACTIONS: (state, reactions) => {
      state.reactions = reactions;
    },
    /**
     * Add a Like Reaction to state or update
     * it if already present
     * @param  {State} state Vuex state
     * @param  {Object} reaction
     */
    ADD_LIKE_REACTION: (state, reaction) => {
      const cachedReaction = state.reactions.find(r => r.id === reaction.id);
      let reactions;
      if (cachedReaction) {
        cachedReaction.likedAt = reaction.likedAt;
        reactions = state.reactions.filter(r => r.id !== reaction.id);
        reactions.push(cachedReaction)
      } else {
        reactions = [...state.reactions];
        reactions.push(reaction);
      }
      state.reactions = reactions;
    }
  },
  actions: {
    FETCH_REACTIONS: async context => {
      return await context.dispatch("FETCH", {
        url: `shoppers/${context.state.user.id}/reactions`,
        mutation: "SET_REACTIONS"
      });
    },

    POST_LIKE: async (context, shop) => {
      return await context.dispatch("POST", {
        url: `shoppers/${context.state.user.id}/reactions`,
        mutation: "ADD_LIKE_REACTION",
        jsonBody: {
          userId: context.state.user.id,
          shopId: shop.id,
          likedAt: new Date().toISOString()
        }
      });
    }
  }
};
