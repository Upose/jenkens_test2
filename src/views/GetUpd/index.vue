<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-06-17 09:37:49
 * @LastEditors: TJ
 * @LastEditTime: 2022-02-14 08:59:17
-->
<template>
	<div class="login">
		<div class="bg_cont">
			<div class="login_box">
				<div class="change_language">
					<LangSelect />
				</div>
				<div class="back">
					<el-button
						@click="backLogin"
						size="small"
						type="text"
						class="el-icon-back"
					>
						{{ $t('common.back') }}</el-button
					>
				</div>
				<div class="box_logo">
					<img
						class="img1"
						v-if="NODE_ENV === 'jinfu_use'"
						src="@/assets/img/common/jinFuCompany.jpg"
						alt="#"
					/>
					<img
						class="img2"
						v-else
						src="@/assets/img/login/login-02.png"
						alt=""
					/>
				</div>
				<div class="box_state">
					<div class="step" v-show="showStep">
						<div class="box_wel">{{ $t('common.stepOne') }}</div>
						<div class="box_info">
							<el-form
								:model="stepOneForm"
								ref="stepOneRef"
								:rules="stepOneRule"
							>
								<el-form-item :label="$t('common.username')" prop="username">
									<el-input
										v-model="stepOneForm.username"
										:placeholder="$t('common.p_username')"
									>
									</el-input>
								</el-form-item>
								<el-form-item :label="$t('common.email')" prop="email">
									<el-input
										v-model="stepOneForm.email"
										:placeholder="$t('common.p_email')"
									>
									</el-input>
								</el-form-item>
								<el-form-item :label="$t('common.code')" prop="code">
									<el-input
										v-model="stepOneForm.code"
										:placeholder="$t('common.p_code')"
									>
										<template #suffix>
											<el-button
												@click="getCode"
												type="text"
												v-show="!stepOneForm.countDown"
												>{{ $t('common.get_code') }}</el-button
											>
											<el-button type="text" v-show="stepOneForm.countDown">{{
												`${stepOneForm.countDown}s`
											}}</el-button>
										</template>
									</el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="handle_button">
							<el-button size="small" type="primary" @click="stepOne">{{
								$t('common.nextStep')
							}}</el-button>
						</div>
					</div>
					<div class="step" v-show="!showStep">
						<div class="box_wel">{{ $t('common.stepTwo') }}</div>
						<div class="box_info">
							<el-form
								:model="stepTwoForm"
								ref="stepTwoRef"
								:rules="stepTwoRule"
							>
								<el-form-item :label="$t('common.password')" prop="password">
									<el-input
										type="password"
										v-model="stepTwoForm.password"
										:placeholder="$t('common.p_password')"
									>
									</el-input>
								</el-form-item>
								<el-form-item
									:label="$t('common.rePassword')"
									prop="rePassword"
								>
									<el-input
										type="password"
										v-model="stepTwoForm.rePassword"
										:placeholder="$t('common.p_rePassword')"
									>
									</el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="handle_button">
							<el-button size="small" type="primary" @click="stepTwo">{{
								$t('common.submit')
							}}</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
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
	onBeforeUnmount,
	triggerRef,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getupdApi } from '@/http/api/getupd'
