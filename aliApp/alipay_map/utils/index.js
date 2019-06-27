/**
 * 防抖函数
 * @param {*} fn 
 * @param {*} delay 
 */
export function debounce(fn, delay) {
  // 定时器
  let timer = null
  
  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this

    // 保留调用时传入的参数
    let args = arguments

    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 判断是不是一个空对象
 * @param {*} obj
 */
export const isEmptyObj = (obj) => {
  let t
  for (t in obj) {
    return !1
  }
  return !0
}

/**
 * 去除重复的数组对象
 * @param {*} array 
 * @param {*} key 
 */
export const removeRepeatArrayObject = (array, key) => {
  if (array.length <= 0) return array
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j][key] === array[i][key]) {
        array.splice(j, 1)
        j--
      }
    }
  }
  return array
}