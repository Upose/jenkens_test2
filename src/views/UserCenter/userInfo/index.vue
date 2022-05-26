<!--
 * @Descripttion: 
 * @version: 
 * @Author: XJ
 * @Date: 2021-07-01 17:49:13
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-01 10:40:19
-->
<!--  -->
<template>
	<div class="content ">
		<div class="box_form">
			<el-descriptions :title="$t('common.user_info')" :column="1" size="large">
				<!-- 个人中心目前只展示员工编号 入职日期entry_date 姓名full_name 所属部门org_name 性别
                    gender   工作状态job_status  邮箱mail  手机mobile -->
				<el-descriptions-item :label="$t('common.employee_number')">{{
					userInfo.employee_number
				}}</el-descriptions-item>
				<el-descriptions-item :label="$t('common.entry_date')">{{
					userInfo.entry_date
				}}</el-descriptions-item>
				<el-descriptions-item :label="$t('common.full_name')">{{
					userInfo.full_name
				}}</el-descriptions-item>
				<el-descriptions-item :label="$t('common.org_name')">
					{{ userInfo.org_name }}
				</el-descriptions-item>
				<el-descriptions-item :label="$t('common.gender')">{{
					userInfo.gender === 1
						? $t('common.man')
						: userInfo.gender === 0
						? $t('common.women')
						: '未知'
				}}</el-descriptions-item>
				<el-descriptions-item :label="$t('common.job_status_name')">{{
					userInfo.job_status_name
				}}</el-descriptions-item>
				<el-descriptions-item :label="$t('common.mail')">{{
					userInfo.mail
				}}</el-descriptions-item>
				<el-descriptions-item :label="$t('common.mobile')">{{
					userInfo.mobile
				}}</el-descriptions-item>
			</el-descriptions>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { commonApi } from '@/http/api/common'
import { IRequest } from '@/@types/httpInterface'
import dataStructure from '@/utils/dataStructure'
import { getUserId } from '@/utils/cookie'
export default defineComponent({
	setup() {
		const state = reactive({
			userInfo: {},
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
						}
					})
					.catch(err => err)
			},
		}
		const methods = {}
		onMounted(() => {
			requests.getUserInfo()
		})
		return {
			...toRefs(state),
			...methods,
			...requests,
		}
	},
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
