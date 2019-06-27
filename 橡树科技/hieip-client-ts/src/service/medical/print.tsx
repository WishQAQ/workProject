/**
 * Created by mou on 2018/2/7.
 */

import io from 'socket.io-client'
import {message} from 'pkg/common/message'
let socket = null

const back = []

function messageBack(da) {
  const b = back[da.id]
  if (b) {
    if (da.warn) {
      //  console.warn(da.message)
    } else {
      if (da.success) {
        b[0](da)
      } else {
        //    console.log(da)
      }
    }
  }
}

export class Print {
  static client() {
    return new Promise((resolve, reject) => {
      const printHost = window.localStorage.getItem('print-host') || 'localhost:6002'
      socket = io('http://' + printHost + '/oak-print',{wsEngine: 'ws'})
      socket.on('connect_error', function (error) {
        socket.close()
        reject('连接打印程序失败！')
      })
      socket.on('connect_timeout', function (error) {
        socket.close()
        reject('连接打印程序超时！')
      })
      socket.on('connect', function () {
        resolve()
      })
      socket.on('disconnect', function () {
        socket.close()
        socket = null
        message.tip('打印程序已断开!', 'info', 'center')
      })
      socket.on('mession', messageBack)
      socket.on('result', messageBack)
    })
  }

  static send(obj) {
    obj.id = Date.now()
    socket.emit('message', obj)
    return new Promise((resolve, reject) => {
      back[obj.id] = [resolve, reject]
    })
  }

  static message(obj) {
    return new Promise((resolve, reject) => {
      if (socket === null) {
        Print.client().then(function () {
          return Print.send(obj).then((res) => {
            resolve(res)
          })
        }).catch(function (err) {
          socket = null
          alert(err)
        })
      } else {
        return Print.send(obj).then((res) => {
          resolve(res)
        })
      }
    })
  }
}