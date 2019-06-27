import React from 'react'
import { render } from 'react-dom'
import HurtList from 'src/view/triage/group-injury/hurt-list'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={HurtList}/>, document.getElementById('root'))