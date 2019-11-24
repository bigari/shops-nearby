<template>
  <div class="home">
    <div v-if="isBooting">
      <loading caption="Booting" />
    </div>
    <div v-else-if="error">
      <vertical-center>
        <v-row>
          <div class="mx-auto text-center text-error">
            <p class="mt-4 caption">{{ error }}</p>
          </div>
        </v-row>
      </vertical-center>
    </div>
    <div v-else>
      <v-app>
        <v-app-bar app elevation="0">
          <v-spacer></v-spacer>
          <v-btn text to="/" class="no-deco" color="blue">Nearby Shops</v-btn>
          <v-btn text to="/preferences" class="no-deco" color="blue"
            >My preferred Shops</v-btn
          >
        </v-app-bar>
        <v-content>
          <v-container fluid>
            <router-view />
          </v-container>
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
  name: "home",
  components: {
    Loading
  },
  data: () => ({
    isBooting: true,
    error: null
  }),
  methods: {
    async boot() {
      await this.$store.dispatch("QUERY_CURRENT_POSITION");
      await this.loadShopCategories();
      this.isBooting = false;
    },

    async loadShopCategories() {
      const response = await this.$store.dispatch("FETCH_CATEGORIES");
      if (response.hasError) {
        this.error = "Error connecting to the server";
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.boot();
  }
};
</script>
