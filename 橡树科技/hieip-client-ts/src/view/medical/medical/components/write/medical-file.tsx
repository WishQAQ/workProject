/**
 * Created by oakm on 2017/12/26.
 */

'use strict'
import * as React from 'react'
import * as css from '../../style/index.scss'
import { Layout } from 'antd'
import debug from 'debug'
import { LazyLoader } from 'src/tools/lazyLoader'
import MedicalSider from './medical-sider'
import style from 'view/medical/translate/style/index.scss'
import { Medical, ReadMode } from 'medical-draft'
import { IconFont } from 'pkg/common/icon'
import { FluxComponent } from 'src/tools/flux/FluxComponent'
import { MedicalFileState, medicalFileService } from '../../../../../service/medical/medical/components/write/medical-file'

const log = debug('trace:病历:medical')

const { Header, Footer, Sider, Content } = Layout

const btn = [
    {
        name: '打印',
        type: 'print',
        icon: 'icon-ordinaryprint'
    },
    {
        name: '保存',
        type: 'save',
        icon: 'icon-baocun1'
    },
    {
        name: '获取信息',
        type: 'obtain',
        icon: 'icon-shuaxin'
    },
    {
        name: '电子签名',
        type: 'autograph',
        icon: 'icon-xie'
    }
]

export default class MedicalFile extends FluxComponent<MedicalFileState> {
    title = '病历书写头部'
    medicalFileService = medicalFileService
    medical = null

    render() {
        const { editorState, pageFooter, pageHeader } = this.state
        return (
            <div className={css.medical_file}>
                <Layout>
                    <Sider>
                        <LazyLoader lazyModule={MedicalSider} />
                    </Sider>
                    <Layout>
                        <Header>
                            <div className={style.translateHeader}>{this.nodes()}</div>
                        </Header>
                        <Content>
                            <Medical editorState={editorState}
                                pageHeader={pageHeader}
                                pageFooter={pageFooter}
                                readMode={ReadMode.readWrite}
                                ref={(medical) => this.medical = medical}
                            />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }

    private nodes = () => {
        return btn.map(row => {
            return <button key={row.name} type="button" className="ant-btn"
                onClick={() => medicalFileService.btnClick(row.type)}><IconFont iconName={row.icon} />
                <span>{row.name}</span>
            </button>
        })
    }
}