<template>
  <div class="summerCampSelect">
    <div class="main" v-for="(item , index) in getCamp" :key="index" @click="getCampList(item,index)">
      <div class="cover">
        <img :src="item.campBanner" alt="">
        <span class="summerCampPrice">&yen; {{item.price}}</span>
      </div>
      <div class="message">
        <div class="message_content">
          <div class="title"><span>{{item.campName}}</span><span class="red">已购{{item.ygNums}}人数</span></div>
          <div class="content">{{item.campIntroduce}}</div>
        </div>
        <div class="message_box">
          <div class="time">
            <p>第一期：{{item.campTime.split(',')[0]}}</p>
            <p>第二期：{{item.campTime.split(',')[1]}}</p>
          </div>
          <div class="more">更多详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "summerCampSelect",
    props:['getCamp'],
    data(){
      return{
        num: [],
      }
    },
    methods:{
      getCampList(item){
        this.$router.push({
          path: '/home/summerCamp',
          query: {
            list:item
          }
        });
        localStorage.setItem('campImg', item.campImages);
      }
    },
  }
</script>

<style scoped lang="less">
  .summerCampSelect{
    padding: 0 .25rem .3rem;
    .main{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title{
        >span{
          display: block;
          &.red{
            color:rgba(248,18,14,1);
          }
        }
      }
      &:not(:last-child){
        margin-bottom: .22rem;
      }
      &:nth-child(3n+1){
        .title{
          color:rgba(114,155,198,1);
        }
      }
      &:nth-child(3n+2){
        .title{
          color:rgba(186,139,55,1);
        }
      }
      &:nth-child(3n+3){
        .title{
          color:rgba(79,116,64,1);
        }
      }

      .cover{
        width:3.14rem;
        height:2.09rem;
        border-radius: .1rem;
        overflow: hidden;
        position: relative;
        >img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .summerCampPrice{
          height: .36rem;
          background:rgba(255,255,255,.5);
          border-radius: .1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .2rem;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(248,18,14,1);
          position: absolute;
          right: 0;
          top: 0;
          padding: 0 .2rem;
        }
      }
      .message{
        width: 3.53rem;
        height: 2.09rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .message_content{
          .title{
            font-size: .28rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            /*color:rgba(114,155,198,1);*/
            /*margin-bottom: .12rem;*/
            height: .8rem;
          }
          .content{
            font-size: .16rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
            text-align: justify;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .message_box{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .time{
          font-size: .12rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
          p{
            display: flex;
            align-items: center;
            &:not(:last-child){
              margin-bottom: .1rem;
            }
            &::before{
              content: '';
              margin-right: .08rem;
              width: .08rem;
              height: .08rem;
              background:rgba(247,85,82,1);
              border-radius:50%;
            }
          }
        }
        .more{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 .06rem;
          height: .28rem;
          background:rgba(247,85,82,1);
          border-radius: .1rem;
          font-size: .16rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
      }
    }



  }
</style>
