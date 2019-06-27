/**
 * 体温单 colgroup 控制体温单单元格宽度
 */
import React, {Component} from 'react'
interface Props{
    gridW:number // 格子宽度
    dayMomentNum:number // 一天显示的时刻数量
    dayNum:number // 显示天数
}

export class Colgroup extends Component<Props,any> {
    /**
     * 设置每一列td所占宽度
     * @param gridW 格子宽度
     * @param dayMomentNum 一天显示的时刻数量
     * @param dayNum 显示天数
     * @returns {any[]}
     */
    createColgroup = (gridW,dayMomentNum,dayNum) => {
        let colArray = []
        for (let i = 0; i <= dayMomentNum*dayNum+1; i++) {
            let width = gridW
            if (i === 0) {
                width = 100 // 第一列温度刻度所占宽度为100px
            }
            if(i === (dayMomentNum*dayNum+1)){
                width = 60 // 最后一列温度刻度所占宽度为60px
            }
            let col = <col key={i} width={width + 'px'}/>
            colArray.push(col)
        }
        return colArray
    }

    render() {
        const {gridW,dayMomentNum,dayNum}=this.props
        return (
            <colgroup>
                {
                    this.createColgroup(gridW,dayMomentNum,dayNum).map((v, i) => {
                        return v
                    })
                }
            </colgroup>
        )
    }
}