<template>
  <el-button size="small" type="primary" icon="Refresh" circle @click="refsh"></el-button>
  <el-button size="small" type="primary" icon="FullScreen" circle @click="FullScreen"></el-button>

  <el-popover placement="bottom" :width="300" trigger="hover" title="主题设置">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker style="margin: 0" @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" active-icon="MoonNight" inline-prompt inactive-icon="Sunny"></el-switch>
      </el-form-item>
    </el-form>

    <template #reference>
      <el-button size="small" type="primary" icon="Setting" circle @click="setting"></el-button>
    </template>
  </el-popover>

  <img :src="UserStore.avater" alt="" style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 10px" />
  <el-dropdown>
    <span>
      {{ UserStore.username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        <el-dropdown-item></el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLayOutSettingStore from '../../../store/modules/setting';
import useUserStore from '../../../store/modules/user';
import { useRouter, useRoute } from 'vue-router';

let router = useRouter();

let UserStore = useUserStore();

let LayOutSettingStore = useLayOutSettingStore();

let dark = ref<boolean>(false);

let refsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh;
};

let color = ref('rgba(255,69,0,0.68)');

const predefineColors = ref(['#ff4500', '#ff8c00', '#ffd700']);

const changeDark = () => {
  let html = document.documentElement;
  dark.value ? (html.className = 'dark') : (html.className = '');
};

const setColor = () => {
  let html = document.documentElement;
  html.style.setProperty('--e-color-primary', color.value);
};

const FullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const logout = () => {
  // 对服务器发请求
  UserStore.userLoginout();
  router.push('/login');
};

const setting = () => {};
</script>
<script lang="ts">
export default {
  name: 'Setting',
};
</script>
<style scoped></style>
