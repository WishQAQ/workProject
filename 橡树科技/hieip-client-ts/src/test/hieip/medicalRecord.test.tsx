import React from 'react'
import { render } from 'react-dom'
import { LazyLoader } from 'tools/lazyLoader'

import record from 'view/medical/medical-record'

render(
    <LazyLoader lazyModule={record}/>,
    document.getElementById('root')
)