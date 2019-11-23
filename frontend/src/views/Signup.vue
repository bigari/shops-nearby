<template>
  <div class="signup">
    <vertical-center>
      <v-alert
        v-if="error"
        class="mb-4"
        border="right"
        colored-border
        type="error"
        elevation="2"
        >{{ error }}</v-alert
      >
      <v-card class="elevation-3">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title class="headline">Signup Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field
              label="Email"
              v-model="email"
              name="email"
              :rules="[rules.required, rules.emailFormat]"
              prepend-icon="person"
              type="text"
            />
            <v-text-field
              label="Password"
              v-model="password"
              name="password"
              :rules="[rules.required, rules.min]"
              prepend-icon="lock"
              type="password"
            />
            <v-text-field
              label="Confirm Password"
              name="confirm-password"
              :rules="[passwordMatchingRule]"
              prepend-icon="lock"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" :disabled="!isValid" @click.native="signup"
            >Signup</v-btn
          >
        </v-card-actions>
      </v-card>
      <div class="d-flex mt-4">
        <p class="mx-auto title font-weight-regular mt-2">
          Already have an account?
          <router-link to="/signin" class="no-deco">Signin</router-link>
        </p>
      </div>
    </vertical-center>
  </div>
</template>

<script>
import { rules } from "@/utils/rules";
import VerticalCenter from "@/components/VerticalCenter";

export default {
  name: "signup",
  components: {
    VerticalCenter
  },
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
    passwordMatchingRule(value) {
      return value === this.password || "Password should match";
    },
    async signup() {
      if (!this.isValid) {
        return;
      }
      const response = await this.$store.dispatch("SIGNUP", {
        email: this.email,
        password: this.password
      });
      if (!response.hasError) {
        this.error = "";
        this.$router.push("/");
        return;
      }
      if (response.error.statusCode === 422) {
        this.error = "Sorry this email is already in use";
      } else {
        this.error = "Error connecting to the server";
      }
    }
  }
};
</script>
