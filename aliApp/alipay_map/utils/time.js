/**
 * 获取距离当前时间的时间差 最大3天之内
 */
export const friendTime = (time, format = 'yyyy-MM-dd') => {
  if (!time) return ''
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateBegin = new Date(time.replace(/-/g, "/"));//将-转化为/，使用new Date
  var dateEnd = new Date();//获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
  //计算相差秒数
  // var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
  // var seconds = Math.round(leave3 / 1000);
  var timesString = '';

  if (dayDiff !== 0) {
    if (dayDiff < 4 && dayDiff > 0) {
      timesString = dayDiff + '天前';
    } else {
      timesString = formatDate(dateBegin, format)
    }
  } else if (dayDiff === 0 && hours !== 0) {
    timesString = hours + '小时前';
  } else if (dayDiff === 0 && hours === 0) {
    if (minutes < 2) {
      timesString = '刚刚'
    } else {
      timesString = minutes + '分钟前';
    }
  }
  return timesString
}

export const formatDate = (strTime, format) => {
  let date = strTime instanceof Date ? strTime : new Date(strTime.replace(/-/g, '/'))
  let fmt = format || 'yyyy-MM-dd hh:mm:ss'
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
