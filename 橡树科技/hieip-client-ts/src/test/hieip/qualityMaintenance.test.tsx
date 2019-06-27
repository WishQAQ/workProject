import React from 'react'
import { render } from 'react-dom'
import FixedValue from 'view/medical/data-set'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={FixedValue}/>, document.getElementById('root'))