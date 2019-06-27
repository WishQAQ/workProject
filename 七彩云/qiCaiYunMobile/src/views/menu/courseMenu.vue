<template>
  <div class="courseMenu" v-loading="loading">
    <NavTitle :title="menuClick === 1?'课程选择':menuClick === 2?'夏令营选择':menuClick === 3?'课程详情':''"></NavTitle>
    <div class="main">
      <div class="banner" v-if="menuClick === 1 || menuClick === 3"></div>
      <div class="banner summerCamp" v-if="menuClick === 2"></div>

      <div class="main_menu">
        <div
          class="menu_button"
          v-bind:class="menuClick===1||menuClick===3?'courseClick':''"
          @click="openCourse()"
        >课程选择</div>
        <div
          class="menu_button"
          v-bind:class="menuClick===2?'courseClick':''"
          @click="openSummerCamp()"
        >夏令营选择</div>
      </div>

      <CourseSelect
        v-on:yundongValue="yundongValue"
        v-on:childByValue="childByValue"
        ref="select"
        v-if="menuClick===1"
        :getCourse="courseList"
      ></CourseSelect>

      <div class="courseImg" v-if="menuClick===3">
        <img src="../../assets/images/WechatIMG49.png" alt="">
      </div>


      <SummerCampSelect v-loading="campLoading" v-if="menuClick===2" :getCamp="campList"></SummerCampSelect>

    </div>

    <div v-if="menuClick ===3" class="courseMenuSubmit" @click="menuClick =1">开始选择课程</div>
    <div v-if="menuClick ===1" class="courseMenuSubmit" @click="getCourseSubmit()">提交选中课程</div>

  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'
  import CourseSelect from '@/views/menu/courseSelect'
  import SummerCampSelect from '@/views/menu/summerCampSelect'

  export default {
    name: "courseMenu",
    components:{
      NavTitle,
      CourseSelect,
      SummerCampSelect
    },
    data(){
      return{
        menuClick: 0,
        childVal: '',
        courseList: [],
        campList: [],
        loading: true,
        campLoading: true,
        childId: '',
        yundongNum: ''
      }
    },
    methods:{
      openCourse(){
        this.menuClick = 3
      },
      yundongValue: function (val) {
        this.yundongNum = val
      },
      openSummerCamp(){
        this.menuClick = 2;
        this.$http.get('/camp/queryCampList.action')
          .then(res=>{
            if(res.code = 20000){
              this.campLoading = false
              this.menuClick= 2
              this.campList = res.data.data.campList
              console.log(this.campList)
            }
          })
      },
      childByValue(childValue) {
        this.childVal = childValue;
        console.log(this.childVal);
      },
      getCourseSubmit(){
        var yundongNum = 0
        this.childVal.map(item=>{
          if(item.courseTypeId === 6){
            yundongNum++
            this.yundongNum = yundongNum
            console.log(this.yundongNum)
          }
        })


        if(this.childVal['1'] === ''||this.childVal === ''){
          this.$message({
            message: '请选中课程已完成支付',
            type: 'warning'
          });
        }else if(this.yundongNum >= 2){
          this.$message({
            message: '运动课程只允许选择一个哦',
            type: 'warning',
          });
        }else {
          this.$router.push({
            path: '/home/classTime',
            query: {
              name: 'classTime',
              course: this.courseList,
              checkCourse: this.childVal
            },
          });
          localStorage.setItem('course',JSON.stringify(this.childVal))

          this.$message({
            message: '正在跳转',
            type: 'success',
          });
        }
      },
    },
    created () {
        this.$http.get('/course/queryCourseTypeAndCourseList.action')
          .then(res=>{
            if(res.code = 20000){
              this.loading= false
              this.menuClick= 3
              this.courseList = res.data.data.courseTypeList
              console.log(this.courseList)
            }
          })
    }
  }
</script>

<style scoped lang="less">
  .courseMenu{
    .main{
      height: calc(100vh - 1.9rem);
      overflow: auto;
      /*padding-bottom: .5rem;*/
      .banner{
        background: url("../../assets/images/61background.jpeg") no-repeat center center;
        background-size: cover;
        height: 4.7rem;
        &.summerCamp{
          background: url("../../assets/images/summerCamp_banner.png") no-repeat center center;
          background-size: cover;
        }
      }

      .main_menu{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: .28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(85,85,85,1);
        margin: .32rem 0 .45rem;
        .menu_button{
          display: flex;
          justify-content: center;
          align-items: center;
          height: .40rem;
          border-radius: .1rem;
          padding: 0 .16rem;
          &.courseClick{
            background:rgba(247,85,82,1);
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
        }
      }


      .courseImg{
        width: 100%;
        >img{
          width: 100%;
          display: block;
        }
      }

    }
    .courseMenuSubmit{
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
