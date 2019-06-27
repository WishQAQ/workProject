import React from 'react'
// import Blood from 'view/pat-manage/patient1-opt/operation'
// import Blood from 'view/pat-manage/patient1-opt/blood'
// import Blood from 'view/triage/new-triage'
// import { Classify } from 'pkg/triage-score/addScore/classify'
import { LazyLoader } from 'tools/lazyLoader'

const tags = [
    { value: '颈部外伤', tip: '高危险物质123，xxxxxx', classId: 2 },
    { value: '骨骼系统', tip: '高危险物质456，xxxxxx', classId: 4 }
]
const tagsOption = { value: 'value', tip: 'tip', classifyId: 'classId' }
const classify = [
    { value: '颈部外伤', id: 3 },
    { value: '骨骼系统', id: 2 },
    { value: '神经系统', id: 1 },
    { value: '眼科', id: 4 }
]
const classifyOption = { name: 'value', key: 'id' }
const judgmentBasis = [
    { value: '颈部外伤', level: '3' },
    { value: '骨骼系统', level: '2' },
    { value: '神经系统', level: '1' },
    { value: '眼科', level: '4' }
]
const judgmentBasisOption = { name: 'value', level: 'level' }

// render(<LazyLoader lazyModule={Blood} />, document.getElementById('root'))
// render(<Classify
//   data={classify}
//   option={classifyOption}
//   tags={tags}
//   tagsOption={tagsOption}
//   onClick={(v) => console.log(v)}
// />, document.getElementById('root'))