<template>
  <div class="footerNav" v-if="navHide">
    <div class="navBtm signUp"  @click="getIndex()">
      <span v-if="iconClick" class="iconClick"></span>
      <span v-else class="icon"></span>
      <span :style="iconClick?'color:#F65552':'color:#999'">报名</span>
    </div>
    <div class="navBtm userInfo" @click="getUserInfo()">
      <span v-if="!iconClick" class="iconClick"></span>
      <span v-else class="icon"></span>

      <span :style="!iconClick?'color:#F65552':'color:#999'">我的</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footerNav",
    data(){
      return{
        iconClick: true,
      }
    },
    props: {
      navHide: {
        type: Boolean,
        default: () => true
      }
    },
    methods:{
      getUserInfo() {
        this.$router.push({
          path: '/home/userInfo',
          query: {}
        });
        this.iconClick = false
      },
      getIndex(){
        this.$router.push({
          path: '/home/index',
          query: {}
        });
        this.iconClick = true
      }
    }
  }
</script>

<style scoped lang="less">
  .com-flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footerNav{
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: .90rem;
    background:rgba(245,245,245,1);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .navBtm{
      font-size: .2rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      &.signUp{
        color:rgba(246,85,82,1);
        .icon{
          background: url("../assets/images/nav_siginUp.png") no-repeat;
          background-size: 100%;
        }
        .iconClick{
          background: url("../assets/images/nav_siginUp_click.png") no-repeat;
          background-size: 100%;
        }
      }
      &.userInfo{
        color:rgba(153,153,153,1);
        .icon{
          background: url("../assets/images/nav_userInfo.png") no-repeat;
          background-size: 100%;
        }
        .iconClick{
          background: url("../assets/images/nav_userInfo_click.png") no-repeat;
          background-size: 100%;
        }
      }
      .icon,.iconClick{
        .com-flex;
        width: .4rem;
        height: .4rem;
        object-fit: contain;
      }
    }
  }
</style>
