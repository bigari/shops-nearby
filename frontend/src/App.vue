<template>
  <router-view />
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.no-deco {
  text-decoration: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0.7, 0.7);
}
</style>
