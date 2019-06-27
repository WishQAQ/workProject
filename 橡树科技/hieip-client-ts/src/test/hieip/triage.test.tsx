import React from 'react'
import { render } from 'react-dom'
import Triage from 'view/triage/new-triage'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Triage}/>, document.getElementById('root'))