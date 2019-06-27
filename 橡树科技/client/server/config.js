/**
 * Created by jahv on 2016/12/6.
 */
import {argv} from 'optimist';
import debug from '../debug.json';

export default {
    port: argv.port || 6002,
    host: argv.host || '127.0.0.1',
    dev: argv.dev,
    devPort: argv.dev_port || argv.port || 6003,
    devHost: argv.dev_host || '127.0.0.1',
    devPublic: "127.0.0.1:" + (argv.dev_port || argv.port || 6003),
    server: debug.server_host,
    mapping: debug.url_mapping
};
