<template>
  <div class="signin">
    <v-app>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-3">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title class="headline"
                    >Signin Form</v-toolbar-title
                  >
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Email"
                      name="email"
                      prepend-icon="person"
                      type="text"
                    />
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary">Signin</v-btn>
                </v-card-actions>
              </v-card>
              <div class="d-flex mt-4">
                <p class="mx-auto title font-weight-regular mt-2">
                  Don't have an account yet?
                  <router-link to="/signup" class="no-deco">Signup</router-link>
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "signin"
};
</script>
