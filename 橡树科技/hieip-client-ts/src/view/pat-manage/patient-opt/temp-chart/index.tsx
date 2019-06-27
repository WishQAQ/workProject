/**
 * 体温单
 * create by wx
 */
import React from 'react'
import {TemperatureChart} from 'pkg/common/temp-chart'

export default class TempChart extends React.Component<any, any> {
    // 医院信息
    data = {
        hspName: '重庆市沙坪坝区井口社区卫生服务中心'
    }

    // 病人基本信息
    patientList = {
        name: '胡定明', // 姓名
        sex: '男', // 性别
        age: '65', // 年龄
        admissionDateTime: '2017-06-29', // 入院时间
        endemicName: '心内科', // 科室
        bedNo: '123', // 床号
        inpNo: 'Z23456', // 住院号
        medicalHao: 'Z23456' // 病案号
    }

    // 产后/术后天数
    dayOps = ['', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6']

    // 时刻数据配置信息
    moment = {
        startMoment:2,// 开始时刻
        interval:4 // 时刻间隔数
    }

    // 呼吸数据
    breathingList = ['60', '', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56',
        '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56', '60', '70', '60', '70', '65', '66', '56',
        '60', '70']

    // 每日录入信息
    dayMap = {
        '{"name":"总入量","units":"ml"}': ['', '', '', '', '', '44', ''],
        '{"name":"体重","units":"g"}': ['', '', '', '', '', '47.5', ''],
        '{"name":"大便次数","units":"次"}': ['1', '1', '1', '', '', '1', ''],
        '{"name":"血压","units":"mmHg"}': ['', '', '', '', '', '60', '']
    }

    //  时间段录入信息
    pointTime = {
        // 疼痛
        tt: [{'dataTime': '2017-06-29 03:00:00',  'value': '4'},
            {'dataTime': '2017-06-29 06:00:00',  'value': '6'},
            {'dataTime': '2017-06-29 10:00:00','value': '3'},
            {'dataTime': '2017-06-29 14:00:00', 'value': '2'},
            {'dataTime': '2017-06-29 18:00:00', 'value': '1'},
            {'dataTime': '2017-06-29 22:00:00',  'value': '2'},
            {'dataTime': '2017-06-30 02:00:00', 'value': '4'},
            {'dataTime': '2017-06-30 06:00:00',  'value': '6'},
            {'dataTime': '2017-06-30 10:00:00',  'value': '6'}],
        // 心率
        xl: [
            {
                'dataTime': '2017-06-29 02:00:00',
                'value': '88'
            },
            {
                'dataTime': '2017-06-29 06:00:00',
                'value': '80'
            },
            {
                'dataTime': '2017-06-29 14:00:00',
                'value': '88'
            },
            {
                'dataTime': '2017-06-29 18:00:00',
                'value': '98'
            },
            {
                'dataTime': '2017-06-29 22:00:00',
                'value': '90'
            },
            {
                'dataTime': '2017-06-30 02:00:00',
                'value': '80'
            },
            {
                'dataTime': '2017-06-30 06:00:00',
                'value': '90'
            },
            {
                'dataTime': '2017-06-30 14:00:00',
                'value': '88'
            },
            {
                'dataTime': '2017-06-30 18:00:00',
                'value': '98'
            },
            {
                'dataTime': '2017-06-30 22:00:00',
                'value': '90'
            }],
        // 脉搏
        mb: [
            {
                'dataTime': '2017-06-29 02:00:00',
                'value': '98'
            },
            {
                'dataTime': '2017-06-29 06:00:00',
                'value': '80'
            },
            {
                'dataTime': '2017-06-29 14:00:00',
                'value': '100'
            },
            {
                'dataTime': '2017-06-29 18:00:00',
                'value': '98'
            },
            {
                'dataTime': '2017-06-29 22:00:00',
                'value': '100'
            },
            {
                'dataTime': '2017-06-30 02:00:00',
                'value': '85'
            },
            {
                'dataTime': '2017-06-30 06:00:00',
                'value': '80'
            },
            {
                'dataTime': '2017-06-30 14:00:00',
                'value': '100'
            },
            {
                'dataTime': '2017-06-30 18:00:00',
                'value': '80'
            },
            {
                'dataTime': '2017-06-30 22:00:00',
                'value': '100'
            }],
        // 事件
        eventDatas: [
            {
                'dataTime': '2017-06-29 02:30:30',
                'value': '入院'
            },
            {
                'dataTime': '2017-06-29 02:00:00',
                'value': '手术'
            },
            {
                'dataTime': '2017-06-29 10:00:00',
                'value': '开呼吸机'
            },
            {
                'dataTime': '2017-06-30 0:50:00',
                'value': '呼吸心跳停止'
            },
            {
                'dataTime': '2017-06-29 14:00:00',
                'value': '请假'
            },
            {
                'dataTime': '2017-06-29 22:00:00',
                'value': '关呼吸机'
            },
            {
                'dataTime': '2017-06-30 02:00:00',
                'value': '不升'
            }],
        // 温度
        wd: [
            {
                'dataTime': '2017-06-29 03:00:00',
                'phValue': '', 'type': 'gw', 'value': '37.2',
            },
            {
                'dataTime': '2017-06-29 06:00:00',
                 'phValue': '37', 'type': 'yw', 'value': '43'
            },
            {
                'dataTime': '2017-06-29 14:00:00',
                'date': '2017-06-29', 'hour': 14,
                 'phValue': '', 'type': 'gw', 'value': '37.5'
            },
            {
                'dataTime': '2017-06-29 18:00:00', 'date': '2017-06-29', 'hour': 18,
                 'phValue': '', 'type': 'kw', 'value': '37.4'
            },
            {
                'dataTime': '2017-06-29 22:00:00', 'date': '2017-06-29', 'hour': 22,
                 'phValue': '', 'type': 'kw', 'value': '36.8'
            },
            {
                'dataTime': '2017-06-30 02:00:00', 'date': '2017-06-30', 'hour': 2,
                 'phValue': '37', 'type': 'gw', 'value': '38'
            },
            {
                'dataTime': '2017-06-30 06:00:00', 'date': '2017-06-30', 'hour': 6,
                 'phValue': '', 'type': 'yw', 'value': '37'
            },
            {
                'dataTime': '2017-06-30 14:00:00', 'date': '2017-06-30', 'hour': 14,
                 'phValue': '', 'type': 'gw', 'value': '37.5'
            },
            {
                'dataTime': '2017-06-30 18:00:00', 'date': '2017-06-30', 'hour': 18,
                 'phValue': '', 'type': 'kw', 'value': '37'
            },
            {
                'dataTime': '2017-06-30 22:00:00', 'date': '2017-06-30', 'hour': 22,
                 'phValue': '', 'type': 'kw', 'value': '36.8'
            }],
        // 辅助呼吸
        hzfx: [
            {
                'dataTime': '2017-06-29 14:00:00',
                'value': '66'
            },
            {
                'dataTime': '2017-06-29 18:00:00',
                'value': '66'
            }],
    }

    // 加载效果
    loading = false

    constructor(props) {
        super(props)
        this.state = {
            beginDate: '2017-06-29' // 选择的开始显示的时间
        }
    }

    /**
     * 时间选择框选择时间事件
     */
    onDateChange = (newDate) => {
        if (newDate !== this.state.beginDate) {
            this.setState({beginDate: newDate})
        }
    }

    /**
     * 得到住院天数
     * @param choiceDate 选择的开始显示时间
     * @param admissionDateTime 入院时间
     */
    getDayList = (choiceDate, admissionDateTime) => {
        let start = (Date.parse(choiceDate) - Date.parse(admissionDateTime)) / (1000 * 60 * 60 * 24)
        if (start <= 0) start = null
        let dayList = [start]
        for (let i = 1; i < 7; i++) {
            dayList.push(start + i)
        }
        return dayList
    }

    /**
     * 按钮切换开始时间
     * @param beginDate string 切换返回的开始显示时间
     */
    onChangeBeginDay = (beginDate) => {
        this.setState({
            beginDate: beginDate
        })
    }

    render() {
        return (
            <div>
                <TemperatureChart beginDate={this.state.beginDate}
                                  hospital={this.data.hspName}
                                  patientList={this.patientList}
                                  dayOps={this.dayOps}
                                  breathingList={this.breathingList}
                                  dayList={this.getDayList(this.state.beginDate, this.patientList.admissionDateTime)}
                                  dayMap={this.dayMap}
                                  momentObj={this.moment}
                                  pointTime={this.pointTime}
                                  onDateChange={this.onDateChange}
                                  onChangeBeginDay={this.onChangeBeginDay}
                                  loading={this.loading}/>

            </div>
        )
    }
}