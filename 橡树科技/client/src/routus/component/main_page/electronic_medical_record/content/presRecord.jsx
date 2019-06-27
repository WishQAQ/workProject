/**
 * description:处方记录
 * author: mou
 * time:2017-12-12
 */
import React from 'react'
import {Table, Spin, message} from 'antd'
import moment from 'moment'
import api from '../api'
import css from '../eleMedical.scss'
//处方记录—处方查询
const preColumns = [
  {
    title: '处方日期',
    dataIndex: 'prescDate',
    width: 100,
    render: (value) => {
      return moment(value).format('YYYY-MM-DD')
    }
  }, {
    title: '处方号',
    dataIndex: 'prescNo',
    width: 100,
  }, {
    title: '药局',
    dataIndex: 'dispensary',
    width: 80,
  }, {
    title: '类型',
    dataIndex: 'prescType',
    width: 50,
    render: (value) => {
      if (value === 1) {
        return '中药'
      } else if (value === 0) {
        return '西药'
      }
    }
  }, {
    title: '处方名称',
    dataIndex: 'bindingPrescTitle',
    width: 80,
  }, {
    title: '剂数',
    dataIndex: 'repetition',
    width: 40,
  }, {
    title: '每剂煎药次数',
    dataIndex: 'countPerRepetition',
    width: 100,
  }, {
    title: '是否代煎',
    dataIndex: 'decoction',
    width: 70,
    render: (value) => {
      if (value === 1) {
        return '是'
      } else if (value === 2) {
        return '否'
      }
    }
  }, {
    title: '用法',
    dataIndex: 'usage',
    width: 70,
  }, {
    title: '发药时间',
    dataIndex: 'dispensingDatetime',
    width: 100,
  }, {
    title: '发药人',
    dataIndex: 'dispensingProvider',
    width: 80,
  }
];
//处方记录—详细信息
const preSonColumns = [
  {
    title: '名称',
    dataIndex: 'drugName',
    width: 180,
  }, {
    title: '规格',
    dataIndex: 'drugSpec',
    width: 80,
    render: (text) => <span className={css.col2} title={text}>{text}</span>,
  }, {
    title: '厂商',
    dataIndex: 'firmId',
    width: 150,
    render: (text) => <span className={css.col3} title={text}>{text}</span>,
  }, {
    title: '单次剂量',
    dataIndex: 'dosage',
    width: 80,
  }, {
    title: '单位',
    dataIndex: 'dosageUnits',
    width: 40,
  }, {
    title: '途径',
    dataIndex: 'administration',
    width: 100,
    render: (text) => <span className={css.col1} title={text}>{text}</span>,
  }, {
    title: '频次',
    dataIndex: 'frequency',
    width: 70,
  }, {
    title: '医生说明',
    dataIndex: 'freqDetail',
    width: 80,
  }, {
    title: '总量',
    dataIndex: 'quantity',
    width: 70,
  }
];
export class PresRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presRecord: [],
      presRecordSonData: [],
      data: {},
      detailLoading: false
    };
  };

  componentWillMount() {
    this.setState({
      data: this.props.data
    }, () => {
      this.selData();
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      data: next.data
    }, () => {
      this.selData();
    })
  }

  selData = () => {
    const {data} = this.state;
    const {loadData, addArrKey} = api;
    let param = {};
    param.action = 'patientPresc';
    param.message = data;
    this.setState({
      loading: true
    });
    loadData(param, responese => {
      if (responese.success) {
        let data = responese.data;
        if (data === null || data === undefined || data.length === 0) {
          message.warning('暂无数据');
          this.setState({
            loading: false
          });
          return false;
        }
        data = addArrKey(data);
        this.setState({
          presRecord: data,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        });
        console.error("response error", responese);
      }
    })
  };
  rowClick = (row, key) => {
    const {loadData, addArrKey} = api;
    let data = this.state.data;
    let param = {
      action: 'patientPrescDetail',
      message: {
        hospitalCode: data.hospitalCode,
        patientId: data.patientId,
        prescNo: row.prescNo,
        prescDate: row.prescDate,
      }
    };
    this.setState({
      detailLoading: true
    });
    loadData(param, responese => {
      if (responese.success) {
        let data = responese.data;
        data = data && data.length ? addArrKey(data) : data;
        this.setState({
          presRecordSonData: data,
          detailLoading: false
        })
      } else {
        this.setState({
          detailLoading: false
        });
        console.error("response error", responese);
      }
    })
  };

  render() {
    const {presRecord, presRecordSonData, loading, detailLoading} = this.state;
    return (<div className={css.presRecord}>
      <div className={`${css.presContent} ${css.preSelectTable}`}>
        <p className={css.preSelect}>处方查询</p>
        <Spin spinning={loading}>
          <Table bordered columns={preColumns} pagination={false} dataSource={presRecord} scroll={{y: '100%'}} onRowClick={this.rowClick}/>
        </Spin>
      </div>
      <div className={`${css.presContent} ${css.detailTable}`}>
        <p className={css.detail}>详细信息</p>
        <Spin spinning={detailLoading}>
          <Table bordered columns={preSonColumns} pagination={false} dataSource={presRecordSonData} scroll={{y: '100%'}}/>
        </Spin>
      </div>
    </div>)
  }
}
 
 
 