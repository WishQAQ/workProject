/**
 * 交接班测试
 * Created by mou.
 */
import React from 'react'
import { render } from 'react-dom'
import ChangeShifts from 'src/view/hand-over/shift/change-shifts'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={ChangeShifts}/>, document.getElementById('root'))