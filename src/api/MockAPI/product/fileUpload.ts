export default [
  {
    url: '/api/product/fileUpload',
    method: 'post',
    response: request => {
      return {
        code: 200,
        messgae: 'ok',
        data: {
          logoUrl: '',
        },
        ok: true,
      };
    },
  },
];
