<template>
  <div class="parentInfoInitial">
    <NavTitle :title="'家长基本信息'"></NavTitle>
    <!--家长信息-未收录-->
    <div class="main">
      <div class="title"><p>家长基本信息</p></div>
      <form class="form">
        <div class="input userName">
          <img class="icon" src="../../assets/images/message_id.png" alt="">
          <el-input
            v-model="username"
            placeholder="请输入家长的姓名"
          ></el-input>
        </div>
        <div class="input telPhone">
          <div class="phone">
            <img class="icon" src="../../assets/images/message_phone.png" alt="">
            <el-input
              type="number"
              v-model="phone"
              placeholder="请输入您的电话"
            ></el-input>
          </div>
          <div class="mobilePhone">
            <img class="icon" src="../../assets/images/message_phone.png" alt="">
            <el-input
              type="number"
              v-model="sparephone"
              placeholder="请输入您的电话"
            ></el-input>
          </div>
        </div>
        <div class="input address">
          <img class="icon" src="../../assets/images/message_address.png" alt="">
          <el-input
            v-model="address"
            placeholder="请输入家庭详细地址"
          ></el-input>
        </div>
      </form>


    </div>
    <span class="line"></span>

    <div class="main">
      <div class="title">
        <p>孩子基本信息</p>
        <div class="addMessage" v-if="addBtm" @click="addChild()">添加</div>
        <div class="addMessage" v-else @click="closeChild()">取消</div>
      </div>

      <div class="childList" v-if="childListShow">
        <el-radio-group v-model="radio">
          <el-radio
            v-for="(radioList , a) in childList"
            :key="a"
            :label="radioList.id"
            @change="handleChangeRadio(a,childList)"
          >{{radioList.children_name}}</el-radio>
        </el-radio-group>
      </div>

      <form class="form" v-if="show">
        <div class="input childName">
          <img class="icon" src="../../assets/images/child_name.png" alt="">
          {{this.childName}}
        </div>
        <div class="input childMessage">
          <div class="age">
            <img class="icon" src="../../assets/images/child_age.png" alt="">
            {{this.childAge}}
          </div>
          <div class="sex">
            <div v-if="childSex === '男'"><img src="../../assets/images/male.png" alt="">男</div>
            <div v-else><img src="../../assets/images/female.png" alt="">女</div>
          </div>
        </div>
        <div class="input userId">
          <img class="icon" src="../../assets/images/message_id.png" alt="">
          {{this.childId}}
        </div>
        <div class="input address">
          <img class="icon" src="../../assets/images/child_school.png" alt="">
          {{this.school}}
        </div>

      </form>


      <form class="form" v-if="hidden">
        <div class="input childName">
          <img class="icon" src="../../assets/images/child_name.png" alt="">
          <el-input
            v-model="childName"
            placeholder="请输入孩子的姓名"
          ></el-input>
        </div>
        <div class="input childMessage">
          <div class="age">
            <img class="icon" src="../../assets/images/child_age.png" alt="">
            <el-input
              type="number"
              v-model="childAge"
              placeholder="请输入孩子的年龄"
            ></el-input>
          </div>
          <div class="sex">
            <el-radio v-model="childSex" label="1"><img src="../../assets/images/male.png" alt="">男</el-radio>
            <el-radio class="female" v-model="childSex" label="2"><img src="../../assets/images/female.png" alt="">女</el-radio>
          </div>
        </div>
        <div class="input userId">
          <img class="icon" src="../../assets/images/message_id.png" alt="">
          <el-input
            v-model="childId"
            type="number"
            placeholder="请输入孩子的身份证号码信息"
          ></el-input>
        </div>
        <div class="input address">
          <img class="icon" src="../../assets/images/child_school.png" alt="">
          <el-input
            v-model="school"
            placeholder="请输入孩子的学校名称"
          ></el-input>
        </div>

      </form>


    </div>

    <div class="prize_box" v-if="prizeShow">
      <div class="prize_content">
        <div class="prize_title">您的优惠券 <span @click="prizeShow =false">X</span></div>

        <div class="prize_list">
          <el-radio-group v-model="radio">
            <el-radio @change="handleRadio(q,a)" v-for="(q , a) in myPrizeList" :key="a" :label="q.id">{{q.prizeName}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <el-button @click="submitMessage" v-loading="loading" type="submit" class="submit">支付 &yen;{{this.price - this.prizeNum}} <span v-if="this.prizeNum > 0"> 已优惠&yen;{{this.prizeNum}}元</span></el-button>


  </div>
</template>

<script>
  import wx from "weixin-js-sdk";
  import NavTitle from '@/components/navTitle'

  export default {
    name: "parentInfoInitial",
    data (){
      return {
        prizeShow: false,
        firstMessage: true,
        show: false,
        hidden: false,
        childListShow: true,
        addBtm: true,
        childList: [],

        loading: false,

        radio: '',
        username: '',
        phone: '',
        mobilePhone: '',
        address: '',
        childName: '',
        childAge: '',
        childSex: '',
        childId: '', // 孩子身份证
        school: '',
        openId: '',
        price: 300,
        userId: '',
        sparephone: '',
        childID:  '', // 孩子ID
        packageId: '', //微信支付

        myPrizeList: [],
        prizeNum: 0,
        prizeId: ''
      }
    },
    components:{
      NavTitle
    },
    methods: {
      submitMessage(){

        var that = this

        let formData = new FormData();
        formData.append('openid', this.openId);
        formData.append('price', this.price - this.prizeNum); // 价钱
        formData.append('course', JSON.stringify(this.$route.query.list[0]));  // 课程
        formData.append('parentid', this.userId);  // 用户ID
        formData.append('parentname', this.userName);   // 用户名称
        formData.append('childid', this.childID);  // 孩子ID
        formData.append('phone', this.phone);  // 电话
        formData.append('sparephone', this.sparephone);  // 备用电话
        formData.append('childname', this.childName); // 孩子名称
        formData.append('age', this.childAge);  // 孩子年龄
        formData.append('sex', this.childSex);  // 孩子性别
        formData.append('idcard', this.childId);  // 孩子身份证
        formData.append('school', this.school);   // 孩子学校
        formData.append('address', this.address);  // 家庭地址
        formData.append('wt_id', this.prizeId);  // 奖券ID

        if(this.childName !== '' &&
          this.phone !== '' &&
          this.userName !== '' &&
          this.sparephone !== '' &&
          this.childAge !== '' &&
          this.childSex !== '' &&
          this.childId !== '' &&
          this.school !== '' &&
          this.address !== ''
        ){
          this.$http.post('/wxPayment/wxPayCourse.action',formData)
            .then(res =>{
              this.packageId = res.data.data.package
              if(res.data.code === 20000) {
                this.loading = true

                var wxList = res.data.data

                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId":wxList.appid,     //公众号名称，由商户传入
                    "timeStamp":wxList.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": wxList.nonceStr, //随机串
                    "package": wxList.package,
                    "signType":"MD5",         //微信签名方式：
                    "paySign":wxList.paySign //微信签名
                  },
                  function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

                      let formData = new FormData();
                      formData.append('openid', that.openId);
                      formData.append('price', that.price - this.prizeNum); // 价钱
                      formData.append('course', JSON.stringify(that.$route.query.list[0]));  // 课程
                      formData.append('parentid', that.userId);  // 用户ID
                      formData.append('parentname', that.userName);   // 用户名称
                      formData.append('childid', that.childID);  // 孩子ID
                      formData.append('phone', that.phone);  // 电话
                      formData.append('sparephone', that.sparephone);  // 备用电话
                      formData.append('childname', that.childName); // 孩子名称
                      formData.append('age', that.childAge);  // 孩子年龄
                      formData.append('sex', that.childSex);  // 孩子性别
                      formData.append('idcard', that.childId);  // 孩子身份证
                      formData.append('school', that.school);   // 孩子学校
                      formData.append('address', that.address);  // 家庭地址
                      formData.append('wt_id', that.prizeId);  // 奖券ID

                      that.$http.post('/addCourseDan.action',formData)
                        .then(res =>{
                          if(res.data.code === 20000){
                            that.$message({
                              message: '支付成功',
                              type: 'success'
                            });

                            that.$router.push({
                              path: '/home/luckyWheel',
                              query: {}
                            });

                          } else {
                            that.loading = false
                            that.$message({
                              message: '支付失败',
                              type: 'warning'
                            });
                          }


                        })



                    } else {
                      that.loading = false
                      that.$message({
                        message: '支付失败',
                        type: 'warning'
                      });
                    }
                  });
              } else {
                this.loading = false
                this.$message({
                  message: '支付失败',
                  type: 'warning'
                });
              }
            })
        }else {
          this.$message({
            message: '请完成您的全部信息',
            type: 'warning'
          });
        }

      },

      getPrize(){
        this.$http.get('/prize/selectUserPrize.action?userId='+this.userId)
          .then(res =>{
            console.log(res)
            this.myPrizeList = res.data.data.myPrizeList
            if(this.myPrizeList.length>=1){
              this.prizeShow = true
            }
          })
      },


      handleRadio(item,index){
        this.prizeShow = false
        console.log(item)
        this.prizeId = item.id
        this.prizeNum = item.prizeNum
      },

      handleChangeRadio(index,item){
        this.show = true
        this.hidden = false
        console.log(item[index])
        var childMessage = item[index]
        this.childAge = childMessage.children_age
        this.childName = childMessage.children_name
        this.school = childMessage.children_school
        this.childSex = childMessage.children_sex
        this.childId = childMessage.children_card
      },

      addChild(){
        this.childListShow = false
        this.addBtm = false
        this.show = false
        this.hidden = true
        this.radio = ''
        this.childAge = ''
        this.childName = ''
        this.school = ''
        this.childSex = ''
        this.childId =''
      },

      closeChild(){
        this.childListShow = true
        this.addBtm = true
        this.show = false
        this.hidden = false
        this.radio = ''
        this.childAge = ''
        this.childName = ''
        this.school = ''
        this.childSex = ''
        this.childId =''
      },

      getChildInfo(){
        this.$http.get('/children/queryChildrenAndUserById.action?userId='+this.userId)
          .then(res =>{
            console.log(res)
            this.childList = res.data.data.childrenList
          })
      }

    },
    created() {
      var userMessage = JSON.parse(localStorage.getItem('userInfo'))
      this.openId = userMessage.wxNumber
      this.userId = userMessage.id
      this.phone = userMessage.phone
      this.sparephone = userMessage.sparePhone
      this.username = userMessage.parentName
      this.address = userMessage.homeAddress
      this.getChildInfo()
      this.getPrize()
    },
  }
