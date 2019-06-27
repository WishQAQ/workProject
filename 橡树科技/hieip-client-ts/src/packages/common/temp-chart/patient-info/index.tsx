/**
 * 体温单 患者基本信息
 */
import React, {Component} from 'react'
import * as style from '../style/index.scss'
import moment from 'moment'

interface Props{
    hospital?:string // 医院名称
    patientList?:any // object 患者信息
}
export class PatientInfo extends Component<Props,any> {

    render() {
        let {hospital, patientList} = this.props
        return (
            <table className={style.patInfo}>
                <tbody>
                <tr>
                    <td colSpan={4}>
                        <h1>
                            {hospital}
                        </h1>
                    </td>
                </tr>
                <tr>
                    <td colSpan={4}><h3>体温表</h3></td>
                </tr>
                <tr className={style.percent4}>
                    <td>
                        <span className={style.btitle}>姓名：</span>
                        <span className={style.bline}>{patientList.name}</span>
                    </td>
                    <td><span className={style.btitle}>性别：</span>
                        <span className={style.bline}>{patientList.sex}</span>
                    </td>
                    <td>
                        <span className={style.btitle}>年龄：</span>
                        <span className={style.bline}>{patientList.age}</span>
                    </td>
                    <td>
                        <span className={style.btitle}>入院日期：</span>
                        <span className={style.bline}>{moment(patientList.treatDate).format('YYYY-MM-DD')}</span>
                    </td>
                </tr>
                <tr className={style.percent4}>
                    <td>
                        <span className={style.btitle}>科室：</span>
                        <span className={style.bline}>{patientList.endemicName}</span>
                    </td>
                    <td>
                        <span className={style.btitle}>床号：</span>
                        <span className={style.bline}>{patientList.bedNo}</span>
                    </td>
                    <td>
                        <span className={style.btitle}>住院号：</span>
                        <span className={style.bline}>{patientList.inpNo}</span>
                    </td>
                    <td>
                        <span className={style.btitle}>病案号：</span>
                        <span className={style.bline}>{patientList.medicalHao}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}
