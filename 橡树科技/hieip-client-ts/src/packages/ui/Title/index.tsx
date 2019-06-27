import React from 'react'
import styles from './style/index.scss'
import { IconLabel } from 'pkg/ui/iconLabel'
import { ItitleProps } from './title'
import { Select } from 'pkg/common/select'

/**
 *
 * 患者基本信息面板顶部操作栏
 *
 */
export class Title extends React.Component<ItitleProps, any> {
    static defaultProps = {
        cardTitle: '基本信息',
        btnGroup: [
            { key: 'add', values: '新建', iconName: 'icon-icontianjia01' },
            { key: 'clear', values: '清除', iconName: 'icon-qingkong' },
            { key: 'medicalCard', values: '医保卡', iconName: 'icon-wodeyibaoqia-' },
            { key: 'identityCard', values: '身份证', iconName: 'icon-shenfenzheng' }
        ]
    }

    /**
     *
     * 图标单击事件
     *
     */
    onIconLabelClick = (item) => {
        // const {onClearClick} = this.props
        if (item.key === 'add') {
            // 'add'
        }
        if (item.key === 'clear') {
            // 'clear'
        }
        if (item.key === 'medicalCard') {
            // 'medicalCard'
        }
        if (item.key === 'ideentityCard') {
            // 'ideneityCard'
        }
    }

    /**
     * @returns {any}
     */
    render() {
        const { cardTitle, btnGroup } = this.props
        return (
            <div className={styles.root}>
                <div className={styles.cardTitle}>{cardTitle}</div>
                <div className={styles.titleBtnGroup}>
                    {
                        btnGroup.map((item, index) => {
                            return (
                                <IconLabel
                                    key={`iconLabel-${index}`}
                                    values={item.values}
                                    iconName={item.iconName}
                                    className={styles.iconLabel}
                                    onClick={() => this.onIconLabelClick(item)}
                                />
                            )
                        })
                    }
                </div>
                <Select
                    showSearch={true}
                    size="small"
                    placeholder="暂存记录"
                    notFoundContent="未查找到记录"
                    className={styles.searchRecord}
                />
                <IconLabel iconName="icon-sousuo_sousuo" className={styles.searchIcon}/>
            </div>
        )
    }
}