/**
 * description:电子病历共享左边
 * author: mou
 * time:2017-12-11
 */
import React from 'react'
import {Tabs, message} from 'antd'
import {MyTree} from './tree'
import moment from 'moment'
import css from './../eleMedical.scss'
const TabPane = Tabs.TabPane;
export class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '1',
      treeData: [],
      content: [],
      clinicRecList: [],//生成时间轴
      birthday: '',
      patientInfo: {},
      change: false,//是否改变的treeData
      isSearch: false,
    };
  };

  componentWillMount() {
    this.setState({
      clinicRecList: this.props.clinicRecList,
      content: this.props.content,
      birthday: this.props.birthday,
      patientInfo: this.props.patientInfo,
      isSearch: this.props.isSearch,
    }, () => {
      this.judge(this.state.activeIndex)
    })
  }

  componentWillReceiveProps(next) {
    this.setState({
      clinicRecList: next.clinicRecList,
      content: next.content,
      birthday: next.birthday,
      patientInfo: next.patientInfo,
      isSearch: next.isSearch,
    }, () => {
      if (!this.state.change) {
        this.judge(this.state.activeIndex)
      }
    });
  }

//拆分医院
  splitHospital = (arr3, h, icon) => {
    const {clinicRecList} = this.state;
    for (let i = 0; i < clinicRecList.length; i++) {
      let obj = {};
      let child = [];
      obj.title = clinicRecList[i].hspAbbreviation;
      obj.key = obj.title + '\n' + clinicRecList[i].patientId;
      obj.icon = icon;
      obj.date = clinicRecList[i].timeFrom;
      for (let j = 0; j < clinicRecList.length; j++) {
        if (obj.title === clinicRecList[j].hspAbbreviation) {
          child.push(clinicRecList[j])
        }
      }
      obj.child = child;
      if (arr3.length !== 0) {
        if (arr3[h].title !== obj.title) {
          arr3.push(obj);
          h++;
        }
      } else {
        arr3.push(obj);
      }
    }
    return arr3;
  };
//拆分月日
  splitMonDay = (arr1, c, icon) => {
    const {clinicRecList} = this.state;
    clinicRecList.forEach((row, index) => {
      let obj = {};
      let child = [];
      let time = new Date(row.timeFrom);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      obj.title = (month < 10 ? '0' + month : month) + '.' + (day < 10 ? '0' + day : day);
      obj.key = obj.title + '\n' + row.patientId;
      obj.icon = icon;
      obj.date = year + '.' + month + '.' + day;
      clinicRecList.forEach((v, i) => {
        let vtime = new Date(v.timeFrom);
        let vYear = vtime.getFullYear();
        let vmonth = vtime.getMonth() + 1;
        let vday = vtime.getDate();
        if (year === vYear && month === vmonth && day === vday) {
          switch (v.clinicType) {
            case 'R':
              child.push(
                {
                  title: '住院' + '\n' + clinicRecList[i].deptName,
                  key: '住院' + '\n' + v.patientId,
                  icon: 'icon-wenjianjia1',
                  child: [
                    {
                      title: '病案首页',
                      key: '病案首页' + '\n' + v.patientId,
                    },
                    {
                      title: '体温单',
                      key: '体温单' + '\n' + v.patientId,
                    },
                    {
                      title: '处方记录',
                      key: '处方记录' + '\n' + v.patientId,
                    },
                    {
                      title: '医嘱',
                      key: '医嘱' + '\n' + v.patientId,
                    },
                    {
                      title: '住院病历',
                      key: '住院病历' + '\n' + v.patientId,
                      child: [],
                    },
                    {
                      title: '检查',
                      key: '检查' + '\n' + v.patientId,
                      child: [],
                    },
                    {
                      title: '检验',
                      key: '检验' + '\n' + v.patientId,
                      child: [],
                    },
                  ]
                });
              break;
            case 'C':
              child.push({
                title: '出院' + (clinicRecList[i].TimeTo ? moment(clinicRecList[i].TimeTo).format('YYYY-MM-DD') : null) + clinicRecList[i].deptName,
                icon: 'icon-wenjianjia1',
                key: '出院' + '\n' + v.patientId,
                child: []
              });
              break;
            case 'M':
              child.push({
                title: '门诊' + '\n' + clinicRecList[i].deptName,
                icon: 'icon-wenjianjia1',
                key: '门诊' + '\n' + v.patientId,
                child: [
                  {
                    title: '门诊病历',
                    key: '门诊病历' + '\n' + v.patientId,
                  },
                  {
                    title: '处方',
                    key: '处方' + '\n' + v.patientId,
                  },
                  {
                    title: '处置',
                    key: '处置' + '\n' + v.patientId,
                  },
                  {
                    title: '检查',
                    key: '检查' + '\n' + v.patientId,
                    child: [],
                  },
                  {
                    title: '检验',
                    key: '检验' + '\n' + v.patientId,
                    child: [],
                  },
                ]
              });
              break;
          }
        }
      });
      obj.child = child;
      if (arr1.length !== 0) {
        let tp = false;
        for (let i = 0; i < arr1.length; i++) {
          if (obj.title === arr1[i].title) {
            tp = true;
            break;
          }
        }
        if (!tp) {
          arr1.push(obj)
        }
      } else {
        arr1.push(obj);
      }
    });
    return arr1;
  };