import { IRequest } from '@/@types/httpInterface'
import LangSelect from '@/components/common/Layout/LangSelect.vue'
import dataStructure from '@/utils/dataStructure'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
// const { t } = useI18n()
import { sha256 } from 'js-sha256'
import {
	checkPassword,
	reCheckPassword,
	checkUsername,
	checkEmail,
} from '@/utils/regp'
export default defineComponent({
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const { t } = useI18n()
		const stepOneRef = ref()
		const stepTwoRef = ref()
		const stepOneRule = computed(() => {
			const rule = {
				username: [{ required: true, message: '不能为空', trigger: 'change' }],
				email: [{ required: true, validator: checkEmail, trigger: 'change' }],
				code: [{ required: true, message: '不能为空', trigger: 'change' }],
			}
			return rule
		})
		const stepTwoRule = computed(() => {
			const rule = {
				password: [
					{ required: true, validator: checkPassword, trigger: 'change' },
				],
				rePassword: [
					{
						required: true,
						validator: (rule: object, value: string, callback: Function) => {
							let upd1 = state.stepTwoForm.password
							let upd2 = state.stepTwoForm.rePassword
							reCheckPassword(rule, value, callback, upd1, upd2)
						},
						trigger: 'change',
					},
				],
			}
			return rule
		})
		const state = reactive({
			showStep: true,
			stepOneForm: {
				username: '',
				email: '',
				code: '',
				countDown: 0,
			},
			stepTwoForm: {
				password: '',
				rePassword: '',
			},
			NODE_ENV: process.env.NODE_ENV,
		})
		let timer: any
		const requests = {
			sendCode() {
				let data = dataStructure(
					{},
					{
						mail: state.stepOneForm.email,
						username: state.stepOneForm.username,
					}
				)
				getupdApi
					.send_code(data)
					.then(res => {
						let { status, info, custom_data } = res as IRequest
						if (status == 200) {
							state.stepOneForm.countDown = 60
							timer = setInterval(() => {
								if (!state.stepOneForm.countDown) {
									clearInterval(timer)
									return
								}
								state.stepOneForm.countDown--
							}, 1000)
							ElMessage({
								type: 'success',
								message: '已发送，请查收！',
							})
						}
					})
					.catch(err => err)
			},
			setpNext() {
				let data = dataStructure(
					{},
					{
						code: state.stepOneForm.code,
						username: state.stepOneForm.username,
					}
				)
				getupdApi
					.setp_next(data)
					.then(res => {
						let { status, info, custom_data } = res as IRequest
						if (status == 200) {
							state.showStep = !state.showStep
						}
					})
					.catch(err => err)
			},
			changePassword() {
				let data = dataStructure(
					{},
					{
						user_pwd: sha256(state.stepTwoForm.password),
						username: state.stepOneForm.username,
					}
				)
				getupdApi
					.change_password(data)
					.then(res => {
						let { status, info, custom_data } = res as IRequest
						if (status == 200) {
							ElMessage({
								type: 'success',
								message: '修改成功，请登录！',
							})
							router.push('/login')
						}
					})
					.catch(err => err)
			},
		}
		const methods = {
			//返回上一个路由
			backLogin() {
				router.go(-1)
			},
			// 获取验证码
			getCode() {
				requests.sendCode()
			},
			// 下一步
			stepOne() {
				const steponeref = stepOneRef
				steponeref.value.validate((valid: any) => {
					if (valid) {
						requests.setpNext()
					}
				})
			},
			stepTwo() {
				const steptworef = stepTwoRef
				steptworef.value.validate((valid: any) => {
					if (valid) {
						requests.changePassword()
					}
				})
			},
		}
		return {
			...toRefs(state),
			...methods,
			stepOneRef,
			stepOneRule,
			stepTwoRef,
			stepTwoRule,
		}
	},
	components: {
		LangSelect,
	},
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
			background-color: #ffffff;
			box-shadow: 0px 0px 41px 10px rgba(137, 134, 147, 0.13);
			border-radius: 4px;
			position: relative;
			display: flex;
			flex-direction: column;
			.change_language {
				top: 30px;
				right: 15px;
				cursor: pointer;
				position: absolute;
				z-index: 10;
			}
			.back {
				position: absolute;
				top: 10px;
				left: 15px;
				color: #999;
				font-size: 14px;
				z-index: 10;
			}
			.box_logo {
				width: 100%;
				height: 26%;
				position: relative;
				.img1 {
					// 让img在上面这个盒子上面居中
					$imgWidth: 1079px * 0.1;
					$imgHeight: 1169px * 0.1;
					position: absolute;
					width: $imgWidth;
					height: $imgHeight;
					top: 50%;
					left: 50%;
					margin-left: -$imgWidth/2;
					margin-top: -$imgHeight/2;
				}
				.img2 {
					// 让img在上面这个盒子上面居中
					$imgWidth: 286px * 0.5;
					$imgHeight: 144px * 0.5;
					position: absolute;
					width: $imgWidth;
					height: $imgHeight;
					top: 50%;
					left: 50%;
					margin-left: -$imgWidth/2;
					margin-top: -$imgHeight/2;
				}
			}

			.box_state {
				width: 100%;
				flex: 1;
				height: 0;
				.step {
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 100%;
					.box_wel {
						width: 100%;
						height: 10%;
						font-size: 20px;
						color: #666666;
					}
					.box_info {
						flex: 1;
						height: 0;
						text-align: left;
					}
					.handle_button {
						width: 100%;
						height: 15%;
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
	}
}
</style>
