<template>
  <el-card style="margin: 10px; height: 150px">
    <div class="box">
      <img :src="userStore.avater" class="avter" />
      <div class="bootom">
        <h3 class="title">{{ getTime() }} 好 {{ userStore.username }}</h3>
        <p class="subtitle">xx运营平台</p>
      </div>
    </div>
    <div class="bottom">
      <SvgIcon name="welcome" width="500px" height="500px"></SvgIcon>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';

let userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .avter {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bootom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 20px;
    }
    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
