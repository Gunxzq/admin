export default [
  {
    // 添加属性
    url: '/api/product/saveAttrInfo',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/product/delete/:id',
    method: 'delete',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
];
