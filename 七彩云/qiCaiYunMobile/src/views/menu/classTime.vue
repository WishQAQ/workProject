<template>
  <div class="classTime">
    <NavTitle :title="'课程时间选择'"></NavTitle>
    <div class="main">
      <div class="title">时间选择</div>
      <div class="main_box">
        <div class="main_list" v-for="(item , index) in list" :key="index">
          <img :src="item.courseImg" alt="">
          <div class="course_name">{{item.username}}</div>
          <el-select v-model="item.index" placeholder="请选择时间" @change="handleChangeSelect(options,item.index-1)">
            <el-option
              v-for="list in options"
              :key="list.value"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
        </div>
      </div>

<!--      <div class="address_click">-->
<!--        <div class="">地区选择：</div>-->
<!--      </div>-->

    </div>

    <div class="courseSubmit" @click="getCourseSubmit()">确认</div>

  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'
  export default {
    name: 'classTime',
    components:{
      NavTitle
    },
    data(){
      return{
        list: [],
        options: [{
          value: '1',
          label: '1月'
        }, {
          value: '2',
          label: '2月'
        }, {
          value: '3',
          label: '3月'
        }, {
          value: '4',
          label: '4月'
        }, {
          value: '5',
          label: '5月'
        },{
          value: '6',
          label: '6月'
        }, {
          value: '7',
          label: '7月'
        }, {
          value: '8',
          label: '8月'
        }, {
          value: '9',
          label: '9月'
        }, {
          value: '10',
          label: '10月'
        }, {
          value: '11',
          label: '11月'
        }, {
          value: '12',
          label: '12月'
        }],
        value: '',
        month: '',

        openId: '',

        courseList: [],
        id: '',
        price: 300,
        phone: '',
        childid: '',
        username: '',
      }
    },
    methods:{
      handleChangeSelect(index,options){
        // // this.month = this.options[index].value
        // console.log(options)
      },
      getCourseSubmit(){
        this.courseList.push(this.list)

        this.$router.push({
          path: '/home/infoInitial',
          query: {
            list: this.courseList
          }
        });

      }
    },
    created(){
      this.list = JSON.parse(localStorage.getItem('course'))
      // console.log()
    },
  }
</script>

<style scoped lang="less">
  .classTime{
    .main{
      padding: .3rem .24rem 0;
      height: calc(100vh - 1.9rem);
      overflow: auto;
      .title{
        font-size: .28rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(246,85,82,1);
        margin-bottom: .5rem;
      }
      .main_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .main_list{
          display: flex;
          align-items: center;
          width: 50%;
          >img{
            width: .4rem;
            height: .4rem;
            object-fit: contain;
            margin-right: .05rem;
          }
          .course_name{
            font-size: .22rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(85,85,85,1);
            width: 1.2rem;
          }
          /deep/.el-select{
            .el-input{
              .el-input__inner{
                width: 2rem;
                height: 0.3rem;
                line-height: .26rem;
                border: .01rem solid rgba(153,153,153,1);
                font-size: .14rem;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(85,85,85,.5);
                padding-right: .3rem;
                &::placeholder{
                  font-size: .14rem;
                  font-family:PingFang-SC-Medium;
                  font-weight:500;
                  color:rgba(85,85,85,.5);
                }
              }
              .el-input__suffix{
                right: .2rem !important;
                .el-input__suffix-inner{
                  .el-select__caret{
                    font-size: .14rem !important;
                    width: .25rem !important;
                    line-height: .26rem !important;
                  }
                }
              }
            }
          }


        }
      }
    }
    .courseSubmit{
      z-index: 99;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.9rem;
      background: #f65552;
      border-radius: unset;
      border: unset;
      font-size: 0.3rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
