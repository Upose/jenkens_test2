<!--
 * @Descripttion: 开单
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-25 17:42:31
-->
<template>
  <!-- 开单 -->
  <el-drawer :title="$t(`common.billing`)" :size="800" v-model="showAdd">
    <div class="box-card">
      <div class="box-form">
        <!-- 基本信息 -->
        <el-divider content-position="left">{{ $t('common.base_info') }}</el-divider>
        <el-form
          class="formStyle2"
          :model="addForm"
          label-width="130px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
          :validate-on-rule-change="false"
        >
          <el-row>
            <el-col :span="12">
              <!-- 销售单号 -->
              <el-form-item :label="$t('common.sale_order_number')" prop="sale_order_number">
                <!--  inputAndSelect: '输入后选择' 远程搜索 -->
                <el-select
                  multiple
                  v-model="addForm.sale_order_number"
                  filterable
                  remote
                  reserve-keyword
                  :placeholder="$t('common.inputAndSelect')"
                  :remote-method="remoteMethod"
                  @change="saleOrderNumberSearch"
                >
                  <el-option
                    v-for="(item, index) in saleOrderNumberList"
                    :key="index"
                    :label="item.id"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 出库单号 -->
              <el-form-item
                :label="$t('common.delivery_order_number')"
                prop="delivery_order_number"
              >
                <el-input v-model="addForm.delivery_order_number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- 运送地点 -->
              <el-form-item
                class="inputStyle500"
                :label="$t('common.destination')"
                prop="destination"
              >
                <el-input v-model="addForm.destination"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <!-- 核对人 -->
              <el-form-item :label="$t('common.collator')" prop="collator">
                <el-select filterable clearable v-model="addForm.collator">
                  <el-option
                    v-for="item in commonLists.staffList"
                    :key="item.id"
                    :label="item.full_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input  v-model="addForm.collator"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 装货人 -->
              <el-form-item :label="$t('common.shipper')" prop="shipper">
                <el-select filterable clearable v-model="addForm.shipper">
                  <el-option
                    v-for="item in commonLists.staffList"
                    :key="item.id"
                    :label="item.full_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input  v-model="addForm.shipper"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <!-- 出库日期 -->
              <el-form-item :label="$t('common.delivery_at')" prop="delivery_at">
                <el-date-picker v-model="addForm.delivery_at" type="datetime"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 车牌号 -->
              <el-form-item :label="$t('common.license_plate_number')" prop="license_plate_number">
                <el-input v-model="addForm.license_plate_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <!-- 取货人 -->
              <el-form-item :label="$t('common.claim_goods')" prop="claim_goods">
                <el-input v-model="addForm.claim_goods"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- 备注 -->
              <el-form-item :label="$t('common.explain')">
                <el-input type="textarea" v-model="addForm.explain"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <DeinfoAdd
          :addSearchData="addSearchData"
          @rowClick2="rowClick2"
          :addForm="addForm"
          ref="DeinfoAddRef"
        ></DeinfoAdd>
      </div>

      <div class="box-button">
        <!-- 提交 -->
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { deliveryinventoryApi } from '@/http/api/othcustom/stockset/deliveryinventory'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne, datetimeNormOne, dateNormArray } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IValid } from '../typings'
import DeinfoAdd from './DeinfoAdd.vue'
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
interface IState {
  addForm: {
    delivery_order_number: any
    /**销售单号 */
    sale_order_number: any
    destination: any
    license_plate_number: any
    collator: any
    delivery_at: any
    shipper: any
    explain: any
    claim_goods: any
    addFormData: any[]
  }
  addSearchData: any[]
  commonLists: any
  saleOrderNumberList: any[]
  showAdd: boolean
}
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  components: {
    DeinfoAdd
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state: IState = reactive({
      addForm: {
        delivery_order_number: '',
        /**销售单号 */
        sale_order_number: null,
        destination: '',
        license_plate_number: '',
        collator: '',
        delivery_at: new Date(),
        shipper: '',
        explain: '',
        claim_goods: '',
        addFormData: []
      },
      addSearchData: [],
      commonLists: props.commonLists,
      saleOrderNumberList: [], //远程搜索结果
      showAdd: props.showAdd
    })
    //form表单提交后，后端返回的错误校验
    const valid: IValid = reactive({
      checkOthers: {
        fun: (
          rule: object,
          value: string,
          callback: Function,
          info: any = '',
          num: boolean = false
        ) => {
          if (num) {
            callback(new Error(info))
            valid.checkOthers.num = false
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
            valid.checkOthers.num
          )
        },
        info: '',
        num: false
      }
    })
    const addRef = ref()
    const DeinfoAddRef = ref()
    const addRule = computed(() => {
      const rule = {
        sale_order_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: (rule: object, value: string, callback: Function) => {
              valid.checkOthers.fun(
                rule,
                value,
                callback,
                valid.checkOthers.info,
                valid.checkOthers.num
              )
            }
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        delivery_order_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],

        collator: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        delivery_at: [
          {
            required: true,
            message: t('common.not_empty')
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        shipper: [
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
      getAdd() {
        // 处理时间格式
        let delivery_at = state.addForm.delivery_at
        state.addForm.delivery_at = delivery_at ? datetimeNormOne(delivery_at) : ''
        const data = dataStructure(
          { power_url: 'V1/InventoryDelivery/add' },
          {
            delivery_order_number: state.addForm.delivery_order_number,
            destination: state.addForm.destination,
            license_plate_number: state.addForm.license_plate_number,
            collator: state.addForm.collator,
            shipper: state.addForm.shipper,
            claim_goods: state.addForm.claim_goods,
            delivery_at: state.addForm.delivery_at,
            explain: state.addForm.explain,
            data: state.addForm.addFormData
          }
        )
        console.log(data)

        deliveryinventoryApi
          .get_add(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage.success(info)
              methods.reset('add')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const addref = addRef
              addref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      getSearch(searchValue2: string) {
        let delivery_order_number = state.addForm.delivery_order_number
        const data = dataStructure(
          {},
          {
            search_value: searchValue2,
            delivery_order_number
          }
        )
        deliveryinventoryApi
          .get_search(data)
          .then(res => {
            let { status, custom_data, field_name, info } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.data)
              state.addSearchData = tableData
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.num = true
              const addref = addRef
              addref.value.validateField(field_name)
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
        deliveryinventoryApi
          .get_sale_order_number(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.addForm.delivery_order_number = custom_data.sale_order_number
            }
          })
          .catch(err => err)
      },
      // 销售单号搜索
      getDeliveryOrderNumber(search_value: any) {
        const data = dataStructure(
          {},
          {
            search_value,
            order_by: 1
          }
        )
        deliveryinventoryApi
          .get_delivery_order_number(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.saleOrderNumberList = custom_data.data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 出库开单，销售单号远程搜索
      remoteMethod(query: string) {
        requests.getDeliveryOrderNumber(query)
      },
      reset(arg: any) {
        switch (arg) {
          case 'add':
            // 重置表单
            const addref = addRef
            addref.value.resetFields()
            state.addForm.addFormData = []
            state.addSearchData = []
            ctx.emit('reset', arg)
            break
          default:
            break
        }
      },
      rowClick2(val: any) {
        val.delivery_number = 0
        val.id = val.inventory_id
        let isPush = true
        state.addForm.addFormData.forEach(item => {
          if (item.id == val.id) {
            // 存在这个id就不添加
            isPush = false
          }
        })
        if (isPush) {
          state.addForm.addFormData.push(val)
        }
      },

      saleOrderNumberSearch(v: any) {
        console.log(v)

        // 搜索之前清空连个table
        state.addForm.addFormData = []
        state.addSearchData = []
        requests.getSearch(state.addForm.sale_order_number)
      },
      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            // 调用子组件的校验方法
            const deinfoaddref = DeinfoAddRef
            let valid2 = deinfoaddref.value.addFormDataRefValid()
            if (valid2) {
              ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
                confirmButtonText: t('common.confirm'),
                cancelButtonText: t('common.cancel'),
                type: 'warning'
              })
                .then(() => {
                  requests.getAdd()
                })
                .catch(() => {
                  ElMessage({
                    type: 'info',
                    message: t('common.cancelAdd')
                  })
                })
            }
          }
        })
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      addRule,
      DeinfoAddRef,
      addRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
