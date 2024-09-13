<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" :disabled="!keyword" @click="search">搜索</el-button>
        <el-button type="primary" size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
    <el-button type="primary" size="default" :disabled="selectIdArr.length ? false : true" @click="deleteSelectUser">批量删除</el-button>
    <el-table :data="userArr" @selection-change="selectChange" style="margin: 10px 0px">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名字" align="center" prop="username"></el-table-column>
      <el-table-column label="用户名称" align="center" prop="name"></el-table-column>
      <el-table-column label="用户职位" align="center" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center" width="400px">
        <template #="{ row, index }">
          <el-button type="primary" size="default" icon="user" @click="setRole(row)">分配角色</el-button>
          <el-button type="primary" size="default" icon="edit" @click="editUser(row)">编辑</el-button>
          <el-popconfirm :title="`确定删除${row.username}?`" width="260px" @confirm="deleteUser(row.id)">
            <template #reference>
              <el-button type="primary" size="default" icon="delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="400"
      :background="true"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      @change="getHasUser"></el-pagination>
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="form">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input placeholder="请输入用户名称" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer2">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input disabled :value="userParams.name"></el-input>
        </el-form-item>
        <!-- 多选 -->
        <el-form-item label="角色列表">
          <el-checkbox @change="handleCheckAllchange" :indeterminate="isInderminate" v-model="checkAll">全选</el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(role, index) in allRole" :key="role.id" :label="role">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="Rolecancel">取消</el-button>
      <el-button type="primary" @click="Rolesave">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqUserInfo, reqAddOrUpdate, reqAllRole, reqSetUserRole, reqDelete, reqDeleteAll } from '@/api/acl/user';
import { ref, onMounted, nextTick, reactive, watch } from 'vue';
import type { AllRole, UserResponseData, user, ResponseData, roleReponseData } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';

let form = ref();

let LayOutSettingStore = useLayOutSettingStore();

let selectIdArr = ref<Number[]>([]);

let pageNo = ref<Number>(1);

let pageSize = ref<Number>(10);

let userArr = ref<user[]>([]);

let drawer = ref<boolean>(false);

let drawer2 = ref<boolean>(false);

let keyword = ref<String>('');

//多选框的状态
let checkAll = ref<boolean>(false);

let allRole = ref<AllRole>([]);
let userRole = ref<AllRole>([]);

// 多选框的默认状态
let isInderminate = ref<boolean>(true);

const validatorUsername = (rule: any, value: any, callBack: any) => {
  // 删除空白符
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error('用户名至少为五位'));
  }
};

const validatorname = (rule: any, value: any, callBack: any) => {
  // 删除空白符
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error('用户昵称至少为五位'));
  }
};

const validatorPassword = (rule: any, value: any, callBack: any) => {
  // 删除空白符
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error('用户密码至少为六位'));
  }
};

const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  paswword: [{ required: true, trigger: 'blur', validator: validatorPassword }],
};

let userParams = reactive<user>({
  username: '',
  name: '',
  password: '',
});

const cancel = () => {
  drawer.value = false;
};

const Rolecancel = () => {
  drawer2.value = false;
};

const save = async () => {
  await form.value.validate();
  let res: ResponseData = await reqAddOrUpdate(userParams.value);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' });
    drawer.value = false;
    pageNo.value = userParams.id ? pageNo.value : 1;
    getHasUser();
    // 内容变更，刷新页面
    window.location.reload();
  } else {
    ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' });
    drawer.value = false;
  }
};

const deleteUser = async (id: Number | String) => {
  let res = await reqDelete(id);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' });
  } else {
    ElMessage({ type: 'error', message: '删除失败' });
  }
};

const Rolesave = async () => {
  let data = {
    userId: userParams.id as Number | String,
    roleIdList: userRole.value.map(item => {
      return item.id as Number | String;
    }),
  };
  let res = await reqSetUserRole(data);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '更新成功' });
    drawer2.value = false;
    let index: any = userArr.value.findIndex(item => item.id == userParams.id);
    console.log(index);
    userArr.value[index].roleName = userRole.value.map(item => item.roleName).toString();
  } else {
    ElMessage({ type: 'error', message: '更新失败' });
  }
};

const setRole = async (row: user) => {
  drawer2.value = true;
  Object.assign(userParams, row);
  userParams.id = row.id;
  let res: roleReponseData = await reqAllRole(row.id as Number | String);
  if (res.code == 200) {
    allRole.value = res.data.allRolesList;
    userRole.value = res.data.assignRoles;
  }
};

const editUser = (row: user) => {
  drawer.value = true;
};

const addUser = () => {
  drawer.value = true;
  Object.assign(userParams, {
    id: '',
    username: '',
    name: '',
    password: '',
  });
  nextTick(() => {
    form.value.clearValidate('username');
    form.value.clearValidate('name');
    form.value.clearValidate('password');
  });
};

const getHasUser = async () => {
  let res: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
  if (res.code == 200) {
    userArr.value = res.data.record;
  }
};

onMounted(() => {
  getHasUser();
});

const selectChange = (value: any) => {
  selectIdArr.value = value;
};

const deleteSelectUser = async () => {
  selectIdArr.value = selectIdArr.value.map(item => {
    return item.id;
  });
  let res = await reqDeleteAll(selectIdArr.value);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' });
  } else {
    ElMessage({ type: 'error', message: '删除失败' });
  }
};

const handleCheckAllchange = (value: boolean) => {
  userRole.value = value ? allRole.value : [];
  isInderminate.value = false;
};

const handleCheckedCitiesChange = (value: String) => {
  console.log(value);
  isInderminate.value = allRole.value.length == value.length;
};

const search = () => {
  getHasUser();
  keyword.value = '';
};

const reset = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh;
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
