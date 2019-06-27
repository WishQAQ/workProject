import React from 'react'
import { render } from 'react-dom'
import Approved from 'view/hand-over/classes/approved'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Approved}/>, document.getElementById('root'))