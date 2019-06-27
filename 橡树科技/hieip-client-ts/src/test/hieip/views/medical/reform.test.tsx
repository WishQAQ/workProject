import React from 'react'
import ReactDOM from 'react-dom'
import MedicalReform from 'src/view/medical/medical-reform'
import { LazyLoader } from 'tools/lazyLoader'

ReactDOM.render(
    <LazyLoader lazyModule={MedicalReform}/>,
    document.getElementById('root')
)