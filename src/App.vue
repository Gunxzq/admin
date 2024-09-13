<template>
  <Error></Error>
  <router-view :class="userStore.state ? 'error' : ''"></router-view>
</template>

<script setup lang="ts">
import Error from './components/Error/index.vue';
import useUserStore from './store/modules/user';
let userStore = useUserStore();
</script>
<style lang="scss" scoped>
.error {
  filter: url(#error);
}
</style>
