import React from 'react'
import { render } from 'react-dom'
import Diagnosis from 'view/pat-manage/patient-opt/diagnosis'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Diagnosis}/>, document.getElementById('root'))