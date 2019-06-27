/**
 * Created by liulingli on 2017/6/28.
 * desc : 病历详情-入院-住院病历
 */
import React, {Component} from "react";
import {Spin} from 'antd'
import qs from "qs";
import api from '../../../../electronic_medical_record/api'
import {message} from "antd";

export class AdmissionNote extends Component {
  componentWillMount() {
    this.state = {
      data: this.props.data,
      html: '',
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
    this.queryFetch(nextProps.data);
  }

  componentDidMount() {
    this.queryFetch(this.state.data);
  }

  /*
   * 查询电子病历详情
   * */
  queryFetch = (data) => {
    const {loadData1} = api;
    this.setState({
      loading: true
    });
    loadData1(data, response => {
      if (response.success) {
        this.setState({
          html: response.data.content,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        });
        console.error("response error", response);
      }
    });
  };

  render() {
    let {html, loading} = this.state;
    return (
      <div className="admission-note">
        <Spin spinning={loading}>
          <div id="admission-note" dangerouslySetInnerHTML={{__html: html}}>
          </div>
        </Spin>
      </div>
    )
  }
}