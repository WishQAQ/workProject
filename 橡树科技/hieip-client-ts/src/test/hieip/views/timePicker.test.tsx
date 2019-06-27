import * as React from 'react'
import { render } from 'react-dom'
import { TimePicker } from 'pkg/common/timePicker'
import 'antd/dist/antd.less'

render(<TimePicker
    isRange={true}
    timePrecision={1}
    oValue={''}
    startPlaceholder="时间"
    endPlaceholder="时间2"/>, document.getElementById('root'))