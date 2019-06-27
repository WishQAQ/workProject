import React, {Component} from 'react'
import classNames from 'classnames'
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts'
// // 引入 ECharts 主模块
// import 'echarts/lib/echarts'
// // 引入折线图
// import 'echarts/lib/chart/line'
// // 引入柱状图
// import  'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/gauge'
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/toolbox'
// import 'echarts/lib/component/title'

interface MyEchartsProps {
    // Echarts的Option
    echOption?: object,
    // Echarts的ClassName
    echClassName?: string,
}

export class Echarts extends Component<MyEchartsProps> {
    private ech
    private charts

    componentDidMount() {
        this.charts = echarts.init(this.ech)
        this.charts.setOption(this.props.echOption)
    }

    echRef = (ech) => {
        this.ech = ech
    }

    render() {
        let {echClassName} = this.props
        return (
            <div ref={this.echRef} className={classNames(echClassName)}/>
        )
    }
}