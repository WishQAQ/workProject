import React, { HTMLAttributes } from 'react'
import logoImg from './images/logo.svg'
import css from './style/logo.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

interface LogoProps extends HTMLAttributes<any> {
    big?: boolean,
}

export class Logo extends React.Component<LogoProps, LogoProps> {
    static propTypes = {
        big: PropTypes.bool
    }
    static defaultProps: LogoProps = {
        big: false
    }

    state = {
        big: this.props.big
    }

    shouldComponentUpdate(nextProps: LogoProps) {
        return nextProps.big !== this.state.big
    }

    componentWillReceiveProps(nextProps: LogoProps) {
        this.setState({ big: nextProps.big })
    }

    disableDragging(e) {
        e.preventDefault()
    }

    render() {
        let { className, big, ...other } = this.props
        const isBig = this.state.big || big
        return <div onMouseDown={this.disableDragging}
                    className={classNames(css.logo, className, { [css.big]: isBig })} {...other}
                    dangerouslySetInnerHTML={{ __html: logoImg }}/>
    }
}