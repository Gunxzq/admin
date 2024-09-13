<template>
  <div class="box">
    <div class="title">
      <p>年龄比例</p>
      <!-- <img src="../../../../../public//logo.png" alt="" /> -->
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let charts = ref();

onMounted(() => {
  let mycharts = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 40,
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 10,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'inside',
          color: 'white',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };
  mycharts.setOption(option);
});
</script>
<script lang="ts">
export default {
  name: 'Age',
};
</script>

<style scoped lang="scss">
.box {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
