<template>
  <el-form>
    <el-form-item label="SKU名称" label-width="70px">
      <el-input placeholder="SKU名称" v-model="skuParmas.skuName"></el-input>
    </el-form-item>

    <el-form-item label="价格(元)" label-width="70px">
      <el-input placeholder="价格(元)" type="number" v-model="skuParmas.price"></el-input>
    </el-form-item>

    <el-form-item label="重量(克)" label-width="70px">
      <el-input placeholder="重量(克)" type="number" v-model="skuParmas.weight"></el-input>
    </el-form-item>

    <el-form-item label="sku描述" label-width="70px">
      <el-input placeholder="sku描述" type="textarea" v-model="skuParmas.skuDesc"></el-input>
    </el-form-item>

    <el-form-item label="平台属性" label-width="70px">
      <el-form inline>
        <el-form-item :label="item.attrName" v-for="(item, index) in AttrArr" :key="item.id">
          <el-select placeholder="请选择" style="width: 250px" v-model="item.AttrIdAndValueId">
            <el-option
              :value="`${attrValue.id}:${attrValue.name}`"
              v-for="(attrValue, index) in item.attrValueList.list"
              :label="attrValue.valueName"
              :key="attrValue.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="销售属性" label-width="70px">
      <el-form>
        <el-form-item :label="item.saleAttrName" v-for="(item, index) in SaleArr" :key="item.id">
          <el-select placeholder="请选择" style="width: 250px" v-model="item.saleIdAndValueId">
            <el-option
              :value="`${saleValue.id}:${saleValue.name}`"
              v-for="(saleValue, index) in item.spuSaleAttrValueList.list"
              :label="saleValue.saleAttrValueName"
              :key="saleValue.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称" label-width="70px">
      <el-table :data="ImgArr" border ref="table">
        <el-table-column label="序号" type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, index }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imageName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, index }">
            <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item label-width="70px">
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu';
import type { SaleAttrResponseData, SpuHasImg, SkuData } from '@/api/product/spu/type';
import { AttrResponseData } from '@/api/product/attr/type';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

let table = ref<any>();

let $emit = defineEmits(['changeScene']);

let AttrArr = ref<any>([]);

let SaleArr = ref<any>([]);

let ImgArr = ref<any>([]);

let skuParmas = reactive<SkuData>({
  categroy3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: 0,
  weight: 0,
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
});

const save = async () => {
  // 起始值[]
  skuParmas.skuAttrValueList = AttrArr.value.reduce((prev: any, next: any) => {
    if (next.AttrIdAndValueId) {
      let [attrId, valueId] = next.AttrIdAndValueId.split(':');
      prev.push({
        attrId,
        valueId,
      });
    }
    return prev;
  }, []);

  skuParmas.skuSaleAttrValueList = SaleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleId, valueId] = next.saleIdAndValueId.split(':');
      prev.push({
        saleId,
        valueId,
      });
    }
    return prev;
  }, []);

  let res = await reqAddSku(skuParmas);
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    });

    $emit('changeScene', { flag: 0, parmas: '' });
  } else {
    ElMessage({
      type: 'success',
      message: '添加失败',
    });
  }
};

const cancel = () => {
  $emit('changeScene', { flag: 0, params: '取消' });
};

const handler = (row: any) => {
  // 只能选中一个
  table.value.clearSelection();
  table.value.toggleRowSelection(row, true);

  skuParmas.skuDefaultImg = row.imgUrl;
};

const initSkuData = async (c1Id: String | number, c2Id: String | number, spu: any) => {
  skuParmas.categroy3Id = spu.categroy3Id;
  skuParmas.spuId = spu.id;
  skuParmas.tmId = spu.tmId;
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, spu.categroy3Id);
  let res1: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id);
  let res2: SpuHasImg = await reqSpuImageList(spu.id);

  AttrArr.value = res.data.list;
  SaleArr.value = res1.data.list;
  ImgArr.value = res2.data.list;
};

defineExpose({
  initSkuData,
});
</script>
<script lang="ts">
export default {
  name: 'SkuForm',
};
</script>
<style scoped></style>
