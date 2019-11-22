<template>
  <div class="signup">
    <v-app>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-3">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title class="headline"
                    >Signup Form</v-toolbar-title
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
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                    />
                    <v-text-field
                      label="Confirm Password"
                      name="confirm-password"
                      prepend-icon="lock"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary">Signup</v-btn>
                </v-card-actions>
              </v-card>
              <div class="d-flex mt-4">
                <p class="mx-auto title font-weight-regular mt-2">
                  Already have an account?
                  <router-link to="/signin" class="no-deco">Signin</router-link>
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
  name: "signup"
};
</script>
