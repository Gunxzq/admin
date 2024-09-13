import Mock from 'mockjs';

function createCategory() {
  const List = Mock.mock({
    'list|3-10': [
      {
        id: '@id',
        name: '@name',
      },
    ],
  });
  return List;
}

function createCategory2() {
  const List = Mock.mock({
    'list|3-10': [
      {
        id: '@id',
        name: '@name',
        category1Id: '@id',
      },
    ],
  });
  return List;
}

function createCategory3() {
  const List = Mock.mock({
    'list|3-10': [
      {
        id: '@id',
        name: '@name',
        category2Id: '@id',
      },
    ],
  });
  return List;
}
export function createAttrValueList() {
  const List = Mock.mock({
    'list|3-10': [
      {
        attrId: '@increment',
        id: '@id',
        valueName: '@name',
      },
    ],
  });
  return List;
}
export function createAttrList() {
  const List = Mock.mock({
    'list|3-10': [
      {
        id: '@id',
        attrName: '@name',
        attrValueList: createAttrValueList(),
        categoryID: '@id',
        categoryLevel: '@increment',
      },
    ],
  });
  return List;
}
export default [
  {
    url: '/api/product/category1',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: '成功',
        data: createCategory(),
        ok: true,
      };
    },
  },
  {
    url: '/api/product/category2/:category1Id',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: '成功',
        data: createCategory2(),
        ok: true,
      };
    },
  },
  {
    url: '/api/product/category3/:category2Id',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: '成功',
        data: createCategory3(),
        ok: true,
      };
    },
  },
  {
    url: '/api/product/attrinfoList/:category1Id/:category2Id/:category3Id',
    method: 'get',
    response: request => {
      return {
        code: 200,
        messgae: '成功',
        data: createAttrList(),
        ok: true,
      };
    },
  },
];
