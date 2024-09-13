function createUserLits() {
  return [
    {
      userId: 1,
      avater: 'http://dummyimage.com/100x100',
      username: 'admin',
      password: '123456',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['btn.Permission.add'],
      routes: ['home', 'Acl', 'User', 'Role'],
      token: 'Admin Token',
      // path:'/acl/attr'
    },
    {
      userId: 2,
      avater: 'http://dummyimage.com/100x100',
      username: 'abcde',
      password: '111111',
      desc: '',
      roles: ['系统管理员'],
      buttons: ['系统管理员'],
      routes: ['cuser.detail', 'cuser.user'],
      token: 'System Token',
    },
  ];
}

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkuser = createUserLits().find(item => item.username === username && item.password === password);
      if (!checkuser) {
        return {
          code: 201,
          data: {
            message: '账号密码错误',
          },
        };
      }
      const { token } = checkuser;
      return {
        code: 200,
        data: {
          token,
        },
      };
    },
  },
  {
    url: '/api/user/getinfo',
    method: 'get',
    response: request => {
      const token = request.headers.token;
      const checkuser = createUserLits().find(item => item.token === token);
      if (!true) {
        return {
          code: 201,
          data: {
            message: 'token过期',
          },
        };
      }
      return {
        code: 200,
        data: {
          checkuser,
        },
      };
    },
  },
];
