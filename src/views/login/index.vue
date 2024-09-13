<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到xxxx</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password type="password" :prefix-icon="Lock" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-button class="login_btn" type="primary" size="default" @click="login" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Message } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '../../utils/time';

let loginForm = reactive({ username: 'admin', password: '123456' });

let useStore = useUserStore();

let $router = useRouter();
// loading为true时，按钮不可点击，防止多次请求
let loading = ref(false);

let loginForms = ref();

// 通知仓库登录
const login = async () => {
  await loginForms.value.validate();

  loading.value = true;
  try {
    await useStore.userLogin(loginForm);
    $router.push('/');
    ElNotification({
      type: 'success',
      message: '欢迎回来' + loginForm.username,
      title: `HI,${getTime()}好`,
    });
    loading.value = false;
  } catch (error) {
    useStore.state = true;
    loading.value = false;
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    });
  }
};
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('长度至少五位'));
  }
};
// blus失去焦点，change文本发生变化
const rules = {
  username: [
    // {required:true,message:'用户名不能为空',trigger:'blur',validator:validatorUserName}
    { required: true, trigger: 'change', validator: validatorUserName },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      required: true,
      min: 6,
      max: 10,
      message: '密码长度应为6到10位',
      trigger: 'change',
    },
  ],
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
