import React from 'react'
import style from './style/index.scss'
import {TimePicker} from 'pkg/common/timePicker'
import {HintInput} from 'pkg/common/input'
import {Btn} from 'pkg/common/button'
import {Radio} from 'antd'
import {IconFont} from 'pkg/common/icon'
import {Rounded} from 'pkg/common/rounded'
import {InputTable} from 'pkg/common/inputTable'
import {MedicalCatalogueSate, medicalCatalogueService} from 'service/medical/medical-catalogue/index'
import {FluxComponent} from 'tools/flux/FluxComponent'

export default class CatalogueHeaderView extends FluxComponent<MedicalCatalogueSate> {
    title = 'CatalogueHeaderView'
    medicalCatalogueService = medicalCatalogueService

    render() {
        const {
            inputTitle,
            deptObjectCode,
            inputTableData,
            inputData,
            endDate,
            startDate,
            isCatalog,
            inputLength
        } = this.state
        return (
            <div className={style.catalogueHeader}>
                <TimePicker isRange={true}
                            oValue={startDate}
                            oValue2={endDate}
                            startPlaceholder={'开始时间'}
                            endPlaceholder={'结束时间'}
                            dateChange={(v) => medicalCatalogueService.onChangeTime(v)}
                            className={style.timePicker}/>
                <Rounded leftShow={'科室'} className={style.box}>
                    <InputTable
                        option={{
                            total: inputLength ? inputLength : 0,
                            columns: inputTitle ? inputTitle : [],
                            pageSize: 7,
                            showValue: 'value',
                            multiSaveKey: 'key'
                        }}
                        isMulti={true}
                        oValue={deptObjectCode}
                        data={inputTableData ? inputTableData : []}
                        callBackMethods={(v) => medicalCatalogueService.showMessage(v)}
                    />
                </Rounded>
                <HintInput placeholder={'病案号/住院号'}
                           value={inputData}
                           onChange={(v) => medicalCatalogueService.onChangeInput(v)}
                           onPressEnter={medicalCatalogueService.onSearchChange}
                           className1={style.numInput}
                           className2={style.innerInput}/>
                <Radio.Group value={isCatalog}
                             onChange={(v) => medicalCatalogueService.onRadioChange(v)}
                >
                    <Radio value={0}>未编目</Radio>
                    <Radio value={1}>已编目</Radio>
                    <Radio value={2}>全部</Radio>
                </Radio.Group>
                <Btn
                    text={<span><IconFont iconName={'icon-sousuo_sousuo'} hover={true}/><span>查询</span></span>}
                    btnParam={{
                        className: `${style.btn} ${style.greenBtn}`,
                        onClick: medicalCatalogueService.onSearchChange
                    }}/>
                <Btn
                    text={<span><IconFont iconName={'icon-jiexi'} hover={true}/><span>编目</span></span>}
                    btnParam={{
                        className: `${style.btn} ${style.greenBtn}`,
                        onClick: medicalCatalogueService.ArchivalCataloging
                    }}/>
            </div>
        )
    }
}