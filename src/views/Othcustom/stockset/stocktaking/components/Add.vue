<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-06 10:27:07
-->
<!--  -->
<template>
  <el-drawer :title="$t(`common.add`)" :size="700" v-model="showAdd">
    <div class="box-card formStyle">
      <div class="box-form">
        <el-form
          :model="addForm"
          label-width="200px"
          :rules="addRule"
          ref="addRef"
          label-position="left"
        >
          <!-- 仓库 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="product_grade">
                <el-select filterable v-model="addForm.warehouse">
                  <el-option
                    v-for="item of commonLists.wareHouseList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.id_name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 调整前产品等级 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.before_adjust_product_grade')" prop="product_grade">
                <el-select
                  clearable
                  filterable
                  v-model="addForm.product_grade"
                  @change="productGradeChange"
                >
                  <el-option
                    v-for="(item, index) of commonLists.productGradeList"
                    :key="index"
                    :value="item.product_grade"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 品名 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_type_name')" prop="product_grade">
                <el-select
                  v-model="addForm.inventory_type"
                  filterable
                  clearable
                  @change="typeChange"
                >
                  <el-option
                    v-for="(item, index) in commonLists.typeList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 型号 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.model_number_name')" prop="product_grade">
                <el-select
                  v-model="addForm.model_number"
                  filterable
                  clearable
                  @change="modelChange"
                >
                  <el-option
                    v-for="(item, index) in commonLists.modelList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.adjust_type_name')" prop="adjust_type">
                <el-radio-group v-model="addForm.adjust_type" @change="adjustTypeChange">
                  <el-radio :label="0">调增</el-radio>
                  <el-radio :label="1">调减</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 可调数量 -->
          <el-row v-if="addForm.adjust_type === 1">
            <el-col :span="24">
              <el-form-item label="可调数量" prop="number">
                <el-input v-model="addForm.number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 调减原因 -->
          <el-row v-if="addForm.adjust_type == 1">
            <el-col :span="24">
              <el-form-item :label="$t('common.minus_adjust_type_name')" prop="minus_adjust_type">
                <el-select clearable filterable v-model="addForm.minus_adjust_type">
                  <el-option
                    v-for="(item, index) of commonLists.minusAdjustTypeList"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                    :disabled="item.id == 1 && addForm.product_grade == 2"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 调整后产品等级为递减&调减原因为 等级调整 -->
          <el-row
            v-if="
              addForm.adjust_type == 1 &&
                addForm.minus_adjust_type == 1 &&
                addForm.product_grade !== 2
            "
          >
            <el-col :span="24">
              <el-form-item :label="$t('common.adjust_product_grade')" prop="adjust_product_grade">
                <el-select clearable filterable v-model="addForm.adjust_product_grade">
                  <el-option
                    v-for="(item, index) of commonLists.productGradeList"
                    :key="index"
                    :value="item.product_grade"
                    :label="item.name"
                    :disabled="item.product_grade <= addForm.product_grade"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 调整数量 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_number')" prop="inventory_number">
                <el-input v-model="addForm.inventory_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 原因 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.reason')" prop="reason">
                <el-input type="textarea" v-model="addForm.reason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 递减才显示表格数据 -->
        <div v-if="addForm.adjust_type === 1">
          <el-table :data="tableData" stripe style="width: 100%">
            <!-- 库存id -->
            <el-table-column prop="inventory_id" :label="$t('common.inventory_id')" />
            <!-- 批次号 -->
            <el-table-column prop="order_number" :label="$t('common.order_number')" />
            <!-- 存量 -->
            <el-table-column prop="stock" :label="$t('common.stock')" />
            <!-- 调整数量 -->
            <el-table-column prop="adjust_number" :label="$t('common.inventory_number')">
              <template #default="{row}">
                <el-form>
                  <!-- 验证输入是否合法 -->
                  <el-form-item
                    :inline-message="true"
                    prop="adjust_number"
                    :rules="[
                      {
                        validator: (rule, value, callback) => {
                          checkValueValid(rule, value, callback, row)
                        },
                        trigger: ['blur', 'change']
                      }
                    ]"
                  >
                    <el-input style="width: auto;" v-model.number="row.adjust_number" />
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <!-- 调整后数量 -->
            <el-table-column :label="$t('common.after_number')">
              <template #default="{row}">
                {{ row.stock - row.adjust_number }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box-button">
        <el-button @click="onSubmitAdd" type="success" plain>{{ $t('common.submit') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { stocktakingApi } from '@/http/api/othcustom/stockset/stocktaking'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { dateNormOne, datetimeNormOne, dateNormArray } from '@/utils/dateNorm'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed, onMounted, watch } from 'vue'
import { compareNumber } from '@/utils/regp'
interface IState {
  tableData: Array<any>
  addForm: {
    warehouse: any
    inventory_type: any
    model_number: any
    number: any
    sale_number: any
    inventory_number: any
    adjust_type: any
    reason: any
    product_grade: any
    adjust_product_grade: any
    inventory_id: any
    // 其他不必传后端辅助字段
    minus_adjust_type: any
    stock: any
  }
  commonLists: any
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
  emits: ['reset', 'typeChange'],

  setup(props, ctx) {
    const { t } = useI18n()
    watch(
      () => props.commonLists.wareHouseList,
      () => {
        if (props.commonLists.wareHouseList) {
          state.addForm.warehouse = props.commonLists.wareHouseList[0].id
        }
      }
    )

    const state: IState = reactive({
      /**表格数据 */
      tableData: [],
      addForm: {
        /**仓库 */
        warehouse: '',
        inventory_type: '',
        model_number: '',
        number: null,
        sale_number: null,
        inventory_number: null,
        /**0递增 1递减 */
        adjust_type: null,
        reason: '',
        product_grade: 0, //初始值必须为零
        adjust_product_grade: null,
        inventory_id: '',
        // 其他不必传后端辅助字段
        minus_adjust_type: null,
        stock: null
      },
      commonLists: props.commonLists,
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
    const addRule = computed(() => {
      const rule = {
        model_number: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        number: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        sale_number: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_id: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        adjust_type: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        inventory_number: [
          {
            required: true,
            validator: (rule: object, value: string, callback: Function) => {
              let arg1 = state.addForm.inventory_number
              let arg2 = state.addForm.stock
              // 调减1 时就比较，初始null和调增0不比较
              let isCompare = state.addForm.adjust_type
              compareNumber(rule, value, callback, arg1, arg2, isCompare)
            }
          },
          { validator: valid.checkOthers.validatorFun }
        ],
        reason: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        product_grade: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        adjust_product_grade: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ],
        minus_adjust_type: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })

    const requests = {
      getAdd() {
        const data = dataStructure({ power_url: 'V1/InventoryInformation/add' }, state.addForm)
        stocktakingApi
          .get_add(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
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
      getAddView() {
        const data = dataStructure(
          {},
          {
            inventory_type: state.addForm.inventory_type,
            model_number: state.addForm.model_number,
            product_grade: state.addForm.product_grade,
            warehouse: state.addForm.warehouse
          }
        )
        stocktakingApi
          .get_add_view(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              console.log(custom_data)
              for (let item of custom_data.data) {
                item.adjust_number = 0
              }
              state.tableData = custom_data.data || []
              // 设置可操作数量（递减显示）
              state.addForm.number = custom_data.number
              // const { inventory_id, number, product_grade, sale_number, stock } = custom_data
              // state.addForm.inventory_id = inventory_id
              // state.addForm.number = number
              // state.addForm.product_grade = product_grade
              // state.addForm.sale_number = sale_number
              // state.addForm.stock = stock
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      /**检测输入的值是否合法 */
      checkValueValid(rule: any, value: any, callback: any, row: any) {
        console.log(rule, value, callback, row)
        // 调整数量不能大于库存数量
        const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
        if (!value) {
          callback(new Error(t('common.not_empty')))
        } else if (parseInt(row.adjust_number) > parseInt(row.stock)) {
          callback(new Error(`${t('common.not_greater_than')}${row.handle_number}`))
        } else if (!regpOnlyNum.test(value)) {
          callback(new Error(t('common.regpOnlyNum')))
        } else {
          callback()
        }
      },
      adjustTypeChange() {
        state.addForm.inventory_number = null
      },
      modelChange() {
        requests.getAddView()
      },
      typeChange() {
        state.addForm.model_number = null
        let arg = state.addForm.inventory_type
        ctx.emit('typeChange', arg)
      },
      reset(arg: any) {
        // 重置表单
        const addref = addRef
        addref.value.resetFields()
        ctx.emit('reset', arg)
      },
      // 选择调整前产品等级后清空调整后产品等级
      productGradeChange() {
        state.addForm.adjust_product_grade = null
        requests.getAddView()
      },
      onSubmitAdd() {
        const addref = addRef
        addref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
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
        })
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      addRule,
      addRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
