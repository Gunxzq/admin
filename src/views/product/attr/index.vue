<template>
  <Category :disabledState="scene"></Category>
  <el-card style="margin: 10px 0px">
    <template v-if="scene == 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="catecoryStore.c3Id ? false : true" @click="addAttr">添加平台属性</el-button>
      <el-table border style="margin: 10px 0px" :data="attrList">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag style="margin: 5px" v-for="(item, index) in row.attrValueList.list" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="edit" @click="editAttr(row)"></el-button>

            <el-popconfirm :title="`确定要删除${row.attrName}`" icon="Delete" width="250px" @confirm="deleteAttr(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="plus" :disabled="attrParams.attrName ? false : true" @click="addAttrValue">添加属性值</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row, $index }">
            <el-input :ref="(vc: any) => (inputArr[$index] = vc)" placeholder="请输入属性值名称" v-model="row.valueName" @blur="toLook(row, $index)" v-if="row.flag"></el-input>
            <div v-else @click="toEdit(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="delete" @click="attrParams.attrValueList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue';
import useCategoryStore from '@/store/modules/category';
import { reqAttr, reqAddAttr, reqDelAttr } from '@/api/product/attr';
import { reactive, ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { AttrResponseData, Attr, ResponseData, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
import attr from '@/api/MockAPI/product/attr';

let catecoryStore = useCategoryStore();

let attrList = ref<Attr[]>([]);

let scene = ref<number>(0);

let inputArr = ref<any>([]);

// 新增属性
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
});

watch(
  // 副作用函数，明确依赖
  () => catecoryStore.c3Id,
  () => {
    attrList.value = [];
    if (catecoryStore.c3Id) getAttr();
  },
);

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = catecoryStore;
  try {
    let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (res.code == 200) {
      attrList.value = res.data.list;
    }
  } catch (error) {}
};

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: catecoryStore.c3Id,
    categoryLevel: 3,
  });
  scene.value = 1;
};

const editAttr = (row: any) => {
  scene.value = 1;
  attrParams.attrName = JSON.parse(JSON.stringify(row.attrName));
  attrParams.categoryId = row.categoryID;
  attrParams.categoryLevel = row.categoryLevel;
  attrParams.attrValueList = JSON.parse(JSON.stringify(row.attrValueList.list));
};

const deleteAttr = async (id: String | Number) => {
  let res: ResponseData = await reqDelAttr(id);
  if (res.code == 200) {
    // 切换
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    await getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};

const cancel = () => {
  scene.value = 0;
};

const addAttrValue = () => {
  (attrParams.attrValueList as unknown as Array<any>).push({
    valueName: '',
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};

const save = async () => {
  // 发送请求
  let res = await reqAddAttr(attrParams);
  if (res.code == 200) {
    // 切换
    scene.value = 0;
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    });
    await getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    });
  }
};

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    });
    return;
  }
  let repeat = attrParams.attrValueList.find(item => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    });
  }
  row.flag = false;
};

const toEdit = (row, $index) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};

// 清空仓库数据
onBeforeUnmount(() => {
  catecoryStore.$reset();
});
</script>
<style scoped></style>
