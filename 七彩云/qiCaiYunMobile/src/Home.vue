<template>
  <div class="home">
    <router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
  import FooterNav from '@/components/footerNav'
  export default {
    name: "Home",
    components: {
      FooterNav
    },
    created () {
      // console.log(this.getStatus(this.$route.path))

    },
    watch: {
      '$route' (to, from) {
        // console.log(this.getStatus(this.$route.path))
      }
    },
    methods: {
      getStatus (urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      }
    },
  }
</script>

<style scoped lang="less">
  .home{
    background: #fff;
  }
</style>