//拆分年月
  splitYearMonth = (arr2, t, icon) => {
    const {clinicRecList} = this.state;
    for (let i = 0; i < clinicRecList.length; i++) {
      let obj = {};
      let child = [];
      let time = new Date(clinicRecList[i].timeFrom);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      obj.title = year + '.' + (month < 10 ? '0' + month : month) + '\n' + clinicRecList[i].hspAbbreviation;
      obj.key = year + '.' + (month < 10 ? '0' + month : month) + ' ' + clinicRecList[i].hspAbbreviation + '\n' + clinicRecList[i].patientId;
      obj.icon = icon;
      obj.date = year + '.' + month + '.' + day;
      for (let j = 0; j < clinicRecList.length; j++) {
        let timeT = new Date(clinicRecList[j].timeFrom);
        let yearT = timeT.getFullYear();
        let monthT = timeT.getMonth() + 1;
        let vDay = timeT.getDate();
        // let monthDay = (month < 10 ? '0' + month : month) + '.' + (day < 10 ? '0' + day : day);
        if (year === yearT && month === monthT) {
          child.push(clinicRecList[j])
        }
      }
      obj.child = child;
      if (arr2.length !== 0) {
        let tp = false;
        for (let i = 0; i < arr2.length; i++) {
          if (obj.title === arr2[i].title) {
            tp = true;
            break;
          }
        }
        if (!tp) {
          arr2.push(obj)
        }
      } else {
        arr2.push(obj);
      }
    }
    return arr2;
  };
