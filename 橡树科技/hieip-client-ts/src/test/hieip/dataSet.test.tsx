import React from 'react'
import { render } from 'react-dom'
import DataSet from 'view/medical/data-set'
import { LazyLoader } from 'tools/lazyLoader'

render(
    <LazyLoader lazyModule={DataSet}/>,
    document.getElementById('root')
)