import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { IDrawerProps } from './drawer'
import styles from './style/index.scss'
import animation from './style/animation.scss'
 
/**
 *
 * 侧边栏组件
 *
 */
export class Drawer extends React.Component<IDrawerProps, any> {
    static propTypes = {
        /** 开启和关闭侧边栏的标志 */
        open: PropTypes.bool,
        /** 关闭侧边栏后的回调函数 */
        onClose: PropTypes.func,
        /** 打开侧边栏后的回调函数 */
        onOpen: PropTypes.func,
        /** 蒙层容器类名 */
        overlayClass: PropTypes.string,
        /** 侧边栏容器类名 */
        drawerClass: PropTypes.string,
        /** 侧边栏滑出的位置 */
        position: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
        /** 是否开启蒙层 */
        isOverlay: PropTypes.bool
    }

    static defaultProps = {
        position: 'right',
        isOverlay: true
    }

    drawerEle = null

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            hiddenOverlay: true,
            hiddenDrawer: true
        }
    }

    componentWillMount() {
        const { open } = this.props
        this.setState({
            open,
            hiddenOverlay: true,
            hiddenDrawer: true
        })
        open ?
            this.openDrawer() :
            this.closeDrawer()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.open) {
            nextProps.open ?
                this.openDrawer() :
                this.closeDrawer()
        }
    }

    componentDidMount() {
        const drawerEle = ReactDOM.findDOMNode(this.drawerEle)
        drawerEle.addEventListener('webkitAnimationEnd', this.onAnimationEnded)
    }

    componentWillUnMount() {
        const drawerEle = ReactDOM.findDOMNode(this.drawerEle)
        drawerEle.removeEventListener('webkitAnimationEnd', this.onAnimationEnded)
    }

    render() {
        const { isOverlay } = this.props
        const drawerClasses = this.getDrawerClasses()
        const overlayClasses = this.getOverlayClasses()

        return (
            <div>
                {
                    isOverlay
                        ?
                        <div
                            className={overlayClasses}
                            onClick={this.closeDrawer}
                        />
                        :
                        null
                }
                <div
                    className={drawerClasses}
                    ref={(x) => this.drawerEle = x}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }

    /**
     *
     * 开启侧边栏的回调
     *
     */
    private openDrawer = () => {
        this.setState({
            open: true,
            hiddenOverlay: false,
            hiddenDrawer: false
        })
        if (this.props.onOpen) {
            this.props.onOpen(true)
        }
    }

    /**
     *
     * 关闭侧边栏的回调函数
     *
     */
    private closeDrawer = () => {
        this.setState({
            open: false
        })
        if (this.props.onClose) {
            this.props.onClose(false)
        }
    }

    /**
     *
     * 动画结束后的回调函数
     *
     */
    private onAnimationEnded = () => {
        const { open } = this.state
        if (!open) {
            this.setState({
                hiddenOverlay: true,
                hiddenDrawer: true
            })
        }
    }

    /**
     *
     * 蒙层容器类名
     *
     */
    private getOverlayClasses = () => {
        const { open, hiddenOverlay } = this.state
        const { overlayClass } = this.props
        return classnames(
            overlayClass,
            [styles.overlay],
            [animation.animated],
            {
                [animation.fadeIn]: open,
                [animation.fadeOut]: !open,
                [styles.hidden]: hiddenOverlay
            }
        )
    }

    /**
     *
     * 边栏容器类名
     *
     */
    private getDrawerClasses = () => {
        const { open, hiddenDrawer } = this.state
        const { drawerClass, position } = this.props
        let direction, start
        if (open) {
            direction = 'In'
            switch (position) {
                case 'top':
                    start = 'Down'
                    break
                case 'bottom':
                    start = 'Up'
                    break
                case 'left':
                    start = 'Left'
                    break
                case 'right':
                    start = 'Right'
                    break
                default:
                    start = 'Left'
            }
        } else {
            direction = 'Out'
            switch (position) {
                case 'top':
                    start = 'Up'
                    break
                case 'bottom':
                    start = 'Down'
                    break
                case 'left':
                    start = 'Left'
                    break
                case 'right':
                    start = 'Right'
                    break
                default:
                    start = 'Right'
            }
        }
        const drawerAnimation = `slide${direction}${start}`
        const drawerPosition = styles[`drawer-${position}`]
        return classnames(
            drawerClass,
            [styles.drawer],
            [animation.animated],
            drawerPosition,
            animation[drawerAnimation],
            {
                [styles.hidden]: hiddenDrawer
            }
        )
    }
}
