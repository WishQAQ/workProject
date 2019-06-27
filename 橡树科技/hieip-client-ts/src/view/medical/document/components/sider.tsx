/**
 * Created by mod on 2018/1/8.
 *
 */

import * as React from 'react'
import { Button, Layout, Tree } from 'antd'
import * as css from '../../translate/style/index.scss'
import * as style from '../style/index.scss'
import { Table } from 'pkg/common/table/table'
import debug from 'debug'
import { DragMove } from 'pkg/common/dragging'
import { FluxComponent } from 'tools/flux/FluxComponent'

const log = debug('debug:病历:transale')

const columns = [
    {
        headerName: '缺陷编码',
        field: 'mrClass'
    }, {
        headerName: '缺陷名称',
        field: 'topic'
    }, {
        headerName: '操作',
        field: 'other',
        minWidth: 60,
        maxWidth: 60,
        cellRendererFramework: (params) => {
            return <Button
                onClick={() => log('确认')}
                size="small"
                className={!0 ? style.bab_hd_btn : style.bab_hd_cancel}
            >{!0 ? '确定' : '已取消'}</Button>
        }
    }]

const columeData = []
for (let i = 0; i < 100; i++) {
    columeData.push({
        mrClass: 'djgdg',
        topic: 'name' + i,
        other: 'button'
    })
}
export default class DocumentSider extends React.Component<any> {

    render() {
        return (
            <Layout.Sider
                trigger={null}
                collapsible={true}
                collapsed={true}
                className={css.sider_t}
            >
                <div className={css.sider}>
                    <header className={style.header}>
                        <span>病历改整列表</span>
                    </header>
                    <section
                        className={style.section}
                        style={{ height: '50%' }}
                    >
                        <Tree
                            showLine={true}
                            onSelect={(key, e) => log(key, e)}
                        >
                            <Tree.TreeNode title="入院病历" key="0-0-2">
                                <Tree.TreeNode title="入院病历0" key="0-0-0"/>
                                <Tree.TreeNode title="入院病历f" key="0-0-0-0"/>
                                <Tree.TreeNode title="入院病历2" key="0-0-0-1"/>
                                <Tree.TreeNode title="入院病历3" key="0-0-0-2"/>
                            </Tree.TreeNode>
                            <Tree.TreeNode title="首次病程记录" key="0-0">
                                <Tree.TreeNode title="首次病程记录0" key="0-1-0"/>
                                <Tree.TreeNode title="首次病程记录f" key="0-1-0-0"/>
                                <Tree.TreeNode title="首次病程记录2" key="0-1-0-1"/>
                                <Tree.TreeNode title="首次病程记录3" key="0-1-0-2"/>
                            </Tree.TreeNode>
                        </Tree>
                    </section>
                    <section
                        style={{ height: '46%' }}
                    >
                        <Table
                            columnDefs={columns}
                            rowData={columeData}
                            rowSelection={'multiple'}
                            onGridReady={this.onGridReady}
                        />
                    </section>
                </div>
            </Layout.Sider>
        )
    }

    private onGridReady(parms) {
        log(parms)
    }
}