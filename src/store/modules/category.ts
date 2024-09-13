import { defineStore } from 'pinia';
import { reqC1, reqC2, reqC3, reqAttr } from '@/api/product/attr';
import type { CategoryResponseData } from '@/api/product/attr/type';
import type { CategoryState } from './types/type';

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Id: '',
      c1Arr: [],
      c2Id: '',
      c2Arr: [],
      c3Id: '',
      c3Arr: [],
    };
  },
  actions: {
    async getC1() {
      try {
        let res: CategoryResponseData = await reqC1();
        if (res.code == 200) {
          this.c1Arr = res.data.list;
        }
      } catch (error) {}
    },
    async getC2() {
      try {
        let res: CategoryResponseData = await reqC2(this.c1Id);
        if (res.code == 200) {
          this.c2Arr = res.data.list;
        }
      } catch (error) {}
    },
    async getC3() {
      try {
        let res: CategoryResponseData = await reqC3(this.c2Id);
        if (res.code == 200) {
          this.c3Arr = res.data.list;
        }
      } catch (error) {}
    },
  },
});

export default useCategoryStore;
