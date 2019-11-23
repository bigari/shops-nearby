<template>
  <div class="home">
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
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
