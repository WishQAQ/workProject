import React from 'react'
import { render } from 'react-dom'
import Exam from 'view/pat-manage/patient-opt/exam/apply'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Exam}/>, document.getElementById('root'))