/*
 * @Descripttion:
 * @Author: XJ
 * @LastEditors: XJ
 */
import { ElMessage } from 'element-plus'
// import { ElMessageComponent } from 'element-plus/types/message';
let messageInstance: any = null

const resetMessage: any = (options: any) => {
  if (messageInstance) {
    messageInstance.close()
  }
  console.log('resetMessage执行')

  messageInstance = ElMessage(options)
}
;['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = (options: any) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})

export default resetMessage
