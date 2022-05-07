<!--
 * @Descripttion: 货位调整
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 15:36:38
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-07 11:30:29
-->
<!-- 货位调整 -->
<template>
  <el-drawer :title="$t(`common.upd`)" :size="700" v-model="showEdit">
    <div class="box-card formStyle">
      <div class="box-form">
        <el-form
          :model="editForm"
          label-width="200px"
          :rules="editRule"
          ref="editRef"
          label-position="left"
        >
          <!-- 仓库 -->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.inventory_warehouse_name')" prop="product_grade">
                <el-select @change="getNewList" filterable v-model="editForm.warehouse">
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
                  v-model="editForm.product_grade"
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
                  v-model="editForm.inventory_type"
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
                  v-model="editForm.model_number"
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
        </el-form>
        <!-- 递减才显示表格数据 -->
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <!-- 库存id -->
            <el-table-column prop="inventory_id" :label="$t('common.inventory_id')" />
            <!-- 货位 -->
            <el-table-column prop="inventory_location" :label="$t('common.inventory_location')">
              <template #default="{row}">
                <el-form ref="editChildRef" :model="row" :inline-message="true">
                  <!-- 验证输入是否合法 -->
                  <el-form-item
                    :inline-message="true"
                    prop="inventory_location"
                    :rules="[
                      {
                        required: true,
                        message: $t('common.not_empty'),
                        trigger: ['blur', 'change']
                      }
                    ]"
                  >
                    <el-input style="width: auto;" v-model="row.inventory_location" />
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box-button">
        <el-button @click="sureEdit" type="success" plain>{{ $t('common.submit') }}</el-button>
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
  tableData: Array<any>
  editForm: {
    warehouse: any
    inventory_type: any
    model_number: any
    product_grade: any
  }
  commonLists: any
  showEdit: boolean
}

export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    },
    showEdit: {
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
          state.editForm.warehouse = props.commonLists.wareHouseList[0].id
        }
      }
    )

    const state: IState = reactive({
      /**表格数据 */
      tableData: [],
      editForm: {
        /**仓库 */
        warehouse: '',
        /**品名 */
        inventory_type: '',
        /**型号 */
        model_number: '' as any,
        /**本身产品等级 */
        product_grade: 0 //初始值必须为零
      },
      commonLists: props.commonLists,
      showEdit: props.showEdit
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
    const editRef = ref()
    const editChildRef = ref()
    const editRule = computed(() => {
      const rule = {
        model_number: [
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
        ]
      }
      return rule
    })

    const requests = {
      /**确认修改 */
      sureEdit() {
        const editForm = editRef
        const form = editChildRef
        if (!state.tableData.length) return
        editForm.value.validate((valid: boolean) => {
          if (valid) {
            form.value.validate((valid2: boolean) => {
              if (valid2) {
                ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
                  confirmButtonText: t('common.confirm'),
                  cancelButtonText: t('common.cancel'),
                  type: 'warning'
                })
                  .then(() => {
                    const tableDate = []
                    for (let item of state.tableData) {
                      let obj = {
                        inventory_id: item.inventory_id,
                        inventory_location: item.inventory_location
                      }
                      tableDate.push(obj)
                    }
                    const data = dataStructure(
                      {
                        power_url: 'V1/InventoryInformation/adjust_product_position'
                      },
                      {
                        data: tableDate
                      }
                    )
                    console.log(data)
                    stocktakingApi
                      .adjust_product_position(data)
                      .then(res => {
                        let { status, custom_data, info } = res as IRequest
                        if (status === 200) {
                          ElMessage.success(info)
                          methods.reset('edit')
                        }
                      })
                      .catch(err => err)
                  })
                  .catch(e => e)
              }
            })
          }
        })
      },
      geteditView() {
        const data = dataStructure(
          {},
          {
            inventory_type: state.editForm.inventory_type,
            model_number: state.editForm.model_number,
            product_grade: state.editForm.product_grade,
            warehouse: state.editForm.warehouse
          }
        )
        stocktakingApi
          .get_add_view(data)
          .then(res => {
            console.log(res)
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.tableData = custom_data.data || []
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      getNewList() {
        requests.geteditView()
      },
      /**检测输入的值是否合法 */
      checkValueValid(rule: any, value: any, callback: any, row: any) {},
      adjustTypeChange() {},
      modelChange() {
        requests.geteditView()
      },
      /**切换品名 */
      typeChange() {
        state.editForm.model_number = null
        let arg = state.editForm.inventory_type
        state.tableData = []
        ctx.emit('typeChange', arg)
      },
      reset(arg: any) {
        // 重置表单
        const editref = editRef
        editref.value.resetFields()
        ctx.emit('reset', arg)
      },
      // 选择调整前产品等级后清空调整后产品等级
      productGradeChange() {
        requests.geteditView()
      },
      onSubmitedit() {
        const editref = editRef
        editref.value.validate((valid: boolean) => {})
      }
    }
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      editRule,
      editRef,
      editChildRef,
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
