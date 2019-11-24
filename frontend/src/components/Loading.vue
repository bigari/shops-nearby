<template>
  <vertical-center>
    <v-row>
      <div class="mx-auto text-center">
        <v-progress-circular
          indeterminate
          color="green"
          :size="48"
          class="mb-4"
        />
        <p class="mt-4 caption">{{ caption }}</p>
      </div>
    </v-row>
  </vertical-center>
</template>
<script>
import VerticalCenter from "@/components/VerticalCenter";

export default {
  name: "loading",
  props: {
    caption: String
  },
  components: {
    VerticalCenter
  }
};
</script>
