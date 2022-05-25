<!--
 * @Description: 开票
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 18:37:49
-->
<template>
  <el-card style="width: 600px;height: 95%;margin-top: 3px;">
    <el-scrollbar style="height: calc(100vh - 140px);">
      <el-form ref="formRef" :model="Form" :rules="Rule">
        <!-- 部门 -->
        <el-form-item label="部门" prop="applicant_dept_id">
          <el-select
            @change="getFlowApproverList"
            style="width: 100%;"
            v-model="Form.applicant_dept_id"
          >
            <el-option
              v-for="item in departmentList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 生成方式 -->
        <el-form-item label="生成方式" prop="is_invoice">
          <el-select @change="generateOrderNum" style="width: 100%;" v-model="Form.is_invoice">
            <el-option label="自动" :value="1" />
            <el-option label="手动" :value="0" />
          </el-select>
        </el-form-item>
        <!-- 发票类型 -->
        <el-form-item label="发票类型" prop="is_paper">
          <el-select style="width: 100%;" v-model="Form.is_paper">
            <el-option label="纸质发票" :value="1" />
            <el-option label="电子发票" :value="0" />
          </el-select>
        </el-form-item>
        <!-- 开票类型 -->
        <el-form-item label="开票类型" prop="invoice_type">
          <el-select style="width: 100%;" filterable v-model="Form.invoice_type">
            <el-option
              v-for="item in billTypeList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 开票所在国家 -->
        <el-form-item label="开票所在国家" prop="area">
          <el-select style="width: 100%;" v-model="Form.area">
            <el-option
              v-for="item in countryList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 开票单号 -->
        <el-form-item label="开票单号" prop="invoice_order_number">
          <el-input v-model="Form.invoice_order_number" />
        </el-form-item>
        <!-- 货币单位 -->
        <el-form-item filterable :label="$t('common.currency_unit_name')" prop="currency_unit">
          <el-select
            @change="getSaleOrderDetails"
            style="width: 100%;"
            v-model="Form.currency_unit"
          >
            <el-option
              v-for="item in moneyUnitList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 销售单号  -->
        <el-form-item :label="$t('common.inventory_order_id')" prop="inventory_order_id">
          <el-select
            @change="getSaleOrderDetails"
            :placeholder="$t('common.inputAndSelect')"
            style="width: 100%;"
            v-model="Form.inventory_order_id"
            multiple
            filterable
            collapse-tags
            allow-create
            default-first-option
            :reserve-keyword="false"
          >
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-table
          ref="multipleTableRef"
          @selection-change="choseDataArr"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column type="selection" />
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="handle_number" :label="$t('common.sale_number')" width="180" />
          <el-table-column prop="sale_money" :label="$t('common.money')" />
        </el-table>
        <!-- 税号-->
        <el-form-item label="税号" prop="ein">
          <el-input v-model="Form.ein" />
        </el-form-item>
        <!-- 公司-->
        <el-form-item label="公司" prop="company">
          <el-input v-model="Form.company" />
        </el-form-item>
        <!-- 地址-->
        <el-form-item :label="$t('common.address')" prop="address">
          <el-input v-model="Form.address" />
        </el-form-item>
        <!-- 电话-->
        <el-form-item :label="$t('common.phone')" prop="buy_photo">
          <el-input v-model="Form.buy_photo" />
        </el-form-item>
        <!-- 邮箱-->
        <el-form-item :label="$t('common.email')" prop="buy_mail">
          <el-input v-model="Form.buy_mail" />
        </el-form-item>
        <!-- 原因 -->
        <el-form-item :label="$t('common.reason')">
          <el-input type="textarea" :rows="5" v-model="Form.explain" />
        </el-form-item>
        <!-- 图片 收款证明 -->
        <el-form-item :label="$t('common.upload_payee_certificate')"> </el-form-item>
        <el-upload
          ref="uploadRef"
          multiple
          :limit="5"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="onFileChange"
        >
          <i class="el-icon-plus"></i>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <!-- 下级审批人 -->
        <el-form-item label="下级审批人" prop="next_approver">
          <el-select style="width: 100%;" v-model="Form.next_approver">
            <el-option
              v-for="item in flowApproverList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 提交 -->
      <el-button type="primary" @click="submit" plain>{{ $t('common.submit') }}</el-button>
    </el-scrollbar>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref, computed, onUnmounted } from 'vue'
