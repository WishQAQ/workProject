/**
 *  radio组  组合组件
 * Created by mod on 2017/12/5
 */

'use strict'

import * as React from 'react'
import { ScoreItem } from './scoreitem'
import { SoceList, SoceListProps } from './socreitemtype'

export class SoceLists extends React.Component<SoceListProps, any> {
    /**
     * radio list nodes
     * @param data
     * @param defaobj
     */
    cosreNodes = (data: any, defaobj): JSX.Element => {
        return data.map((row: SoceList, index: number) => {
            if (row) {
                return <ScoreItem data={row}
                                  onChange={(e) => this.props.onChange(e, row.type)}
                                  key={index}
                                  defaultvalue={defaobj}
                />
            }
        })
    }

    /**
     * render
     * @returns {any}
     */
    render(): JSX.Element {
        const { data, defaobj } = this.props
        return (
            <div>
                <h3>{data.name}</h3>
                {this.cosreNodes(data.data, defaobj)}
            </div>
        )
    }
}
