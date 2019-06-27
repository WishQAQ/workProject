/**
 * 模糊查询测试
 * Created by oak-01 on 2017/12/18.
 */
import React from 'react'
import { render } from 'react-dom'
import FuzzyQuery from 'src/view/system-config/select-input-dict'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={FuzzyQuery}/>, document.getElementById('root'))