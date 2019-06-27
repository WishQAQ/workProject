<template>
  <div class="userInfo">

      <NavTitle ref="navTitle" :title="'个人中心'" :hidden="false" :backUrl="'/'"></NavTitle>

      <div class="userInfo_box">
        <!--用户信息卡片-->
        <div class="userInfo_card">
          <div class="userInfo_info">
            <div class="avatar"><img :src="avatar" alt=""></div>
            <div class="userName">{{userName}}</div>
          </div>

          <div class="userInfo_myBox">
            <div class="my_box course" @click="getMyCourse()">我的课程</div>
            <div class="my_box prize" @click="getMyPrize()">我的奖品</div>
          </div>

        </div>
        <!--信息选项卡-->
        <div class="userInfo_message">
          <div class="message_box" @click="getParentInfo()">
            <div class="title"><img src="../../assets/images/userInfo_basic.png" alt="">个人信息</div>
            <div class="getUrl"></div>
          </div>
          <div class="message_box" @click="getChildInfo()">
            <div class="title"><img src="../../assets/images/userInfo_child.png" alt="">孩子信息</div>
            <div class="getUrl"></div>
          </div>
          <div class="message_box" @click="getCompanyInfo()">
            <div class="title"><img src="../../assets/images/message_address.png" alt="">公司简介</div>
            <div class="getUrl"></div>
          </div>

          <div class="telPhone">联系电话：<a href="tel:18623126246">18623126246</a></div>
<!--          <div class="message_box" @click="getMessageBoard()">-->
<!--            <div class="title"><img src="../../assets/images/userInfo_message.png" alt="">留言</div>-->
<!--            <div class="getUrl"></div>-->
<!--          </div>-->

        </div>

      </div>

  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'
  import FooterNav from '@/components/footerNav'

  export default {
    name: "userInfo",
    components: {
      NavTitle,
      FooterNav
    },
    data(){
      return{
        avatar: '',
        userName: '',

      }
    },
    created(){
      var userMessage = JSON.parse(localStorage.getItem('userInfo'))
      this.avatar = userMessage.headimg
      this.userName = userMessage.nickname
      console.log(this.avatar)
    },
    methods:{

      getMyCourse(){
        // 我的课程
        this.$router.push({
          path: '/home/myCourse',
          query: {}
        });
      },
      getMyPrize(){
        // 我的奖品
        this.$router.push({
          path: '/home/myPrize',
          query: {}
        });
      },
      getParentInfo(){
        // 家长信息
        this.$router.push({
          path: '/home/parentInfo',
          query: {}
        });
      },
      getChildInfo(){
        // 孩子信息
        this.$router.push({
          path: '/home/childInfo',
          query: {}
        });
      },
      getCompanyInfo(){
        // 公司简介
        this.$router.push({
          path: '/home/companyInfo',
          query: {}
        });
      },
      getMessageBoard(){
        // 留言板
        this.$router.push({
          path: '/home/messageBoard',
          query: {}
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .userInfo{
    .userInfo_box{
      padding: 0 .24rem;
      height: calc(100vh - 1.9rem);
      overflow: auto;

      /*用户信息卡片*/
      .userInfo_card{
        width: 100%;
        height: 4rem;
        background:rgba(246,85,82,1);
        box-shadow: 0 -.09rem .15rem .01rem rgba(246, 82, 85, 0.35), 0 .09rem .15rem 0.01rem rgba(246, 82, 85, 0.35);
        border-radius:.1rem;
        margin-bottom: .5rem;
        /*用户头像/昵称*/
        .userInfo_info{
          padding: .46rem .46rem .68rem;
          display: flex;
          align-items: center;
          position: relative;
          &::before{
            content: '';
            height: .02rem;
            width: calc(100% - .48rem);
            display: block;
            position: absolute;
            bottom: 0;
            left: .24rem;
            background:rgba(255,255,255,.2);
          }
          .avatar{
            width:1rem;
            height:1rem;
            border-radius:50%;
            overflow: hidden;
            margin-right: .31rem;
            >img{
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
          }
          .userName{
            font-size: .28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            max-width: 4rem;
          }
        }
        /*课程/奖品*/
        .userInfo_myBox{
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: .42rem;
          .my_box{
            font-size: .24rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
            &::before{
              content: '';
              width: .52rem;
              height: .52rem;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto .1rem;
            }
            &.course{
              &::before{
                background: url("../../assets/images/userinfo_course.png") no-repeat;
                object-fit: contain;
                background-size: 100%;
              }
            }
            &.prize{
              &::before{
                background: url("../../assets/images/userinfo_prize.png") no-repeat;
                object-fit: contain;
                background-size: 100%;
              }
            }
          }
        }
      }

      .userInfo_message{
        .message_box{
          height: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: .01rem solid rgba(85,85,85,.2);
          .title{
            display: inline-flex;
            align-items: center;
            >img{
              width: .44rem;
              height: .44rem;
              object-fit: contain;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              margin-right: .23rem;
            }
            font-size: .24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(85,85,85,1);
          }
          .getUrl{
            background: url("../../assets/images/go_back.png") no-repeat;
            background-size: 100%;
            object-fit: contain;
            width: .5rem;
            height: .5rem;
          }
        }
        .telPhone{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          font-size: .24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(85, 85, 85, 0.5);
          >a{
            font-size: .24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(85, 85, 85, 0.5);

          }
        }
      }
    }
  }
</style>
