import React from 'react'
import { Card, Col, Row } from 'antd'
import { IconFont } from 'pkg/common/icon'
import { CardFooter } from './CardFooter'
import CardItem from './CardItem'
import { ColorIcon } from 'pkg/common/colorIcon'
import styles from './style/index.scss'

/**
 * 分诊级别对应颜色
 * @type {{一级: string; 二级: string; 三级: string; 四级: string}}
 */
const triageLevelColor = {
    '一级': '#FF375B',
    '二级': '#FA8630',
    '三级': '#FFCC19',
    '四级': '#01BF9D'
}

export class BunkCard extends React.Component<any> {
    static defaultProps = {
        bordered: false
    }

    render() {
        const {
            bunkInfo,
            routeClick,
            ...rest
        } = this.props

        const {
            name,
            sex,
            triageLevel,
            chargeType,
            bedLabel,
            bedUnit,
            age,
            individual,
            payment,
            doctorName,
            diagnosis,
            greenRoad,
            admWardDateTime,
            residenceTime
        } = bunkInfo

        const CardTitle = (
            <div className={styles.cardTitle}>
                <div className={styles.sickInfo}>
                    <ColorIcon
                        className={styles.colorIcon}
                        iconName={`${(sex === '1' || sex === 1) ?
                            'icon-nantouxiang' : (sex === '2' || sex === 2) ? 'icon-nvtouxiang' : 'icon-wenhaotouxiang'}`}/>
                    <div className={styles.sickDetail}>
                        <span>{name}</span>
                        <span
                            className={styles.triageLevel}
                            style={{ color: triageLevel ? triageLevelColor[triageLevel] : '#CECECE' }}
                        >{triageLevel}</span>
                    </div>
                </div>
                <div className={styles.bedLabel}>
                    <div
                        className={triageLevel ? styles.cardBunk : styles.cardBunk2}
                        style={{ background: triageLevel ? triageLevelColor[triageLevel] : '#CECECE' }}
                    >
                        <span>{bedLabel ? bedLabel : '门'}</span>
                        <span>
              <IconFont iconClass={styles.bunkIcon}
                        iconName={bedUnit === '床' ? 'icon-chuangwei' : (bedUnit === '座位' ? 'icon-zuowei' : '')}/>
            </span>
                    </div>
                    <div className={styles.chargeType}>{chargeType}</div>
                </div>
            </div>
        )

        return (
            <Card
                {...rest}
                title={CardTitle}
                className={styles.root}
            >
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={12}>
                                <CardItem title="年龄" value={age}/>
                            </Col>
                            < Col span={12}><CardItem title="过敏史" value={individual}/></Col>
                        </Row>
                    </Col>
                    < Col span={24}>
                        <Row>
                            <Col span={12}><CardItem title="预交金" value={payment}/></Col>
                            <Col span={12}><CardItem title="医生" value={doctorName}/></Col>
                        </Row>
                    </Col>
                    <Col span={24}><CardItem title="诊断" value={diagnosis}/></Col>
                    <Col span={24}><CardItem title="绿色通道" value={greenRoad}/></Col>
                    <Col span={24}><CardItem title="入科时间" value={admWardDateTime}/></Col>
                    <Col span={24}><CardItem title="滞留时间" value={residenceTime}/></Col>
                </Row>
                <CardFooter routeClick={routeClick}/>
            </Card>
        )
    }
}
