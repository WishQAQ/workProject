import * as React from 'react'
import { render } from 'react-dom'
import PatientList from 'view/triage/patient-list'

import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={PatientList}/>, document.getElementById('root'))