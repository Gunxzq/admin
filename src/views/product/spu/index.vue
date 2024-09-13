<template>
  <div>
    <Category :disabledState="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" icon="Plus" @click="addSpu" :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="编辑SKU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU" @click="findSku(row)"></el-button>
              <el-popconfirm :title="`确定删除${row.spuName}`" width="200px" @confirm="removeSku(row)">
                <template #reference>
                  <el-button type="primary" size="small" icon="delete" title="删除SKU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          :total="total"
          @change="change"
          @size-change="changesize"
          layout="prev,pager,next,jumper,->,sizes,total"></el-pagination>
      </div>
      <spu-form ref="spuForm" v-show="scene == 1" @changeScene="changeScene"></spu-form>
      <sku-form ref="skuForm" v-show="scene == 2" @changeScene="changeScene"></sku-form>

      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { HasSpuResponseData, Records, SkuInfoData, SkuData } from '../../../api/product/spu/type';
import { ref, watch, onBeforeUnmount, onBeforeMount } from 'vue';
import useCategoryStore from '../../../store/modules/category';
import { reqHasSpu, reqSkuList, reqRemoveSku } from '../../../api/product/spu';
import type { SpuData } from '../../../api/product/spu/type';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ElMessage } from 'element-plus';

let spuForm = ref<any>();

let skuForm = ref<any>();

let show = ref<boolean>(false);

let scene = ref<Number>(0);

let pageNo = ref<Number>(1);

let pageSize = ref<number>(3);

let categoryStore = useCategoryStore();

let records = ref<Records>([]);

let total = ref<Number>(0);

let skuArr = ref<SkuData[]>([]);

watch(
  () => categoryStore.c3Id,
  () => {
    // 如果三级分类id为空
    if (!categoryStore.c3Id) return;
    getHasSpu();
  },
);

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager;
  let res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id as number | string);
  if (res.code == 200) {
    total.value = res.data.total;
    records.value = res.data.records.list.slice(0, pageSize.value);
  }
};
const addSpu = () => {
  scene.value = 1;

  spuForm.value.initAddSpu(categoryStore.c3Id);
};

const addSku = (row: SpuData) => {
  scene.value = 2;

  skuForm.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
};

// 编辑SPU
const updateSpu = async (row: SpuData) => {
  scene.value = 1;
  // 深拷贝简单对象
  spuForm.value.initHasSpuData(JSON.parse(JSON.stringify(row)));
};

const findSku = async (row: any) => {
  let res: SkuInfoData = await reqSkuList(row.id);
  if (res.code == 200) {
    skuArr.value = res.data;
    show.value = true;
  } else {
    return;
  }
};

const removeSku = async (row: any) => {
  let res = await reqRemoveSku(row.id);
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};

const change = async (page: number) => {
  pageNo.value = page;
  await getHasSpu();
};

const changesize = async (size: number) => {
  pageSize.value = size;
  await getHasSpu();
};

const changeScene = (obj: any) => {
  console.log(obj);
  scene.value = obj.flag as Number;

  if (obj.params == 'update') {
    // 如不提供值默认第一页
    getHasSpu(pageNo.value);
  } else {
    getHasSpu();
  }
};

onBeforeMount(() => {
  categoryStore.$reset();
});
</script>

<style scoped lang="scss"></style>
