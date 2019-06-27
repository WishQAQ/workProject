/**
 * description:检验
 * author: mou
 * time:2017-12-12
 */
import React from 'react'
import {Echart} from '../../../report_form/component/chart'
import {Button, Table, Modal, Spin, message} from 'antd'
import moment from 'moment'
import api from '../api'
import  css from '../eleMedical.scss'

const option = {
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value',
    name: '参考值'
  },
  series: [
    {
      name: '参考值',
      type: 'line',
      data: [],
    },
  ]
};

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '报告项目名称',
        dataIndex: 'reportItemName',
        width: '30%',
      }, {
        title: '结果',
        dataIndex: 'result',
        width: '10%',
      }, {
        title: '异常',
        dataIndex: 'abnormalIndicator',
        width: '20%',
      }, {
        title: '单位',
        dataIndex: 'units',
        width: '10%',
      }, {
        title: '参考值',
        dataIndex: 'printContext',
        width: '20%',
      }, {
        title: '趋势图',
        dataIndex: 'reportItemCode',
        width: '10%',
        render: (text, record, index) => {
          return <i
            className={`iconfont icon icon-tuxiang ${this.state.activeIndex === index ? css.red : css.fontBlue}`}
            id="trend"
            onClick={this.createImg.bind(this, text, record, index)}/>
        }
      }
    ];
    this.state = {
      visible: false,
      data: [],
      param: {},
      empi: '',
      activeIndex: null,
    };
  };

  componentWillMount() {
    this.setState({
      param: this.props.data,
      empi: this.props.empi,
      activeIndex: null
    }, () => {
      this.selData();
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      param: next.data,
      empi: next.empi,
      activeIndex: null
    }, () => {
      this.selData();
    })
  }

  selData = () => {
    const {param} = this.state;
    let param1 = {
      action: param.action,
      message: param.message
    };
    const {loadData, addArrKey} = api;
    this.setState({
      loading: true
    });
    loadData(param1, respones => {
      if (respones.success) {
        let data = respones.data;
        if (data === undefined || data === null || data.length === 0) {
          message.warning('暂无该数据');
          this.setState({
            loading: false,
            data:[],
          });
          return false
        }
        if (data && data.length) {
          data = addArrKey(data);
          this.setState({
            data: data,
            loading: false
          })
        } else {
          this.setState({
            data: [],
            loading: false
          })
        }
      } else {
        this.setState({
          loading: false
        });
        console.error("response error", respones);
      }
    })
  };
  createImg = (text, record, index) => {
    let param = {};
    if (this.state.param.action === 'outpLabDetail') {
      param.action = 'outpLabChart';
      param.message = {
        reportItemCode: record.reportItemCode,
        empi: this.state.empi
      }
    } else {
      param.action = 'inpLabChart';
      param.message = {
        reportItemCode: record.reportItemCode,
        empi: this.state.empi
      }
    }
    let visible = !this.state.visible;
    const {loadData} = api;
    this.setState({
      loading: true,
      activeIndex: index
    });
    loadData(param, response => {
      if (response.success) {
        let data=response.data;
        let arr1 = [];
        let arr2 = [];
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            arr1.push(moment(data[i].resultDateTime).format('YYYY-MM-DD'));
            arr2.push(parseFloat(data[i].result))
          }
          option.xAxis.data = arr1;
          option.series[0].data = arr2;
          this.setState({
            loading: false,
            visible
          })
        } else {
          message.warning('暂无趋势图');
          this.setState({
            loading: false,
          })
        }
      }else{
        this.setState({
          loading: false,
        });
        console.error("response error", response);
      }
    });
  };
  handleOk = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false, visible: false});
    }, 3000);
  };
  handleCancel = () => {
    this.setState({visible: false});
  };
  rowClassName = (record, index) => {
    const {activeIndex} = this.state;
    if (record.abnormalIndicator !== null) {
      return css.yiChange
    }
    if (index === activeIndex) {
      return css.blue
    }
  };

  render() {
    const columns = this.columns;
    let {visible, data, param, loading} = this.state;
    return (<div className={css.checkout}>
      <div className={css.condition}>
        <span>检验</span>
      {/*  <Button icon="book" type="primary" ghost>打印申请单</Button>
        <Button icon="printer" type="primary" ghost>打印报告</Button>*/}
      </div>
      <div className={css.info}>
        <div className={css.one}>
          <p>
            <span>检验主题</span>
            <span>{param.testInfo.subject || param.testInfo.itemName}</span>
          </p>
          <p>
            <span>标本</span>
            <span>{param.testInfo.specimen}</span>
          </p>
          <p>
            <span>检验科室</span>
            <span>{param.testInfo.performDeptName}</span>
          </p>
        </div>
        <div className={css.one}>
          <p>
            <span>申请时间</span>
            <span>{moment(param.testInfo.requestedDateTime).format('YYYY-MM-DD HH:MM:SS')}</span>
          </p>
          <p>
            <span>申请医生</span>
            <span>{param.testInfo.orderingProvider}</span>
          </p>
          <p>
            {/*  <span>检验状态</span>
             <span>确认报告</span>*/}
          </p>
        </div>
      </div>
      <Spin spinning={loading}>
        <Table rowClassName={this.rowClassName} bordered columns={columns} dataSource={data} pagination={{pageSize: 50}}
               scroll={{y: '100%', x: '100%'}}/>
        <Modal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName={css.modal}
        >
          <Echart id="canvas" className={css.canvas} option={option}/>
        </Modal>
      </Spin>
    </div>)
  }
}
 
 
 