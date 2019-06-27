<template>
  <div class="messageBoard">
    <NavTitle :title="'留言板'"></NavTitle>

    <div class="main">
      <div class="main_box" v-bind:class="!userMessage?'qiCaiYun':'user'" v-for="(item , i) in list" :key="i">
        <div class="main_message" v-for="(val , key) in item" :key="key">
          <div v-if="!userMessage" class="avatar"><img :src='qiCaiYunAvatar' alt=""></div>
          <p>{{val.content}}</p>
          <div v-if="userMessage" class="avatar"><img :src='qiCaiYunAvatar' alt=""></div>
        </div>
      </div>

    </div>

    <div class="submit">
      <el-input class="submit-input" v-model="submitMessage"></el-input>
      <div class="submit-button" @click="submitButton"></div>
    </div>

  </div>
</template>

<script>
  const messageList =[
    {content:'测试测试测试测试测试测试测试测试测试测试测试测试测试测试'},
  ];

  import NavTitle from '@/components/navTitle'
  export default {
    name: "messageBoard",
    data(){
      return{
        list: [messageList],
        qiCaiYunAvatar: '../../assets/images/avatar.png',
        submitMessage: '',
        userMessage:true
      }
    },
    components:{
      NavTitle
    },
    methods:{
      submitButton(){
        console.log(this.submitMessage);
        this.submitMessage = '';
        this.list.push(messageList);

      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   let cur = document.querySelectorAll("div[class='main_message']");
      //   console.log(cur);
      //   let curHeight = cur.height;
      //   console.log(curHeight);
      // })
    }
  }
</script>

<style scoped lang="less">
  .messageBoard{
    background: url("../../assets/images/messageBoard_background.png") no-repeat center center;
    background-size: cover;
    object-fit: cover;
    height: 100vh;
    position: relative;
    .main{
      width: 100%;
      height: calc(100vh - 1.9rem);
      overflow: paged-y;
      padding: .5rem .25rem;
      .main_box{
        &:not(:last-child){
          margin-bottom: .56rem;
        }
        .main_message{
          display: flex;
          align-items: flex-start;
          .avatar{
            width: .85rem;
            height: .85rem;
            border-radius:50%;
            overflow: hidden;
            >img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          >p{
            padding: .13rem .24rem;
            background:rgba(246,85,82,1);
            border-radius: .1rem;
            max-width: 5.5rem;
            font-size: .24rem;
            /*font-family:ArialUnicodeMS;*/
            font-weight:400;
            color:rgba(255,255,255,1);
            position: relative;
            text-align: justify;
          }
        }
        &.qiCaiYun{
          .main_message{
            .avatar{
              margin-right: .6rem;
            }
            p::before{
              content: '';
              width: 0;
              height: 0;
              border-top: .2rem solid transparent;
              border-right: .4rem solid rgba(246,85,82,1);
              border-bottom: .2rem solid transparent;
              position: absolute;
              left: -.4rem;
              top: .25rem;
            }
          }
        }
        &.user{
          .main_message{
            justify-content: flex-end;
            .avatar{
              margin-left: .6rem;
            }
            p::after{
              content: '';
              width: 0;
              height: 0;
              border-top: .2rem solid transparent;
              border-left: .4rem solid rgba(246,85,82,1);
              border-bottom: .2rem solid transparent;
              position: absolute;
              right: -.4rem;
              top: .25rem;
            }
          }
        }
      }
    }
    .submit{
      z-index: 999;
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: .9rem;
      background:rgba(246,85,82,1);
      padding: .15rem .23rem .15rem .46rem;
      .submit-input{
        width: unset;
        flex: 1;
        /deep/.el-input__inner{
          height: .6rem;
          background:rgba(255,255,255,1);
          border-radius: .1rem;
          border: unset;
        }
      }
      .submit-button{
        margin-left: .1rem;
        background: url("../../assets/images/message_submit.png") no-repeat center center;
        background-size: .44rem .44rem;
        width: .6rem;
        height: .6rem;

      }
    }
  }
</style>
