<template>
  <div class="box">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <!-- <img src="" alt=""> -->
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
  mycharts.setOption({
    title: {
      text: '访问量',
    },
    series: [
      {
        type: 'line',
        data: [120, 240, 1200, 66, 99, 321, 120],
        // 平滑曲线
        smooth: true,
        // 填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'red' },
              { offset: 1, color: 'blue' },
            ],
            global: false,
          },
        },
      },
    ],
    xAxis: {
      // 均匀分布
      type: 'category',
      // 留白
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['1', '2', '3', '4', '5', '6', '7'],
      //轴线设置
      axisLine: {
        show: true,
      },
      // 刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线设置
      axisLine: {
        show: true,
      },
      // 刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      top: 0,
      left: 40,
      right: 0,
      bottom: 20,
    },
  });
});
</script>
<script lang="ts">
export default {
  name: 'Line',
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  margin: 0px 20px;
  background: url(../../../../../public/980.jpg);
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>