//合并年月日
  mergeYMD = (arr2, arr1) => {
    //循环年
    for (let i = 0; i < arr2.length; i++) {
      let begin1 = arr2[i].title.indexOf('.');
      let end1 = arr2[i].title.indexOf('\n');
      let month1 = arr2[i].title.substring(begin1 + 1, end1);
      let date1 = arr2[i].date.split('.');
      date1 = date1[0];
      arr2[i].child = [];
      for (let j = 0; j < arr1.length; j++) {
        let end2 = arr1[j].title.indexOf('.');
        let month2 = arr1[j].title.substring(0, end2);
        let date2 = arr1[j].date.split('.');
        date2 = date2[0];
        if (date1 === date2 && month1 === month2) {
          if (arr2[i].child.length === 0) {
            arr2[i].child.push(arr1[j]);
          } else {
            let tp = false;
            for (let k = 0; k < arr2[i].child.length; k++) {
              if (arr2[i].child[k].title === arr1[j].title) {
                tp = true;
                break;
              }
            }
            if (!tp) {
              arr2[i].child.push(arr1[j]);
            }
          }
        }
      }
    }
    return arr2
  };
  //合并医院和年
  mergeHY = (hospital, year) => {
    for (let i = 0; i < hospital.length; i++) {
      let name1 = hospital[i].title;
      hospital[i].child = [];
      for (let j = 0; j < year.length; j++) {
        let begin = year[j].title.indexOf('\n');
        let name2 = year[j].title.substring(begin + 1, year[i].length);
        let v = year[j].title.substring(0, begin);
        if (name1 === name2) {
          if (hospital[i].child.length === 0) {
            hospital[i].child.push(year[j]);
          } else {
            let tp = true;
            for (let k = 0; k < hospital[i].child.length; k++) {
              if (hospital[i].child[k].title === year[j].title) {
                tp = false;
                break;
              }
            }
            if (tp) {
              hospital[i].child.push(year[j]);
            }
          }
        }
      }
    }
    return hospital;
  };
  mergeHYD = (hospital, month) => {
    for (let i = 0; i < hospital.length; i++) {
      for (let j = 0; j < hospital[i].child.length; j++) {
        let begin1 = hospital[i].child[j].title.indexOf('.');
        let end1 = hospital[i].child[j].title.indexOf('\n');
        let date1 = hospital[i].child[j].date.split('.');
        date1 = date1[0];
        let month1 = hospital[i].child[j].title.substring(begin1 + 1, end1);
        hospital[i].child[j].title = hospital[i].child[j].title.substring(0, end1);
        hospital[i].child[j].child = [];
        for (let k = 0; k < month.length; k++) {
          let date2 = month[k].date.split('.');
          date2 = date2[0];
          let end2 = month[k].title.indexOf('.');
          let month2 = month[k].title.substring(0, end2);
          if (date1 === date2 && month1 === month2) {
            if (hospital[i].child[j].child.length === 0) {
              hospital[i].child[j].child.push(month[k])
            } else {
              let tp = true;
              for (let m = 0; m < hospital[i].child[j].child.length; m++) {
                if (hospital[i].child[j].child[m].title === month[k].title) {
                  tp = false;
                  break;
                }
              }
              if (tp) {
                hospital[i].child[j].child.push(month[k])
              }
            }
          }
        }
      }
    }
    return hospital;
  };
  judgeStage = (year) => {
    //婴儿期
    if (0 < year && year <= 1) {
      return '婴儿期'
    }
    //幼儿期
    else if (1 < year && year <= 3) {
      return '幼儿期'
    }
    //学龄前
    else if (3 < year && year <= 7) {
      return '学龄前期'
    }
    //青春期
    else if (7 < year && year <= 20) {
      return '青春期'
    }
    //青年期
    else if (20 < year && year <= 30) {
      return '青年期'
    }
    //中年期
    else if (30 < year && year <= 50) {
      return '中年期'
    }
    //老年期
    else if (50 < year && year <= 150) {
      return '老年期'
    }
  };
  onChange = (key) => {
    if (this.state.isSearch) {
      this.setState({
        activeIndex: key
      }, () => {
        this.judge(key);
      })
    } else {
      message.warning('请先查询数据')
    }
  };
  judge = (key) => {
    let treeData;
    const {birthday, clinicRecList} = this.state;
    let dateBirth = new Date(moment(birthday).format('YYYY-MM-DD'));
    dateBirth = dateBirth.getFullYear();
    let arr = [], month = [], m = 0, year = [], y = 0, hospital = [], h = 0, april, years, infirmary, mergeHy;
    switch (key) {
      case '1':
        treeData = [];
        //中、幼期
        for (let i = 0; i < clinicRecList.length; i++) {
          let timeFrom = new Date(clinicRecList[i].timeFrom).getFullYear();
          //判断出生日期是否大于当前日期
          let year = timeFrom - dateBirth;
          let stage;
          //判断是门诊、住院、出院
          switch (clinicRecList[i].clinicType) {
            case 'M':
              stage = this.judgeStage(year);
              arr.push({
                title: '门诊' + moment(clinicRecList[i].timeFrom).format('YYYY-MM-DD') + '\n' + clinicRecList[i].deptName,
                key: '门诊' + '\n' + clinicRecList[i].patientId,
                icon: 'icon-wenjianjia1',
                child: [
                  {
                    title: '门诊病历',
                    key: '门诊病历' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '处方',
                    key: '处方' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '处置',
                    key: '处置' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '检查',
                    key: '检查' + '\n' + clinicRecList[i].patientId,
                    child: [],
                  },
                  {
                    title: '检验',
                    key: '检验' + '\n' + clinicRecList[i].patientId,
                    child: [],
                  },
                ]
              },);
              break;
            case 'R':
              stage = this.judgeStage(year);
              arr.push({
                title: '住院' + moment(clinicRecList[i].timeFrom).format('YYYY-MM-DD') + '\n' + clinicRecList[i].deptName,
                key: '住院' + '\n' + clinicRecList[i].patientId,
                icon: 'icon-wenjianjia1',
                child: [
                  {
                    title: '病案首页',
                    key: '病案首页' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '体温单',
                    key: '体温单' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '处方记录',
                    key: '处方记录' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '医嘱',
                    key: '医嘱' + '\n' + clinicRecList[i].patientId,
                  },
                  {
                    title: '住院病历',
                    key: '住院病历' + '\n' + clinicRecList[i].patientId,
                    child: [],
                  },
                  {
                    title: '检查',
                    key: '检查' + '\n' + clinicRecList[i].patientId,
                    child: [],
                  },
                  {
                    title: '检验',
                    key: '检验' + '\n' + clinicRecList[i].patientId,
                    child: [],
                  },
                ]
              },);
              break;
            case 'C':
              arr.push({
                title: '出院' + moment(clinicRecList[i].TimeTo).format('YYYY-MM-DD') + clinicRecList[i].deptName,
                key: '出院' + '\n' + clinicRecList[i].patientId,
                icon: 'icon-wenjianjia1',
                child: []
              });
              break;
          }
          //婴儿期
          if (0 < year && year <= 1) {
            treeData[0] = {
              title: '婴儿期',
              key: '婴儿期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //幼儿期
          else if (1 < year && year <= 3) {
            treeData[0] = {
              title: '幼儿期',
              key: '幼儿期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //学龄前
          else if (3 < year && year <= 7) {
            treeData[0] = {
              title: '学龄前期',
              key: '学龄前期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //青春期
          else if (7 < year && year <= 20) {
            treeData[0] = {
              title: '青春期',
              key: '青春期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //青年期
          else if (20 < year && year <= 30) {
            treeData[0] = {
              title: '青年期',
              key: '青年期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //中年期
          else if (30 < year && year <= 50) {
            treeData[0] = {
              title: '中年期',
              key: '中年期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //老年期
          else if (50 < year && year <= 150) {
            treeData[0] = {
              title: '老年期',
              key: '老年期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
        }
        break;
      case '2':
        april = this.splitMonDay(month, m, '');
        years = this.splitYearMonth(year, y, '');
        treeData = this.mergeYMD(years, april);
        break;
      case '3':
        infirmary = this.splitHospital(hospital, h, 'icon-yiyuanjia');
        april = this.splitMonDay(month, m, '');
        years = this.splitYearMonth(year, y, '');
        mergeHy = this.mergeHY(infirmary, years);
        treeData = this.mergeHYD(mergeHy, april);
        break;
    }
    this.setState({
      treeData
    })
  };

  changeData = (treeData, data, subTitle, patientId) => {
    for (let i = 0; i < treeData.length; i++) {
      let split = treeData[i].key.indexOf('\n');
      let pId = treeData[i].key.substring(split, treeData[i].key.length);
      if (treeData[i].title === subTitle && pId.trim() === patientId.trim()) {
        treeData[i].child = data;
      } else {
        if (treeData[i].child) {
          this.changeData(treeData[i].child, data, subTitle, patientId)
        }
      }
    }
  };

  //改变menu的值
  changeMenu = (treeData, data, subTitle, patientId) => {
    this.changeData(treeData, data, subTitle, patientId);
    this.setState({
      change: true,
      treeData
    });
  };

  render() {
    const {activeIndex, treeData, content, clinicRecList, patientInfo} = this.state;
    return (  <Tabs activeKey={activeIndex} onChange={this.onChange} className={css.left}>
      <TabPane tab="生命周期" key="1" className={css.lifeCycle}><MyTree treeData={treeData} content={content} clinicRecList={clinicRecList}
                                          patientInfo={patientInfo} changeMenu={this.changeMenu}/></TabPane>
      <TabPane tab="时间轴" key="2" className={css.timeLine}><MyTree treeData={treeData} content={content} clinicRecList={clinicRecList}
                                         patientInfo={patientInfo} changeMenu={this.changeMenu}/></TabPane>
      <TabPane tab="医院诊疗" key="3" className={css.hospitalTreat}><MyTree treeData={treeData} content={content} clinicRecList={clinicRecList}
                                          patientInfo={patientInfo} changeMenu={this.changeMenu}/></TabPane>
    </Tabs>)
  }
}

