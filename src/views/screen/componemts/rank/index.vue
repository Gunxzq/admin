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
      text: '景区排行',
      link: 'http://www.baidu.com',
      left: '50%',
      textStyle: {
        color: 'white',
        fontSize: 20,
      },
      subtext: '各大景区',
      subtextStyle: {
        color: 'white',
        fontSize: 16,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        label: {
          show: true,
          position: 'insideTop',
          color: 'white',
        },
        showBackground: true,
        backgroundStyle: {
          // color: '#ccc',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'blue',
              },
            ],
            global: false,
          },
        },
        itemStyle: {
          borderRadius: [10, 5, 0, 0],
          color: function (data: any) {
            let arr = ['red', 'orange', 'yellowgreen', 'purple', 'hotpink', 'skyblue'];
            return arr[data.dataIndex];
          },
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true,
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
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
