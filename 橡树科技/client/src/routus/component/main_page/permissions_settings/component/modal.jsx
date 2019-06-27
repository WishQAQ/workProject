/**
 * description:设置
 * author: mou
 * time:2018-1-17
 */
import React from 'react'
import {Modal, Button} from 'antd'
import classNames from 'classnames'
import css from '../style/component/modal.scss'
export class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,//按钮loading状态
      visible: false,//Modal 是否可见
      title: '',//modal 标题
      width: 0,//modal 宽度
      height: 0,//modal 高度
      showSure: '',
    };
  }

  componentWillMount() {
    this.setState({
      visible: this.props.visible,
      title: this.props.title,
      width: this.props.width,
      height: this.props.height,
      showSure: this.props.showSure,
    })
  }

  componentWillReceiveProps(nextPros) {
    this.setState({
      visible: nextPros.visible,
      title: nextPros.title,
      width: nextPros.width,
      height: nextPros.height,
      showSure: nextPros.showSure,
    })
  }

  render() {
    const {visible, loading, title, width, height, showSure} = this.state;
    const className = this.props.className;
    return (<div>
      <Modal
        mask={false}
        width={width}
        height={height}
        visible={visible}
        title={title}
        wrapClassName={classNames(css.setting, className)}
        footer={null}
        onCancel={this.props.handleCancel}
      >
        {this.props.children}
        <div className={css.bottomBtn}>
          {showSure ? <Button type="primary" onClick={this.props.sure} className={css.sure}> 确定</Button> : ''}
          <Button key="submit" type="primary" loading={loading} onClick={this.props.save}> 保存</Button>
        </div>
      </Modal>
    </div>)
  }
}
 
 
 