import React from 'react'
import { render } from 'react-dom'
import Home from 'view/home'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Home}/>, document.getElementById('root'))