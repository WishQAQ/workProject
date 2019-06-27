/**
 * description:电子病历共享左边
 * author: mou
 * time:2017-12-11
 */
import React from 'react'
import {Tabs, message} from 'antd'
import {Menus} from './menus'
import moment from 'moment'
import css from './../eleMedical.scss'
const TabPane = Tabs.TabPane;
export class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '1',
      treeData: [
        {
          title: '婴儿期',
          icon: 'icon-yonghu',
          child: []
        },
        {
          title: '幼儿期',
          icon: 'icon-yonghu',
          child: []
        },
        {
          title: '学龄前期',
          icon: 'icon-yonghu',
          child: []
        },
        {
          title: '青春期',
          icon: 'icon-yonghu',
          child: []
        },
        {
          title: '青年期',
          icon: 'icon-yonghu',
          child: []
        },
        {
          title: '中年期',
          icon: 'icon-yonghu',
          child: []
        }, {
          title: '老年期',
          icon: 'icon-yonghu',
          child: []
        },
      ],
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
      this.judge(this.state.activeIndex);
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
      this.judge(this.state.activeIndex)
    });
  }

//拆分医院
  splitHospital = (arr3, h, icon) => {
    const {clinicRecList} = this.state;
    for (let i = 0; i < clinicRecList.length; i++) {
      let obj = {};
      let child = [];
      obj.title = clinicRecList[i].hspAbbreviation;
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
                  icon: 'icon-wenjianjia1',
                  child: [
                    {
                      title: '病案首页',
                    },
                    {
                      title: '体温单',
                    },
                    {
                      title: '处方记录',
                    },
                    {
                      title: '医嘱',
                    },
                    {
                      title: '住院病历',
                      child: [],
                    },
                    {
                      title: '检查',
                      child: [],
                    },
                    {
                      title: '检验',
                      child: [],
                    },
                  ]
                });
              break;
            case 'C':
              child.push({
                title: '出院' + (clinicRecList[i].TimeTo ? moment(clinicRecList[i].TimeTo).format('YYYY-MM-DD') : null) + clinicRecList[i].deptName,
                icon: 'icon-wenjianjia1',
                child: []
              });
              break;
            case 'M':
              child.push({
                title: '门诊' + '\n' + clinicRecList[i].deptName,
                icon: 'icon-wenjianjia1',
                child: [
                  {
                    title: '门诊病历',
                  },
                  {
                    title: '处方',
                  },
                  {
                    title: '处置',
                  },
                  {
                    title: '检查',
                    child: [],
                  },
                  {
                    title: '检验',
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
  getMenu = (clinicRecList) => {
    let {treeData, birthday} = this.state;
    let dateBirth = new Date(moment(birthday).format('YYYY-MM-DD'));
    dateBirth = dateBirth.getFullYear();
    let arr = [];
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
            title: '门诊' + (clinicRecList[i].timeFrom ? moment(clinicRecList[i].timeFrom).format('YYYY-MM-DD') : null) + '\n' + clinicRecList[i].deptName,
            icon: 'icon-wenjianjia1',
            child: [
              {
                title: '门诊病历',
              },
              {
                title: '处方',
              },
              {
                title: '处置',
              },
              {
                title: '检查',
                child: [],
              },
              {
                title: '检验',
                child: [],
              },
            ]
          },);
          break;
        case 'R':
          stage = this.judgeStage(year);
          arr.push({
            title: '住院' + (clinicRecList[i].timeFrom ? moment(clinicRecList[i].timeFrom).format('YYYY-MM-DD') : null) + '\n' + clinicRecList[i].deptName,
            icon: 'icon-wenjianjia1',
            child: [
              {
                title: '病案首页',
              },
              {
                title: '体温单',
              },
              {
                title: '处方记录',
              },
              {
                title: '医嘱',
              },
              {
                title: '住院病历',
                child: [],
              },
              {
                title: '检查',
                child: [],
              },
              {
                title: '检验',
                child: [],
              },
            ]
          },);
          break;
        case 'C':
          arr.push({
            title: '出院' + (clinicRecList[i].TimeTo ? moment(clinicRecList[i].TimeTo).format('YYYY-MM-DD') : null) + clinicRecList[i].deptName,
            icon: 'icon-wenjianjia1',
            child: []
          });
          break;
      }
      //婴儿期
      if (0 < year && year <= 1) {
        //  treeData[0].child = arr;
        treeData[0] = {
          title: '婴儿期',
          icon: 'icon-yonghu',
          child: arr
        }
      }
      //幼儿期
      else if (1 < year && year <= 3) {
        // treeData[1].child = arr;
        treeData[0] = {
          title: '幼儿期',
          icon: 'icon-yonghu',
          child: arr
        }
      }
      //学龄前
      else if (3 < year && year <= 7) {
        //  treeData[2].child = arr;
        treeData[0] = {
          title: '学龄前期',
          icon: 'icon-yonghu',
          child: arr
        }
      }
      //青春期
      else if (7 < year && year <= 20) {
        // treeData[3].child = arr;
        treeData[0] = {
          title: '青春期',
          icon: 'icon-yonghu',
          child: arr
        }
      }
      //青年期
      else if (20 < year && year <= 30) {
        // treeData[4].child = arr;
        treeData[0] = {
          title: '青年期',
          icon: 'icon-yonghu',
          child: arr
        }
      }
      //中年期
      else if (30 < year && year <= 50) {
        // treeData[5].child = arr;
        treeData[0] = {
          title: '中年期',
          icon: 'icon-yonghu',
          child: arr
        }
      } else if (50 < year && year <= 90) {
        //  treeData[6].child = arr;
        treeData[0] = {
          title: '老年期',
          icon: 'icon-yonghu',
          child: arr
        }
      }
    }
    this.setState({
      treeData
    })
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
    else if (50 < year && year <= 90) {
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
    let arr = [];
    let month = [];
    let m = 0;
    let year = [];
    let y = 0;
    let hospital = [];
    let h = 0;
    let april;
    let years;
    let infirmary;
    let mergeHy;
    let stage;
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
                icon: 'icon-wenjianjia1',
                child: [
                  {
                    title: '门诊病历',
                  },
                  {
                    title: '处方',
                  },
                  {
                    title: '处置',
                  },
                  {
                    title: '检查',
                    child: [],
                  },
                  {
                    title: '检验',
                    child: [],
                  },
                ]
              },);
              break;
            case 'R':
              stage = this.judgeStage(year);
              arr.push({
                title: '住院' + moment(clinicRecList[i].timeFrom).format('YYYY-MM-DD') + '\n' + clinicRecList[i].deptName,
                icon: 'icon-wenjianjia1',
                child: [
                  {
                    title: '病案首页',
                  },
                  {
                    title: '体温单',
                  },
                  {
                    title: '处方记录',
                  },
                  {
                    title: '医嘱',
                  },
                  {
                    title: '住院病历',
                    child: [],
                  },
                  {
                    title: '检查',
                    child: [],
                  },
                  {
                    title: '检验',
                    child: [],
                  },
                ]
              },);
              break;
            case 'C':
              arr.push({
                title: '出院' + moment(clinicRecList[i].TimeTo).format('YYYY-MM-DD') + clinicRecList[i].deptName,
                icon: 'icon-wenjianjia1',
                child: []
              });
              break;
          }
          //婴儿期
          if (0 < year && year <= 1) {
            //  treeData[0].child = arr;
            treeData[0] = {
              title: '婴儿期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //幼儿期
          else if (1 < year && year <= 3) {
            // treeData[1].child = arr;
            treeData[0] = {
              title: '幼儿期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //学龄前
          else if (3 < year && year <= 7) {
            //  treeData[2].child = arr;
            treeData[0] = {
              title: '学龄前期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //青春期
          else if (7 < year && year <= 20) {
            // treeData[3].child = arr;
            treeData[0] = {
              title: '青春期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //青年期
          else if (20 < year && year <= 30) {
            // treeData[4].child = arr;
            treeData[0] = {
              title: '青年期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
          //中年期
          else if (30 < year && year <= 50) {
            // treeData[5].child = arr;
            treeData[0] = {
              title: '中年期',
              icon: 'icon-yonghu',
              child: arr
            }
          } else if (50 < year && year <= 90) {
            //  treeData[6].child = arr;
            treeData[0] = {
              title: '老年期',
              icon: 'icon-yonghu',
              child: arr
            }
          }
        }
        break;
      case '2':
        april = this.splitMonDay(month, m, 'icon-xian');
        years = this.splitYearMonth(year, y, 'icon-xian');
        treeData = this.mergeYMD(years, april);
        break;
      case '3':
        infirmary = this.splitHospital(hospital, h, 'icon-yiyuanjia');
        april = this.splitMonDay(month, m, 'icon-xian');
        years = this.splitYearMonth(year, y, 'icon-xian');
        mergeHy = this.mergeHY(infirmary, years);
        treeData = this.mergeHYD(mergeHy, april);
        break;
    }
    this.setState({
      treeData
    })
  };
  //改变menu的值
  changeMenu = (activeIndex, arr, data, num, treeData, base) => {
    /*    base++;
     console.log(base);
     for (let i = 0; i < treeData.length; i++) {
     if (treeData[i].title === arr[arr.length - base]) {
     console.log(base,'base:');
     if (base <= num) {
     console.log(base, '1');
     this.changeMenu(activeIndex, arr, data, num, treeData[i].child, base)
     } else {
     console.log(base, '2');
     treeData[i].child = data;
     this.setState({
     change: true,
     treeData
     });
     }
     }
     }
     console.log(treeData);*/
    // let {treeData} = this.state;
    if (activeIndex === '1') {
      for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].title === arr[arr.length - 1]) {
          for (let j = 0; j < treeData[i].child.length; j++) {
            if (treeData[i].child[j].title === arr[arr.length - 2]) {
              for (let k = 0; k < treeData[i].child[j].child.length; k++) {
                if (treeData[i].child[j].child[k].title === arr[arr.length - 3]) {
                  treeData[i].child[j].child[k].child = data;
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
    } else if (activeIndex === '2') {
      for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].title === arr[arr.length - 1]) {
          for (let j = 0; j < treeData[i].child.length; j++) {
            if (treeData[i].child[j].title === arr[arr.length - 2]) {
              for (let k = 0; k < treeData[i].child[j].child.length; k++) {
                if (treeData[i].child[j].child[k].title === arr[arr.length - 3]) {
                  for (let t = 0; t < treeData[i].child[j].child[k].child.length; t++) {
                    if (treeData[i].child[j].child[k].child[t].title === arr[arr.length - 4]) {
                      treeData[i].child[j].child[k].child[t].child = data;
                      break;
                    }
                  }
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
    } else if (activeIndex === '3') {
      for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].title === arr[arr.length - 1]) {
          for (let j = 0; j < treeData[i].child.length; j++) {
            if (treeData[i].child[j].title === arr[arr.length - 2]) {
              for (let k = 0; k < treeData[i].child[j].child.length; k++) {
                if (treeData[i].child[j].child[k].title === arr[arr.length - 3]) {
                  for (let t = 0; t < treeData[i].child[j].child[k].child.length; t++) {
                    if (treeData[i].child[j].child[k].child[t].title === arr[arr.length - 4]) {
                      for (let m = 0; m < treeData[i].child[j].child[k].child[t].child.length; m++) {
                        if (treeData[i].child[j].child[k].child[t].child[m].title === arr[arr.length - 5]) {
                          treeData[i].child[j].child[k].child[t].child[m].child = data;
                          break
                        }
                      }
                      break;
                    }
                  }
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
    this.setState({
      change: true,
      treeData
    });
  };

  render() {
    const {activeIndex, treeData, content, clinicRecList, patientInfo} = this.state;
    return (  <Tabs activeKey={activeIndex} onChange={this.onChange} className={css.left}>
      <TabPane tab="生命周期" key="1"><Menus data={treeData} activeIndex={activeIndex} content={content}
                                         clinicRecList={clinicRecList}
                                         patientInfo={patientInfo} changeMenu={this.changeMenu}/></TabPane>
      <TabPane tab="时间轴" key="2"><Menus data={treeData} activeIndex={activeIndex} content={content}
                                        clinicRecList={clinicRecList}
                                        patientInfo={patientInfo} changeMenu={this.changeMenu}/></TabPane>
      <TabPane tab="医院诊疗" key="3"><Menus data={treeData} activeIndex={activeIndex} content={content}
                                         clinicRecList={clinicRecList}
                                         patientInfo={patientInfo} changeMenu={this.changeMenu}/></TabPane>
    </Tabs>)
  }
}

