import React from 'react'
import { render } from 'react-dom'
import NursingUnit from 'view/hand-over/classes/nursing-unit'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={NursingUnit}/>, document.getElementById('root'))