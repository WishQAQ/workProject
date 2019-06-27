/**
 * description:label和其他组件组合
 * author: mou
 * time:2018-1-6
 */
import React from 'react'
import classNames from 'classnames'
import style from './style/labelAddComponent.scss'
export class LabelAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: ''
    };
  }

  componentWillMount() {
    this.setState({
      label: this.props.label
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      label: next.label
    })
  }

  render() {
    const {className, border, weight} = this.props;
    const {label} = this.state;
    return (<div className={classNames(style.labelAddComponent, className)}>
      <div className={border ? style.label : null}>
        <label className={weight ? style.weight : null}>{label}</label>
      </div>
      {this.props.children}
    </div>)
  }
}
 
 
 