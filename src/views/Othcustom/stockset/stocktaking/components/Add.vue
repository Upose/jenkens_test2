<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 09:52:12
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
                <el-select @change="getNewList" filterable v-model="addForm.warehouse">
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
          <!-- 调整前产品等级 (本身产品等级)-->
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
              <el-form-item :label="$t('common.minus_adjust_type_name')" prop="adjust_type_reason">
                <el-select clearable filterable v-model="addForm.adjust_type_reason">
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
                addForm.adjust_type_reason == 1 &&
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
          <el-row v-if="!canEdit">
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_number')" prop="inventory_number">
                <el-input
                  @blur="autoChangeTableValue"
                  v-model.number="addForm.inventory_number"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="canEdit">
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_number')">
                <el-input disabled v-model.number="addForm.inventory_number"></el-input>
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
          <!-- 是否启用手动编辑 -->
          <div>
            <div style="font-size: 16px;margin: 10px 0;">
              手动编辑
              <el-switch @change="switchChange" v-model="canEdit" />
            </div>
          </div>
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
                <el-form ref="addChildRef" :model="row" :inline-message="true">
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
                    <el-input
                      :disabled="!canEdit"
                      style="width: auto;"
                      v-model.number="row.adjust_number"
                    />
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <!-- 调整后数量 -->
            <el-table-column :label="$t('common.after_number')">
              <template #default="{row}">
                {{ delComma(row.stock) - delComma(row.adjust_number) }}
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
import { ElMessageBox, ElMessage } from 'element-plus'
import { IValid } from '../typings'
import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue'
import { formatNumber, delComma } from '@/utils/thousand'
interface IState {
  /**是否可以编辑 */
  canEdit: boolean
  tableData: Array<any>
  addForm: {
    warehouse: any
    inventory_type: any
    model_number: any
    number: any
    inventory_number: any
    adjust_type: any
    reason: any
    product_grade: any
    adjust_product_grade: any
    /**调减原因 */
    adjust_type_reason: any
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
      /**是否可以编辑 */
      canEdit: false,
      /**表格数据 */
      tableData: [],
      addForm: {
        /**仓库 */
        warehouse: '',
        /**品名 */
        inventory_type: '',
        /**型号 */
        model_number: '' as any,
        /**可调数量 */
        number: null as any,
        /**调整数量 */
        inventory_number: null as any,
        /**0递增 1递减 */
        adjust_type: null as any,
        /**调减原因   调增不需要  1 物品丢失  2 等级调整 */
        adjust_type_reason: '',
        /**调整原因*/
        reason: '',
        /**本身产品等级 */
        product_grade: 0, //初始值必须为零
        /**调整后产品等级 */
        adjust_product_grade: null as any
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
    const addChildRef = ref()
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
        // 调整数量
        inventory_number: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule: object, value: string, callback: Function) => {
              // 调整数量不能大于库存数量
              const regpOnlyNum = /^[0-9]*[1-9][0-9]*$/
              if (!value) {
                callback(new Error(t('common.not_empty')))
              } else if (
                delComma(value) > delComma(state.addForm.number) &&
                state.addForm.adjust_type === 1
              ) {
                callback(new Error(`${t('common.not_greater_than')}${state.addForm.number}`))
              } else if (!regpOnlyNum.test(value.toString())) {
                callback(new Error(t('common.regpOnlyNum')))
              } else {
                callback()
              }
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
        adjust_type_reason: [
          { required: true, message: t('common.not_empty') },
          { validator: valid.checkOthers.validatorFun }
        ]
      }
      return rule
    })

    const requests = {
      sureAdd() {
        //设置调整数量为千分符
        const form = JSON.parse(JSON.stringify(state.addForm))
        const tableDate = JSON.parse(JSON.stringify(state.tableData))
        form.inventory_number = formatNumber(form.inventory_number)
        for (let item of tableDate) {
          // 调整后数量
          item.adjust_after_number = formatNumber(
            delComma(item.stock) - delComma(item.adjust_number)
          )
          // 设置调整数量 千分符
          item.adjust_number = formatNumber(item.adjust_number)
        }
        const data = dataStructure(
          { power_url: 'V1/InventoryInformation/add' },
          {
            ...form,
            data: tableDate
          }
        )
        stocktakingApi
          .get_add(data)
          .then(res => {
            console.log(res)
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
            console.log(res)

            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              if (custom_data.data) {
                for (let item of custom_data.data) {
                  item.adjust_number = 0
                }
              }
              state.tableData = custom_data.data || []
              // 设置可操作数量（递减显示）
              state.addForm.number = custom_data.number || 0
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      /**点击可编辑之后 清除相关信息 */
      switchChange() {
        state.addForm.inventory_number = 0
        for (let content of state.tableData) {
          content.adjust_number = 0
        }
      },
      /**根据输入的调整数量 自动分配给表格中的调整数量 */
      autoChangeTableValue() {
        let inputNum = state.addForm.inventory_number
        if (state.addForm.adjust_type === 1 && state.tableData.length) {
          // 在(调整数量小于等于库存)&(递减) 的时候去自动填充
          if (
            delComma(state.addForm.inventory_number) <= delComma(state.addForm.number) &&
            state.addForm.inventory_number
          ) {
            for (let item of state.tableData) {
              item.adjust_number = 0
            }
            const table = state.tableData
            for (let i = 0; i < table.length; i++) {
              if (inputNum === 0) return
              if (delComma(table[i].stock) <= inputNum) {
                table[i].adjust_number = delComma(table[i].stock)
                inputNum -= delComma(table[i].adjust_number)
              } else {
                table[i].adjust_number = inputNum
                inputNum = 0
              }
            }
          }
        }
      },
      getNewList() {
        requests.getAddView()
        state.addForm.inventory_number = null
      },
      /**检测输入的值是否合法 */
      checkValueValid(rule: any, value: any, callback: any, row: any) {
        // 是否是数字（包括0 正负数）
        const regpOnlyNum = /^([0-9]+\.?[0-9]*|-[0-9]+\.?[0-9]*)$/
        if (!value && value !== 0) {
          callback(new Error(t('common.not_empty')))
        } else if (delComma(row.adjust_number) > delComma(row.stock)) {
          callback(new Error(`${t('common.not_greater_than')}${row.stock}`))
        } else if (!regpOnlyNum.test(value.toString())) {
          callback(new Error(t('common.regpOnlyNum')))
        } else {
          state.addForm.inventory_number = 0
          for (let item of state.tableData) {
            state.addForm.inventory_number += Number(item.adjust_number)
          }
          if (state.canEdit) {
            state.addForm.inventory_number = formatNumber(state.addForm.inventory_number)
          }
          callback()
        }
      },
      adjustTypeChange() {
        state.addForm.inventory_number = null
      },
      modelChange() {
        state.addForm.inventory_number = null
        requests.getAddView()
      },
      /**切换品名 */
      typeChange() {
        state.addForm.inventory_number = null

        state.addForm.model_number = null
        let arg = state.addForm.inventory_type
        state.tableData = []
        state.addForm.number = 0
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
            // 判断是递增还是递减 0递增 1递减
            if (state.addForm.adjust_type === 0) {
              //递增
              ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
                confirmButtonText: t('common.confirm'),
                cancelButtonText: t('common.cancel'),
                type: 'warning'
              })
                .then(() => {
                  requests.sureAdd()
                })
                .catch(e => e)
            } else {
              // 递减
              const form = addChildRef
              form.value.validate((vali: boolean) => {
                if (vali) {
                  // 用户输入的内容校验成功才发起请求
                  ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
                    confirmButtonText: t('common.confirm'),
                    cancelButtonText: t('common.cancel'),
                    type: 'warning'
                  })
                    .then(() => {
                      requests.sureAdd()
                      return
                    })
                    .catch(e => e)
                }
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
      addRef,
      addChildRef,
      delComma,
      formatNumber
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
</style>
