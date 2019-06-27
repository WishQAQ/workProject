import React from 'react'
import { render } from 'react-dom'
import FixedValue from 'src/view/medical/bd-fixed'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={FixedValue}/>, document.getElementById('root'))
