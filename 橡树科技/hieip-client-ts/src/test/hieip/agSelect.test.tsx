import * as React from 'react'
import { render } from 'react-dom'
import { Select } from 'pkg/common/ag/select'

const data = [
    { name: '下拉1', id: 1, inputCode: 'XLA' },
    { name: '下拉2', id: 2, inputCode: 'XLB' },
    { name: '下拉3', id: 3, inputCode: 'XLC' },
    { name: '下拉4', id: 4, inputCode: 'XLD' },
    { name: '下拉5', id: 5, inputCode: 'XXD' }
]
const dataOption = { value: 'name', key: 'id', inputCode: 'inputCode' }
render(
    <div>
        <Select
            data={data}
            dataOption={dataOption}
            onClick={(v) => v}
            style={{ width: '200px', height: '30px' }}
            isMulti={true}
            isSearch={true}
            isSaveSearch={true}
        />
        {/* <Selec /> */}
    </div>,
    document.getElementById('root')
)  