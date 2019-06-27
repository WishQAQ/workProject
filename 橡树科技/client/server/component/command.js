/**
 * Created by jahv on 2017/6/26.
 */
import {io} from './socket.io';
import {windows, createWindows} from './window';
import mac from 'getmac'
import config from '../config';

const default_command = {
  version: config.dev === true ? require('../../package.json').version : require('../package.json').version,
  getMac: new Promise((resolve, reject) => {
    mac.getMac((err, mac) => {
      if (err) reject(err);
      resolve(mac);
    });
  }),
  createWindow: function () {
    createWindows(true);
  }
};

const command = io.of("/command");

command.on('connection', function (socket) {
  if (config.dev === true) socket.emit('init', "command socket client successful!");
  socket.on('cmd', function (data) {
    const {id, cmd, random} = data;
    cmd.forEach(cmd => {
      let dc;
      if ((dc = default_command[cmd])) {
        if (typeof dc.then === 'function') {
          dc.then(data => {
            socket.emit('do', {random, res: data});
          })
        } else if (typeof dc === 'function') {
          socket.emit('do', {random, res: dc()});
        } else {
          socket.emit('do', {random, res: dc});
        }
      } else {
        let win = windows[id];
        dc = eval('win.' + cmd);
        socket.emit('do', {random, res: dc});
      }
    })
  });
});

export {command}