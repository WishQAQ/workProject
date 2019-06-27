import React from 'react'
import PropTypes from 'prop-types'
import { PatientCard } from 'pkg/ui/bunkCard/indexDnD'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { cardService, CardState as State } from 'service/pat-manage/patient-info/card'

/**
 * 患者管理table组件
 */
export default class PatientList extends FluxComponent<State> {
    static propTypes = {
        patientData: PropTypes.array,
        isTableStyle: PropTypes.bool,
        onTransferPatient: PropTypes.func
    }

    title: '患者信息.床卡'
    cardService = cardService

    render() {
        const {
            card,
            menu,
            cardorList
        } = this.state
        return (
            cardorList === false ?
                <div className={styles.bunkWrapper}>
                    {
                        !card ? '' :
                            card.map((item, index) => {
                                return <PatientCard
                                    id={index}
                                    key={index}
                                    patientInfo={item}
                                    menuData={menu}
                                    routeClick={(icon) => cardService.routeClick(icon)}
                                    menuClick={cardService.menuClick}
                                    onTransferPatient={cardService.onTransferPatient}
                                />
                            })
                    }
                </div> : null
        )
    }
}
