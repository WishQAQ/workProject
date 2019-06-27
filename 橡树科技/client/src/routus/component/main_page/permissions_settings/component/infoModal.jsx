/**
 * description:新增modal
 * author: mou
 * time:2018-1-18
 */
import React from 'react'
import {Modal, Button} from 'antd'
import css from '../style/component/infoModal.scss'
export class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,//按钮loading状态
      visible: false,//Modal 是否可见
      title: '',//modal 标题
      width: 0,//modal 宽度
      height: 0,//modal 高度
    };
  }

  componentWillMount() {
    this.setState({
      visible: this.props.visible,
      title: this.props.title,
      width: this.props.width,
      height: this.props.height,
    })
  }

  componentWillReceiveProps(nextPros) {
    this.setState({
      visible: nextPros.visible,
      title: nextPros.title,
      width: nextPros.width,
      height: nextPros.height,
    })
  }

  render() {
    const {visible, loading, title, width, height} = this.state;
    return (<div>
      <Modal
        mask={false}
        width={width}
        height={height}
        visible={visible}
        title={title}
        wrapClassName={css.setting}
        footer={null}
        onCancel={this.props.handleCancel}
      >
        {this.props.children}
        <div className={css.bottomBtn}>
          <Button key="submit" type="primary" loading={loading} onClick={this.props.save}> 保存</Button>
        </div>
      </Modal>
    </div>)
  }
}
 
 
 