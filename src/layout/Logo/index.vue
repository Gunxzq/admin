<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" :alt="setting.title" />
    <p style="white-space: nowrap">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>
<script lang="ts">
export default {
  name: 'Logo',
};
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-Logo-height;
  display: flex;
  color: white;
  align-items: center;
  padding: 15px;
  img {
    width: 30px;
    height: 30px;
  }
  p {
    margin-left: 10px;
    font-size: $base-Logo-title-fontSize;
  }
}
</style>
