<template>
  <div class="myPrize">
    <NavTitle :title="'我的奖品'"></NavTitle>
    <div class="main">
      <div class="myPrize_banner"></div>
      <div class="main_box">
        <div class="myPrize_title">中奖记录</div>
        <div class="myPrize_list" v-for="(item , index) in prizeList" :key="index">
          <div class="mask" v-if="item.receive !== 0"></div>
          <div class="cover">
            <img :src="item.prizeImg" alt="">
          </div>
          <div class="message">
            <div class="message_name">{{item.prizeName}}</div>
            <div class="message_userName">{{item.userName }}</div>
<!--            <div class="message_id">中奖ID：204112145</div>-->
          </div>

          <div class="getPrize" v-if="item.receive === 0 && item.prizeType === 0">立即领取</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'

  export default {
    name: "myPrize",
    components:{
      NavTitle
    },
    data(){
      return{
        prizeList: [],
        userName: '',
        userId: ''
      }
    },
    methods:{
      getMyPrize(){
        this.$http.get('/prize/queryWtPrizeIdList.action?userId='+this.userId)
          .then(res =>{
            if(res.data.code === 20000){
              this.prizeList = res.data.data.myPrizeList


            }
            console.log(this.prizeList)
          })
      }
    },
    created () {
      var userMessage = JSON.parse(localStorage.getItem('userInfo'))
      this.userId = userMessage.id
      this.userName = userMessage.nickname
      this.getMyPrize()
    }
  }
</script>

<style scoped lang="less">
  .myPrize{
    .main{
      height: calc(100vh - 1.9rem);
      overflow: auto;
      padding-bottom: .5rem;
      .myPrize_banner{
        background: url("../../assets/images/myPrize_banner.png") no-repeat center center;
        background-size: cover;
        width: 100%;
        height: 5rem;
        margin-bottom: .6rem;
      }
      .main_box{
        padding: 0 .25rem;
        .myPrize_title{
          font-size: .3rem;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(214,0,1,1);
          margin-bottom: .3rem;
        }
        .myPrize_list{
          background:rgba(216,0,1,1);
          box-shadow:0px -.09rem .15rem .01rem rgba(246, 82, 85, 0.35), 0px .09rem .15rem .01rem rgba(246, 82, 85, 0.35);
          border-radius: .1rem;
          min-height: 3rem;
          width: 100%;
          padding: .3rem;
          display: flex;
          position: relative;
          &:not(:last-child){
            margin-bottom: .5rem;
          }
          .mask{
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            position: absolute;
            background: rgba(0,0,0,.5);
            box-shadow:0px -.09rem .15rem .01rem rgba(0, 0, 0, 0.35), 0px .09rem .15rem .01rem rgba(0, 0, 0, 0.35);
            border-radius: .1rem;
            z-index: 9;
            display: flex;
            justify-content: center;
            align-items: center;
            &::before{
              content: '已使用';
              font-size: .8rem;
              color: #fff;
            }
          }
          .cover{
            width: 2rem;
            height: 2rem;
            margin-right: .3rem;
            >img{
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .message{
            height: 1.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
            .message_name{
              font-size:.3rem;
            }
            .message_userName{
              font-size: .3rem;
            }
            .message_id{
              font-size: .24rem;
              font-weight:500;
            }
          }
          .getPrize{
            position: absolute;
            right: 0;
            bottom: 0;
            height: .48rem;
            background:rgba(246,85,82,1);
            border-radius: .1rem;
            padding: 0 .44rem;
            font-size: .24rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

    }

  }
</style>
