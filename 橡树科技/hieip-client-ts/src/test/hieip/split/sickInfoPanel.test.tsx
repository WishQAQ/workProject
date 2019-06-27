import React from 'react'
import ReactDOM from 'react-dom'
import SickInfoPanel from 'view/triage/new-triage/patient'
import { LazyLoader } from 'tools/lazyLoader'

ReactDOM.render(
    <LazyLoader lazyModule={SickInfoPanel}/>,
    document.getElementById('root')
)
