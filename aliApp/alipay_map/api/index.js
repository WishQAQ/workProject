import http from './http'

const version = '/api/ccpm/v1'

/**
 * ------ 选人组件开始 ------
 */
const pick = `${version}/personnelChoices`
// 获取首页数据
export const getPickHome = (params) => {
  return http('GET', `${pick}/getQueryType`, params)
}

// 级联选择
export const getPickData = (params) => {
  return http('GET', `${pick}/query`, params)
}

// 党内职务列表
export const getPartyJob = (params) => {
  return http('GET', `${pick}/getPartyJob`, params)
}
