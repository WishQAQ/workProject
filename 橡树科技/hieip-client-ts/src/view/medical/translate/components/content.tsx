/**
 * Created by mod on 2017/12/25.
 *
 */

'use strict'
import * as React from 'react'
import * as style from '../style/index.scss'
import { Layout } from 'antd'
import { Medical, ReadMode } from 'medical-draft'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { translateContentService, TranslateContentState } from 'service/medical/translate/content'

const { Header, Content } = Layout
export default class TranslateContent extends FluxComponent<TranslateContentState> {
  title = '电子病历模板内容'
  service = translateContentService
  btnButton = [
    {
      name: '编辑页眉',
      icon: 'remove_formatting',
      onClick: this.service.eadith
    },
    {
      name: '打印',
      icon: 'printer',
      onClick: this.service.print
    },
    {
      name: '保存模板',
      icon: 'save',
      onClick: this.service.save
    },
    {
      name: '返回',
      icon: 'reload',
      onClick: this.service.back
    }
  ]

  render() {
    const { templateContent, header } = this.state
    let editorState: any = templateContent ? templateContent.mrConten : null
    return (
      <Layout style={{ overflow: 'hidden' }}>
        <Header style={{ background: '#fff', padding: 0, height: 40, lineHeight: '40px' }}>
          <div className={style.translateHeader}>
            {this.renderBtn(header)}
          </div>
        </Header>
        <Content>
          {templateContent &&
            <Medical
              editorState={editorState.pageState}
              pageHeader={editorState.pageHeader}
              pageFooter={editorState.pageFooter}
              readMode={ReadMode.readWrite}
              ref={translateContentService.setMedical}
            />}
        </Content>
      </Layout>
    )
  }

  renderBtn = (header) => {
    return this.btnButton.map((row, i) => {
      return <button key={row.name} type="button" className="ant-btn" onClick={row.onClick}>
        <i className={`anticon anticon-${row.icon}`} />
        <span>{!i && header ? '取消编辑' : row.name}</span>
      </button>
    })
  }
}