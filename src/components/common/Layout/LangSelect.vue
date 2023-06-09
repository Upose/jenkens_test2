<!--
 * @Descripttion: 语言切换组件
 * @version: 
 * @Author: TJ
 * @Date: 2021-03-30 16:54:53
 * @LastEditors: TJ
 * @LastEditTime: 2022-06-08 16:43:37
-->

<template>
  <el-dropdown :hide-on-click="false" @command="changeLang">
    <span class="el-dropdown-link">
      {{ curentLanguage.name }}<i class="el-icon-arrow-down"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :command="item"
          :disabled="language === item.id"
          v-for="item in languageList"
          :key="item.id"
          @click="handleSetLanguage(item.id)"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { GetterConstants, MutationConstants } from '@/store/modules/users/constants'
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { commonApi } from '@/http/api/common'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import dataStructure from '@/utils/dataStructure'
import { MutationConstants as indexMutationConstants } from '@/store/modules/index/constants'
import { IRequest } from '@/@types/httpInterface'

// import { setLanguage, setUserId } from '@/utils/cookie'
interface IGetlanguage {
  status: string
  custom_data: Array<Ilanguagelist>
  info?: string
}
export interface Ilanguagelist {
  id: string
  name: string
}
export default defineComponent({
  setup() {
    const store = useStore() //存储
    const { locale } = useI18n() //国际化
    const language = computed(() => {
      return store.state.users.language
    })
    const state = reactive({
      // as确定他是某种类型，as或者<string>arg
      curentLanguage: { name: '简体中文', id: 'cn' } as Ilanguagelist,
      languageList: [] as Array<Ilanguagelist>,
      getTitle() {
        return store.state.users.language
      },
      tabs: computed(() => {
        return store.getters.GET_TABS
      }),
      datas: [] as any[]
    })

    const requests = {
      getLanguage() {
        //#  获取语言列表
        const data = dataStructure({ power_url: null }, {})
        commonApi
          .get_language(data)
          .then((res: any) => {
            //
            let data = (res as IGetlanguage).custom_data
            state.languageList = data
            state.languageList.forEach(item => {
              if (item.id === state.getTitle()) {
                state.curentLanguage = item
              }
            })
          })
          .catch(err => err)
      }
    }
    onMounted(() => {
      requests.getLanguage()
    })
    const methods = {
      //# 改变语言当前值 command就是下拉选择框当前语言值
      changeLang(command: Ilanguagelist): void {
        //
        state.curentLanguage = command
      },

      //# 重现选择语言
      handleSetLanguage: (lang: string) => {
        // == 设置语言格式
        locale.value = lang
        store.commit(MutationConstants.SET_LANGUAGE, lang)
        // setLanguage(lang) //将语言也存入cookie
        methods.getLeftMenu()
        ElMessage({
          message: 'Switch Language Success',
          type: 'success',
          duration: 3000
        })
      },
      /**获取左侧菜单 */
      getLeftMenu() {
        const user_id = store.getters[GetterConstants.GET_USERID]
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
            const { status, custom_data } = res as IRequest
            if (status === 200) {
              const { data, flat_data } = custom_data
              const datas = methods.flat(data)
              state.tabs.forEach((item: any) => {
                datas.forEach(items => {
                  if (item.id === items.id) {
                    item.name = items.name
                  }
                })
              })
              store.commit(indexMutationConstants.SET_MENUS, data)
              window.location.reload()
            }
          })
          .catch(err => err)
      },

      flat(source: any[]): any[] {
        source.forEach(el => {
          if (el.children.length === 0) {
            state.datas.push(el)
          } else {
            methods.flat(el.children)
          }
        })
        return state.datas
      }
    }

    return {
      language,
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
