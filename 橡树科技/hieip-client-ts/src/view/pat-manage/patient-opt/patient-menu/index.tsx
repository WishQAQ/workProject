import React from 'react'
import css from './style/patientMenu.scss'
import {IconFont} from 'pkg/common/icon'
import {HintInput} from 'pkg/common/input'
import {SpecialTable} from 'pkg/common/specialTable'
import {FluxComponent} from 'tools/flux/FluxComponent'
import {JsonUtil} from 'tools/api/JsonUtil'
import {patientMenuService, PatientMenuState as State} from '../../../../service/pat-manage/patien-opt/patient-menu'

export default class PatientMenu extends FluxComponent<State> {
    title = '患者概览'
    patientMenuService = patientMenuService
    columns = [
        {
            headerName: '床号',
            field: 'bedLabel'
        },
        {
            headerName: '姓名',
            field: 'name'
        },
        {
            headerName: '病人ID',
            field: 'patientId'
        }
    ]

    render() {
        const {areaDictList, areaDictIndex, routes} = this.state
        return (
            <div className={css.mainMenu}>
                <div className={css.topTitleArea}>
                    <div className={`${css.areaPiece} ${css['areaColor' + areaDictIndex]}`}>
                        <IconFont iconName={'icon-quanbu'}/>
                        <span>{JsonUtil.getJsonByKey(areaDictIndex + '.name', areaDictList)}
                            ({JsonUtil.getJsonByKey2(areaDictIndex + '.num', areaDictList, 0)})
                        </span>
                    </div>
                </div>
                <div className={css.patientSearch}>
                    <HintInput
                        placeholder={'请输入姓名/病人ID'}
                        value={JsonUtil.getJsonByKey('inDeptParams.name', this.state)}
                        onChange={patientMenuService.setStateJson.bind(this, 'inDeptParams.name')}
                        addonAfter={<span onClick={patientMenuService.loadBedCard}><IconFont iconName={'icon-sousuo-'}/></span>}/>
                </div>
                <div className={css.patientTable}>
                    <SpecialTable
                        columns={this.columns}
                        dataSource={JsonUtil.getJsonByKey(areaDictIndex + '.inDept', areaDictList, [])}
                        secondListData={routes}
                        onClick={(e) => patientMenuService.loadPatInfo(e)}
                        thirdListData={[]}
                        menuClick={patientMenuService.routeClick}
                    />
                </div>
                <div className={css.areaChoose}>
                    {!areaDictList ? null : areaDictList.map((e, index) => {
                        return index === areaDictIndex ? null :
                            <div className={`${css.areaBottom} ${css['areaBottomHover' + index]}`}
                                 onClick={patientMenuService.setStateJson.bind(this, 'areaDictIndex', index)}
                                 key={index}
                            >
                                <IconFont iconName={'icon-quanbu'}/>
                                <span>{`${e.name}(${e.num ? e.num : 0})`}</span>
                            </div>
                    })}
                </div>
            </div>
        )
    }
}