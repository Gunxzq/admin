import Mock from 'mockjs';

/**
 * 生成接口使用的数据
 * @returns
 */
function createData() {
  const List = Mock.mock({
    'list|10': [
      {
        id: '@id',
        createTime: '',
        updateTime: '',
        username: '@cname',
        password: '@id',
        name: '@cname',
        phone: null,
        roleName: '',
      },
    ],
  });
  return List;
}

function createRoleList() {
  const List = Mock.mock({
    'list|10': [
      {
        id: '@id',
        createTime: '',
        updateTime: '',
        roleName: '@cname',
        remark: null,
      },
    ],
  });
  return List;
}

export default [
  {
    // 添加属性
    url: '/api/acl/user/:page/:limit',
    method: 'get',
    response: request => {
      const { query } = request;
      return {
        code: 200,
        messgae: '成功',
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
    // 添加属性
    url: '/api/acl/user/save',
    method: 'post',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/acl/user/update',
    method: 'post',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/acl/user/doAssignRole',
    method: 'post',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/acl/user/remove/:id',
    method: 'delete',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/acl/user/batchRemove',
    method: 'delete',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        ok: true,
      };
    },
  },
  {
    // 添加属性
    url: '/api/acl/user/get/toAssign/:adminId',
    method: 'get',
    response: () => {
      return {
        code: 200,
        messgae: '成功',
        data: {
          // 已有的职位
          assignRoles: createRoleList().list,
          // 所有的职位
          allRolesList: [
            {
              id: '1',
              createTime: '',
              updateTime: '',
              roleName: '前台',
              remark: null,
            },
            {
              id: '2',
              createTime: '',
              updateTime: '',
              roleName: '运营',
              remark: null,
            },
            {
              id: '3',
              createTime: '',
              updateTime: '',
              roleName: '产品',
              remark: null,
            },
            {
              id: '4',
              createTime: '',
              updateTime: '',
              roleName: '前端',
              remark: null,
            },
            {
              id: '5',
              createTime: '',
              updateTime: '',
              roleName: '后端',
              remark: null,
            },
            {
              id: '6',
              createTime: '',
              updateTime: '',
              roleName: '测试',
              remark: null,
            },
            {
              id: '7',
              createTime: '',
              updateTime: '',
              roleName: '财务',
              remark: null,
            },
            {
              id: '8',
              createTime: '',
              updateTime: '',
              roleName: '运维',
              remark: null,
            },
            {
              id: '9',
              createTime: '',
              updateTime: '',
              roleName: '销售',
              remark: null,
            },
            {
              id: '10',
              createTime: '',
              updateTime: '',
              roleName: '程序鼓励师',
              remark: null,
            },
          ],
        },
        ok: true,
      };
    },
  },
];
