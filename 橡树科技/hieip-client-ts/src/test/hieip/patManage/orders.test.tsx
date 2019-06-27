import React from 'react'
import { render } from 'react-dom'
import Orders from 'view/pat-manage/patient-opt/orders/apply'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Orders}/>, document.getElementById('root'))