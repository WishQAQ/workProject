import React from 'react'
import { render } from 'react-dom'
import Paragraphs from 'src/view/hand-over/classes/paragraphs'
import { LazyLoader } from 'tools/lazyLoader'

render(<LazyLoader lazyModule={Paragraphs}/>, document.getElementById('root'))