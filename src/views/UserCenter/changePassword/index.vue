<!--
 * @Description: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-01 17:49:13
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-13 14:45:30
-->
<!--  -->
<template>
  <div class="content inputStyle618">
    <div class="box_form">
      <el-form
        :model="editForm"
        label-width="300px"
        :rules="editRule"
        ref="editRef"
        label-position="left"
        size="small"
      >
        <el-form-item :label="$t('common.user_id')" prop="id">
          <el-input disabled v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item :label="$t('common.username')" prop="username">
          <el-input v-model="editForm.username" :placeholder="$t('common.p_username')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('common.user_pwd')" prop="user_pwd">
          <el-input
            type="password"
            v-model="editForm.user_pwd"
            :placeholder="$t('common.p_user_pwd')"
            @input="userPwdInput"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('common.re_user_pwd')" prop="re_user_pwd">
          <el-input
            type="password"
            v-model="editForm.re_user_pwd"
            :placeholder="$t('common.p_re_user_pwd')"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          
        </el-form-item> -->
      </el-form>
      <el-button size="small" style="margin-left:80%" type="primary" @click="onSubmit">{{
        $t('common.upd')
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs, onMounted } from 'vue'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { IPower } from '@/@types/iPower'
import { dateNormArray } from '@/utils/dateNorm'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { checkPassword, reCheckPassword } from '@/utils/regp'
import { sha256 } from 'js-sha256'
import { IState } from './typings'
import { removeUserId, getUserId } from '@/utils/cookie'
import { MutationConstants } from '@/store/modules/users/constants'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state: IState = reactive({
      editForm: {
        id: '',
        username: '',
        user_pwd: '',
        re_user_pwd: ''
      }
    })
    const editRef = ref()
    const editRule = computed(() => {
      const rule = {
        id: [
          {
            required: true,
            message: t('common.not_empty'),
            trigger: ['blur', 'change']
          }
        ],
        username: [
          {
            required: true,
            message: t('common.not_empty'),
            trigger: ['blur', 'change']
          }
        ],
        user_pwd: [
          {
            required: true,
            validator: checkPassword,
            trigger: ['blur', 'change']
          }
        ],
        re_user_pwd: [
          {
            required: true,
            validator: (rule: object, value: string, callback: Function) => {
              let upd1 = state.editForm.user_pwd
              let upd2 = state.editForm.re_user_pwd
              reCheckPassword(rule, value, callback, upd1, upd2)
            },
            trigger: ['blur', 'change']
          }
        ]
      }
      return rule
    })
    const requests = {
      backChangePassword() {
        const data = dataStructure(
          {},
          {
            user_pwd: sha256(state.editForm.user_pwd),
            username: state.editForm.username,
            id: state.editForm.id
          }
        )
        commonApi
          .back_change_password(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              requests.loginLogout()
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
              store.commit(MutationConstants.CLEAR_TOKEN, '')
              removeUserId()
              router.push('/login')
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      onSubmit() {
        const editref = editRef

        editref.value.validate((valid: boolean) => {
          if (valid) {
            ElMessageBox.confirm(t('common.confirmUpd'), t('common.tip'), {
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancel'),
              type: 'warning'
            })
              .then(() => {
                requests.backChangePassword()
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
      getUserInof() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo') as string)

        state.editForm.id = userInfo.user_id
        state.editForm.username = userInfo.user_name
      },
      userPwdInput() {
        const editref = editRef

        editref.value.validateField('re_user_pwd')
      }
    }
    onMounted(() => {
      methods.getUserInof()
    })
    return {
      ...toRefs(state),
      ...methods,
      ...requests,
      editRule,
      editRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/element-common-style.scss';
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content:center;
  align-items: center;
  .box_form {
    margin-top: 200px;
  }
}
</style>
