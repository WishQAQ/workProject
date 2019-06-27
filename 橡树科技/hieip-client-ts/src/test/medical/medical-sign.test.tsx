import React from 'react'
import {render} from 'react-dom'
import MedicalSign from 'view/medical/medical-sign'
import {LazyLoader} from 'tools/lazyLoader'

render(
    <LazyLoader lazyModule={MedicalSign}/>,
    document.getElementById('root'))