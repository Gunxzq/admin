<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bootom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Conter class="conter"></Conter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './componemts/top/index.vue';
import Tourist from './componemts/tourist/index.vue';
import Age from './componemts/Age/index.vue';
import Sex from './componemts/Sex/index.vue';
import Map from './componemts/map/index.vue';
import Line from './componemts/line/index.vue';
import Rank from './componemts/rank/index.vue';
import Year from './componemts/year/index.vue';
import Conter from './componemts/conter/index.vue';
import { ref, onMounted } from 'vue';

let screen = ref();

// 缩放比例
function getScale(w = 1912, h = 963) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(../../../public/980.jpg);
  background-size: cover;
  .screen {
    width: 1912px;
    height: 963px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bootom {
      display: flex;

      .left {
        flex: 1;
        height: 900px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .conter {
          flex: 1;
        }
      }
    }
  }
}
</style>
