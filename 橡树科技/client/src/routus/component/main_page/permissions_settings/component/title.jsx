/**
 * description:标题组件
 * author: mou
 * time:2018-1-17
 */
import React from 'react'
import {Button, Icon, Input} from 'antd'
import classNames from 'classnames'
import css from '../style/component/title.scss'
const ButtonGroup = Button.Group;
export class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: [],
      inputShow: false,//input 框是否显示
      showInput: false,//是否有input框
      name: '',//模糊查询，输入框值
    };
  }

  componentWillMount() {
    this.setState({
      group: this.props.group,
      showInput: this.props.showInput,
      name: this.props.name,
      inputShow:this.props.fuzzy,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      group: nextProps.group,
      showInput: nextProps.showInput,
      name: nextProps.name,
      inputShow:nextProps.fuzzy,
    },()=>{
      if (this.state.inputShow) {
        this.refs.name.focus();
      }
    })
  }

  changeName = (type, e) => {
    this.props.onChangeName(type, e)
  };

  render() {
    const {group, inputShow, showInput, name} = this.state;
    const className = this.props.className;
    return (
      <div className={classNames(css.infoTitle, className)}>
        <p>{this.props.children}</p>
        <div className={css.btnGroup}>
          <ButtonGroup>
            {group.map(one =>
              <Button key={one.value} onClick={one.onclick}><i className={`icon iconfont ${one.icon}`}></i>{one.text}
              </Button>
            )}
          </ButtonGroup>
          {showInput ? <div className={css.flex}>
            <Input className={`${inputShow ? css.show : null}`} value={name} ref="name"
                   onChange={this.changeName.bind(this, 'name')} onPressEnter={this.props.inputShow}/>
            <Button ghost className={`${css.ghost} ${inputShow ? css.radiusBtn : null}`} onClick={this.props.inputShow}><Icon
              type="search"/></Button>
          </div> : null}
        </div>
      </div>
    )
  }
}
 
 
 