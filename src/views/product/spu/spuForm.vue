<template>
  <!-- 设置item文字宽度 -->
  <el-form label-width="100px">
    <!--  -->
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <!--  -->
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option
          v-for="item in AllTradeMarkList"
          :label="item.tmName"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <!--  -->
    <el-form-item label="SPU描述">
      <el-input
        placeholder="请输入描述"
        type="text"
        v-model="SpuParams.description"></el-input>
    </el-form-item>
    <!--  -->
    <el-form-item label="SPU图片">
      <el-upload
        list-type="picture-card"
        v-model:file-list="img"
        action="/api/product/fileUpload"
        :on-preview="handlePicturePreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisiable">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <!--  -->
    <el-form-item label="SPU销售属性">
      <!--  -->
      <el-select
        v-model="saleAttrIdAndValueName"
        style="width: 240px"
        :placeholder="
          unSelectAttr.length ? `还未选择${unSelectAttr.length}个` : '无'
        ">
        <el-option
          :value="`${item.id}:${item.name}`"
          :label="item.name"
          v-for="item in unSelectAttr"
          :key="item.id"></el-option>
      </el-select>
      <el-button
        :disabled="saleAttrIdAndValueName ? false : true"
        type="primary"
        size="default"
        icon="plus"
        style="margin-left: 10px"
        @click="addSaleAttr">
        添加属性值
      </el-button>
      <!--  -->
      <el-table border style="margin: 10px 0px" :data="SaleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"></el-table-column>
        <el-table-column
          label="销售属性名"
          width="120px"
          prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, index }">
            <el-tag
              @close="row.spuSaleAttrValueList.list.splice(index, 1)"
              v-for="item in row.spuSaleAttrValueList.list"
              :key="item.id"
              closable
              style="margin: 0px 5px">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-model="row.saleAttrValue"
              v-if="row.flag == true"
              placeholder="请输入属性值"
              style="width: 100px"
              size="small"
              type="primary"
              @blur="toLook(row)"></el-input>
            <el-button
              v-else
              @click="toEdit(row)"
              type="primary"
              size="small"
              icon="plus"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!--  -->
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="SaleAttr.length > 0 ? false : true">
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  saleAttr,
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SaleAttrValue,
  ResponseData,
} from '../../../api/product/spu/type';
import {
  reqAddOrUpdate,
  reqAllTradeMark,
  reqAllSaleAttr,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from '../../../api/product/spu';
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene']);

let AllTradeMarkList = ref<Trademark[]>([] as any);

let img = ref<SpuHasImg>([] as any);

let SaleAttr = ref<SaleAttrResponseData>([] as any);

let saleAttrIdAndValueName = ref<String>('');

let AllSaleAttr = ref<HasSaleAttrResponseData>([] as any);

let SpuParams = ref<SpuData>({
  categroy3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [] as any,
  spuSaleAttrList: [] as any,
});

let dialogVisiable = ref<boolean>(false);

let dialogImageUrl = ref<string>('');

let unSelectAttr = computed(() => {
  // filter过滤，保留true的元素
  let unSelectArr = (AllSaleAttr.value as unknown as Array<any>).filter(
    (item: any) => {
      // every针对每个元素执行函数，如果有一个返回false则every返回false
      return (SaleAttr.value as unknown as Array<any>).every((item1: any) => {
        return item.name != item1.saleAttrName;
      });
    },
  );
  return unSelectArr;
});

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] =
    saleAttrIdAndValueName.value.split(':');

  let newSaleAttr: saleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };

  (SaleAttr.value as unknown as Array<any>).push(newSaleAttr);

  saleAttrIdAndValueName.value = '';
};

const save = async () => {
  SpuParams.value.spuImageList.list = img.value.map(item => {
    return {
      imgName: item.name,
      url: (item.response && item.response.data) || item.url,
    };
  });

  SpuParams.value.spuSaleAttrList.list = SaleAttr.value;

  let res: ResponseData = await reqAddOrUpdate(SpuParams.value);
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    });

    //切换场景
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    });
  } else {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新失败' : '添加失败',
    });
  }
};

const cancel = () => {
  $emit('changeScene', { flag: 0, params: '取消' });
};

const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu;

  let res1: AllTradeMark = await reqAllTradeMark();

  let imgList: SpuHasImg = await reqSpuImageList(spu.id as string | number);

  let SaleAttrList: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as string | number,
  );

  let AllSaleAttrList: HasSaleAttrResponseData = await reqAllSaleAttr();

  AllTradeMarkList.value = res1.data.list;

  img.value = imgList.data.list.map((item: any) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });

  SaleAttr.value = SaleAttrList.data.list;

  AllSaleAttr.value = AllSaleAttrList.data.list;
};

const initAddSpu = async (c3Id: number | string) => {
  // 清空表单
  Object.assign(SpuParams.value, {
    categroy3Id: '',
    id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [] as any,
    spuSaleAttrList: [] as any,
  });

  img.value = [] as any;

  SaleAttr.value = [] as any;

  saleAttrIdAndValueName.value = '';

  SpuParams.value.categroy3Id = c3Id;

  let res1: AllTradeMark = await reqAllTradeMark();

  let AllSaleAttrList: HasSaleAttrResponseData = await reqAllSaleAttr();

  AllTradeMarkList.value = res1.data.list;

  AllSaleAttr.value = AllSaleAttrList.data.list;
};

// 对外暴露方法
defineExpose({ initHasSpuData, initAddSpu });

const handlePicturePreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisiable.value = true;
};

const handleRemove = () => {};

const handleUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) return true;
    else {
      ElMessage({
        type: 'error',
        message: '上传文件应小于3M',
      });
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式应为png,jpeg,gif',
    });
    return false;
  }
};

const toEdit = (row: saleAttr) => {
  // 动态添加属性
  row.flag = true;
};

const toLook = (row: saleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;

  let newAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as String,
  };

  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    });
    return;
  }

  let repeat = row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName == saleAttrValue;
  });

  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    });
    return;
  }

  row.spuSaleAttrValueList.list.push(newAttrValue);

  row.flag = false;
};
</script>
<script lang="ts">
export default {
  name: 'SpuForm',
};
</script>
<style scoped lang="scss"></style>
