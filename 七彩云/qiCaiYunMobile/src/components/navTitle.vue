<template>
  <div class="navTitle">
    <div @click="goBack()" class="goBack" v-if="hidden"></div>
    <div class="title" :style="{color:titleColor}">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: "navTitle",
    data(){
      return{

      }
    },
    props:{
      title: {
        type: String,
        default: () => ''
      },
      titleColor: {
        type: String,
        default: () => 'rgba(85,85,85,1);'
      },
      hidden: {
        type: Boolean,
        default: () => true
      }
    },
    methods: {
      goBack(){
        if (window.history.length <= 1) {
          this.$router.push({path:'/'})
          return false
        } else {
          this.$router.go(-1)
        }
      },

    }

  }
</script>

<style scoped lang="less">
  .navTitle{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 1rem;
    .goBack{
      background: url("../assets/images/go_back.png") no-repeat;
      background-size: 100%;
      transform: rotate(180deg);
      width: .5rem;
      height: .5rem;
      object-fit: contain;
      position: absolute;
      left: .24rem;
    }
    .title{
      font-size: .28rem;
      font-family:PingFang-SC-Bold;
      font-weight: 400;
    }
  }
</style>
