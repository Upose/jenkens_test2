<!--
 * @Descripttion: 销售单
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 11:42:28
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-21 18:10:01
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.financial`)" :size="800" v-model="showFinancial">
    <div class="box-card">
      <div class="box-form">
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="addForm"
          label-width="140px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <el-input v-model="addForm.sale_order_number" disabled> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.collection_status_name')" prop="payment_status">
                <el-select filterable clearable v-model="addForm.payment_status">
                  <el-option
                    v-for="item in commonLists.paymentStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.wait_collection_money')" prop="wait_money">
                <el-input v-model="addForm.wait_money" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.sale_money_all')" prop="sale_money">
                <el-input v-model="addForm.sale_money" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.paid_amount')" prop="paid_amount">
                <el-input v-model="addForm.paid_amount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.single_paid_amount')" prop="single_paid_amount">
                <el-input v-model="addForm.single_paid_amount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.currency_unit_name')" prop="currency_unit">
                <el-select filterable clearable v-model="addForm.currency_unit">
                  <el-option
                    v-for="item in commonLists.currencyUnitList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right;color: #999999;">{{ item.id }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.collection_type_name')" prop="collection_type">
                <el-select filterable clearable v-model="addForm.collection_type">
                  <el-option
                    v-for="item in commonLists.collectionTypeList"
                    :key="item.collection_type_id"
                    :label="item.name"
                    :value="item.collection_type_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.account')" prop="account_number">
                <el-select filterable clearable v-model="addForm.account_number">
                  <el-option
                    v-for="(item, index) in commonLists.accountList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('common.collection_order_number')"
                prop="collection_order_number"
              >
                <el-input v-model="addForm.collection_order_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.payee')" prop="payee">
                <el-select filterable clearable v-model="addForm.payee">
                  <el-option
                    v-for="item in commonLists.staffList"
                    :key="item.id"
                    :label="item.full_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"
              ><el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="addForm.pay_explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">{{ $t('common.upload_payee_certificate') }}</el-divider>
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
import { saleinventoryApi } from '@/http/api/othcustom/stockset/saleinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { checkTwoDeci, checkTwoDeci1 } from '@/utils/regp'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue'
import PayTable from './PayTable.vue'
import { GetterConstants } from '@/store/modules/users/constants'
import { useStore } from '@/store'
interface IState {
  addForm: {
    sale_order_number: any
    paid_amount: any
    single_paid_amount: any
    sale_money: any
    currency_unit: any
    payment_status: any
    collection_type: any
    collection_order_number: any
    payee: any
    account_number: any
    pay_explain: any
    data: any[]
  }
  commonLists: any
  showFinancial: boolean
  tableData: any[]
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showFinancial: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  components: {
    PayTable
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const store = useStore()
    const state: IState = reactive({
      addForm: {
        sale_order_number: '',
        paid_amount: '',
        single_paid_amount: '',
        sale_money: null,
        currency_unit: null,
        payment_status: 0, //默认未付款
        collection_type: '',
        collection_order_number: '',
        payee: '',
        account_number: '',
        pay_explain: '',
        data: []
      },
      tableData: [],
      commonLists: props.commonLists,
      showFinancial: props.showFinancial
    })

    const addRef = ref()
    const SaleAddRef = ref()
    const uploadRef = ref()
    const addRule = computed(() => {
      const rule = {
        sale_order_number: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        sale_money: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        currency_unit: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],

        payment_status: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        collection_type: [
          {
            required: state.addForm.payment_status ? true : false,
            message: t('common.not_empty')
          }
        ],
        single_paid_amount: [
          {
            required: true,
            validator: checkTwoDeci1
          }
        ],
        payee: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        paid_amount: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })
    const requests = {
      getFinancial() {
        let img_data = [] as any[]
        state.addForm.data.forEach((item: any) => {
          img_data.push(item.path)
        })
        const data = dataStructure(
          { power_url: 'V1/InventoryOrder/certificate_of_payment_add' },
          {
            sale_order_number: state.addForm.sale_order_number,
            payment_status: state.addForm.payment_status,
            currency_unit: state.addForm.currency_unit,
            sale_money: state.addForm.sale_money,
            paid_amount: state.addForm.paid_amount,
            single_paid_amount: state.addForm.single_paid_amount,
            collection_type: state.addForm.collection_type,
            collection_order_number: state.addForm.collection_order_number,
            payee: state.addForm.payee,
            account_number: state.addForm.account_number,
            pay_explain: state.addForm.pay_explain,
            data: img_data
          }
        )
        saleinventoryApi
          .get_financial(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('financial')
            }
          })
          .catch(err => err)
      },
      getSaleOrderNumber(sale_type: number) {
        const data = dataStructure(
          {},
          {
            sale_type
          }
        )
        saleinventoryApi
          .get_sale_order_number(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.addForm.sale_order_number = custom_data.sale_order_number
            }
          })
          .catch(err => err)
      },
      // 上传头像获取url接口
      getUploading(formData: any, file: any) {
        saleinventoryApi
          .get_uploading(formData)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status == 200) {
              let fileObj = {
                name: file.name,
                uid: file.uid,
                path: custom_data.path
              }
              state.addForm.data.push(fileObj)
            }
          })
          .catch(err => err)
      },
      getUploadingDel(url: any, index: any) {
        const data = dataStructure({}, { url })
        saleinventoryApi
          .get_uploading_del(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              // 本地删除
              state.addForm.data.splice(index, 1)
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      },
      getCertificatePaymentList(sale_order_number: any) {
        const args = dataStructure(
          {},
          {
            id: sale_order_number,
            order_by: 1
          }
        )
        saleinventoryApi
          .get_certificate_payment_list(args)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data.data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      onRemove(file: any) {
        state.addForm.data.forEach((item: any, index: any) => {
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
        //重置基本信息
        const addref = addRef
        addref.value.resetFields()
        // 清空图片数据
        state.addForm.data = []
        // 清空已上传的文件列表
        const uploadref = uploadRef
        uploadref.value.clearFiles()
        // 关闭抽屉
        ctx.emit('reset', arg)
      },

      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getFinancial()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelAdd')
                })
              })
          }
        })
      }
    }
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      addRule,
      addRef,
      SaleAddRef,
      uploadRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
