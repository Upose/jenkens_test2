<template>
  <div class="content">
    <el-alert :title="$t(`common.isDrowg`)" type="info" :closable="false"> </el-alert>
    <div class="title">
      <div>{{ $t(`common.isShow`) }}{{ tableData1.length }}</div>
      <div>{{ $t(`common.notShow`) }}{{ tableData2.length }}</div>
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
      <el-button disabled plain @click="restoreDefault">还原默认值</el-button>
      <div>
        <el-button plain @click="cancelConfig">取 消</el-button>
        <el-tooltip class="item" effect="dark" content="确定保存以上配置" placement="top">
          <el-button type="success" plain @click="saveConfig">确 定</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { commonApi } from '@/http/api/common'
import dataStructure from '@/utils/dataStructure'
import { bus } from '@/utils/bus'
export default {
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
  data() {
    return {
      tableData1: [],
      tableData2: [],
      tableData: [],
      defaultData: []
    }
  },
  methods: {
    // 关闭列配置弹出框
    cancelConfig() {
      this.$emit('cancelConfig')
    },
    restoreDefault() {
      // bus.$emit(props.table, this.defaultData)
    },
    saveConfig() {
      let all_array = this.tableData1.concat(this.tableData2)
      bus.$emit(this.table, all_array)
    },

    // 获取字段请求
    getCustom() {
      const data = dataStructure(
        { power_url: 'V1/Public/the_custom_column' },
        {
          table: this.table
        }
      )
      commonApi
        .get_custom(data)
        .then(res => {
          let { status, custom_data, info } = res
          if (status === 200) {
            const { all_array } = custom_data.data
            this.tableData = all_array
            this.defaultData = all_array
            all_array.forEach(item => {
              if (item.isChecked) {
                this.tableData1.push(item)
              } else {
                this.tableData2.push(item)
              }
            })
          }
        })
        .catch(err => err)
    },
    removeField(index) {
      let oldItem = this.tableData1[index]
      oldItem.isChecked = false
      this.tableData1.splice(index, 1)
      this.tableData2.push(oldItem)
    },
    addField(index) {
      let oldItem = this.tableData2[index]
      oldItem.isChecked = true
      this.tableData2.splice(index, 1)
      this.tableData1.push(oldItem)
    },
    // 初始话sortable
    initSort() {
      const _this = this
      const el = document.querySelectorAll('ul.left')[0]
      // const sortable = new Sortable(el, options);
      // 根据具体需求配置options配置项
      Sortable.create(el, {
        group: 'shared',
        onEnd: evt => {
          // 监听拖动结束事件
          let oldIndex = evt.oldIndex
          let newIndex = evt.newIndex
          let oldItem = _this.tableData1[oldIndex]
          switch (evt.to.className) {
            case 'right':
              oldItem.isChecked = false
              _this.tableData1.splice(oldIndex, 1)
              _this.tableData2.splice(newIndex, 0, oldItem)
              break
            case 'left':
              _this.tableData1.splice(oldIndex, 1)
              _this.tableData1.splice(newIndex, 0, oldItem)
              break
            default:
              break
          }
        }
      })

      // ============右边
      const elRight = document.querySelectorAll('ul.right')[0]
      // const sortable = new Sortable(el, options);
      // 根据具体需求配置options配置项
      Sortable.create(elRight, {
        group: 'shared',
        onEnd: evt => {
          let oldIndex = evt.oldIndex
          let newIndex = evt.newIndex
          let oldItem = _this.tableData2[oldIndex]
          switch (evt.to.className) {
            case 'right':
              _this.tableData2.splice(oldIndex, 1)
              _this.tableData2.splice(newIndex, 0, oldItem)
              break
            case 'left':
              oldItem.isChecked = true
              _this.tableData2.splice(oldIndex, 1)
              _this.tableData1.splice(newIndex, 0, oldItem)
              break
            default:
              break
          }
        }
      })
    }
  },
  mounted() {
    this.initSort()
    this.getCustom()
  }
}
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
        background-color: greenyellow;
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
