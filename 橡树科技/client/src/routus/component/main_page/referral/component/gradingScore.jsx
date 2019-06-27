/**
 * description:分级评分
 * author: mou
 * time:2018-1-6
 */
import React from 'react'
import {Card} from './card'
import {Button} from 'antd'
import {Input} from 'antd';
import style from './style/gradingScore.scss'
import classNames from 'classnames'

export class GradingScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnChoose: -1, // 治疗难易程度按钮状态
        };
    }

    /**
     * 治疗难易程度按钮
     */
    simpleBtn = [
        {level: '一级'},
        {level: '二级'},
        {level: '三级'},
        {level: '四级'},
    ]

    /**
     * 治疗难易程度按钮点击事件
     */
    simpleClick = (e, index) => {
        this.setState({btnChoose: index})
    }

    render() {
        let {btnChoose} = this.state
        return (<Card title="分级评分" className={style.gradingScore}>
            <p className={`${style.add} ${style.addActive}`}><i
                className={`icon iconfont ${style.addIcon}`}>&#xe66d;</i>增加</p>
            <div className={style.btn}>
                <Button>高血压</Button>
                <Button>心脏病</Button>
                <Button>慢性病</Button>
                <Button>糖尿病</Button>
                <Button>特病</Button>
            </div>

            <ul>
                <li>
                    <span>疾病名称：</span>
                    <Input placeholder=""/>
                </li>
                <li className={style.btnTop}>
                    <span>疾病状态：</span>
                    <Button.Group>
                        <Button>轻</Button>
                        <Button>重</Button>
                        <Button>急</Button>
                    </Button.Group>
                </li>
                <li>
                    <span>治疗难易程度：</span>
                    <Button.Group>
                        {this.simpleBtn.map((data, index) => {
                            return <Button
                                key={index}
                                onClick={(e) => {
                                    this.simpleClick(e, index)
                                }}
                                className={btnChoose === index ? classNames(
                                    {[style.letOne]: btnChoose === 0},
                                    {[style.letTwo]: btnChoose === 1},
                                    {[style.letThree]: btnChoose === 2},
                                    {[style.letFour]: btnChoose === 3}
                                ) : null}
                            >
                                {data.level}
                            </Button>
                        })}
                    </Button.Group>
                </li>
            </ul>
            <div className={style.reason}>
                <textarea cols="30" rows="10" placeholder="分诊原因"></textarea>
            </div>
        </Card>)
    }
}
 
 
 