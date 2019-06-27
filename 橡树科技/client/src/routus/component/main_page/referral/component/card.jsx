/**
 * description:卡片
 * author: mou
 * time:2018-1-5
 */
import React from 'react'
import classNames from 'classnames'
import style from './style/card.scss'
export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  };

  componentWillMount() {
    this.setState({
      title: this.props.title
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      title: next.title
    })
  }

  render() {
    const {title} = this.state;
    const {className} = this.props;
    return (<div className={classNames(style.card,className)}>
      <div className={style.title}>{title}</div>
      {this.props.children}
    </div>)
  }
}
 
 
 