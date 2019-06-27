import React from 'react'
import { render } from 'react-dom'
import Vital from 'view/triage/new-triage/vital-sign'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Vital}/>, document.getElementById('root'))