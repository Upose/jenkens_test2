<!--
 * @Descripttion: 
 * @version: 
 * @Author: HYH
 * @Date: 2021-08-30 09:20:30
 * @LastEditors: TJ
 * @LastEditTime: 2022-03-09 13:40:15
-->
<!--  -->
<template>
  <div class="box-card formStyle">
    <div class="box-form">
      <el-form
        :model="updForm"
        label-width="250px"
        :rules="updRule"
        ref="updRef"
        label-position="left"
        :validate-on-rule-change="false"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.ID')" prop="id">
              <el-input v-model="updForm.id" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.employee_number')" prop="employee_number">
              <el-input v-model="updForm.employee_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.com_code')" prop="com_code">
              <el-select filterable clearable v-model="updForm.com_code">
                <el-option
                  v-for="item in commonLists.companyList"
                  :key="item.com_code"
                  :label="item.com_name"
                  :value="item.com_code"
                >
                  <span style="float: left">{{ item.com_name }}</span>
                  <span style="float: right;color: #999999;">{{ item.com_code }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属角色" prop="role_id">
              <el-select filterable clearable multiple v-model="updForm.role_id">
                <el-option
                  v-for="(item, index) in roleList"
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
            <el-form-item :label="$t('common.full_name')" prop="full_name">
              <el-input v-model="updForm.full_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.gender')" prop="gender">
              <el-radio-group v-model="updForm.gender">
                <el-radio :label="1">{{ $t('common.man') }} </el-radio>
                <el-radio :label="0"> {{ $t('common.women') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.mobile')" prop="mobile">
              <el-input v-model="updForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.mail')" prop="mail">
              <el-input v-model="updForm.mail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.certificates_type')" prop="certificates_type">
              <el-input v-model="updForm.certificates_type"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.certificates_number')" prop="certificates_number">
              <el-input v-model="updForm.certificates_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- 权限 -->
            <el-form-item :label="$t('common.org_name')" prop="org_id">
              <el-select filterable clearable v-model="updForm.org_name">
                <el-option style="height: auto;padding: 0;">
                  <el-tree
                    :highlight-current="true"
                    node-key="id"
                    :data="commonLists.powerList"
                    :props="powerForm.defaultProps"
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
            <!-- 头像 -->
            <el-form-item :label="$t('common.photo')" prop="photo">
              <el-upload
                class="avatar-uploader"
                :before-upload="beforeUpload"
                action="#"
                :http-request="uploadHttp"
                :show-file-list="false"
              >
                <img v-if="updForm.photo" :src="configUrl + updForm.photo" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.job_status')" prop="job_status">
              <el-select filterable clearable v-model="updForm.job_status">
                <el-option
                  v-for="item in commonLists.jobStatusList"
                  :key="item.value"
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
            <el-form-item :label="$t('common.entry_date')" prop="entry_date">
              <el-date-picker v-model="updForm.entry_date" type="date"> </el-date-picker>
              <!-- <el-input
               v-model="updForm.entry_date"
              
              placeholder="请输入您要修改的入职日期"
            ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.confirmation_date')" prop="confirmation_date">
              <el-date-picker v-model="updForm.confirmation_date" type="date"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.departure_date')" prop="departure_date">
              <el-date-picker v-model="updForm.departure_date" type="date"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
					<el-col :span="24">
						<el-form-item :label="$t('common.is_enabled')" prop="is_enabled">
							<el-switch
								:active-value="1"
								:inactive-value="0"
								v-model="updForm.is_enabled"
							>
							</el-switch>
						</el-form-item>
					</el-col>
				</el-row> -->

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('common.staff_choose')" prop="staff_choose">
              <el-checkbox v-model="updForm.staff_choose" :true-label="1" :false-label="0">{{
                $t('common.staff_choose')
              }}</el-checkbox>
              <el-button style="margin-left:20px;color:danger" type="text" @click="doDelCount">{{
                $t('common.del_count')
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="updForm.staff_choose">
          <el-col :span="24" class="formStyleMargin">
            <el-form-item :label="$t('common.user_name')" prop="user_name">
              <el-input v-model="updForm.user_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="updForm.staff_choose">
          <el-col :span="24" class="formStyleMargin">
            <el-form-item :label="$t('common.user_pwd')" prop="user_pwd">
              <el-input v-model="updForm.user_pwd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="updForm.staff_choose">
          <el-col :span="24">
            <el-form-item :label="$t('common.sys_language')" prop="sys_language">
              <el-select filterable clearable v-model="updForm.sys_language">
                <el-option
                  v-for="item in commonLists.languageList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="updForm.staff_choose">
          <el-col :span="24">
            <el-form-item :label="$t('common.user_is_enabled')" prop="user_is_enabled">
              <el-switch v-model="updForm.user_is_enabled" :active-value="1" :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="box-button">
      <el-button @click="onSubmitUpd" type="success" plain>{{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface IState {
  updForm: {
    org_name: any
    com_code: any
    role_id: any
    employee_number: any
    org_id: any
    id: any
    full_name: any
    gender: any
    mobile: any
    mail: any
    certificates_type: any
    certificates_number: any
    photo: any
    entry_date: any
    confirmation_date: any
    departure_date: any
    // is_enabled: any
    job_status: any
    staff_choose: any
    // 创建账号字段
    user_name: any
    user_pwd: any
    sys_language: any
    user_is_enabled: any
  }
  roleList: any[]
  powerForm: {
    orgSuffixIcon: string
    props: {
      checkStrictly: boolean
      value: string
      label: string
      emitPath: boolean
    }
    showOrgTree: boolean
    defaultProps: {
      children: string
      label: string
    }
  }
}
import { staffApi } from '@/http/api/users/usersset/staff'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
import { IValid } from '../typings'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { checkPhoneNum, checkEmail, checkPassword, checkUsername } from '@/utils/regp'
import { dateNormArray, dateNormOne } from '@/utils/dateNorm'
import { sha256 } from 'js-sha256'
import { GetterConstants } from '@/store/modules/users/constants'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    commonLists: {
      type: Object,
      default: {}
    }
  },
  emits: ['reset'],
  setup(props, ctx) {
    const store = useStore()
    const { t } = useI18n()
    const selection = reactive({
      singleSelection: null
    })
    const state: IState = reactive({
      configUrl: process.env.VUE_APP_QIHONG_URL,
      updForm: {
        com_code: '',
        employee_number: '',
        id: '',
        org_name: '',
        org_id: '',
        full_name: '',
        gender: '',
        mobile: '',
        mail: '',
        certificates_type: '',
        certificates_number: '',
        photo: '',
        entry_date: '',
        confirmation_date: '',
        departure_date: '',
        // is_enabled: 0,
        job_status: 1,
        role_id: [],
        staff_choose: 0,
        user_name: '',
        user_pwd: '',
        sys_language: '',
        user_is_enabled: 0
      },
      roleList: [],
      powerForm: {
        orgSuffixIcon: 'el-icon-arrow-down',
        props: {
          checkStrictly: true,
          value: 'id',
          label: 'name',
          emitPath: false
        },
        showOrgTree: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    })
    const valid: IValid = reactive({
      checkOthers: {
        fun: (rule: object, value: string, callback: Function, info: any, bool: boolean) => {
          if (bool) {
            callback(new Error(info))
            valid.checkOthers.bool = false
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
            valid.checkOthers.bool
          )
        },
        info: '',
        bool: false
      }
    })
    const updRef = ref()
    const updRule = computed(() => {
      const rule = {
        // quantum_id: [
        //   {
        //     required: true,
        //     message: t('common.not_empty'),
        //   },
        //   {
        //     validator: valid.checkOthers.validatorFun,
        //   },
        // ],
        // work_job_id: [
        //   {
        //     required: true,
        //     message: t('common.not_empty'),
        //   },
        //   {
        //     validator: valid.checkOthers.validatorFun,
        //   },
        // ],
        com_code: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        employee_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        // is_enabled: [
        // 	{
        // 		required: true,
        // 		message: t('common.not_empty'),
        // 	},
        // 	{
        // 		validator: valid.checkOthers.validatorFun,
        // 	},
        // ],
        org_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        full_name: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        menu_id: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        gender: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        mobile: [
          {
            message: t('common.not_empty'),
            required: true
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        mail: [
          {
            required: true,
            validator: checkEmail
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        certificates_type: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        certificates_number: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        entry_date: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        departure_date: [
          {
            required: state.updForm.job_status == 0 ? true : false,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        job_status: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        user_name: [
          {
            required: true,
            validator: checkUsername
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        user_pwd: [
          {
            validator: (rule: object, value: string, callback: Function) => {
              const regpPassword = /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/
              if (!value) {
                callback()
              } else if (!regpPassword.test(value)) {
                callback(new Error(t('common.regpPassword')))
              } else {
                callback()
              }
            }
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        sys_language: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ],
        user_is_enabled: [
          {
            required: true,
            message: t('common.not_empty')
          },
          {
            validator: valid.checkOthers.validatorFun
          }
        ]
      }

      return rule
    })

    const requests = {
      //对应公司角色获取接口：V1/Role/role_list
      getRoleList(com_code: any) {
        const data = dataStructure({}, { com_code })
        staffApi
          .get_role_list(data)
          .then(res => {
            let { status, custom_data } = res as IRequest
            if (status === 200) {
              state.roleList = custom_data
            }
          })
          .catch(err => err)
      },
      // 员工信息修改接口：V1/Staff/upd
      getUpd() {
        let user_pwd = !state.updForm.user_pwd ? '' : sha256(state.updForm.user_pwd)
        let entry_date = state.updForm.entry_date
        if (entry_date) {
          entry_date = dateNormOne(entry_date)
        }
        let departure_date = state.updForm.departure_date
        if (departure_date) {
          departure_date = dateNormOne(departure_date)
        }
        let confirmation_date = state.updForm.confirmation_date
        if (confirmation_date) {
          confirmation_date = dateNormOne(confirmation_date)
        }
        const data = dataStructure(
          { power_url: 'V1/Staff/upd' },
          {
            employee_number: state.updForm.employee_number,
            com_code: state.updForm.com_code,
            role_id: state.updForm.role_id,
            org_id: state.updForm.org_id, //权限
            id: state.updForm.id,
            full_name: state.updForm.full_name,
            gender: state.updForm.gender,
            mobile: state.updForm.mobile,
            mail: state.updForm.mail,
            certificates_type: state.updForm.certificates_type,
            certificates_number: state.updForm.certificates_number,
            photo: state.updForm.photo,
            // is_enabled: state.updForm.is_enabled,
            job_status: state.updForm.job_status,
            staff_choose: state.updForm.staff_choose,
            user_name: state.updForm.user_name,
            user_pwd: user_pwd,
            sys_language: state.updForm.sys_language,
            user_is_enabled: state.updForm.user_is_enabled,
            entry_date: entry_date,
            departure_date: departure_date,
            confirmation_date: confirmation_date
          }
        )
        staffApi
          .get_upd(data)
          .then(res => {
            let { status, custom_data, info, field_name } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              methods.reset('upd')
            } else if (status === 421) {
              // 特殊信息显示在表单下面
              valid.checkOthers.info = info
              valid.checkOthers.bool = true
              const updref = updRef
              updref.value.validateField(field_name)
            }
          })
          .catch(err => err)
      },
      // 页面控件修改查询数据接口：V1/Widget/view
      getView(id: string) {
        return new Promise((resolve, reject) => {
          const data = dataStructure(
            {},
            {
              id: id
            }
          )
          staffApi
            .get_view(data)
            .then(res => {
              let { status, custom_data, info } = res as IRequest

              if (status === 200) {
                const {
                  com_code,
                  role_id,
                  employee_number,
                  id,
                  org_name,
                  org_id,
                  full_name,
                  gender,
                  mobile,
                  mail,
                  certificates_type,
                  certificates_number,
                  photo,
                  entry_date,
                  confirmation_date,
                  departure_date,
                  // is_enabled,
                  job_status,
                  staff_choose,
                  user_name,
                  user_pwd,
                  sys_language,
                  user_is_enabled
                } = custom_data

                requests.getRoleList(com_code)
                state.updForm = {
                  com_code,
                  role_id,
                  employee_number,
                  id,
                  org_name,
                  org_id,
                  full_name,
                  gender,
                  mobile,
                  mail,
                  certificates_type,
                  certificates_number,
                  photo,
                  entry_date,
                  confirmation_date,
                  departure_date,
                  // is_enabled,
                  job_status,
                  staff_choose,
                  user_name,
                  user_pwd,
                  sys_language,
                  user_is_enabled
                }
                resolve('显示修改')
              }
            })
            .catch(err => err)
        })
      },
      // 上传头像获取url接口
      getUploading(formData: any) {
        staffApi
          .get_uploading(formData)
          .then((res: any) => {
            let { status, custom_data, info } = res as IRequest
            if (status == 200) {
              state.updForm.photo = custom_data.path
            }
          })
          .catch(err => err)
      },
      // 删除账号接口
      getUserDel() {
        const data = dataStructure(
          {},
          {
            id: state.updForm.id
          }
        )
        staffApi
          .get_user_del(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              ElMessage({
                type: 'success',
                message: info
              })
              // const { id } = selection.singleSelection
              // requests.getView(id)
              // requests.getList() //传参顺序
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      comCodeChange() {
        state.updForm.role_id = []
        requests.getRoleList(state.updForm.com_code)
      },
      //#   图片上传限制
      beforeUpload(file: any) {
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
          ElMessage.error('上传头像图片大小不能超过 5MB!')
        }
        return isLt2M
      },
      doDelCount() {
        ElMessageBox.confirm(t('common.confirmDel'), t('common.tip'), {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            requests.getUserDel()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: t('common.cancelDel')
            })
          })
      },
      //#   上传图片
      uploadHttp(file: any) {
        let user_id = store.getters[GetterConstants.GET_USERID]
        let language_id = store.getters[GetterConstants.GET_LANGUAGE]
        const formData: any = new FormData()
        formData.append('photo', file.file)
        formData.append('user_id', user_id)
        formData.append('language_id', language_id)
        formData.append('access_sys_code', 'web')
        requests.getUploading(formData)
      },
      // 权限面板
      handleChange(data: any, node: any, self: any) {
        state.updForm.org_id = data.id
        state.updForm.org_name = data.name
      },
      reset(arg: any) {
        // 重置表单
        state.updForm.org_name = ''
        const updref = updRef
        updref.value.resetFields()
        //  重置updRefVar
        ctx.emit('reset', arg)
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
      }
    }

    return {
      ...toRefs(state),
      ...toRefs(selection),
      ...requests,
      ...methods,
      updRef,
      updRule
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/page-common-draw.scss'; //页面基础布局样式一
@import '@/assets/css/element-common-style.scss';
// #上传图片相关样式
.avatar-uploader {
  &:deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 132px;
  height: 132px;
  line-height: 132px;
  text-align: center;
}
.avatar {
  width: 132px;
  height: 132px;
  display: block;
}
</style>
