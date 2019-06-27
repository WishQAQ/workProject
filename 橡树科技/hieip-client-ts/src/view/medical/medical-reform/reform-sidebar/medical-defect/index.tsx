import React from 'react'
import { Button, Icon } from 'antd'
import styles from './style/index.scss'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { ReformSidebarState, reformSidebarService } from 'service/medical/medical-reform/reform-sidebar'

/**
 * 病历类别 下面部分 主要缺陷 View
 * create by 李强
 * modify by  李潇潇
 * modify time 2018-2-3
 */
export default class MedicalDefectsView extends FluxComponent<ReformSidebarState> {
    title = 'MedicalDefectsView'
    reformSidebarService = reformSidebarService

    render() {
        const { mrRectificationItems } = this.state

        return (
            <div className={styles.medicalDefects}>
                <span className={styles.defectsTitle}>
                    全部缺陷
                    <Icon
                        type="plus-square-o"
                        className={styles.defectsPlus}
                        onClick={reformSidebarService.onReformDefectShow} // 显示评分窗口
                        // onClick={reformSidebarService.addRectification}  直接添加一行缺陷
                    />
                </span>
                <ul className={styles.defectsList}>
                    {
                        mrRectificationItems ? (mrRectificationItems.map((item, index) => {
                            return (
                                <li title={item.gradingItemName} key={index} className={styles.defectsItem}>
                                    <span className={styles.itemTitle}>
                                        <span className={styles.itemMainTitle}>
                                            {item.gradingItemName}
                                        </span>
                                        <span className={styles.itemSubTitle}>
                                            {item.gradingClassName}
                                        </span>
                                    </span>
                                    <Icon
                                        onClick={() => reformSidebarService.onDeleteDefects(item, index)}
                                        className={styles.deleteDefects}
                                        type="close-circle-o"
                                    />
                                </li>)
                        })) : null
                    }
                </ul>
                <div className={styles.defectsFooter}>
                    <Button
                        size="small"
                        type="primary"
                        icon="profile"
                        className={styles.defectsBtn}
                        onClick={reformSidebarService.onReformNoticeShow}
                    >
                        整改通知书
                    </Button>
                    <Button
                        size="small"
                        type="primary"
                        icon="copy"
                        style={{ marginLeft: 5 }}
                        className={styles.defectsBtn}
                    >
                        未发现缺陷
                    </Button>
                </div>
            </div>
        )
    }
}