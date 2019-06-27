import React from 'react'
import { render } from 'react-dom'
import RecordArchiving from 'src/view/medical/record-archiving'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={RecordArchiving}/>, document.getElementById('root'))