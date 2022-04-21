<template>
  <div class="content">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.menuset_header') }}</span>
        </div>
        <!-- <div class="part_line"></div> -->
        <div class="top">
          <div></div>

          <div>
            <template v-for="item in buttonData" :key="item.widget_id">
              <el-button
                type="success"
                plain
                v-if="item.widget_id !== 'view'"
                :disabled="item.widget_id == 'add' ? false : isEmeptyObj"
                @click="handle(item.widget_id)"
                >{{ item.name }}</el-button
              >
            </template>
          </div>
        </div>
        <div class="tab">
          <el-table
            highlight-current-row
            :height="tableHeight"
            :data="tableData"
            ref="singleTable"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            row-key="id"
            default-expand-all
            :tree-props="{
              children: 'children',
              hasChildren: 'hasChildren'
            }"
          >
            <el-table-column
              show-overflow-tooltip
              prop="name"
              :label="$t('common.name')"
              width="220"
            >
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="id" :label="$t('common.id')" width="100">
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="is_enabled"
              :label="$t('common.is_enabled')"
              width="100"
            >
              <template #default="scope">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  disabled
                  v-model="scope.row.is_enabled"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="menu_url" :label="$t('common.menu_url')">
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="created_name"
              :label="$t('common.created_name')"
              width="100"
            >
            </el-table-column>

            <el-table-column
              show-overflow-tooltip
              prop="created_at"
              :label="$t('common.created_at')"
              width="200"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="updated_at"
              :label="$t('common.updated_at')"
              width="200"
            >
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="bot">
          
        </div> -->
      </div>
    </div>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showAdd">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="addForm"
            label-width="200px"
            :rules="addRule"
            ref="addRef"
            label-position="left"
          >
            <el-form-item :label="$t('common.menu_type')" prop="menu_type">
              <el-input v-model="addForm.menu_type"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_nid')" prop="menu_nid">
              <el-input v-model="addForm.menu_nid"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.parent_id')" prop="parent_id">
              <el-input v-model="addForm.parent_id"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_cn')" prop="name_cn">
              <el-input v-model="addForm.name_cn"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_en')" prop="name_en">
              <el-input v-model="addForm.name_en"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_fr')" prop="name_fr">
              <el-input v-model="addForm.name_fr"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_url')" prop="menu_url">
              <el-input v-model="addForm.menu_url"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_url_actual')" prop="menu_url_actual">
              <el-input v-model="addForm.menu_url_actual"></el-input>
            </el-form-item>
            <!-- 菜单类型显示(0非显示1显示) -->
            <el-form-item :label="$t('common.menu_display')" prop="menu_display">
              <el-input v-model="addForm.menu_display"></el-input>
            </el-form-item>
            <!-- 显示样式(默认单列为null多列数值对应每列个数) -->
            <el-form-item :label="$t('common.menu_display_style')" prop="menu_display_style">
              <el-input v-model="addForm.menu_display_style"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_icon')" prop="menu_icon">
              <el-input v-model="addForm.menu_icon"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input v-model="addForm.order_by"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="addForm.is_enabled"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitAdd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showUpd">
      <div class="box-card formStyle">
        <div class="box-form">
          <el-form
            :model="updForm"
            label-width="200px"
            :rules="updRule"
            ref="updRef"
            label-position="left"
          >
            <el-form-item :label="$t('common.menu_type')" prop="menu_type">
              <el-input v-model="updForm.menu_type"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_nid')" prop="menu_nid">
              <el-input v-model="updForm.menu_nid"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.parent_id')" prop="parent_id">
              <el-input v-model="updForm.parent_id"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_cn')" prop="name_cn">
              <el-input v-model="updForm.name_cn"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_en')" prop="name_en">
              <el-input v-model="updForm.name_en"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.name_fr')" prop="name_fr">
              <el-input v-model="updForm.name_fr"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_url')" prop="menu_url">
              <el-input v-model="updForm.menu_url"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_url_actual')" prop="menu_url_actual">
              <el-input v-model="updForm.menu_url_actual"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_display')" prop="menu_display">
              <el-input v-model="updForm.menu_display"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_display_style')" prop="menu_display_style">
              <el-input v-model="updForm.menu_display_style"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.menu_icon')" prop="menu_icon">
              <el-input v-model="updForm.menu_icon"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.order_by')" prop="order_by">
              <el-input v-model="updForm.order_by"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="updForm.is_enabled"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-button">
          <el-button @click="onSubmitUpd" type="success">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t(`common.${itemName}`)" :size="576" v-model="drawer.showDetail">
      <div class="box-card desLabel">
        <div class="box-form">
          <el-descriptions :title="$t('common.base_info')" :column="1">
            <el-descriptions-item :label="$t('common.id') + ':'">{{
              singleSelection.id
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.menu_nid') + ':'">{{
              singleSelection.menu_nid
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.parent_id') + ':'">{{
              singleSelection.parent_id
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.name_cn') + ':'">{{
              singleSelection.name_cn
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.menu_url') + ':'">{{
              singleSelection.menu_url
            }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions :title="$t('common.handle_info')" :column="1">
            <!-- <el-descriptions-item label="操作信息" :span="2">
                </el-descriptions-item> -->
            <el-descriptions-item :label="$t('common.created_name') + ':'">{{
              singleSelection.created_name
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.is_enabled') + ':'">
              <el-switch disabled active-color="#13ce66" v-model="singleSelection.is_enabled">
              </el-switch>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.created_at') + ':'">
              {{ singleSelection.created_at }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.updated_at') + ':'">{{
              singleSelection.updated_at
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref, nextTick } from 'vue'
import { menusetApi } from '@/http/api/system/manage/menuset'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IState, ISelection } from './typings'
import { IPower } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useI18n } from 'vue-i18n'
import { checkOnlyNumZero } from '@/utils/regp'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const singleTable = ref()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const selection: ISelection = reactive({
      singleSelection: {}
    })
    const isEmeptyObj = computed(() => {
      return Object.keys(selection.singleSelection).length === 0 ? true : false
    })

    const state: IState = reactive({
      tableData: [],
      drawer: {
        showAdd: false,
        showUpd: false,
        showDetail: false
      },
      tableHeight: '100%',
      itemName: 'add',
      searchValue: '',
      addForm: {
        menu_type: '',
        menu_nid: '',
        parent_id: '',
        name_cn: '',
        name_en: '',
        name_fr: '',
        menu_url: '',
        menu_url_actual: '',
        menu_display: '',
        menu_display_style: '',
        menu_icon: '',
        order_by: '',
        is_enabled: null
      },

      updForm: {
        id: '',
        menu_type: '',
        menu_nid: '',
        parent_id: '',
        name_cn: '',
        name_en: '',
        name_fr: '',
        menu_url: '',
        menu_url_actual: '',
        menu_display: '',
        menu_display_style: '',
        menu_icon: '',
        order_by: '',
        is_enabled: null
      },
      buttonData: []
    })
    const addRef = ref()
    const updRef = ref()
    const addRule = computed(() => {
      const rule = {
        menu_type: [{ required: true, message: t('common.not_empty') }],
        menu_nid: [{ required: true, message: t('common.not_empty') }],
        parent_id: [{ required: true, message: t('common.not_empty') }],
        name_cn: [{ required: true, message: t('common.not_empty') }],
        name_en: [{ required: true, message: t('common.not_empty') }],
        name_fr: [{ required: true, message: t('common.not_empty') }],
        menu_url: [{ required: true, message: t('common.not_empty') }],
        menu_url_actual: [{ required: true, message: t('common.not_empty') }],
        menu_display: [{ required: true, message: t('common.not_empty') }],
        order_by: [{ required: true, validator: checkOnlyNumZero }],
        is_enabled: [{ required: true, message: t('common.not_empty') }]
      }
      return rule
    })
    const updRule = computed(() => {
      const rule = {
        id: [{ required: true, message: t('common.not_empty') }],
        menu_type: [{ required: true, message: t('common.not_empty') }],
        menu_nid: [{ required: true, message: t('common.not_empty') }],
        parent_id: [{ required: true, message: t('common.not_empty') }],
        name_cn: [{ required: true, message: t('common.not_empty') }],
        name_en: [{ required: true, message: t('common.not_empty') }],
        name_fr: [{ required: true, message: t('common.not_empty') }],
        menu_url: [{ required: true, message: t('common.not_empty') }],
        menu_url_actual: [{ required: true, message: t('common.not_empty') }],
        menu_display: [{ required: true, message: t('common.not_empty') }],
        order_by: [{ required: true, validator: checkOnlyNumZero }],
        is_enabled: [{ required: true, message: t('common.not_empty') }]
      }
      return rule
    })
    const requests = {
      getList(searchValue: string | null = null) {
        const data = dataStructure(
          {},
          {
            search_value: searchValue,
            order_by: 1
          }
        )
        menusetApi
          .get_list(data)
          .then((res: any) => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              let tableData: any = dateNormArray(custom_data.role_value)
              state.tableData = tableData
            }
          })
          .catch((err: any) => err)
      },
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        menusetApi
          .get_index(data)
          .then((res: any) => {
            let { status, power } = res as IRequest
            if (status === 200) {
              let hasView
              power.forEach((item: IPower) => {
                if (item.widget_id === 'view') {
                  requests.getList()
                  state.buttonData = power
                  hasView = true
                }
              })
              if (!hasView) {
                router.push('/index/noaccess')
              }
            } else if (status === 422) {
              router.push('/index/noaccess')
            }
          })
          .catch((err: any) => err)
      },
      getUpd() {
        const data = dataStructure({ power_url: 'V1/Menu/upd' }, state.updForm)
        menusetApi
          .get_upd(data)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              window.location.reload
            }
          })
          .catch((err: any) => err)
      },
      //  menu添加接口：V1/Menu/add
      getAdd() {
        const data = dataStructure({ power_url: 'V1/Menu/add' }, state.addForm)
        menusetApi
          .get_add(data)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              window.location.reload
            }
          })
          .catch((err: any) => err)
      },
      getDel(id: number) {
        const data = dataStructure(
          { power_url: 'V1/Menu/del' },
          {
            id: id
          }
        )
        menusetApi
          .get_del(data)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              window.location.reload
            }
          })
          .catch((err: any) => err)
      },
      getView(id: number) {
        return new Promise<any>((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          menusetApi
            .get_view(data)
            .then((res: any) => {
              let { status, custom_data, info } = res as IRequest
              if (status === 200) {
                const {
                  id,
                  menu_type,
                  menu_nid,
                  parent_id,
                  name_cn,
                  name_en,
                  name_fr,
                  menu_url,
                  menu_url_actual,
                  menu_display,
                  menu_display_style,
                  menu_icon,
                  order_by,
                  is_enabled
                } = custom_data.role_value
                state.updForm = {
                  id,
                  menu_type,
                  menu_nid,
                  parent_id,
                  name_cn,
                  name_en,
                  name_fr,
                  menu_url,
                  menu_url_actual,
                  menu_display,
                  menu_display_style,
                  menu_icon,
                  order_by,
                  is_enabled
                }
                resolve('可以显示修改页面了')
              }
            })
            .catch((err: any) => err)
        })
      }
    }
    const methods = {
      handle(arg: any) {
        switch (arg) {
          case 'add':
            state.itemName = 'add'
            state.drawer.showAdd = true
            break
          case 'upd':
            const { id } = selection.singleSelection
            requests.getView(id).then((value: any) => {
              state.itemName = 'upd'
              state.drawer.showUpd = true
            })
            break
          case 'del':
            methods.doDel()
            break
          default:
            break
        }
      },
      reset(arg: any) {
        requests.getList()
        // 重置表单
        let handleRef = null
        switch (arg) {
          case 'add':
            state.drawer.showAdd = false
            handleRef = addRef
            break
          case 'upd':
            state.drawer.showUpd = false
            handleRef = updRef
            break
          default:
            break
        }
        // methods.reset('del')
        if (handleRef) {
          handleRef.value.resetFields()
        }
        // 取消选中状态
        selection.singleSelection = {}
      },

      rowDblclick(row: object) {
        state.itemName = 'detail'
        state.drawer.showDetail = true
        selection.singleSelection = row
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
      },
      onSubmitUpd() {
        const updref = updRef
        updref.value.validate((valid: boolean) => {
          if (valid) {
            // 用户输入的内容校验成功才发起请求
            ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.getUpd()
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: t('common.cancelUpd')
                })
              })
          }
        })
      },

      // 删除按钮
      doDel() {
        state.itemName = 'del'
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            let singleSelection = selection.singleSelection
            let id = singleSelection.id
            requests.getDel(id)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelDel')
            })
          })
      },

      //切换选择
      rowClick(val: any) {
        selection.singleSelection = val
      }
    }
    onMounted(() => {
      requests.getIndex()
    })
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      singleTable,
      addRule,
      updRule,
      addRef,
      updRef,
      ...toRefs(selection),
      isEmeptyObj
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/table.scss';
@import '../../../../assets/css/element-common-style.scss';

@import '@/assets/css/page-common.scss'; //页面基础布局样式一
</style>
