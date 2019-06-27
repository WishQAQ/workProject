/**
 *  评分组件
 *  Created by mod on 2017/12/5
 */

'use strict'

import * as React from 'react'
import { SoceLists } from './socrelist'
import { ScoreTremProps } from './socreitemtype'
import * as style from '../style/soceitem.scss'

export class ScoreTrem extends React.Component<ScoreTremProps, any> {
    /**
     * renderNodes
     * @param data
     * @param defaobj
     */
    renderNodes = (data: any, defaobj: object) => {
        return data.map((row: any, index) => {
            return <SoceLists
                key={index}
                data={row}
                defaobj={defaobj}
                onChange={(e, type) => this.props.onChange(e, type, row.type)}/>
        })
    }

    /**
     * render
     * @returns {any}
     */
    render(): JSX.Element {
        const { data, other } = this.props
        return (
            <div className={this.props.classNmae || ''} style={{ height: '100%', position: 'relative' }}>
                <div className={style.socre_list}>
                    {other && this.renderNodes(data, other.radioK)}
                </div>
                <div className="term_footer" style={{ position: 'absolute', bottom: 36 }}>
                    {other.explain && <p>{other.explain}</p>}
                    <p>
                        {other.valuation && <span>{other.valuation}</span>}
                        {other.summary && <span>{other.summary}:  </span>}
                        {other.rule && <span style={{
                            backgroundColor: other.color || '#000',
                            padding: '0 5px',
                            borderRadius: 2
                        }}>{other.rule}</span>}
                        {other.name === 'start' ? '' : other.totalScores && <span>总分 ( {other.totalScores} )</span>}
                    </p>
                </div>
            </div>
        )
    }
}