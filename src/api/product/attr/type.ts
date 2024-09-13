export interface categoryObj {
  id: String | Number;
  name: String;
  category1Id?: String;
  category2Id?: String;
}

export interface ResponseData {
  code: Number;
  message: String;
  ok: boolean;
}

export interface CategoryResponseData extends ResponseData {
  data: categoryObj[];
}
// 属性值
export interface AttrValue {
  // 可选值
  id?: String | Number;
  valueName: String;
  attrId: Number;
}

export type attrValueList = AttrValue[];
// 属性
export interface Attr {
  // 可选值
  id?: string | Number;
  attrName: string;
  // 分类
  categoryId: String | Number;
  // 分类的层级
  categoryLevel: string | Number;
  attrValueList: attrValueList;
}

export type AttrList = Attr[];

export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
