import React from 'react'
import { render } from 'react-dom'
import TplMaintenance from 'src/view/medical/tpl-maintenance'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={TplMaintenance}/>, document.getElementById('root'))