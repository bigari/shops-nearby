<template>
  <div>
    <v-card outlined max-width="300">
      <v-card-title>
        <span>{{ shop.name }}</span>
        <v-spacer />
        <v-icon>{{ icon }}</v-icon>
      </v-card-title>
      <a :href="locationUrl" target="blank" class="no-deco">
        <v-img
          class="white--text align-end font-weigth-bold title"
          height="180px"
          :src="shop.thumbnailUrl"
        >
          <v-overlay absolute v-if="shop.distance" opacity="0.6">
            <p class="mx-2">{{ shop.distance.toFixed(2) }} Km</p>
          </v-overlay>
        </v-img>
      </a>
      <v-card-subtitle v-if="shop.distance"></v-card-subtitle>
      <v-card-actions>
        <slot />
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
    },
    locationUrl() {
      return `https://www.google.com/maps/search/?api=1&query=${this.shop.location.lat},${this.shop.location.lng}`;
    }
  }
};
</script>
