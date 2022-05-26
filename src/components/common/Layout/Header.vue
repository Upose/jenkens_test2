<!--
 * @Description: 头部公共组件
 * @version: 
 * @Author: TJ
 * @Date: 2021-04-07 09:50:15
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-26 10:13:40
-->
<template>
  <header class="header">
    <div class="header_left">
      <div class="header_logo">
        <img src="@/assets/img/common/qishu.png" alt="#" />
      </div>
      <div style="font-weight: bold;font-style: italic">
        {{ $t('common.warehouse_system') }}
      </div>
    </div>
    <div class="header_right">
      <div class="right-avatar header_first">
        <el-dropdown @command="dropdownClick">
          <div class="drop-outer">
            <div class="drop-left">
              <img
                style="width:30px;height:30px;border-radius:50%"
                :src="userInfo.photo"
                :onerror="defaultImg"
              />
            </div>
            <div class="drop-uname">
              <div>
                {{ userInfo.full_name }}
              </div>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-user" command="per_center">{{
                $t('common.per_center')
              }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" command="edit_upd">{{
                $t('common.edit_upd')
              }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-back" command="exit_login">{{
                $t('common.exit_login')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="header_first">
        <langSelect />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import LangSelect from './LangSelect.vue'
import { removeUserId, getUserId } from '@/utils/cookie'
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import { commonApi } from '@/http/api/common'
import dataStructure from '@/utils/dataStructure'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { IRequest } from '@/@types/httpInterface'
import { MutationConstants } from '@/store/modules/index/constants'
export default defineComponent({
  emits: ['getChildMenu'],
  components: {
    LangSelect
  },
  props: {
    headerMenu: Array
  },

  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      /**加载失败图片 */
      defaultImg: 'this.src="' + require('@/assets/img/common/avatar.jpg') + '"',
      userInfo: {} as any,
      headerActiveIndex: computed(() => {
        //获取当前路由渲染页面菜单
        let pathLength = route.path.split('/')
        if (pathLength.length) {
          let path = '/' + pathLength[1] + '/' + pathLength[2]
          return path
        }
      })
    })
    const requests = {
      // 用户信息接口：V1/User/user_info
      getUserInfo() {
        let user_id = getUserId()
        const data = dataStructure({}, { user_id: user_id })
        commonApi
          .get_user_info(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              state.userInfo = custom_data
              localStorage.setItem('userInfo', JSON.stringify(custom_data))
            }
          })
          .catch(err => err)
      },
      //用户退出接口：V1/Login/logout
      loginLogout() {
        const data = dataStructure({}, {})
        commonApi
          .login_logout(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              store.commit(MutationConstants.SET_TABS, [])
              removeUserId()
              router.push('/login')
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 点击头部右侧菜单
      dropdownClick(command: string) {
        switch (command) {
          case 'exit_login':
            requests.loginLogout()
            break
          case 'edit_upd':
            // 后台界面直接修改密码
            router.push('/index/handles/editupd')
            break
          case 'per_center':
            router.push('/index/handles/percenter')
            break
          default:
            router.push('/index/handles')
            break
        }
      }
    }
    onMounted(() => {
      requests.getUserInfo()
    })
    return {
      ...toRefs(state),
      ...methods,
      ...requests
    }
  }
})
</script>
<style scoped lang="scss">
.header {
  border-bottom: 1px solid #e6ebf5;
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_left {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;

    .header_logo {
      display: flex;
      align-items: center;
      // width: 96px;
      margin-right: 10px;
      height: 80%;
      img {
        width: 583px * 0.04;
        height: 909px * 0.04;
      }
    }
  }
  .header_right {
    display: flex;
    align-items: center;
    .header_first {
      margin-left: 25px;
      display: flex;
      &:deep(.el-dropdown) {
        font-size: 12px;
      }
    }
    .right-avatar {
      display: flex;
      align-items: center;
      .el-avatar {
        align-items: center;
      }
      .drop-outer {
        display: flex;
        .drop-left {
          margin-left: 10px;
        }
        .drop-uname {
          margin-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}
</style>
