/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-07-13 11:30:08
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-30 13:25:18
 */
import { changeMoney, changeNumber, isChangeNumber } from '../utils/moneyToMicrometer'
// ##运算方法小数点误差处理
// 1） 除法函数
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：operationDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果

// function operationDiv(arg1:any,arg2:any){
// arg1 = changeNumber(arg1)
// arg2 = changeNumber(arg2)
//     var t1=0,t2=0,r1,r2;
//     try{t1=arg1.toString().split(".")[1].length}catch(e){}   //--小数点后的长度
//     try{t2=arg2.toString().split(".")[1].length}catch(e){}  //--小数点后的长度
//     with(Math){
//       r1=Number(arg1.toString().replace(".",""))  //--去除小数点变整数
//       r2=Number(arg2.toString().replace(".",""))  //--去除小数点变整数
//       return (r1/r2)*pow(10,t2-t1);   //---整数相除 在乘上10的平方  小数点的长度
//     }
// }

// 2） 乘法函数
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：operationMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export function operationMul(arg1: any, arg2: any, isMicrometer: boolean = false) {
  // 出现千分符，转换成正常值
  arg1 = isChangeNumber(arg1)
  arg2 = isChangeNumber(arg2)
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  if (isMicrometer) {
    return changeMoney(
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
    )
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}
// 3） 加法函数
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：operationAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
export function operationAdd(arg1: any, arg2: any, isMicrometer: boolean = false) {
  // 出现千分符，转换成正常值
  arg1 = isChangeNumber(arg1)
  arg2 = isChangeNumber(arg2)
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  if (isMicrometer) {
    return changeMoney((arg1 * m + arg2 * m) / m)
  }
  return (arg1 * m + arg2 * m) / m
}

// 4） 减法函数
export function operationSub(arg1: any, arg2: any, isMicrometer: boolean = false) {
  // 出现千分符，转换成正常值
  arg1 = isChangeNumber(arg1)
  arg2 = isChangeNumber(arg2)
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  //last modify by deeka
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  if (isMicrometer) {
    return changeMoney(((arg1 * m - arg2 * m) / m).toFixed(n))
  }
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
