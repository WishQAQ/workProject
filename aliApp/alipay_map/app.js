App({
  onLaunch(options) {
    this.watchNetwork()
    if (options.query) {
      const query = options.query
      const globalData = this.globalData
      globalData.cur_home = JSON.parse(query['flutter.cur_home']) || {}
      globalData.cur_unit = JSON.parse(query['flutter.cur_unit']) || {}
      globalData.cur_branch = JSON.parse(query['flutter.cur_branch']) || {}
      globalData.cur_tab = query['flutter.cur_tab'] || ''
      const cur_tab = globalData['cur_' + globalData.cur_tab]
      globalData.tags = cur_tab.tabs || []
      if (
        Array.isArray(globalData.tags) &&
        globalData.tags.filter(item => item.type === 'manage').length
      ) {
        globalData.org_code = cur_tab.org_code
      }
      globalData.org_key = cur_tab.key
      globalData.httpHeader.jwt = query['flutter.jwt'] || ''
      globalData.httpHeader.authorization = query['flutter.token']
        ? 'Bearer' + ' ' + query['flutter.token']
        : ''
    }
  },
  watchNetwork() {
    my.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        return my.vibrateLong({
          success: () => {
            my.showToast({
              type: 'exception',
              content: '您断了开网络',
              duration: 1500
            })
          }
        })
      }
      if (res.isConnected) {
        my.hideToast()
        return my.vibrateShort({
          success: () => {
            my.showToast({
              content: '您重新回到了互联网',
              duration: 1500
            })
          }
        })
      }
      if (res.networkType === '2G' || res.networkType === '3G') {
        return my.showToast({
          type: 'exception',
          content: `当前网络为${res.networkType}`,
          duration: 2000
        })
      }
    })
  },
  globalData: {
    httpHeader: {
      jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTY2MDczMTEsInN1YiI6IntcImNjcF9tZW1fa2V5XCI6XCI0ZTg1MmUyYzczNTQ0MjcwYWE4YjBhN2VkNTZkMTI5NFwiLFwidXNlcl9uYW1lXCI6XCLliJjlpKnlv5dcIixcInVzZXJfa2V5XCI6XCJhMTRlNjczYy0zOGFjLTExZTktOWExMi02YzkyYmY1NjJkYjJcIixcImFjY2Vzc190b2tlblwiOlwiODk5MDg1MDZjOTFmNGJmYmM3MmUxYWRmYmQ3NGI3YmVjZmNkOGQxMDM1OTk2M2Q0Y2FkMDVmZDVkZjM3OGQ4NlwiLFwiaXN1dWVkQXRcIjoxNTU2NjA3MzExNjIyLFwiYWNjZXNzX2lkXCI6MyxcInVzZXJcIjp7XCJhY2Nlc3NJZFwiOjMsXCJhY2Nlc3NUb2tlblwiOlwiODk5MDg1MDZjOTFmNGJmYmM3MmUxYWRmYmQ3NGI3YmVjZmNkOGQxMDM1OTk2M2Q0Y2FkMDVmZDVkZjM3OGQ4NlwiLFwiYXZhdGFyXCI6XCIvdGVzdC91cmwvMS5wbmdcIixcImNjcE1lbUtleVwiOlwiNGU4NTJlMmM3MzU0NDI3MGFhOGIwYTdlZDU2ZDEyOTRcIixcImlkY2FyZFwiOlwiMTIzNDU2XCIsXCJpc0ZpcnN0TG9naW5cIjowLFwiaXNQYXJ0eU1lbVwiOjEsXCJrZXlcIjpcImExNGU2NzNjLTM4YWMtMTFlOS05YTEyLTZjOTJiZjU2MmRiMlwiLFwibmFtZVwiOlwi5YiY5aSp5b-XXCIsXCJwaG9uZVwiOlwiMTU5MDIzODU4NzBcIn0sXCJhY2NvdW50XCI6XCIxNTkwMjM4NTg3MFwifSJ9.7iRV6TmzUpAIUsv1ZlMOYVL1s1ynGTtN5_8ntT17knM',
      authorization: 'Bearer 89908506c91f4bfbc72e1adfbd74b7becfcd8d10359963d4cad05fd5df378d86',
      app: 'ccpm',
      spid: 'JSJG'
    },
    tags: [],
    org_code: '',
    org_key: '',
    cur_home: {},
    cur_unit: {},
    cur_tab: {}
  }
});
