import Mock from 'mockjs';

function createTrademark() {
  const TrademarkList = Mock.mock({
    'list|30-50': [
      {
        id: '@id',
        tmName: '@name',
        logoUrl: "@image('100x100')",
      },
    ],
  });
  return TrademarkList;
}
export default [
  {
    url: '/api/product/baseTrademark/:page/:limit',
    method: 'get',
    response: request => {
      // 提供默认值
      const { page = 1, limit = 10 } = request.query;
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          records: createTrademark(),
          // 总数
          total: 132,
          // 条数
          size: limit,
          // 当前页
          current: page,
          searchCount: true,
          // 总页数
          Pages: 20,
        },
      };
    },
  },
  {
    url: '/api/product/baseTrademark/save',
    method: 'post',
    response: ({ body }) => {
      const { id, logoUrl, tmName } = body;
      // 提供默认值
      return {
        code: 200,
        message: 'string',
        data: {},
        ok: true,
      };
    },
  },
  {
    url: '/api/product/baseTrademark/update',
    method: 'post',
    response: ({ body }) => {
      const { id, logoUrl, tmName } = body;
      // 提供默认值
      return {
        code: 200,
        message: 'string',
        ok: true,
      };
    },
  },
  {
    url: '/api/product/baseTrademark/remove/:id',
    method: 'delete',
    response: request => {
      const { id } = request.query;
      // 提供默认值
      return {
        code: 200,
        message: '成功',
        ok: true,
      };
    },
  },
  {
    url: '/api/product/baseTrademark/getTrademarkList',
    method: 'get',
    response: request => {
      return {
        code: 200,
        message: '成功',
        data: createTrademark(),
        ok: true,
      };
    },
  },
];
