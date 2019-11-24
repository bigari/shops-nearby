<template>
  <div>
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
      <router-view />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  name: "App",
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

<style>
.no-deco {
  text-decoration: none;
}
</style>
