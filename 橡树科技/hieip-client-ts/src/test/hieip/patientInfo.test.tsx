import React from 'react'
import { render } from 'react-dom'
import { LazyLoader } from 'tools/lazyLoader'
import PatientInfo from 'view/pat-manage/patient-info'

render(<LazyLoader lazyModule={PatientInfo}/>, document.getElementById('root'))