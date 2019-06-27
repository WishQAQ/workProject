import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default {
  created () {
    if (this.$route.query.code) {//如果连接中能拿到code说明此时access_token没有或者已过期，需要重新获取token
      let obj = {};
      var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx93702596c4a16d03&secret=SECRET&code='+ this.$route.query.code +'&grant_type=authorization_code' ;
      this.$get(url).then(res => {
        if (res.data.retCode == 200) {

          console.log(res)

          //因为浏览器刷新vuex的值就初始化了，所以需要存到浏览器中
          sessionStorage.setItem('wechataccess_token', res.data.data.access_token);
          sessionStorage.setItem('wechatuser_userName', res.data.data.userName);
          sessionStorage.setItem('wechatuser_id', res.data.data.user_id);

          let url = sessionStorage.getItem("beforeUrl");
          //跳转
          this.$router.push(url);
        } else {
          this.Toast(res.data.message);
        }
      })
    }
  },
}

