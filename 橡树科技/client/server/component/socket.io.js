/**
 * Created by jahv on 2017/6/26.
 */
import socket from 'socket.io';
import {Server} from './server'
import config from '../config';

const io = socket(Server);

export {io}