<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入搜索的职位关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" :disabled="!keyword" @click="search">搜索</el-button>
        <el-button type="primary" size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addRole" icon="plus">添加角色</el-button>
    <el-table border style="margin: 10px 0px" :data="allRole">
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="职位名称" show-overflow-tooltip prop="roleName"></el-table-column>
      <el-table-column align="center" label="创建时间" show-overflow-tooltip prop="createTime"></el-table-column>
      <el-table-column align="center" label="更新时间" show-overflow-tooltip prop="updateTime"></el-table-column>
      <el-table-column align="center" label="操作" width="400px">
        <template #="{ row, index }">
          <el-button type="primary" size="default" icon="user" @click="setPermisstion(row)">分配权限</el-button>
          <el-button type="primary" size="default" icon="edit" @click="editRole(row)">编辑</el-button>
          <el-popconfirm :title="`确定删除${row.roleName}?`" width="260px" @confirm="removeRole(row)">
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
      @change="getHasRole"></el-pagination>
  </el-card>
  <el-dialog v-model="dialogVisable" :title="RoleParams.id ? '更新职位' : '添加职位'">
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请输入职位名称" v-model="RoleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree ref="tree" show-checkbox :data="menuArr" node-key="id" :props="defineProps" :default-checked-keys="selectArr"></el-tree>
    </template>
    <template #footer>
      <el-button @click="drawer = false">取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqAddOrUpdate, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
import { RoleResponseData, record, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';

let LayOutSettingStore = useLayOutSettingStore();

let pageNo = ref<Number>(1);

let dialogVisable = ref<Boolean>(false);

let pageSize = ref<Number>(10);

let allRole = ref<record>([]);

let keyword = ref<String>('');

let drawer = ref<Boolean>(false);

let form = ref();

let tree = ref();

let selectArr = ref<String[]>([]);

let RoleParams = reactive<RoleData>({
  roleName: '',
});

let menuArr = ref<MenuList>([]);

const defineProps = {
  children: 'children',
  label: 'name',
};

const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if ((value.trim(), length >= 2)) {
    callBack();
  } else {
    callBack(new Error('职位名称至少两位'));
  }
};

const rules = {
  roleName: { required: true, trigger: 'blur', validator: validatorRoleName },
};

const getHasRole = async () => {
  let res: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
  if (res.code == 200) {
    allRole.value = res.data.record;
  }
};

onMounted(() => getHasRole());

const addRole = () => {
  Object.assign(RoleParams, {
    roleName: '',
    id: null,
  });
  dialogVisable.value = true;
  nextTick(() => {
    form.value.clearValidate('roleName');
  });
};

const setPermisstion = async (row: RoleData) => {
  drawer.value = true;
  Object.assign(RoleParams, row);
  let res: MenuResponseData = await reqAllMenuList(row.id as Number | String);
  if (res.code == 200) {
    menuArr.value = res.data;
    selectArr.value = filterSelectArr(menuArr.value, []);
  }
};

const filterSelectArr = (allData: Array<any>, initArr: any) => {
  allData.forEach(item => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });
  return initArr;
};

const editRole = (row: RoleData) => {
  dialogVisable.value = true;
  Object.assign(RoleParams, row);
  nextTick(() => {
    form.value.clearValidate('roleName');
  });
};

const removeRole = async (row: RoleData) => {
  let res = await reqRemoveRole(row.id as Number | String);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasRole();
  } else {
    ElMessage({ type: 'success', message: '删除失败' });
  }
};

const search = () => {
  getHasRole();
  keyword.value = '';
};

const reset = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh;
};

const cancel = () => {
  dialogVisable.value = false;
};

const save = async () => {
  dialogVisable.value = false;
  await form.value.validate();
  let res = await reqAddOrUpdate(RoleParams);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: RoleParams.id ? '更新成功' : '添加成功' });
    dialogVisable.value = false;
    getHasRole();
  } else {
    ElMessage({ type: 'success', message: RoleParams.id ? '更新失败' : '添加失败' });
  }
};

const confirmClick = async () => {
  const roleId = RoleParams.id;
  let arr: Array<any> = tree.value.getCheckedKeys();
  let arr1: Array<any> = tree.value.getHalfCheckedKeys();
  //arr.concat(arr1)
  let res = await reqSetPermission(roleId as Number | String, [...arr, ...arr1]);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '分配权限成功' });
    drawer.value = false;
    window.location.reload();
  } else {
    ElMessage({ type: 'success', message: '分配权限失败' });
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
}
</style>
