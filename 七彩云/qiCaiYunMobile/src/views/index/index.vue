<template>
  <div class="index">
    <div class="getElectiveCourse" @click="getCourseMenu()">
      <span></span>
    </div>

  </div>
</template>

<script>
  import FooterNav from '@/components/footerNav'
  export default {
    name: "index",

    components:{
      FooterNav
    },
    created(){

    },


    methods: {
      getCourseMenu(){
        this.$router.push({
          path: '/home/courseMenu',
          query: {}
        });
      },
    },

  }
</script>

<style scoped lang="less">
  .com-flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .index{
    background: url("../../assets/images/start_background.png") no-repeat center center;
    background-size: cover;
    object-fit: cover;
    height: 100vh;
    position: relative;

    /*前往选课*/
    .getElectiveCourse{
      .com-flex;
      position: absolute;
      right: .88rem;
      top: 2rem;
      width: 1.7rem;
      height: 1.7rem;
      &::after{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width:1.7rem;
        height:1.7rem;
        margin-left: -.85rem;
        margin-top: -.85rem;
        border-radius:50%;
        opacity: .2;
        background: #f65552;
      }
      &::before{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -.59rem;
        margin-top: -.59rem;
        width:1.18rem;
        height:1.18rem;
        border-radius:50%;
        opacity: .5;
        background: #f65552;
      }
      >span{
        font-size: .36rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        position: relative;
        &::before{
          content: '前往选课';
          z-index: 10;
          position: relative;
        }
        &::after{
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -.34rem;
          margin-top: -.34rem;
          width: .68rem;
          height: .68rem;
          background: #f65552;
          opacity:0.4;
          border-radius:50%;
        }
      }
    }


  }
</style>
