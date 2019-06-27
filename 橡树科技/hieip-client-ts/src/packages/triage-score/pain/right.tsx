/**
 * Created by mou on 2017/12/7.
 */
import * as React from 'react'
import style from './style/pain.scss'
import { Ascor } from '../socre/socreitemtype'

interface RightProps {
    rightContent?: any,
    other?: Ascor,
    onChange?: React.ReactEventHandler<any>,
    onClick?: React.ReactEventHandler<any>,
    onReset?: React.ReactEventHandler<any>,
}

/** state */
interface StateType {
    score?: number
}

/**
 * 疼痛评分 第一、三项
 */
export class Right extends React.Component<RightProps, StateType> {

    public render(): JSX.Element {
        let { rightContent, other } = this.props
        return (
            <div className={style.right}>
                {rightContent.map((one, index) =>
                    <div key={index}>
                        <p className={style.notice}><span>{one.application[0]}:</span>{one.application[1]}</p>
                        <div className={style.rightContent}>
                            <div className={style.up}>
                                {one.painLevel.map((level, levelIndex) =>
                                    <span key={`${level}+${levelIndex}`}>{level}</span>
                                )}
                            </div>
                            <div className={style.down}>
                                {one.branch.map((branchOne, branchIndex) =>
                                        <p key={`${branchOne}${branchIndex}`}>
                    <span onClick={this.props.onChange.bind(this, branchOne)}
                          className={branchIndex === other.totalScores ? style.active : ''}>{branchOne}</span>
                                        </p>
                                )}
                            </div>
                        </div>
                        <p className={style.notice}>得分：<span style={{ color: other.color }}>{other.totalScores}</span></p>
                    </div>
                )}
            </div>
        )
    }
}