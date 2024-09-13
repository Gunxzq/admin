<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../../../../public//logo.png" alt="" />
      <div class="sex">
        <div class="man">
          <img src="../../../../../public//logo.png" alt="" />
        </div>
        <div class="women">
          <img src="../../../../../public//logo.png" alt="" />
        </div>
      </div>
      <div class="rate">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
      <div class="charts" ref="charts"></div>
    </div>
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
      text: '男女比例',
      textStyle: {
        color: 'skyblue',
      },
      left: '40%',
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>
<script lang="ts">
export default {
  name: 'Sex',
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../../../../public/index.png);
  background-size: 100% 100%;
  margin: 20px 0px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
    img {
      width: 100px;
      height: 50px;
    }
    .sex {
      display: flex;
      justify-content: center;
      .man {
        margin: 20px;
        width: 110px;
        height: 115px;
        background: url(../../../../../public/index.png) no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
        }
      }
      .women {
        margin: 20px;
        width: 110px;
        height: 115px;
        background: url(../../../../../public/index.png) no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .rate {
      display: flex;
      justify-content: space-between;
      color: white;
    }
    .charts {
      height: 100px;
    }
  }
}
</style>
