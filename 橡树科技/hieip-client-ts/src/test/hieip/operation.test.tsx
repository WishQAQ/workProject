import React from 'react'
import { render } from 'react-dom'
import Operation from 'view/pat-manage/patient-opt/operation'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Operation}/>, document.getElementById('root'))