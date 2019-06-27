/**
 * description:门诊病历
 * author: mou
 * time:2017-12-12
 */
import React from 'react'
import {message, Spin} from 'antd'
import qs from 'qs';
import moment from 'moment'
import api from '../api'
import css from '../eleMedical.scss'

export class OutMdicalRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medicalRecord: {},
            diagDesc: [],//诊断
            data: {},//查询参数
            loading: false,
        };
    };

    componentWillMount() {
        this.setState({
            data: this.props.data
        }, () => {
            this.selData(this.state.data)
        })
    }

    componentWillReceiveProps(next) {
        this.setState({
            data: next.data
        }, () => {
            this.selData(this.state.data)
        })
    }

    selData = (data) => {
        const param = {
            action: 'outpEmr',
            message: data
        };
        const {loadData} = api;
        this.setState({
            loading: true
        });
        loadData(param, response => {
            console.log("response \n",response)
            if (response.success) {
                const data = response.data;
                if (data && data.length) {
                    this.setState({
                        medicalRecord: data[0],
                    })
                } else {
                    this.setState({
                        medicalRecord: {},
                    });
                    message.warning('该用户还未建立门诊病历');
                }
            } else {
                this.setState({
                    medicalRecord: {},
                });
                console.error("response error", response);
            }

        });
        const param1 = {
            action: 'outpDiagnosis',
            message: data
        };
        loadData(param1, response => {
            console.log("response1 \n",response)
            if (response.success) {
                // let {medicalRecord} = this.state;
                this.setState({
                    loading: false,
                    diagDesc: response.data
                })
            } else {
                this.setState({
                    loading: false,
                    diagDesc: []
                });
                console.error("response error", response);
            }
        });
    };

    render() {
        const {medicalRecord, loading, diagDesc} = this.state;
        return (<div className={css.outMedicalRecord}>
            <Spin spinning={loading}>
                <p className={css.title}>{medicalRecord.hospitalName}<span>门诊病历</span></p>
                <p className={css.info}>
          <span>{medicalRecord.sex === '1' ? <i className={css.nan}></i> : medicalRecord.sex === '2' ?
              <i className={css.nv}></i> : <i className={css.noSex}></i>}ID:{medicalRecord.patientId}</span>
                    <span>年龄:{medicalRecord.age}</span>
                    <span>费别:{medicalRecord.chargeType}</span>
                    <span>就诊日期:{medicalRecord.time ? medicalRecord.time : null}</span>
                    {/*<span>就诊日期:{medicalRecord.time ? moment(medicalRecord.time).format("YYYY-MM-DD HH:MM:SS") : null}</span>*/}
                    <span>医生:{medicalRecord.doctor}</span>
                </p>
                <div className={css.grid}>
                    <div className={css.one}>
                        <p className={css.oneTitle}>主诉</p>
                        <p className={css.illustrate}>{medicalRecord.illnessDesc}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>现病史</p>
                        <p className={css.illustrate}>{medicalRecord.medHistory}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>月经史</p>
                        <p className={css.illustrate}>{medicalRecord.menses}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>过去史</p>
                        <p className={css.illustrate}>{medicalRecord.anamnesis}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>家族史</p>
                        <p className={css.illustrate}>{medicalRecord.familyIll}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>过敏史</p>
                        <p className={css.illustrate}>{medicalRecord.individual}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>体检</p>
                        <p className={css.illustrate}>{medicalRecord.bodyExam}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>建议</p>
                        <p className={css.illustrate}>{medicalRecord.medicalRecord}</p>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>诊断</p>
                        <ul className={css.illustrate}>
                            {diagDesc && diagDesc.length ? diagDesc.map((row, index) => {
                                return <li key={index}>{row.diagnosisName}</li>
                            }) : null}
                        </ul>
                    </div>
                    <div className={css.one}>
                        <p className={css.oneTitle}>处理</p>
                        <p className={css.illustrate}>{medicalRecord.advice}</p>
                    </div>
                </div>
            </Spin>
        </div>)
    }
}
 
 
 