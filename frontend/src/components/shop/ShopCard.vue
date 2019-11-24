<template>
  <div>
    <v-card outlined max-width="300">
      <v-card-title>
        <span>{{shop.name}}</span>
        <v-spacer/>
        <v-icon>{{ icon }}</v-icon>
      </v-card-title>
      <v-img class="white--text align-start" height="180px" :src="shop.thumbnailUrl"></v-img>
      <v-card-actions>
        <slot/>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "shop-card",
  props: {
    shop: Object
  },
  data() {
    return {
      faIcons: {
        food: "fa-carrot",
        clothing: "fa-tshirt",
        toys: "fa-gamepad",
        cosmetics: "fa-paint-brush"
      }
    };
  },
  computed: {
    icon() {
      return this.faIcons[this.shop.category] || "fa-store";
    }
  }
};
</script>
