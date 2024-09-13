import trademark from '../src/api/MockAPI/product/trademark';
import login from '../src/api/MockAPI/user';
import fileUpload from '../src/api/MockAPI/product/fileUpload';
import category from '../src/api/MockAPI/product/category';
import attr from '../src/api/MockAPI/product/attr';
import spu from '../src/api/MockAPI/product/spu';
import sku from '../src/api/MockAPI/product/sku';
import user from '../src/api/MockAPI/acl/user';
import role from '../src/api/MockAPI/acl/role';
import menu from '../src/api/MockAPI/acl/menu';

let API_ARRY = [...login, ...trademark, ...fileUpload, ...category, ...attr, ...spu, ...sku, ...user, ...role, ...menu];

export default API_ARRY;