import { billOpenApi } from '../api'
import dataStructure from '@/utils/dataStructure'
import { IRequest } from '@/@types/httpInterface'
import { ElMessage } from 'element-plus'
import { formRef, Form, Rule, multipleTableRef, uploadRef, debounce } from './index'
import { commonApi } from '@/http/api/common'
import store from '@/store'
import { GetterConstants } from '@/store/modules/users/constants'
import { useI18n } from 'vue-i18n'
import { checkIsImg } from '@/utils/formValid'
import { returnOrderApi } from '../../goodsReturn/api'
export default defineComponent({
  name: '',
  props: {},
  setup() {
    const { t } = useI18n()
    const state = reactive({
      options: [''],
      tableData: [] as any,
      tableCheck: [] as any,
      /**查询参数 */
      search_value: '',
      /**部门列表 */
      departmentList: [] as any,
      /**货币单位列表 */
      moneyUnitList: [] as any,
      /**收款单列表 */
      getMoneyList: [] as any,
      /**开票类型列表 */
      billTypeList: [] as any,
      /**国家列表 */
      countryList: [] as any,
      /**销售单列表 */
      saleOrderList: [] as any,
      /**获取流程审批人相关 */
      getFlowApprovalInfo: {
        tid: null as any,
        uid: null as any,
        applicant_dept_id: null as any,
        up_uid: null as any
      },
      /**流程审批人列表 */
      flowApproverList: [] as any
    })
    const methods = {
      onFileChange(file: any, fileList: any) {
        //自动过滤不是图片的文件
        for (let i = 0; i < fileList.length; i++) {
          const isImg = checkIsImg(fileList[i].raw.type)

          if (!isImg) {
            fileList.splice(i, 1)
          }
        }
      },
      handleRemove(file: any) {
        const files = uploadRef.value.uploadFiles
        for (let i = 0; i < files.length; i++) {
          if (file.name === files[i].name) {
            files.splice(i, 1)
          }
        }
      },
      /**验证销售单号 */
      authSaleOrder: debounce(() => {
        const data = dataStructure(
          {},
          {
            search_value: Form.inventory_order_id //销售单号  精确搜索  如果满足条件 可以叠加
          }
        )
        billOpenApi
          .checkSaleOrder(data)
          .then(res => {
            console.log(res)
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              Form.inventory_order_id = custom_data.data || null
              if (!custom_data.data) {
                ElMessage(info)
              }
            }
          })
          .catch(err => err)
      }, 1000),
      choseDataArr(row: any) {
        state.tableCheck = row
      },
      /**根据收款单号查询销售单号 */
      getSaleOrderListById(id: any) {
        Form.inventory_order_id = ''
        const data = dataStructure({}, { search_value: id })
        billOpenApi
          .get_sale_order_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.saleOrderList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询销售单详情 */
      getSaleOrderDetails() {
        const data = dataStructure(
          {},
          {
            currency_unit: Form.currency_unit,
            search_value: Form.inventory_order_id
          }
        )
        billOpenApi
          .get_sale_order_details(data)
          .then(res => {
            console.log(res)
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**生成开票单号 */
      generateOrderNum(type: any) {
        // 自动生成
        if (type === 1) {
          const data = dataStructure({}, {})
          billOpenApi
            .auto_generate_order_num(data)
            .then(res => {
              let { status, custom_data } = res as IRequest
              if (status === 200) {
                Form.invoice_order_number = custom_data.data
              }
            })
            .catch(err => err)
        } else {
          Form.invoice_order_number = ''
        }
      },
      /**流程审批 */
      submit() {
        //判断选择销售单没有
        if (state.tableCheck.length === 0) return ElMessage.warning('请选择销售单')
        const files = uploadRef.value.uploadFiles
        const form = formRef
        form.value.validate((valid: boolean) => {
          if (valid) {
            //上传图片
            let user_id = store.getters[GetterConstants.GET_USERID]
            let language_id = store.getters[GetterConstants.GET_LANGUAGE]
            const formData: any = new FormData()
            formData.append('user_id', user_id)
            formData.append('language_id', language_id)
            formData.append('access_sys_code', 'web')
            for (const item of files) {
              formData.append('picture[]', item.raw)
            }
            billOpenApi
              .upload_img(formData)
              .then(res => {
                let { status, custom_data } = res as IRequest
                if (status === 200) {
                  Form.file_data = []
                  for (const item of custom_data.path) {
                    let obj = {
                      url: item
                    }
                    Form.file_data.push(obj)
                  }
                  let invoice_money = 0
                  for (const cont of state.tableCheck) {
                    invoice_money += Number(cont.sale_money) || 0
                  }
                  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
                  const data = dataStructure(
                    {},
                    {
                      /**公司编码 */
                      com_code: userInfo.com_code,
                      ...Form,
                      ...state.getFlowApprovalInfo,
                      data: state.tableCheck,
                      invoice_money
                    }
                  )
                  const form = formRef
                  form.value.validate((valid: boolean) => {
                    if (valid) {
                      console.log(data)
                      billOpenApi
                        .submit_approval(data)
                        .then(res => {
                          let { status, info } = res as IRequest
                          if (status === 200) {
                            ElMessage.success(info)
                            Object.keys(Form).forEach((key: string) => {
                              ;(Form as any)[key] = ''
                            })
                            state.tableData = []
                            uploadRef.value.uploadFiles = []
                          }
                        })
                        .catch(err => err)
                    }
                  })
                }
              })
              .catch(err => err)
          }
        })
      },
      /**获取流程审批人列表 */
      getFlowApproverList(id: string) {
        state.getFlowApprovalInfo.applicant_dept_id = id
        request.getFlowApproverList()
      },

      /**远程搜索 */
      remoteMethod(query: string) {
        state.search_value = query
        request.getGetMoneyList()
      }
    }
    const request = {
      /**获取货币单位 */
      getMoneyUnitList() {
        const data = dataStructure({}, {})
        returnOrderApi
          .get_money_unit_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.moneyUnitList = custom_data
            }
          })
          .catch(err => err)
      },
      /**查询国家列表 */
      getCountryList() {
        const data = dataStructure({}, {})
        commonApi
          .get_country_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.countryList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询开票类型 */
      getBillTypeList() {
        const data = dataStructure({}, {})
        billOpenApi
          .get_bill_type(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.billTypeList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**获取流程审批人列表（创建） */
      getFlowApproverList() {
        const data = dataStructure(
          {},
          {
            ...state.getFlowApprovalInfo
          }
        )
        billOpenApi
          .get_flow_approver_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.flowApproverList = custom_data.data || []
            }
          })
          .catch(err => err)
      },

      /**获取收款单号列表 */
      getGetMoneyList() {
        const data = dataStructure(
          {},
          {
            search_value: state.search_value
          }
        )
        billOpenApi
          .get_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.getMoneyList = custom_data.data || []
            }
          })
          .catch(err => err)
      },
      /**查询部门 */
      getDepartmentList() {
        const data = dataStructure({}, {})
        billOpenApi
          .get_department(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.departmentList = custom_data.data.department || []
              state.getFlowApprovalInfo.tid = custom_data.data.tid
              state.getFlowApprovalInfo.uid = custom_data.data.uid
              state.getFlowApprovalInfo.up_uid = custom_data.data.up_uid
            }
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      request.getDepartmentList()
      request.getBillTypeList()
      request.getCountryList()
      request.getMoneyUnitList()
    })
    onUnmounted(() => {
      Object.keys(Form).forEach((key: string) => {
        ;(Form as any)[key] = ''
      })
    })
    return { ...methods, ...toRefs(state), formRef, multipleTableRef, uploadRef, Rule, Form }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/table.scss';
</style>
