<template>
  <div v-if="isLoading">
    <loading caption="Fetching Shops" />
  </div>
  <div v-else-if="error">
    <vertical-center>
      <v-row>
        <div class="mx-auto text-center">
          <v-icon>fa-exclamation-circle</v-icon>
          <p class="mt-4">{{ error }}</p>
        </div>
      </v-row>
    </vertical-center>
  </div>
  <div class="shops ma-4" v-else>
    <v-row>
      <v-col lg="3" md="4" sm="6" xs="12" v-for="shop in shops" :key="shop.id">
        <div class="ma-2">
          <shop-card class="ma-4" :shop="shop">
            <v-btn text color="red darken-1" @click="dislikeShop(shop)"
              >Dislike</v-btn
            >
            <v-spacer />
            <v-btn text color="green darken-1" @click="likeShop(shop)"
              >Like</v-btn
            >
          </shop-card>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ info }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import VerticalCenter from "@/components/VerticalCenter";
import ShopCard from "@/components/shop/ShopCard";

export default {
  name: "shops",
  components: {
    Loading,
    ShopCard,
    VerticalCenter
  },
  data() {
    return {
      isLoading: true,
      error: null,
      snackbar: false,
      info: ""
    };
  },

  methods: {
    async fetchShops() {
      const response = await this.$store.dispatch("FETCH_SHOPS");
      if (response.hasError) {
        this.error = "Error connecting to the server";
        return;
      }
      await this.fetchReactions();
      this.isLoading = false;
    },

    async fetchReactions() {
      const response = await this.$store.dispatch("FETCH_REACTIONS");
      if (response.hasError) {
        this.error = "Error connecting to the server";
        return;
      }
    },

    async likeShop(shop) {
      const response = await this.$store.dispatch("LIKE_SHOP", shop);
      this.snackbar = true;
      if (response.hasError) {
        this.info = "Error liking the shop";
      } else {
        this.info = "Shop added to preferences";
      }
    },
    async dislikeShop(shop) {
      const response = await this.$store.dispatch("DISLIKE_SHOP", shop);
      this.snackbar = true;
      if (response.hasError) {
        this.info = "Error disliking the shop";
      } else {
        this.info = "Shop disliked";
      }
    }
  },

  computed: {
    shops() {
      if (this.$store.state.position) {
        return this.$store.getters.unlikedSortedShops;
      }
      return this.$store.getters.unlikedShops;
    }
  },

  mounted() {
    if (this.shops.length == 0) {
      this.fetchShops();
    } else {
      this.isLoading = false;
    }
  }
};
</script>