</script>

<style scoped lang="less">
  .parentInfoInitial{
    .main{
      padding: .3rem .48rem .5rem;
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
          display: flex;
          align-items: center;
          font-size: .24rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(85,85,85,1);
          &::before{
            content: '';
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: .44rem;
            height: .44rem;
            background: url("../../assets/images/userInfo_basic.png") no-repeat;
            background-size: contain;
            object-fit: contain;
            margin-right: .25rem;
          }
        }
        .addMessage{
          font-size: .16rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(85,85,85,1);
          display: flex;
          align-items: center;
          &::before{
            content: '';
            background: url("../../assets/images/addMessage.png") no-repeat center center;
            background-size: 100%;
            object-fit: contain;
            width: .18rem;
            height: .18rem;
            display: flex;
            margin-right: .1rem;
          }
        }
      }
      .childList{
        margin: .3rem 0 .1rem;
        /deep/.el-radio-group{
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          width: 100%;
          overflow: auto;
        }
      }
      .form{
        .input{
          margin-top: .1rem;
          display: flex;
          align-items: flex-end;
          height: .7rem;
          font-size: .25rem;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(85,85,85,1);
          .phone,.mobilePhone,.age{
            display: flex;
            align-items: flex-end;
            flex: 1;
          }
          .icon{
            width: .44rem;
            height: .44rem;
            object-fit: contain;
            margin-right: .25rem;
          }
          /deep/.el-input{
            border-bottom: .01rem solid rgba(153,153,153,.5);
            .el-input__inner{
              border: none;
              background: transparent;
              height: .5rem;
              line-height: .5rem;
              font-size: .18rem;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(85,85,85,1);
              &::placeholder{
                text-align: right;
                font-size: .16rem;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(85,85,85,.5);
              }
            }
          }
          &.childMessage{
            .sex{
              display: flex;
              align-items: center;

              margin-left: .3rem;
              >div{
                display: flex;
                align-items: center;
              }
              img{
                display: flex;
                align-items: center;
                justify-content: center;
                width: .21rem;
                height: .33rem;
                object-fit: contain;
                flex-shrink:0
              }
              /deep/.el-radio{
                display: flex;
                align-items: center;
                .el-radio__label{
                  display: flex;
                  align-items: center;
                  padding: unset;
                  font-size: .2rem;
                  font-family:PingFang-SC-Medium;
                  font-weight:500;
                  color:rgba(85,85,85,1);
                }
              }
              .female.is-checked{
                /deep/.el-radio__input.is-checked{
                  .el-radio__inner{
                    border-color: #F65552;
                    background: #F65552;
                  }
                }
                /deep/.el-radio__label{
                  color: #F65552;
                }
              }
            }
          }
        }

      }
    }
    .line{
      height: .5rem;
      width: 100%;
      display: block;
      background: RGBA(245, 245, 245, 1);
    }
    .submit{
      z-index: 99;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: .9rem;
      background:rgba(246,85,82,1);
      border-radius: unset;
      border: unset;
      font-size: .30rem;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }


    .prize_box{
      position: absolute;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;

      .prize_content{
        width: 80%;
        height: 50%;
        background-color: #fff;
        padding: .5rem .2rem;
        .prize_title{
          text-align: center;
          font-size: .4rem;
          margin-bottom: .5rem;
          position: relative;
          span{
            display: inline-block;
            position: absolute;
            right: .2rem;
            top: -.2rem;
            font-size: .2rem;
            color: rgba(0,0,0,.8);
          }
        }
        .prize_list{
          height: 80%;
          overflow: auto;
          /deep/.el-radio-group{
            width: 100%;
            height: 100%;
            .el-radio{
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: .3rem;
              margin-right: unset;
            }
          }
        }
      }
    }


  }
</style>
