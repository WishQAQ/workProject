/**
 * Created by mod on 2018/1/8.
 *
 */

import * as React from 'react'
import * as style from '../style/index.scss'
import { Layout } from 'antd'
import debug from 'debug'
import { Medical, ReadMode } from 'medical-draft'
import { IconFont } from 'pkg/common/icon'

const { Header, Content } = Layout
const log = debug('debug:病历:medical')

const btnButton = [
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
        type: 'obtain',
        icon: 'icon-xie'
    },
    {
        name: '病历内容',
        type: 'print',
        icon: 'icon-ordinaryprint'
    },
    {
        name: '医嘱提取',
        type: 'print',
        icon: 'icon-wodeyizhu1'
    },
    {
        name: '关键词',
        type: 'print',
        icon: 'icon-guanjianciyouhua'
    },
    {
        name: '申请病历维护',
        type: 'print',
        icon: 'icon-diannao'
    }
]

export default class DocumentContent extends React.Component<any, any> {
    title = '医疗文档中心编辑器页面'
    medical

    constructor(args) {
        super(args)
        this.state = {
            editorState: {
                editorState: null,
                pageHeader: null,
                pageFooter: null
            }
        }
    }

    /**
     * 渲染页面
     * @returns {any}
     */
    render() {
        const { editorState } = this.state
        return (
            <Layout style={{ overflow: 'hidden' }}>
                <Header className={style.header}>
                    <div className={style.translateHeader}>
                        {this.nodes()}
                    </div>
                </Header>
                <Content>
                    <Medical
                        editorState={editorState.editorState}
                        pageHeader={editorState.pageHeader}
                        pageFooter={editorState.pageFooter}
                        readMode={ReadMode.readWrite}
                        ref={medical => this.medical = medical}
                    />
                </Content>
            </Layout>
        )
    }

    /**
     * 生成顶部按钮
     * @returns {any[]}
     */
    private nodes = () => {
        return btnButton.map(row => {
            return <button key={row.name} type="button" className="ant-btn"
                           onClick={() => this.btnClick(row.type)}><IconFont iconName={row.icon}/>
                <span>{row.name}</span>
            </button>
        })
    }

    /**
     * 按钮点击
     * @param {string} type
     */
    private btnClick(type: string) {
        log('当前点击按钮下标为 %s', type)
    }
}