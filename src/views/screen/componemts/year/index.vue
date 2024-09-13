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
      text: '散点图',
      left: '40%',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 0,
      top: 0,
      bottom: 20,
      right: 0,
    },
    series: [
      {
        type: 'scatter',
        data: [10, 20, 30, 40, 50, 60, 8, 22, 33, 35, 31],
        symbol: 'arrow',
        symbolSize: 16,
        label: {
          show: true,
          position: 'top',
          color: 'white',
        },
        itemStyle: {
          color: 'white',
        },
      },
    ],
  });
});
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
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
