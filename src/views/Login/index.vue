<template>
  <div class="login">
    <div class="bg_cont">
      <div class="login_box">
        <div class="change_language">
          <LangSelect />
        </div>
        <div class="get_upd">
          <el-button type="text" @click="getUpd">{{ $t('common.forgetPassword') }}</el-button>
        </div>

        <div class="box_logo">
          <img src="@/assets/img/common/qishu.png" alt="" />
        </div>
        <div class="box_wel">{{ $t('common.CAftrade_welcomeManagement') }}</div>
        <div class="box_info">
          <el-form
            class="box_form"
            :model="loginForm"
            ref="loginRef"
            :rules="loginRule"
            size="small"
          >
            <el-form-item :label="$t('common.username')" prop="username">
              <el-input v-model="loginForm.username" :placeholder="$t('common.p_username')">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('common.password')" prop="password">
              <el-input
                :show-password="true"
                type="password"
                v-model="loginForm.password"
                :placeholder="$t('common.p_password')"
              >
              </el-input>
            </el-form-item>
            <el-form-item class="form_item3">
              <el-checkbox
                :label="$t('common.thirtyDayNoLogin')"
                v-model="emailCheckboxtype"
              ></el-checkbox>
            </el-form-item>
          </el-form>
        </div>
        <div class="handle_button">
          <!-- $t是挂到了Vue.prototype上的一个方法，接受一个字符串作为参数 -->
          <el-button :size="loginButtonSize" type="primary" @click="login">{{
            $t('common.login')
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 设置免登录
import { GetterConstants, MutationConstants } from '@/store/modules/users/constants'
import {
  MutationConstants as indexMutationConstants,
  GetterConstants as indexGetterConstants
} from '@/store/modules/index/constants'
import { setUserId, getUserId, removeUserId } from '@/utils/cookie'
import { useStore } from '@/store'
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  ref,
  watch,
  UnwrapRef,
  onBeforeUnmount
} from 'vue'
import { ILoginForm, IUserInfo } from './typings'
import { useRoute, useRouter } from 'vue-router'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
import LangSelect from '@/components/common/Layout/LangSelect.vue'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
import { sha256 } from 'js-sha256'
// import Router from '@/router'
import { checkPassword, checkUsername } from '@/utils/regp'
export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const Router = useRouter()
    const { t } = useI18n()
    const state = reactive({
      emailCheckboxtype: false,
      loginButtonSize: 'small' //避免被全局替换
    })
    //#  邮箱登录
    const loginRef = ref()
    const loginRule = computed(() => {
      const rule = {
        username: [
          {
            validator: checkUsername,
            required: true,
            trigger: 'change'
          }
        ],
        password: [
          {
            message: t('common.not_empty'),
            required: true,
            trigger: 'change'
          }
        ]
      }
      return rule
    })
    const loginForm: UnwrapRef<ILoginForm> = reactive({
      username: '',
      password: ''
    })
    const requests = {
      getLoign() {
        const data = dataStructure(
          {},
          {
            user_name: loginForm.username,
            user_pwd: sha256(loginForm.password)
          }
        )
        commonApi
          .log_in(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              methods.checkLoginType(custom_data.user_id, custom_data.token).then(() => {
                requests.getLeftMenu()
              })
            }
          })
          .catch(err => err)
      },
      /**获取左侧菜单 */
      getLeftMenu() {
        let user_id = store.getters[GetterConstants.GET_USERID]
        const data = dataStructure(
          {},
          {
            user_id,
            menu_id: null //为空则传所有菜单 ,
          }
        )
        commonApi
          .get_menu_multistage(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              const { data, flat_data } = custom_data
              store.commit(indexMutationConstants.SET_MENUS, data)
              // 设置默认第一个菜单选中状态
              let { id, name, menu_url } = data[0]
              store.commit(indexMutationConstants.SET_TABS, [
                { id: id, name, menu_url, isChecked: true }
              ])
              Router.push('/index/service')
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 忘记密码跳转
      getUpd() {
        Router.push('/getupd')
      },
      //  enter登录控制
      enterSubmit() {
        // 由于keyCode弃用，官方给出的解决办法
        window.addEventListener(
          'keydown',
          (event: KeyboardEvent): void => {
            if (event.defaultPrevented) {
              return // 如果已取消默认操作，则不应执行任何操作
            }
            const loginref = loginRef
            if (!loginref) return
            var handled = false
            if (event.key !== undefined && route.path === '/login') {
              // 使用KeyboardEvent.key处理事件，并将handled设置为true。
              if (event.key === 'Enter' && route.path === '/login') {
                methods.login()
                handled = true
              }
            } else if (event.keyCode !== undefined && route.path === '/login') {
              //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
              if (event.keyCode === 13 && route.path === '/login') {
                methods.login()
                handled = true
              }
            }
            if (handled) {
              // 如果事件已处理，则禁止“双重操作”
              event.preventDefault()
            }
          },
          true
        )
      },
      checkLoginType(userId: string, token: string) {
        return new Promise(resolve => {
          store.commit(MutationConstants.SET_USERID, userId)
          store.commit(MutationConstants.SET_TOKEN, token)
          //选择了30天免登录 userId 和language同时还要存cookie
          if (state.emailCheckboxtype) {
            setUserId(userId)
          } else {
            removeUserId()
          }
          resolve('存储成功')
        })
      },
      //# 登录方法
      login() {
        const loginref = loginRef
        if (!loginref) return
        loginref.value.validate((valid: boolean) => {
          if (valid) {
            requests.getLoign()
          }
        })
      }
    }
    onMounted(() => {
      // methods.noLogin()
      methods.enterSubmit()
    })
    onBeforeUnmount(() => {
      window.document.onkeydown = null
    })

    return {
      loginRef,
      loginRule,
      loginForm,
      ...toRefs(state),
      ...methods
    }
  },
  components: {
    LangSelect
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  .bg_cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url('../../assets/img/login/bg.png') no-repeat;
    background-size: cover;
    .login_box {
      box-sizing: border-box;
      width: 400px;
      height: 530px;
      padding: 0 30px;
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      box-shadow: 0px 0px 41px 10px rgba(137, 134, 147, 0.13);
      border-radius: 4px;
      .change_language {
        top: 30px;
        right: 15px;
        cursor: pointer;
        position: absolute;
        z-index: 99; //不设置悬停失效
      }
      .get_upd {
        bottom: 10px;
        right: 30px;
        cursor: pointer;
        position: absolute;
        z-index: 99; //不设置悬停失效
        :deep(.el-button) {
          width: 50%;
          text-align: right;
          font-size: 14px;
          color: #999999;
          :hover {
            color: #e1251b;
          }
        }
      }
      .box_logo {
        position: relative;
        width: 100%;
        height: 24%;
        img {
          // 让img在上面这个盒子上面居中
          $imgWidth: 583px * 0.1;
          $imgHeight: 909px * 0.1;
          position: absolute;
          width: $imgWidth;
          height: $imgHeight;
          top: 50%;
          left: 50%;
          margin-left: -$imgWidth/2;
          margin-top: -$imgHeight/2;
        }
      }
      .box_wel {
        width: 100%;
        height: 15%;
        font-size: 20px;
        color: #666666;
      }
      .box_info {
        flex: 1;
        height: 0;
        text-align: left;
        .box_form {
          .form_item3 {
            // margin-bottom: 50px;
            .el-checkbox {
              width: 50%;
            }

            // 选中后的文字颜色
            &:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
              color: #e1251b;
            }
            // 选中后的勾选框颜色
            &:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
              background-color: #e1251b;
              border-color: #e1251b;
            }
            // 勾选框悬停颜色
            &:deep(.el-checkbox__inner:hover) {
              border-color: #e1251b;
            }
          }
        }
      }
      .handle_button {
        width: 100%;
        height: 18%;
        &:deep(.el-button) {
          width: 100%;
          // min-height: 55px;
          font-size: 18px;
        }
        &:deep(.el-button--primary) {
          background-color: #111927;
        }
      }
    }
  }
}
</style>
