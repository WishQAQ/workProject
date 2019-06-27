import React from 'react'
import { render } from 'react-dom'
import PatientOverview from 'view/pat-manage'
// import MainContent from 'view/pat-manage/overview/main'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={PatientOverview}/>, document.getElementById('root'))