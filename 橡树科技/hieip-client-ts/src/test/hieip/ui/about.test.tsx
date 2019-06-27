import React from 'react'
import { render } from 'react-dom'
import { Button } from 'antd'

function test() {
    // console.log(123)
}

render(<div>
        <Button onClick={test}>测试</Button>
    </div>,
    document.getElementById('root'))