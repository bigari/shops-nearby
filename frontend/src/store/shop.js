import { calcDistance } from "../utils/geoutil";

//Shop is displayable if it has not been disliked
// in the previous 2 hours

const anHourInMillisecs = 60 * 60 * 1000;

const isShopDisplayable = shop => {
  if (!shop.reaction || !shop.reaction.dislikedAt) {
    return true;
  }
  const now = new Date();
  const dislikedAt = new Date(shop.reaction.dislikedAt);
  return (now - dislikedAt) / anHourInMillisecs > 2;
};

export const Shop = {
  getters: {
    likedShops: state => {
      return [...state.shops].filter(
        shop =>
          shop.reaction && shop.reaction.likedAt && isShopDisplayable(shop)
      );
    },
    /**
     * Return sorted shops by distance
     * The shops returned should have to be liked
     */
    likedSortedShops: (state, getters) => {
      if (state.currentPosition === null) {
        return getters.likedShops;
      }
      return getters.likedShops.sort((a, b) => b.distance < a.distance);
    },
    /**
     * Return shops that have no current likes
     */
    unlikedShops: state => {
      return [...state.shops].filter(
        shop =>
          !shop.reaction || (!shop.reaction.likedAt && isShopDisplayable(shop))
      );
    },
    /**
     * Return sorted shops by distance
     * The shops returned should have to not be liked
     */
    unlikedSortedShops: (state, getters) => {
      if (state.currentPosition === null) {
        return getters.unlikedShops;
      }
      return getters.unlikedShops.sort((a, b) => b.distance < a.distance);
    }
  },
  mutations: {
    /**
     * Set current position in state and compute for each shop
     * location the distance between them
     */
    SET_CURRENT_POSITION: (state, position) => {
      state.currentPosition = position;
      let shops = [...state.shops];

      shops.forEach(shop => {
        shop.distance = calcDistance(position, shop.location);
      });

      state.shops = shops;
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
  }
};
