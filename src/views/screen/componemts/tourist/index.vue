<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>ds</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="item in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';

let people = ref('216908人');

let charts = ref();

onMounted(() => {
  let mycharts = echarts.init(charts.value);

  mycharts.setOption({
    title: {
      text: '水球图',
    },
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      waveAnimation: true,
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '80%',
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'red',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.25)',
        },
      },
    },
  });
});
</script>
<script lang="ts">
export default {
  name: 'Tourist',
};
</script>

<style scoped lang="scss">
.box {
  background: url(../../../../../public/index.png);
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../../../../public/index.png);
      background-size: 100% 100%;
    }
    .right {
      float: right;
      color: white;
      span {
        color: yellow;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 20px;
    span {
      height: 40px;
      flex: 1;
      text-align: center;
      line-height: 40px;
      background: url(../../../../../public/index.png);
      background-size: 100% 100%;
      color: white;
    }
  }
  .charts {
    width: 100%;
    height: 240px;
  }
}
</style>
