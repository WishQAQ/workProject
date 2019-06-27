import React from 'react'
import { render } from 'react-dom'
import DataRange from 'view/medical/data-range'
import { LazyLoader } from 'tools/lazyLoader'

render(
    <LazyLoader lazyModule={DataRange}/>,
    document.getElementById('root')
)