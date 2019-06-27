import React,{Component} from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts.common'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

interface MyEchartsProps {
    // Echarts的Option
    echOption?: object,
    // Echarts的Dom
    echID?: string,
    // Echarts的ClassName
    echClassName?: string,
}

export class Charts extends Component<MyEchartsProps> {

    myCharts = null

    componentDidMount() {
        this.myCharts = echarts.init(document.getElementById(this.props.echID), null, {width: 'auto', height: 'auto'})
        this.myCharts.setOption(this.props.echOption)
    }

    render() {
        return (
            <div id={this.props.echID} className={this.props.echClassName}/>
        )
    }
}