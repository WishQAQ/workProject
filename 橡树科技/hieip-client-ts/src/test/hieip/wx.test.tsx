import React from 'react'
import { render } from 'react-dom'
import TplMaintenance from 'view/medical/tpl-maintenance'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={TplMaintenance}/>, document.getElementById('root'))