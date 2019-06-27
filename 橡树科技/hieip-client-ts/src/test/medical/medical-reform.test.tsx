import React from 'react'
import {render} from 'react-dom'
import MedicalReform from 'view/medical/medical-reform'
import {LazyLoader} from 'tools/lazyLoader'

render(<LazyLoader lazyModule={MedicalReform}/>, document.getElementById('root'))