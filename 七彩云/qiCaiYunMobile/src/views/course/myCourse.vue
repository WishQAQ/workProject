<template>
  <div class="myCourse">
    <NavTitle :title="'我的课程'"></NavTitle>

    <div class="main" v-loading="loading">
      <div class="main_box course">
        <div class="title">
          <span class="title_icon"><img src="../../assets/images/course_icon.png" alt=""></span>
          已报名的课程
        </div>

        <div class="main_content" v-for="(item , index) in childrenMessage" :key="index">

          <div class="content_box">
            <div class="course_list" v-for="(item1 , i) in courseList" :key="i">
              <div class="lab_icon"><img :src="item1.courseImg"  alt=""></div>
              <div class="lab_name">{{item1.courseName}}</div>
              <div class="lab_time">{{item1.studyTime}}月</div>
            </div>

          </div>

          <div class="content_message">
            <p>报名孩子：{{item.childrenName}}</p>
            <p>报名时间：{{item.courseList[0].creationTime}}</p>
          </div>

        </div>

      </div>

      <div class="main_box summerCamp">
        <div class="title">
          <span class="title_icon"><img src="../../assets/images/summerCamp_icon.png" alt=""></span>
          已报名的夏令营
        </div>

        <div class="main_content" v-for="(item2 , e) in campList" :key="e">
          <div class="content_message">
            <div class="summerCamp_box">
              <div class="summerCamp_photo">
                <img :src="item2.campBanner" alt="">
              </div>
              <div class="summerCamp_message">
                <div class="summerCamp_name">{{item2.campName}}</div>
                <div class="summerCamp_time">活动时间：{{item2.xuexiTime}}</div>
                <div class="summerCamp_childName">报名孩子：{{item2.childrenName}}</div>
              </div>
            </div>
            <div class="summerCamp_price">价格：&yen; {{item2.price}}</div>
          </div>

          <div class="summerCamp_signUp">报名时间：{{item2.creationTime}}</div>
        </div>

      </div>


    </div>


  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'
  export default {
    name: "myCourse",
    components:{
      NavTitle
    },
    data(){
      return{
        childrenMessage: [], // 孩子信息
        courseList: [],  // 课程
        campList: [], // 夏令营
        courseTime: '', // 订单时间
        loading: true,
        userID: ''
      }
    },
    methods: {
      getMyCourse(){
        this.$http.get('/parent/queryCourseAndCampList.action?id='+this.userID)
          .then(res =>{
            if(res.data.code === 20000){
              this.loading = false
              this.childrenMessage = res.data.data.courseChildrenList
              this.childrenMessage.forEach(item => {
                this.courseList = item.courseList
                this.courseTime = this.courseList[0].creationTime
              })
              this.campList = res.data.data.campList
            }
          })
      }
    },
    created () {
      var userMessage = JSON.parse(localStorage.getItem('userInfo'))
      this.userID = userMessage.id
      this.getMyCourse()
    }
  }
</script>

<style scoped lang="less">
  .myCourse{
    .main{
      height: calc(100vh - 1.9rem);
      width: 100%;
      padding: .5rem .24rem;
      overflow: auto;
      .main_box{
        .title{
          display: flex;
          align-items: center;
          font-size: .24rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(85,85,85,1);
          margin-bottom: .25rem;
          .title_icon{
            width: .5rem;
            height: .5rem;
            margin-right: .05rem;
            >img{
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
        .main_content{
          background:rgba(246,85,82,1);
          box-shadow:0px -.09rem .15rem .01rem rgba(246, 82, 85, 0.35), 0px .09rem .15rem .01rem rgba(246, 82, 85, 0.35);
          border-radius: .1rem;
          height: 4rem;
          width: 100%;
        }

        /*课程*/
        &.course{
          margin-bottom: .9rem;
          .main_content{
            padding: .25rem;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            text-align: center;
            &:not(:last-child){
              margin-bottom: 0.4rem;
            }
            .content_box{
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              height: 2.9rem;
              overflow: auto;
              .course_list{
                &:not(:nth-child(5n)){
                  margin-right: .8rem;
                }
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow-y: auto;
                overflow-x: unset;
                margin-bottom: .2rem;


                .lab_icon{
                    width: .35rem;
                    height: .35rem;
                    >img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                    }
                  }
                  .lab_name{
                    font-size: .16rem;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    margin: .05rem 0 .02rem;
                  }
                  .lab_time{
                    width: .5rem;
                    height: .16rem;
                    background:rgba(255,255,255,1);
                    border-radius: .08rem;
                    font-size: .12rem;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(246,85,82,1);
                  }
              }
            }
            .content_message{
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: .2rem;
              font-family:PingFang-SC-Bold;
              font-weight:bold;
              color:rgba(255,255,255,1);
              margin-top: .3rem;
            }


          }
        }

        /*夏令营*/
        &.summerCamp{
          .main_content{
            padding: .45rem .25rem .25rem .45rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &:not(:last-child){
              margin-bottom: .4rem;
            }
            .content_message{
              .summerCamp_box{
                display: flex;
                align-items: center;
                .summerCamp_photo{
                  width:3.34rem;
                  height:2.22rem;
                  background:rgba(255,255,255,1);
                  border-radius:.1rem;
                  padding: .07rem;
                  >img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius:.1rem;
                  }
                }
                .summerCamp_message{
                  margin-left: .39rem;
                  text-align: center;
                  font-family:PingFang-SC-Bold;
                  font-weight:bold;
                  color:rgba(255,255,255,1);
                  .summerCamp_name{
                    font-size: .24rem;
                    margin-bottom: .29rem;
                  }
                  .summerCamp_time{
                    font-size: .2rem;
                    margin-bottom: .23rem;
                  }
                  .summerCamp_childName{
                    font-size: .2rem;
                  }
                }
              }
              .summerCamp_price{
                font-size: .24rem;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(255,255,255,1);
                margin-top: .15rem;
                padding-left: .8rem;
              }
            }

            .summerCamp_signUp{
              font-size: .2rem;
              font-family:PingFang-SC-Bold;
              font-weight:bold;
              color:rgba(255,255,255,1);
              text-align: right;
            }
          }


        }
      }
    }

  }
</style>
