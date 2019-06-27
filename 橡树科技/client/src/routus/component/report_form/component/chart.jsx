/**
 * Created by liulingli on 2017/5/20.
 */
import React, {Component} from 'react';
import classNames from "classnames";
import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import 'echarts/lib/chart/bar';// 引入柱状图
import 'echarts/lib/chart/radar';//引入饼图
import 'echarts/lib/chart/line';//引入散点图
import 'echarts/lib/component/tooltip';// 引入提示框
import 'echarts/lib/component/title';// 引入标题组件
import 'echarts/theme/dark';//引入主题

export class Echart extends Component {
    componentWillMount() {
        this.state = {
            echart: null
        }
    }

    componentDidMount() {
        //基于准备好的dom，初始化额chart实例
        let echartID = this.props.id;
        let echart = echarts.init(document.getElementById(echartID), 'macarons');
        let echartClick = this.props.echartClick; //图表单击事件
        // 绘制图表
        echart.setOption(this.props.option);

        this.setState({
            echart: echart
        });
        //窗口大小改变重绘图表
        function resizeEchart() {
            echart.resize();
        }

        window.addEventListener("resize", function () {
            echart.resize();
        });

        echart.on('click', function (parmas) {
            if (echartClick) {
                if (parmas.data) {
                    if (parmas.data.code) {
                        echartClick(parmas.data.code);
                    }
                } else {
                    echartClick();
                }
            }
        });
    }

    componentWillUnmount() {
        function resizeEchart() {
            echart.resize();
        }

        window.removeEventListener("resize", resizeEchart);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps !== nextState) {
            if (nextState.echart !== null) {
                let echart = nextState.echart;
                echart.setOption(nextProps.option);
                //窗口大小改变重绘图表
                function resizeEchart() {
                    echart.resize();
                }

                window.addEventListener("resize", function () {
                    echart.resize();
                });
            }
        }
    }

    render() {
        const {style, id, className} = this.props;
        return (
            <div id={id} className={classNames("echart", className)}/>
        )
    }
}