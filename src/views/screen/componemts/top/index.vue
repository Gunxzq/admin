<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import moment from 'moment';

let $router = useRouter();

let time = ref(moment().format('YYYY年-MM月-DD日:hh-mm-ss'));

let timer = ref(0);

const goHome = () => {
  $router.push('/home');
};

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年-MM月-DD日:hh-mm-ss');
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>
<script lang="ts">
export default {
  name: 'Top',
};
</script>
<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1.5;
    background: url(../../../../../public/index.png) no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      background: url(../../../../../public/index.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../../../../public/index.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .right {
    flex: 1.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../../../../public/index.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;

      color: #29fcff;
    }
    .time {
      background: url(../../../../../public/index.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      margin-right: 10px;
    }
  }
}
</style>
