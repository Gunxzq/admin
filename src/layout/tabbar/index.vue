<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <BreakCrumb></BreakCrumb>
    </div>
    <div class="tabb_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreakCrumb from './breakcrumb/index.vue';
import Setting from './setting/index.vue';
</script>
<script lang="ts">
export default {
  name: 'Layout',
};
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-image: linear-gradient(to right,rgb(209, 207, 238),rgb(221, 216, 236),rgb(222, 197, 231));
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabb_right {
    display: flex;
    // background-color: skyblue;
    align-items: center;
  }
}
</style>
