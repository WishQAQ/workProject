/**
 * 去除空格
 * @param  {str}
 * @param  {type}
 * type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
export const trim = (str, type = 1) => {
  if (!str) return str
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '')
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s*)/g, '')
    case 4:
      return str.replace(/(\s*$)/g, '')
    default:
      return str
  }
}

/**
 * 验证身份证
 * @param  {idCard}
 * @return {Boolean}
 */
export const checkCard = (idCard) => {
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
      var idCardWiSum = 0
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11
      var idCardLast = idCard.substring(17)
      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {
          return true
        } else {
          return false
        }
      } else {
        if (idCardLast - 0 === idCardY[idCardMod] - 0) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}
