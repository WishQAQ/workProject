import React from 'react'
import { render } from 'react-dom'
import GroupHurt from 'src/view/triage/group-injury'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={GroupHurt}/>, document.getElementById('root'))