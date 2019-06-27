import React from 'react'
import { render } from 'react-dom'
import NormalTree from 'pkg/ui/normal-tree'

let arrayFirst = []
for (let i = 0; i < 2; i++) {
    arrayFirst.push({
        serialNo: `serialNo${i}`,
        examClassName: `examClassName${i}`,
        name: `name${i}`
    })
}

let arraySec = []
for (let j = 0; j < 3; j++) {
    arraySec.push({
        description: `${j}`,
        descriptionCode: `${j}`
    })
}

render(<div>
    <NormalTree
        examTreeData={arrayFirst}
        examTreeDataSec={arraySec}
    />
</div>, document.getElementById('root'))