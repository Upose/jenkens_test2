<template>
  <div class="content">
    <el-alert title="已显示区和未显示区均可拖动，也可互相拖动" type="info" :closable="true">
    </el-alert>
    <div class="title">
      <div>已显示{{ tableData1.length }}项</div>
      <div>未显示{{ tableData2.length }}项</div>
    </div>
    <div class="outer_cont">
      <!-- 左边需要显示的字段 -->
      <div class="inner_cont">
        <!-- <el-scrollbar height="300px"> -->
        <ul class="left">
          <li v-for="(item, index) in tableData1" :key="item.index">
            <i class="el-icon-remove-outline" @click="removeField(index)"></i>
            <span style="margin-left:20px">
              {{ $t(`common.${item.label}`) }}
            </span>
          </li>
        </ul>
        <!-- </el-scrollbar> -->
      </div>
      <!-- 右边不显示的字段 -->
      <div class="inner_cont">
        <!-- <el-scrollbar height="300px"> -->
        <ul class="right">
          <li v-for="(item, index) in tableData2" :key="item.index">
            <i class="el-icon-circle-plus-outline" @click="addField(index)"></i>
            <span style="margin-left:20px">
              {{ $t(`common.${item.label}`) }}
            </span>
          </li>
        </ul>
        <!-- </el-scrollbar> -->
      </div>
    </div>
    <div class="handle_buttons">
      <!-- <el-button disabled plain @click="restoreDefault">还原默认值</el-button> -->
      <div></div>
      <div>
        <el-button plain @click="cancelConfig">取 消</el-button>
        <el-tooltip class="item" effect="dark" content="确定保存以上配置" placement="top">
          <el-button type="success" plain @click="saveConfig">确 定</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from 'sortablejs'
import { commonApi } from '@/http/api/common'
import dataStructure from '@/utils/dataStructure'
import { bus } from '@/utils/bus'
import { computed, defineComponent, onMounted, reactive, toRefs, watch, ref } from 'vue'
import { IRequest } from '@/@types/httpInterface'
interface IState {
  tableData1: any[]
  tableData2: any[]
  tableData: any[]
  defaultData: any[]
  table: any
}
export default defineComponent({
  props: {
    table: {
      type: String,
      default: ''
    },
    common_array: {
      type: Array,
      default: []
    }
  },
  emits: ['cancelConfig'],
  setup(props, ctx) {
    const state: IState = reactive({
      tableData1: [],
      tableData2: [],
      tableData: [],
      defaultData: [],
      table: computed(() => props.table)
    })
    const requests = {
      // 获取字段请求
      getCustom() {
        const data = dataStructure(
          { power_url: 'V1/Public/the_custom_column' },
          {
            table: state.table
          }
        )
        commonApi
          .get_custom(data)
          .then(res => {
            let { status, custom_data, info } = res as IRequest
            if (status === 200) {
              const { all_array } = custom_data.data
              state.tableData = all_array
              state.defaultData = all_array
              all_array.forEach((item: any) => {
                if (item.isChecked) {
                  state.tableData1.push(item)
                } else {
                  state.tableData2.push(item)
                }
              })
            }
          })
          .catch(err => err)
      }
    }
    const methods = {
      // 关闭列配置弹出框
      cancelConfig() {
        ctx.emit('cancelConfig')
      },
      // restoreDefault() {
      //   // bus.$emit(props.table, this.defaultData)
      // },
      saveConfig() {
        let all_array = state.tableData1.concat(state.tableData2)

        bus.$emit(state.table, all_array)
        ctx.emit('cancelConfig')
      },

      removeField(index: any) {
        let oldItem = state.tableData1[index]
        oldItem.isChecked = false
        state.tableData1.splice(index, 1)
        state.tableData2.push(oldItem)
      },
      addField(index: any) {
        let oldItem = state.tableData2[index]
        oldItem.isChecked = true
        state.tableData2.splice(index, 1)
        state.tableData1.push(oldItem)
      },
      // 初始话sortable
      initSort() {
        // const _this = this
        const el: any = document.querySelectorAll('ul.left')[0]
        // const sortable = new Sortable(el, options);
        // 根据具体需求配置options配置项
        Sortable.create(el, {
          group: 'shared',
          onEnd: (evt: any) => {
            // 监听拖动结束事件
            let oldIndex = evt.oldIndex
            let newIndex = evt.newIndex
            let oldItem = state.tableData1[oldIndex]
            switch (evt.to.className) {
              case 'right':
                oldItem.isChecked = false
                state.tableData1.splice(oldIndex, 1)
                state.tableData2.splice(newIndex, 0, oldItem)
                break
              case 'left':
                state.tableData1.splice(oldIndex, 1)
                state.tableData1.splice(newIndex, 0, oldItem)
                break
              default:
                break
            }
          }
        })

        // ============右边
        const elRight: any = document.querySelectorAll('ul.right')[0]
        // const sortable = new Sortable(el, options);
        // 根据具体需求配置options配置项
        Sortable.create(elRight, {
          group: 'shared',
          onEnd: (evt: any) => {
            let oldIndex = evt.oldIndex
            let newIndex = evt.newIndex
            let oldItem = state.tableData2[oldIndex]
            switch (evt.to.className) {
              case 'right':
                state.tableData2.splice(oldIndex, 1)
                state.tableData2.splice(newIndex, 0, oldItem)
                break
              case 'left':
                oldItem.isChecked = true
                state.tableData2.splice(oldIndex, 1)
                state.tableData1.splice(newIndex, 0, oldItem)
                break
              default:
                break
            }
          }
        })
      }
    }

    onMounted(() => {
      methods.initSort()
      requests.getCustom()
    })
    return {
      ...toRefs(state),
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.content {
  .outer_cont {
    display: flex;
    .inner_cont {
      border: 1px dashed gray;
      width: 280px;
      height: 300px;
      ul {
        overflow: auto;
        height: 100%;
        li {
          line-height: 34px;
          text-align: left;
          height: 34px;
          width: 220px;
          padding: 0px 10px;
          cursor: pointer;
        }
        li:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      ul.left > li {
        background-color: #2881c7;
      }
      ul.right > li {
        background-color: palevioletred;
      }
    }
    .inner_cont:last-child {
      margin-left: 20px;
    }
  }
  .title {
    width: 70%;
    display: flex;
    font-size: 15px;
    justify-content: space-between;
  }
  .handle_buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
