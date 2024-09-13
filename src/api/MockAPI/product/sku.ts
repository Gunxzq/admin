import Mock from 'mockjs';

function createData() {
  const List = Mock.mock({
    'list|3-10': [
      {
        id: '@id',
        createTime: '',
        updateTime: '',
        spuId: '@id',
        price: 10,
        skuName: '@name',
        skuDesc: '@cparagraph',
        weight: 10,
        tmId: '@id',
        category3Id: '@id',
        skuDefaultImg: "@image('100x100')",
        isSale: 1,
        skuImageList: null,
      },
    ],
  });
  return List;
}

export default [
  {
    url: '/api/product/list/:page/:limit',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: 'ok',
        data: {
          record: createData().list,
          total: 400,
          size: 2,
          current: 1,
          orders: [],
          optimizeCountSql: true,
          hitCount: false,
          countId: null,
          maxLimit: null,
          searchCount: true,
          pages: 16,
        },
        ok: true,
      };
    },
  },
  {
    url: '/api/product/cancelSale/:skuId',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: 'ok',
        ok: true,
      };
    },
  },
  {
    url: '/api/product/onSale/:skuId',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: 'ok',
        ok: true,
      };
    },
  },
  {
    url: '/api/product/get/getSkuInfo/:skuId',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: 'ok',
        data: createData().list[0],
        ok: true,
      };
    },
  },
  {
    url: '/api/product/del/deleteSku/:skuId',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: 'ok',
        ok: true,
      };
    },
  },
];
