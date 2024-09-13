<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.icon"
      :to="item.path">
      <el-icon style="margin: 0px 5px; vertical-align: middle">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 行内元素居中vertical-align: middle; -->
      <span style="margin: 0px 5px; vertical-align: middle">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
let $route = useRoute();
let LayOutSettingStore = useLayOutSettingStore();

const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: 'BreakCrumb',
};
</script>
<style scoped></style>
