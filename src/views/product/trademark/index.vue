<template>
  <div>
    <el-card>
      <!-- 自定义指令 -->
      <el-button v-has="'btn.Permission.add'" type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table border style="margin: 10px 0px" :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="selection"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName">
          <template #="{ row }">
            <!-- 保留空格换行 -->
            <pre style="color: brown">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl">
          <!-- 索引、列对象， -->
          <template #="{ row }">
            <!-- alt无法显示的替代文本 -->
            <img :src="row.logoUrl" style="height: 100px; width: 100px" alt="未有图片" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="edit" @click="editTrademark(row)"></el-button>

            <el-popconfirm :title="`确定要删除${row.tmName}`" icon="Delete" width="250px" @confirm="deleteTrdemark(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current_page="currentpage"
        :page_size="limit"
        :page-sizes="[5, 15, 20, 25]"
        :small="true"
        :background="true"
        layout="prev,pager,next,jumper,->,sizes,total"
        :total="total"
        @current-change="change"
        @size-change="changesize" />
    </el-card>

    <el-dialog v-model="dialogFormVisvle" :title="dialogTitle">
      <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- action：文件上传地址 -->
          <el-upload
            :show-file-list="false"
            class="avter_upload"
            action="/api/product/fileUpload"
            :on-success="handleFileSuccess"
            :before-upload="bdeforeFileUpload">
            <img :src="trademarkParams.logoUrl" alt="" class="avter" v-if="trademarkParams.logoUrl" />
            <el-icon v-else class="avater-uploader-icon">
              <Plus></Plus>
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, UploadProps } from 'element-plus';
import { nextTick, reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDelTrademark } from '@/api/product/trademark/index';
import { trademarkResponseData, Records, trademark, ResponseData } from '@/api/product/trademark/type';
import { Plus } from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user';
// 当前页
let currentpage = ref<number>(1);
// 项数
let limit = ref<number>(5);
// 总计
let total = ref<number>(0);

let userStore = useUserStore();

let trademarkArr = ref<Records>([]);

let dialogFormVisvle = ref<boolean>(false);

let dialogTitle = ref('');

let trademarkParams = reactive<trademark>({
  tmName: '',
  logoUrl: '',
});

const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  rule;
  if (value) {
    callback();
  } else {
    callback(new Error('请上传图片'));
  }
};

const validatorTmName = (rule: any, value: any, callback: any) => {
  // console.log(value);
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('品牌名称应大于两位'));
  }
};

let formRef = ref();

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl, trigger: 'blur' }],
};

onMounted(() => {
  getHasTrademark(1, 5);
});

const change = async (page: number) => {
  currentpage.value = page;
  await getHasTrademark(page, limit.value);
};

const changesize = async (size: number) => {
  limit.value = size;
  await getHasTrademark(currentpage.value, size);
};

const getHasTrademark = async (page: number, size: number) => {
  try {
    let result: trademarkResponseData = await reqHasTrademark(page, size);
    if ((result.code = 200)) {
      total.value = result.data.total;
      trademarkArr.value = result.data.records.list.slice(0, size);
    }
  } catch (error) {
    console.log(error);
  }
};

const addTrademark = () => {
  dialogFormVisvle.value = true;
  dialogTitle.value = '添加品牌';
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
  trademarkParams.tmName = '';
  trademarkParams.id = '';
  trademarkParams.logoUrl = '';
  // dom更新完成后获取实例
  nextTick(() => {
    formRef.value?.clearValidate('tmName');
    formRef.value?.clearValidate('logoUrl');
  });
};

const editTrademark = async (row: any) => {
  dialogFormVisvle.value = true;
  dialogTitle.value = '编辑品牌';
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
  nextTick(() => {
    formRef.value?.clearValidate('tmName');
    formRef.value?.clearValidate('logoUrl');
  });
  // Object.assign合并对象
  Object.assign(trademarkParams, row);
};

const confirm = async () => {
  // 如果校验失败，暂停执行
  await formRef.value.validate();
  try {
    let res = await reqAddOrUpdateTrademark(trademarkParams);
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: trademarkParams.id ? '编辑成功' : '添加成功',
      });
      dialogFormVisvle.value = false;

      getHasTrademark(currentpage.value, limit.value);
    } else {
      dialogFormVisvle.value = false;
      ElMessage({
        type: 'error',
        message: trademarkParams.id ? '编辑失败' : '添加失败',
      });
    }
  } catch (error) {}
};

const cancel = () => {
  dialogFormVisvle.value = false;
};

const bdeforeFileUpload: UploadProps['beforeUpload'] = async rawFile => {
  // 格式为png|jpg|gif 4m
  if (['image/png', 'image/jpeg', 'image/gif'].includes(rawFile.type)) {
    if (rawFile.size / 1024 / 1024 < 4) {
      await formRef.value.clearValidate('logoUrl');
      return true;
    } else {
      ElMessage.error('大小应小于4m');
    }
  } else {
    ElMessage.error('文件格式为png、jpg、gif');
  }
};

const handleFileSuccess: UploadProps['onSuccess'] = (response, uploadfile) => {
  // 上传接口返回文件的访问地址
  console.log(response);
  trademarkParams.logoUrl = '../../../../public/logo.png';
};
// 判断一下是否回到上一页
const deleteTrdemark = async (id: number) => {
  try {
    let res: ResponseData = await reqDelTrademark(id);
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除品牌成功',
      });
      await reqHasTrademark(currentpage.value, limit.value);
    } else {
      ElMessage({
        type: 'error',
        message: '删除品牌失败',
      });
    }
  } catch (error) {}
};
</script>

<style scoped lang="scss">
.avter_upload {
  .el-upload {
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    transition: var(--el-transition-duration-fast);
    overflow: hidden;
  }
  .avter {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avater-uploader-icon {
    border: 1px solid var(--el-border-color);
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
