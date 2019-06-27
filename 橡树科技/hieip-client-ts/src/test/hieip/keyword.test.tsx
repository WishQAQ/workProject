import React from 'react'
import { render } from 'react-dom'
import { LazyLoader } from 'tools/lazyLoader'

import Keyword from 'view/medical/keyword'

render(
    <LazyLoader lazyModule={Keyword}/>,
    document.getElementById('root')
)