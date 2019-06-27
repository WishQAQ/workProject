import React from 'react'
import debug from 'debug'

const trace = debug('trace:框架:懒加载器')

interface LazyLoaderProps {
    lazyModule: any
}

interface LazyLoaderState extends LazyLoaderProps {
    model?: any
}

export class LazyLoader extends React.Component<LazyLoaderProps, LazyLoaderState> {
    state = {
        model: null,
        lazyModule: null
    }

    componentWillMount() {
        trace('收到懒加载请求')
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps: LazyLoaderProps) {
        trace('收到懒加载更新请求')
        this.load(nextProps)
    }

    load(props: LazyLoaderProps) {
        const module = props.lazyModule.default ? props.lazyModule.default : props.lazyModule
        module((element: any) => {
            const Model = element.default ? element.default : element
            trace('加载组件：%s', Model.name)
            this.setState({model: React.createElement(Model), lazyModule: props.lazyModule})
        })
    }

    render() {
        return this.state.model
    }
}
