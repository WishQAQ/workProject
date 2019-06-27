<template>
  <div class="companyInfo">
    <NavTitle :title="'公司简介'"></NavTitle>
    <div class="main">
      <img src="../../assets/images/companyInfo.png" alt="">
    </div>

  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'

  export default {
    name: 'companyInfo',
    components: {
      NavTitle
    }
  }
</script>

<style scoped lang="less">
  .companyInfo{
    .main{
      height: calc(100vh - 1.9rem);
      overflow: auto;
      >img{
        width: 100%;
      }
    }
  }
</style>
