import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { IconFont } from 'pkg/common/icon'
import styles from './style/index.scss'

interface IconItemType {
    /** 图标名 */
    icon: string
    /** 当前是否被激活 */
    active: boolean
}

interface CardFooterProps {
    routeClick: (prop: any) => any
    iconNames?: IconItemType[]
}

interface CardFooterState {
    iconNames: IconItemType[]
}

export class CardFooter extends React.Component<CardFooterProps, CardFooterState> {
    static propTypes = {
        iconNames: PropTypes.array
    }
    static defaultProps = {
        iconNames: [
            { icon: 'icon-aixin', active: true },
            { icon: 'icon-yaoxue', active: false },
            { icon: 'icon-fangshe', active: false },
            { icon: 'icon-jianyanyubingli', active: false },
            { icon: 'icon-xindian', active: false },
            { icon: 'icon-dianhua1', active: false },
            { icon: 'icon-jiaobanguanli1', active: false }
        ]
    }

    constructor(props) {
        super(props)
        this.state = {
            iconNames: []
        }
    }

    componentWillMount() {
        const { iconNames } = this.props
        this.setState({ iconNames })
    }

    componentWillReceiveProps(nextProps) {
        const { iconNames } = nextProps
        this.setState({ iconNames })
    }

    /**
     *
     * 图标项的点击事件
     *
     */
    onHandleClick = (iconItem) => {
        this.props.routeClick(iconItem.icon)
    }

    render() {
        const { iconNames } = this.state
        return (
            <div className={styles.cardFooter}>
                {
                    iconNames.map((item, index) => {
                        return (
                            <span
                                key={`icon-${index}`}
                                onClick={() => this.onHandleClick(item)}
                                className={
                                    classnames({
                                        [`${styles.bunkStatus}`]: true,
                                        [`${styles.bunkStatusActive}`]: item.active
                                    })}
                            >
                <IconFont
                    iconName={item.icon}
                    iconClass={
                        classnames({
                            [`${styles.statusIcon}`]: true,
                            [`${styles.statusIconActive}`]: item.active
                        })}
                />
              </span>
                        )
                    })
                }
            </div>
        )
    }
}