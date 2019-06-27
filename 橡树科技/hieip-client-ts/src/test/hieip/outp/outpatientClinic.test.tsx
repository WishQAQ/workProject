import React from 'react'
import {render} from 'react-dom'
import {LazyLoader} from 'tools/lazyLoader'
import OutpatientClinic from 'view/pat-manage/outpatient-clinic/index'

render(
    <LazyLoader lazyModule={OutpatientClinic}/>,
    document.getElementById('root')
)