<template>
  <div class="summerCamp">
    <NavTitle :title="'夏令营'"></NavTitle>
    <div class="summerImg">
      <img :src="img " alt="">
    </div>

    <div class="submit" @click="submitSummer()">确定</div>

  </div>
</template>

<script>

  import NavTitle from '@/components/navTitle'

  export default {
    name: 'summerCamp',
    data(){
      return{
        img: localStorage.getItem('campImg'),
      }
    },
    components:{
      NavTitle
    },
    methods:{
      submitSummer(){
        this.$router.push({
          path: '/home/campInfo',
          query: {
            list:this.$route.query.list
          }
        });

      }
    },
    created () {
      // this.loaclImg = localStorage.getItem('campImg')
    }
  }
</script>

<style scoped lang="less">
  .summerCamp{
    .summerImg{
      width: 100%;
      height: calc(100vh - 1.9rem);
      overflow: auto;
      >img{
        width: 100%;
      }
    }
    .submit{
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
