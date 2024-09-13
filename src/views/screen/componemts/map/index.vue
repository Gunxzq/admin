<template>
  <div class="box" ref="map"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import chinaJson from './china.json';

let map = ref();

echarts.registerMap('china', chinaJson as any);
onMounted(() => {
  let myecharts = echarts.init(map.value);
  myecharts.setOption({
    geo: {
      zoom: 1.5,
      map: 'china',
      show: true,
      // 缩放
      roam: true,
      top: 200,
      label: {
        show: true,
        color: 'white',
        // rotate
      },
      itemStyle: {
        color: 'skyblue',
        // opacity: 0.8,
        fontSize: 16,
        // areaColor,
      },
      // 高亮
      emphasis: {
        itemStyle: {
          color: 'white',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    // 布局
    grid: {
      left: 0,
      right: 0,
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [119.306239, 26.075302],
            ],
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        effect: {
          show: true,
          // 可换成svg
          symbol: 'arrow',
          color: 'red',
          symbolSize: 10,
        },
      },
    ],
  });
});
</script>
<script lang="ts">
export default {
  name: 'Map',
};
</script>

<style scoped lang="scss"></style>
