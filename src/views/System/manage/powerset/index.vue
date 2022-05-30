<template>
  <div class="content powerset">
    <div class="left_cont">
      <div class="box">
        <div class="header">
          <span>{{ $t('common.powerset_header') }}</span>
        </div>
        <!-- <div class="part_line"></div> -->
        <!-- <div class="top"></div> -->
        <div class="tab">
          <div class="tab_cont">
            <!-- 分类列表 -->
            <div class="box-cards">
              <div class="card_header">
                <span>{{ $t('common.type_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-menu :default-active="defaultActive">
                  <el-menu-item
                    v-for="(item, inde) of typeList"
                    :index="item.menu_url"
                    :key="inde"
                    @click="menuSelect(item.id)"
                  >
                    {{ item.name }}
                  </el-menu-item>
                </el-menu>
              </div>
            </div>

            <!-- 
						<el-card class="box-cards">
							<template #header>
								<div>
									<span>{{ $t('common.type_list') }}</span>
								</div>
							</template>
							<el-menu :default-active="defaultActive">
								<el-menu-item
									v-for="(item, inde) of typeList"
									:index="item.menu_url"
									:key="inde"
									@click="menuSelect(item.id)"
								>
									{{ item.name }}
								</el-menu-item>
							</el-menu>
						</el-card> -->

            <!-- 菜单相关 开始-->
            <!-- <div v-show="showCard == 'menu'" class="div_box"> -->
            <!-- 菜单：角色 -->
            <div class="box-cards" v-show="showCard == 'menu'">
              <div class="card_header">
                <span>{{ $t('common.role_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-radio-group v-model="menuData.role_id" @change="menuRoleChange">
                  <el-radio v-for="item of menuData.roleList" :key="item.id" :label="item.id">
                    {{ item.name }}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <!-- 菜单 -->
            <div class="box-cards" v-show="showCard == 'menu' && menuData.role_id !== -1">
              <div class="card_header">
                <span>{{ $t('common.menu_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-tree
                  :highlight-current="true"
                  :data="menuData.menuList"
                  :props="menuData.defaultProps"
                  accordion
                  @node-click="menuChange"
                  node-key="id"
                >
                </el-tree>
              </div>
            </div>

            <!-- 菜单：权限 -->
            <div
              style="position:relative"
              class="box-cards"
              v-show="showCard == 'menu' && menuData.menu_id"
            >
              <div class="card_header">
                <span>{{ $t('common.power_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-checkbox-group v-model="menuData.widget_ids">
                  <el-checkbox
                    v-for="item of menuData.powerList"
                    :key="item.id"
                    :label="item.widget_id"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
                <el-button
                  @click="menuUpd"
                  style="bottom:10px;right:10px;position:absolute"
                  type="primary"
                  >{{ $t('common.submit') }}</el-button
                >
              </div>
            </div>
            <!-- </div> -->
            <!-- 菜单相关结束 -->
            <!-- 机构相关开始 -->
            <!-- <div v-show="showCard == 'org'" class="div_box"> -->
            <!-- 机构列表 -->
            <div class="box-cards" v-show="showCard == 'org'">
              <div class="card_header">
                <span>{{ $t('common.org_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-tree
                  ref="treeRef"
                  :highlight-current="true"
                  :indent="8"
                  node-key="id"
                  :data="orgData.orgList"
                  :props="orgData.defaultProps"
                  accordion
                  @node-click="orgChange"
                >
                </el-tree>
              </div>
            </div>
            <!-- 机构角色 -->
            <div
              class="box-cards"
              v-show="showCard == 'org' && orgData.org_id"
              style="position:relative"
            >
              <div class="card_header">
                <span>{{ $t('common.role_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-checkbox-group v-model="orgData.role_id">
                  <el-checkbox
                    v-for="item of orgData.roleList"
                    :key="item.id"
                    :label="item.id"
                    :checked="!!item.pitch_on"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
                <el-button
                  @click="orgUpd('修改')"
                  style="bottom:10px;right:10px;position:absolute"
                  type="primary"
                  >{{ $t('common.submit') }}</el-button
                >
              </div>
            </div>

            <!-- </div> -->
            <!-- 机构相关结束 -->
            <!-- 人员相关 开始-->
            <!-- <div v-show="showCard == 'user'" class="div_box"> -->
            <div class="box-cards" v-show="showCard == 'user'">
              <div class="card_header">
                <span>{{ $t('common.role_list') }}</span>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <el-radio-group v-model="userData.role_id" @change="userSecondChange">
                  <el-radio v-for="item of userData.roleList" :key="item.id" :label="item.id">
                    {{ item.name }}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="box-cards" v-show="showCard == 'user' && userData.role_id !== -1">
              <div class="card_header">
                <span>{{ $t('common.people_list') }}</span>
                <div class="card_button">
                  <el-button type="primary" @click="userAdd">{{ $t('common.add') }}</el-button>
                  <el-button :disabled="isEmeptyObj" type="primary" @click="userDel">
                    {{ $t('common.del') }}</el-button
                  >
                </div>
              </div>
              <div class="part_line"></div>
              <div class="card_body">
                <!--人员列表-->
                <el-table
                  :data="userData.userList"
                  highlight-current-row
                  ref="singleTable"
                  @row-click="rowClick"
                >
                  <el-table-column
                    show-overflow-tooltip
                    prop="object_user"
                    :label="$t('common.object_user')"
                  ></el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="full_name"
                    :label="$t('common.full_name')"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 人员相关结束-->
          </div>
        </div>
        <el-drawer v-model="showDrawer" :title="$t(`common.${itemName}`)" size="576">
          <div class="box-card formStyle">
            <div class="box-form">
              <el-form
                :model="addForm"
                label-width="250px"
                :rules="addRule"
                ref="addRef"
                label-position="left"
                :validate-on-rule-change="false"
              >
                <el-row>
                  <el-col :span="24">
                    <!-- 权限 -->
                    <el-form-item :label="$t('common.org_name')" prop="org_id">
                      <el-select filterable clearable v-model="addForm.org_name">
                        <el-option style="height: auto;padding: 0;">
                          <el-tree
                            :highlight-current="true"
                            node-key="id"
                            :data="userData.orgList"
                            :props="userData.defaultProps"
                            accordion
                            @node-click="handleChange"
                          >
                          </el-tree>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <!-- 权限 -->
                    <el-form-item :label="$t('common.object_user')" prop="object_user">
                      <el-select
                        filterable
                        clearable
                        v-model="addForm.object_user"
                        :placeholder="$t('common.search_user')"
                      >
                        <el-option
                          v-for="item in userData.objectUserList"
                          :key="item.value"
                          :label="item.full_name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="box-button">
              <el-button @click="onSubmitAdd" type="success">{{ $t('common.submit') }}</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
  <!-- <div v-show="!isView">
    当前页面没有访问权限
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { powersetApi } from '@/http/api/system/manage/powerset'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ISelection, IState } from './typings'
import { IPower } from '@/@types/iPower'
import { useI18n } from 'vue-i18n'
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
      itemName: 'add',
      tableHeight: '100%',
      defaultActive: '',
      typeList: [],
      addForm: {
        // full_name: '',
        org_name: '',
        org_id: '',
        object_user: ''
      },
      showDrawer: false,
      showCard: '',
      userData: {
        roleList: [],
        userList: [],
        role_id: -1,
        orgList: [],
        objectUserList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      menuData: {
        menuList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        role_id: -1,
        roleList: [],
        widget_ids: [], //复选框是数组
        powerList: [],
        menu_id: ''
      },
      orgData: {
        roleList: [],
        orgList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        role_id: [],
        org_id: null
      },
      pagination: {
        page: 1,
        perpage: 15
      }
    })
    const treeRef = ref()
    const addRule = computed(() => {
      const rule = {
        org_id: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ],
        object_user: [
          {
            required: true,
            message: t('common.not_empty')
          }
        ]
      }
      return rule
    })
    const requests = {
      // 权限设置组织机构对应员工接口：V1/Power/organization_staff_list
      getOrganizationStaffList() {
        const data = dataStructure({}, { org_id: state.addForm.org_id })
        powersetApi
          .get_organization_staff_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.userData.objectUserList = custom_data
            }
          })
          .catch(err => err)
      },
      // 权限设置人员_删除接口：V1/Power/staff_del
      getStaffDel() {
        const data = dataStructure(
          { power_url: 'V1/Power/staff_add' },
          {
            role_id: state.userData.role_id,
            object_user: selection.singleSelection.object_user
          }
        )
        powersetApi
          .get_staff_del(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              requests.getoleObjectUser()
            }
          })
          .catch(err => err)
      },
      // 权限设置人员_添加接口：V1/Power/staff_add
      getStaffAdd() {
        const data = dataStructure(
          { power_url: 'V1/Power/staff_add' },
          {
            role_id: state.userData.role_id,
            object_user: state.addForm.object_user
          }
        )
        powersetApi
          .get_staff_add(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              requests.getoleObjectUser()
              state.showDrawer = false
            }
          })
          .catch(err => err)
      },
      // 权限设置人员_角色接口：V1/Power/role_object_user
      getoleObjectUser() {
        const data = dataStructure({}, { page: 1, perpage: 15, role_id: state.userData.role_id })
        powersetApi
          .get_role_object_user(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.userData.userList = custom_data.data
            }
          })
          .catch(err => err)
      },
      // 权限设置人员接口：V1/Power/rolelist
      getRolelist() {
        const data = dataStructure({}, {})
        powersetApi
          .get_rolelist(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.userData.roleList = custom_data
            }
          })
          .catch(err => err)
      },
      // 权限设置机构_修改接口：V1/Power/organization_upd
      getOrganizationUpd() {
        const data = dataStructure(
          { power_url: 'V1/Power/menu_upd' },
          {
            role_id: state.orgData.role_id,
            object_user: state.orgData.org_id
          }
        )
        powersetApi
          .get_organization_upd(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      },
      // 权限设置机构_角色接口：V1/Power/organization_rolelist
      getOrganizationRolelist(org_id: number) {
        const data = dataStructure(
          {},
          {
            org_id: org_id
          }
        )
        powersetApi
          .get_organization_rolelist(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.orgData.roleList = custom_data
            }
          })
          .catch(err => err)
      },
      //  权限设置机构列表接口：V1/Power/organizationlist
      getOrganizationlist() {
        const data = dataStructure({}, {})
        powersetApi
          .get_organizationlist(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              switch (state.showCard) {
                case 'org':
                  state.orgData.orgList = custom_data
                  break
                case 'user':
                  state.userData.orgList = custom_data
                  break
                default:
                  break
              }
            }
          })
          .catch(err => err)
      },
      // 权限设置菜单_修改接口：V1/Power/menu_upd
      getMenuUpd() {
        const data = dataStructure(
          { power_url: 'V1/Power/menu_upd' },
          {
            role_id: state.menuData.role_id,
            menu_id: state.menuData.menu_id,
            widget_id: state.menuData.widget_ids
          }
        )
        powersetApi
          .get_menu_upd(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
            }
          })
          .catch(err => err)
      },
      // 权限设置菜单_角色_权限列表接口：V1/Power/menu_role_powerlist
      getMenuRolePowerlist() {
        const data = dataStructure(
          {},
          { menu_id: state.menuData.menu_id, role_id: state.menuData.role_id }
        )
        powersetApi
          .get_menu_role_powerlist(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.menuData.widget_ids = []
              custom_data.forEach((item: any) => {
                if (item.pitch_on) {
                  state.menuData.widget_ids.push(item.widget_id)
                }
              })
              state.menuData.powerList = custom_data
            }
          })
          .catch(err => err)
      },
      // 权限设置菜单_角色列表接口：V1/Power/menu_rolelist
      getMenuRolelist() {
        const data = dataStructure({}, { menu_id: state.menuData.menu_id })
        powersetApi
          .get_menu_rolelist(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.menuData.roleList = custom_data
            }
          })
          .catch(err => err)
      },
      // 权限设置菜单列表接口：V1/Power/menulist
      getMenulist() {
        const data = dataStructure({}, {})
        powersetApi
          .get_menulist(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.menuData.menuList = custom_data
            }
          })
          .catch(err => err)
      },

      // 权限设置接口：V1/Power/index
      getIndex() {
        const data = dataStructure({ power_url: route.path }, {})
        powersetApi
          .get_index(data)
          .then(res => {
            let { status, power, custom_data } = res as IRequest
            if (status === 200) {
              state.typeList = custom_data
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      handleChange(data: any, node: any, self: any) {
        state.addForm.org_id = data.id
        state.addForm.org_name = data.name
        state.addForm.object_user = ''
        requests.getOrganizationStaffList()
      },

      //切换选择
      rowClick(val: any) {
        //selection数组
        selection.singleSelection = val
      },
      // select第一块面板切换事件
      menuSelect(index: any) {
        if (index == 14) {
          if (!state.menuData.roleList.length) {
            // 只有在第三块面板没有值得情况请求，不用每次都请求
            requests.getMenuRolelist()
          }
          state.showCard = 'menu'
        } else if (index == 15) {
          requests.getOrganizationlist()
          state.showCard = 'org'
        } else if (index == 16) {
          state.showCard = 'user'
          requests.getRolelist()
        }
      },
      onSubmitAdd() {
        ElMessageBox.confirm(t('common.confirmAdd'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getStaffAdd()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelAdd')
            })
          })
      },
      // 人员删除按钮
      userDel() {
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getStaffDel()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelDel')
            })
          })
      },
      // 人员添加按钮
      userAdd() {
        state.showDrawer = true
        state.itemName = 'add'
        requests.getOrganizationlist()
      },
      userSecondChange() {
        requests.getoleObjectUser()
      },

      orgUpd() {
        ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getOrganizationUpd()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.confirmUpd')
            })
          })
      },
      // 机构第二块面板改变事件
      orgChange(data: any, node: any, self: any) {
        // 清空机构第三块面板数据
        state.orgData.roleList = []
        state.orgData.role_id = []
        let org_id = data.id
        state.orgData.org_id = org_id
        requests.getOrganizationRolelist(org_id)
      },

      menuUpd() {
        ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getMenuUpd()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.confirmUpd')
            })
          })
      },

      // 菜单角色单选框改变事件
      menuRoleChange() {
        if (state.menuData.role_id > 0) {
          //先清空第三块面板的data数据，和选中值
          state.menuData.menu_id = ''
          //先清空第四块面板的data数据，和选中值
          state.menuData.widget_ids = []
          state.menuData.powerList = []
          // 请求菜单数据
          requests.getMenulist()
        }
      },
      // 菜单菜单树节点点击
      menuChange(obj: any, node: any, self: any) {
        state.menuData.menu_id = obj.id
        //先清空第四块面板的data数据，和选中值
        state.menuData.widget_ids = []
        state.menuData.powerList = []
        // 请求权限列表数据
        requests.getMenuRolePowerlist()
      }
    }
    onMounted(() => {
      requests.getIndex()
      // requests.getMenulist()
    })
    return {
      ...toRefs(state),
      ...requests,
      ...methods,
      singleTable,
      ...toRefs(selection),
      treeRef,
      isEmeptyObj,
      addRule
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/table.scss';
@import '@/assets/css/element-common-style.scss';

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  .left_cont {
    flex: 1;
    box-sizing: border-box;
    background-color: #fff;
    border-right: 1px solid #e6ebf5;
    height: 100%;
    min-width: 1000px; //必须
    .box {
      box-sizing: border-box;
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .header {
        width: 100%;
        height: 50px;
      }

      .tab {
        flex: 1;
        height: 0;
        .tab_cont {
          height: 100%;
          display: flex;
          .box-cards {
            height: fit-content;
            min-height: 300px;
            max-height: 100%;
            width: 400px;
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            // 以下复制card样式
            border-radius: 4px;
            border: 1px solid #ebeef5;
            background-color: #fff;
            overflow: hidden;
            color: #303133;
            box-shadow: 0 2px 12px 0 rgba(41, 40, 40, 0.1);
            .card_header {
              padding: 10px 20px;
              display: flex;
              justify-content: space-between;
            }
            .part_line {
              width: 100%;
              height: 1px;
              background-color: #f0f5f8;
            }
            .card_body {
              flex: 1;
              padding: 20px;
              overflow: scroll;
            }
          }
        }
      }
    }
  }
  .box-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .box-form {
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow: auto;
      // 必须要有下面这个，在element专有样式里
      // 抽屉body超出滚动条
      // :deep(.el-drawer__body) {
      //   overflow: auto;
      // }
    }
    .box-button {
      box-sizing: border-box;
      height: 50px;
      width: 100%;
      text-align: right;
      border-top: 1px solid #dfe6ec;
      padding: 10px 20px;
    }
  }
}
</style>
