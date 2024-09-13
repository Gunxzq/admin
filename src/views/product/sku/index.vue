<template>
  <el-card>
    <el-table border style="margin: 10px 0px" :data="skuArr">
      <el-table-column type="index" align="center" label="序号" width="80px"></el-table-column>
      <el-table-column label="名称" width="150px" show-overflow-tooltip prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip prop="skuDesc"></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row, index }">
          <img :src="row.skuDefaultImg" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格" width="150px" prop="price"></el-table-column>
      <!-- 固定 -->
      <el-table-column label="操作" fixed="right">
        <template #="{ row, index }">
          <el-button type="primary" :icon="row.isSale == 1 ? 'Bottom' : 'Top'" @click="updateSale(row)"></el-button>
          <el-button type="primary" icon="edit" @click="updateSku(row)"></el-button>
          <el-button type="primary" icon="infoFulled" @click="findSku(row)"></el-button>
          <el-popconfirm :title="`确定删除商品${row.skuName}`" width="200px" @confirm="DelSku(row)">
            <template #reference>
              <el-button type="primary" icon="delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev,pager,next,jumper,->,sizes,total"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      @change="handler"
      :total="total"></el-pagination>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in 10" type="danger" style="margin: 5px"></el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel>
              <el-carousel-item>
                <h3>ads</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
      <template #footer></template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from 'vue';
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/types';
import { reqSkuList, reqCancelSale, reqSaleSku, reqSkuInfo, reqDelSku } from '@/api/product/sku';
import { ElMessage } from 'element-plus';

let pageNo = ref<Number>(1);

let pageSize = ref<Number>(10);

let total = ref<Number>(400);

let skuArr = ref<SkuData[]>([]);

let drawer = ref<boolean>(false);

let skuInfo = ref<SkuData>({});

onMounted(() => {
  getHasSku();
});

const handler = () => {
  getHasSku();
};

const getHasSku = async () => {
  let res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  if (res.code == 200) {
    total.value = res.data.total;
    skuArr.value = res.data.record;
  }
};

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    let res = await reqCancelSale(row.spuId);
    ElMessage({
      type: 'success',
      message: '下架成功',
    });
    row.isSale = 2;
  } else {
    let res = await reqSaleSku(row.spuId);
    row.isSale = 1;
    ElMessage({
      type: 'success',
      message: '上架成功',
    });
  }
};

const updateSku = (row: SkuData) => {
  ElMessage({
    type: 'success',
    message: '更新中',
  });
};

const findSku = async (row: SkuData) => {
  drawer.value = true;
  let res: SkuInfoData = await reqSkuInfo(row.spuId);
  if (res.code == 200) {
    skuInfo.value = res.data;
  }
};

const DelSku = async (row: SkuData) => {
  let res = await reqDelSku(row.spuId);
  if (res.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' });
    pageNo.value = skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1;
    getHasSku();
  } else {
    ElMessage({ type: 'error', message: '删除失败' });
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: aliceblue;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: aliceblue;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: darkgoldenrod;
}
</style>
