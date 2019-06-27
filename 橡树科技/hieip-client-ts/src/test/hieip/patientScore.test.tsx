import React from 'react'
import { render } from 'react-dom'
import PatientScore from 'view/triage/new-triage/score'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={PatientScore}/>, document.getElementById('root'))