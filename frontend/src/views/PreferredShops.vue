<template>
  <div class="preferred-shops ma-4">
    <transition-group
      name="list"
      tag="div"
      class="layout row wrap"
      v-if="shops.length > 0"
    >
      <v-col lg="3" md="4" sm="6" xs="12" v-for="shop in shops" :key="shop.id">
        <div class="ma-2">
          <shop-card class="ma-4" :shop="shop">
            <v-spacer />
            <v-btn text color="red darken-1" @click="removeShop(shop)"
              >Remove</v-btn
            >
            <v-spacer />
          </shop-card>
        </div>
      </v-col>
    </transition-group>
    <vertical-center v-else>
      <v-row>
        <div class="mx-auto text-center">
          <v-icon large class="mb-4">fa-folder-open</v-icon>
          <p class="mt-4 headline">You have not liked any shops yet</p>
        </div>
      </v-row>
      <v-snackbar v-model="snackbar">
        {{ info }}
        <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </vertical-center>
  </div>
</template>

<script>
import VerticalCenter from "@/components/VerticalCenter";
import ShopCard from "@/components/shop/ShopCard";

export default {
  name: "preferred-shops",
  components: {
    ShopCard,
    VerticalCenter
  },

  data() {
    return {
      snackbar: false,
      info: ""
    };
  },

  methods: {
    async removeShop(shop) {
      const response = await this.$store.dispatch("REMOVE_LIKE_SHOP", shop);
      this.snackbar = true;
      if (response.hasError) {
        this.info = "Error removing the shop";
      } else {
        this.info = "Shop removed from preferences";
      }
    }
  },

  computed: {
    shops() {
      if (this.$store.state.position) {
        return this.$store.getters.likedSortedShops;
      }
      return this.$store.getters.likedShops;
    }
  }
};
</script>
