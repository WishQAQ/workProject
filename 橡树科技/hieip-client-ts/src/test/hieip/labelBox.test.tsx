import React from 'react'
import { render } from 'react-dom'
import { LabelBox } from 'pkg/ui/labelBox'
import { HintInput } from 'pkg/common/input'

render(<LabelBox asterisk={true} riskPosition={'left'} text="测试">
    <HintInput/>
</LabelBox>, document.getElementById('root'))