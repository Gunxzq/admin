<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          :collapse="LayOutSettingStore.fold"
          :default-active="$router.path"
          active-text-color="yellow">
          <Menu :menuList="useStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue';
import Menu from './menu/index.vue';
import Tabbar from './tabbar/index.vue';
import Main from './main/index.vue';
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '../store/modules/setting';
import useUserStore from '@/store/modules/user';
import { onBeforeMount } from 'vue';
let useStore = useUserStore();

let LayOutSettingStore = useLayOutSettingStore();

let $router = useRoute();

onBeforeMount(async () => {
  try {
    await useStore.getUerInfo();
  } catch (error) {
    console.log(error);
  }
});
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
};
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;
  .layout_slider {
    color: rgb(14, 2, 19);
    width: $base-menu_width;
    height: 100vh;
    background-color: $base-menu_background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-Logo-height);
      .el-menu {
        border-right: none;
      }
    }
    // 如果包含这个属性
    &.fold {
      transition: all 0.5s;
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    top: 0%;
    left: $base-menu_width;
    position: fixed;
    width: calc(100% - $base-menu_width);
    height: $base-tabbar-height;
    &.fold {
      transition: all 0.5s;
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    left: $base-menu_width;
    top: $base-tabbar-height;
    position: absolute;
    width: calc(100% - $base-menu_width);
    height: calc(100vh - $base-tabbar-height);
    overflow-y: scroll;
    &.fold {
      transition: all 0.5s;
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
