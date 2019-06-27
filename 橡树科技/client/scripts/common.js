/**
 * Created by jahv on 2017/6/27.
 */
export const uglify_config = {
  compress: {
    warnings: false,
    global_defs: {
      '_config2.default.dev': false,
      'process.env.NODE_ENV': 'production',
      't.env.NODE_ENV': 'production',
      DEBUG: false,
    },
    evaluate: true,
    loops: true,
    cascade: true,
    properties: true,
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: false,
    passes: 2,
  },
  output:{
    comments: false,
  }
};

export const webpack_stats = {
  colors: true,
  reasons: false,
  hash: false,
  version: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  cached: false,
  cachedAssets: false,
};