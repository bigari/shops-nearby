<template>
  <div class="signin">
    <v-app>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-alert
                v-if="error"
                class="mb-4"
                border="right"
                colored-border
                type="error"
                elevation="2"
              >{{ error }}</v-alert>
              <v-card class="elevation-3">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title class="headline">Signin Form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="isValid">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      :rules="[rules.required]"
                      name="email"
                      prepend-icon="person"
                      type="text"
                    />
                    <v-text-field
                      v-model="password"
                      :rules="[rules.required]"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" :disabled="!isValid" @click.native="signin">Signin</v-btn>
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
import { rules } from "@/utils/rules";

export default {
  name: "signin",
  data() {
    return {
      error: "",
      isValid: true,
      email: "",
      password: "",
      rules: rules
    };
  },
  methods: {
    async signin() {
      if (!this.isValid) {
        return;
      }
      const response = await this.$store.dispatch("SIGNIN", {
        email: this.email,
        password: this.password
      });
      if (response === false) {
        this.error = "";
        this.$router.push("/");
        return;
      }
      if (response.error.statusCode === 401) {
        this.error = "Login failed: Email or password incorrect";
      } else {
        this.error = "Error connecting to the server";
      }
    }
  }
};
</script>
