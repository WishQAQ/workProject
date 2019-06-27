export const saveStorage = (key, data) => {
  my.setStorageSync({
    key,
    data
  })
}

export const getStorage = (key) => {
  return key ? my.getStorageSync({ key: key }) || '' : ''
}

export const removeStorage = (key) => {
  key && my.removeStorageSync({ key })
}
