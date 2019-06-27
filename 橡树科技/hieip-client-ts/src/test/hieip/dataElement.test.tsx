import React from 'react'
import { render } from 'react-dom'
import DataElement from 'view/medical/data-element'
import { LazyLoader } from 'tools/lazyLoader'

render(
    <LazyLoader lazyModule={DataElement}/>,
    document.getElementById('root')
)