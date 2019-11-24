<template>
  <div class="preferred-shops ma-4">
    <v-row v-if="shops.length>0">
      <v-col lg="3" md="4" sm="6" xs="12" v-for="shop in shops" :key="shop.id">
        <div class="ma-2">
          <shop-card class="ma-4" :shop="shop">
            <v-spacer/>
            <v-btn text color="red darken-1">Remove</v-btn>
            <v-spacer/>
          </shop-card>
        </div>
      </v-col>
    </v-row>
    <vertical-center v-else>
      <v-row>
        <div class="mx-auto text-center">
          <v-icon>fa-folder-open</v-icon>
          <p class="mt-4">You have not liked any shops yet</p>
        </div>
      </v-row>
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

  computed: {
    shops() {
      if (this.$store.state.position) {
        return this.$store.getters.likedSortedShops;
      }
      return this.$store.getters.likedShops;
    }
  },
};
</script>
