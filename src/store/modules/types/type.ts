import type { RouteRecordRaw } from 'vue-router';
import type { categoryObj } from '@/api/product/attr/type';

export interface UserState {
  token: string | null;
  state: string;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avater: String;
  buttons: string[];
}

export interface CategoryState {
  c1Id: String | Number;
  c1Arr: categoryObj[];
  c2Id: String | Number;
  c2Arr: categoryObj[];
  c3Id: String | Number;
  c3Arr: categoryObj[];
}
