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
          shop.reaction = {
            likedAt: reaction.likedAt,
            dislikedAt: reaction.dislikedAt,
            id: reaction.id
          };
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
      const shop = shops.find(shop => shop.id === reaction.shopId);
      if (shop === undefined) {
        return;
      }
      shop.reaction = {
        likedAt: reaction.likedAt,
        dislikedAt: reaction.dislikedAt,
        id: reaction.id
      };

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

    LIKE_SHOP: async (context, shop) => {
      const jsonBody = {
        userId: context.state.user.id,
        shopId: shop.id,
        likedAt: new Date().toISOString()
      };
      if (shop.reaction === undefined) {
        //No reactions has ever been made
        return await context.dispatch("POST", {
          url: `shoppers/${context.state.user.id}/reactions`,
          mutation: "UPDATE_REACTION",
          jsonBody: jsonBody
        });
      }
      return await context.dispatch("PUT", {
        url: `shoppers/${context.state.user.id}/reactions/${shop.reaction.id}`,
        mutation: "UPDATE_REACTION",
        jsonBody: {
          ...jsonBody,
          dislikedAt:
            shop.reaction.dislikedAt === undefined
              ? null
              : shop.reaction.dislikedAt
        }
      });
    },
    DISLIKE_SHOP: async (context, shop) => {
      const jsonBody = {
        userId: context.state.user.id,
        shopId: shop.id,
        dislikedAt: new Date().toISOString()
      };
      if (shop.reaction === undefined) {
        //No reactions has ever been made
        return await context.dispatch("POST", {
          url: `shoppers/${context.state.user.id}/reactions`,
          mutation: "UPDATE_REACTION",
          jsonBody: jsonBody
        });
      }
      return await context.dispatch("PUT", {
        url: `shoppers/${context.state.user.id}/reactions/${shop.reaction.id}`,
        mutation: "UPDATE_REACTION",
        jsonBody: {
          ...jsonBody,
          likedAt:
            shop.reaction.likedAt === undefined ? null : shop.reaction.likedAt
        }
      });
    },
    REMOVE_LIKE_SHOP: async (context, shop) => {
      if (shop.reaction === undefined || !shop.reaction.likedAt) {
        //Nothing to remove
        return {
          hasError: true,
          error: { statusCode: 400, message: "Nothing to remove" }
        };
      }
      return await context.dispatch("PUT", {
        url: `shoppers/${context.state.user.id}/reactions/${shop.reaction.id}`,
        mutation: "UPDATE_REACTION",
        jsonBody: {
          userId: context.state.user.id,
          shopId: shop.id,
          likedAt: null,
          dislikedAt:
            shop.reaction.dislikedAt === undefined
              ? null
              : shop.reaction.dislikedAt
        }
      });
    }
  }
};
