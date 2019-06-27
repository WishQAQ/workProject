import React from 'react'
import { render } from 'react-dom'
import Schedule from 'view/hand-over/classes/schedule'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Schedule}/>, document.getElementById('root'))