import Mock from 'mockjs';
import { createAttrList } from './category';
function createSpuList() {
  const List = Mock.mock({
    'list|20': [
      {
        id: '@id',
        spuName: '@name',
        description: '',
        category3Id: '',
        tmId: '',
        spuSaleAttrList: createSpuSaleAttrList(),
        spuImageList: createSpuImageList(),
      },
    ],
  });
  return List;
}
function createSpuImageList() {
  const List = Mock.mock({
    'list|3-6': [
      {
        id: '@id',
        imageName: '@name',
        imgUrl: "@image('100x100')",
        spuId: '@id',
      },
    ],
  });
  return List;
}
function createSpuSaleAttrList() {
  const List = Mock.mock({
    'list|3-6': [
      {
        baseSaleAttrId: '@id',
        id: '@id',
        saleAttrName: '@name',
        spuId: '@id',
        spuSaleAttrValueList: createSpuSaleAttrValueList(),
      },
    ],
  });
  return List;
}

function createSpuSaleAttrValueList() {
  const List = Mock.mock({
    'list|3-6': [
      {
        id: '@id',
        spuId: '@id',
        baseSaleAttrId: '@id',
        saleAttrValueName: '@name',
        isChecked: null,
      },
    ],
  });
  return List;
}

function createBaseSaleAttrList() {
  const List = Mock.mock({
    'list|3-6': [
      {
        id: '@id',
        name: '@name',
      },
    ],
  });
  return List;
}

function createSkuDataList() {
  const List = Mock.mock({
    'list|3-6': [
      {
        categroy3Id: '@id',
        spuId: '@id',
        tmId: '@id',
        skuName: '@name',
        price: 9,
        weight: 0,
        imgUrl: "@image('100x100')",
      },
    ],
  });
  return List.list;
}

export default [
  {
    // 添加属性
    url: '/api/product/:page/:limit',
    method: 'get',
    response: request => {
      const { page = 1, limit = 10, category3Id } = request.query;
      return {
        code: 200,
        messgae: '成功',
        data: {
          records: createSpuList(),
          // 总页数
          total: 200,
          // 返回项数
          Size: 20,
          // 当前
          current: 20,
          searchCount: true,
          // 当前页
          pages: 20,
        },
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/get/spuImageList/:spuId',
    method: 'get',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        data: createSpuImageList(),
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/get/SaleAttrList/:spuId',
    method: 'get',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        data: createSpuSaleAttrList(),
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/baseSaleAttrList',
    method: 'get',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        data: createBaseSaleAttrList(),
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/saveSpuInfo',
    method: 'post',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/updateSpuInfo',
    method: 'post',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/saveSkuInfo',
    method: 'post',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/get/findBySpuId/:spuId',
    method: 'get',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        data: createSkuDataList(),
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/del/deleteSpu/:spuId',
    method: 'delete',
    response: request => {
      const { spuId } = request.query;
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
];
