<template>
  <div class="box">
    <div class="title">
      <p>热门景区排行</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let charts = ref();

onMounted(() => {
  let myecharts = echarts.init(charts.value);
  myecharts.setOption({
    title: {
      text: '游客的消费数据',
      color: 'white',
    },
  });
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  // 上下20px
  margin: 20px 0px;
  .title {
    margin-left: 10px;
    p {
      color: white;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
