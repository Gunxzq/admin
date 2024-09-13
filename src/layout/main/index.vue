<template>
  <!-- slot将相应组件注入slot -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import useLayOutSettingStore from '../../store/modules/setting';

let flag = ref(true);

let LayOutSettingStore = useLayOutSettingStore();

watch(
  () => LayOutSettingStore.refsh,
  () => {
    flag.value = false;
    // nextTick 当响应式数据变化时（dom更新），执行回调函数
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: 'Main',
};
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
