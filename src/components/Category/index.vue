<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline" :disabled="disabledState">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="catecoryStore.c1Id"
          @change="handler">
          <el-option
            v-for="c1 in catecoryStore.c1Arr"
            :label="c1.name"
            :value="c1.id"
            :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="catecoryStore.c2Id"
          @change="handler1">
          <el-option
            v-for="c2 in catecoryStore.c2Arr"
            :label="c2.name"
            :value="c2.id"
            :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="catecoryStore.c3Id">
          <el-option
            v-for="c3 in catecoryStore.c3Arr"
            :label="c3.name"
            :value="c3.id"
            :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

defineProps({
  disabledState: {
    type: Boolean,
    default: true,
  },
});

let catecoryStore = useCategoryStore();

onMounted(() => {
  catecoryStore.getC1();
});

const getC1 = () => {
  catecoryStore.getC1();
};

const handler = () => {
  catecoryStore.getC2();
  catecoryStore.c2Arr = [];
  catecoryStore.c3Arr = [];
  catecoryStore.c2Id = '';
  catecoryStore.c3Id = '';
};

const handler1 = () => {
  catecoryStore.getC3();
  catecoryStore.c3Arr = [];
  catecoryStore.c3Id = '';
};
</script>
<script lang="ts">
export default {
  name: 'Category',
};
</script>
<style scoped lang="scss">
.demo-form-inline {
  .el-select {
    width: 200px;
  }
}
</style>
