<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-02 11:43:29
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.financial`)" :size="1000" v-model="showFinancial">
    <div class="box-card formStyle">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          :model="addForm"
          label-width="200px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.id')" prop="id">
                <el-input v-model="addForm.id" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.wait_money')" prop="wait_money">
                <el-input v-model="addForm.wait_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.real_payment_money')" prop="real_payment_money">
                <el-input v-model="addForm.real_payment_money"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.payer')" prop="payer">
                <!-- <el-input  v-model="addForm.payer"></el-input> -->
                <el-select v-model="addForm.payer" filterable clearable>
                  <el-option
                    v-for="(item, index) of commonLists.staffList"
                    :key="index"
                    :label="item.full_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.account')" prop="account_number">
                <!-- <el-input  v-model="addForm.payer"></el-input> -->
                <el-select v-model="addForm.account_number" filterable clearable>
                  <el-option
                    v-for="(item, index) of commonLists.accountList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right;color: #999999;">{{ item.account }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.explain')" prop="explain">
                <el-input type="textarea" v-model="addForm.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">{{ $t('common.upload_payer_certificate') }}</el-divider>
        <!--上传图片 -->

        <el-upload
          ref="uploadRef"
          :before-upload="beforeUpload"
          action="#"
          :http-request="httpRequest"
          list-type="picture-card"
          multiple
          :limit="5"
          :on-exceed="onExceed"
          :on-remove="onRemove"
        >
          <template #default>
            <i class="el-icon-plus"></i>
          </template>
        </el-upload>

        <el-divider content-position="left">{{ $t('common.upload_log') }}</el-divider>
        <PayTable :tableData="tableData"></PayTable>
      </div>
      <div class="box-button">
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
interface IState {
  addForm: {
    id: any
    wait_money: any
    real_payment_money: any
    payer: any
    explain: any
    account_number: any
  }
  fileData: any[]
  commonLists: any
  showFinancial: any
  tableData: any[]
}
import { purchaseApi } from '@/http/api/othcustom/stockset/purchase'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, computed, ref, onMounted, toRef, watch } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import PayTable from './PayTable.vue'
import { GetterConstants } from '@/store/modules/users/constants'
export default defineComponent({
  components: {
    PayTable
  },
  props: {
    commonLists: {
      type: Object
    },
    showFinancial: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const store = useStore()
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        id: '',
        wait_money: '',
        real_payment_money: null,
        payer: '',
        explain: '',
        account_number: ''
      },
      fileData: [],
      commonLists: props.commonLists,
      showFinancial: props.showFinancial,
      tableData: []
    })
    const valid: IValid = reactive({
      checkOthers: {
        fun: (rule: object, value: string, callback: Function, info: any, bool: boolean) => {
          if (bool) {
            callback(new Error(info))
            valid.checkOthers.bool = false
          } else {
            callback()
          }
        },
        validatorFun: (rule: object, value: string, callback: Function) => {
          valid.checkOthers.fun(
            rule,
            value,
            callback,
            valid.checkOthers.info,
            valid.checkOthers.bool
          )
        },
        info: '',
        bool: false
      }
    })
    const addRef = ref()
    const uploadRef = ref()
    const addRule = computed(() => {
      const rule = {
        id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        wait_money: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        real_payment_money: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        payer: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        account_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })
    const requests = {
      getCertificatePaymentAdd() {
        let fileData = [] as any[]
        state.fileData.forEach((item: any) => {
          fileData.push(item.path)
        })
        const args = dataStructure(
          { power_url: 'V1/Stock/certificate_of_payment_add' },
          {
            id: state.addForm.id,
            wait_money: state.addForm.wait_money,
            real_payment_money: state.addForm.real_payment_money,
            payer: state.addForm.payer,
            explain: state.addForm.explain,
            account_number: state.addForm.account_number,
            data: fileData
          }
        )
        purchaseApi
          .get_certificate_payment_add(args)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('financial')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.bool = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getCertificatePaymentList(id: any) {
        const args = dataStructure(
          {},
          {
            id,
            order_by: 1
          }
        )
        purchaseApi
          .get_certificate_of_payment_list(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // paytableref.value.tableData = custom_data.data
              //ref操作子组件的方式，初始数据为空，但数据更新后有值，子组件却不再从新渲染
              state.tableData = custom_data.data //有值但是子组件不再从新渲染
            }
          })
          .catch(err => err)
      },
      // 上传头像获取url接口
      getUploading(formData: any, file: any) {
        purchaseApi
          .get_uploading(formData)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status == 200) {
              let fileObj = {
                name: file.name,
                uid: file.uid,
                path: custom_data.path
              }
              state.fileData.push(fileObj)
            }
          })
          .catch(err => err)
      },
      getUploadingDel(url: any, index: any) {
        const data = dataStructure({}, { url })
        purchaseApi
          .get_uploading_del(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 本地删除
              state.fileData.splice(index, 1)
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      onRemove(file: any) {
        state.fileData.forEach((item: any, index: any) => {
          if (file.uid === item.uid) {
            requests.getUploadingDel(item.path, index)
          }
        })
      },
      onExceed(files: any, fileList: any) {
        ElMessage.warning(
          `当前限制选择 5个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
            fileList.length} 个文件`
        )
      },
      //#   图片上传限制
      beforeUpload(file: any) {
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
          ElMessage.error('上传头像图片大小不能超过 5MB!')
        }
        return isLt2M
      },
      //#   上传图片
      httpRequest(file: any) {
        let user_id = store.getters[GetterConstants.GET_USERID]
        let language_id = store.getters[GetterConstants.GET_LANGUAGE]
        const formData: any = new FormData()
        formData.append('picture', file.file)
        formData.append('user_id', user_id)
        formData.append('language_id', language_id)
        formData.append('access_sys_code', 'web')
        requests.getUploading(formData, file.file)
      },

      reset(arg: any) {
        // 重置表单
        const addref = addRef
        addref.value.resetFields()
        // 清空图片数据
        state.fileData = []
        // 清空已上传的文件列表
        const uploadref = uploadRef
        uploadref.value.clearFiles()
        ctx.emit('reset', arg)
      },
      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
            ElMessageBox.confirm(t('common.confirmSubmit'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getCertificatePaymentAdd()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelSubmit')
                })
              })
          }
        })
      }
    }
    onMounted(() => {})
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      addRef,
      addRule,
      uploadRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
// #上传图片相关样式
.avatar-uploader {
  &:deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 132px;
  height: 132px;
  line-height: 132px;
  text-align: center;
}
.avatar {
  width: 132px;
  height: 132px;
  display: block;
}
</style>
