<template>
  <el-table :data="permissionArr" row-key="id" style="width: 100%; margin-bottom: 20px">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="createTime"></el-table-column>
    <el-table-column label="操作" width="400px">
      <template #="{ row, index }">
        <el-button type="primary" size="default" @click="setMenu(row)" :disabled="row.level == 4">
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button type="primary" size="default" @click="editMenu(row)" :disabled="row.level == 1">编辑</el-button>
        <el-popconfirm :title="`确定删除${row.name}?`" width="260px" @confirm="deleteMenu(row.id)">
          <template #reference>
            <el-button type="primary" size="default" :disabled="row.level == 1">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisable" :title="permissionParams.id ? '更新菜单' : '添加菜单'">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入菜单名称" v-model="permissionParams.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请输入权限名称" v-model="permissionParams.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" @click="dialogVisable = false">取消</el-button>
      <el-button type="primary" size="small" @click="save">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { PermissionResponseData, MenuParams, permissionList, Permission } from '@/api/acl/menu/type';
import { ref, onMounted, reactive } from 'vue';
import { reqAllPermission, reqRemoveMenu } from '@/api/acl/menu/index';
import { reqAddOrUpdate } from '@/api/acl/menu';
import { ElMessage } from 'element-plus';

let permissionArr = ref<permissionList>([]);

let dialogVisable = ref<boolean>(false);

let permissionParams = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
});

const getHasMenu = async () => {
  let res: PermissionResponseData = await reqAllPermission();
  if (res.code == 200) {
    permissionArr.value = res.data;
  }
};

onMounted(() => {
  getHasMenu();
});

const setMenu = (row: Permission) => {
  dialogVisable.value = true;
  Object.assign(permissionParams, { code: '', level: 0, name: '', pid: 0 });
  permissionParams.pid = row.id;
  permissionParams.level = (row.level as number) + 1;
};

const deleteMenu = async (id: Number | String) => {
  let res = await reqRemoveMenu(id);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasMenu();
  } else {
    ElMessage({ type: 'success', message: '删除失败' });
  }
};

const editMenu = (row: Permission) => {
  Object.assign(permissionParams, row);
  dialogVisable.value = true;
};

const save = async () => {
  let res = await reqAddOrUpdate(permissionParams);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: !permissionParams.id ? '添加成功' : '更新成功' });
    dialogVisable.value = false;
    getHasMenu();
  } else {
    ElMessage({ type: 'success', message: !permissionParams.id ? '添加失败' : '更新失败' });
  }
};
</script>

<style scoped></style>
