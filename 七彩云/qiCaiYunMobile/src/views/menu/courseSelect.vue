<template>
  <div class="courseSelect">
    <div class="menu_list">
      <div class="menu_box">
        <div class="list_name" v-bind:class="{ active:index == isActive }" @click="clickMenuList(index)" v-for="(item , index) in courseList" :key="index">{{item.courseTypeName}}</div>
      </div>
      <div class="more_button" @click="openMore()"></div>
      <div class="more_box" v-if="moreBox">
        <div v-for="(i , e) in courseList" v-bind:class="{ active:e == isActive }" @click="clickMenuListMore(e)"  :key="e">{{i.courseTypeName}}</div>
      </div>
    </div>

    <div class="list_box">

      <el-checkbox-group
        v-model="checkedList"
        @change="handleCheckChange()"
        :max="10">
        <el-checkbox v-for="(list , i) in courseName" :label="list" :key="i">
          <img :src="list.courseImg" alt="">
          {{list.username}}
        </el-checkbox>
      </el-checkbox-group>
    </div>

<!--    [list.courseId,list.coureseImg,list.username]-->

  </div>
</template>

<script>
  const cityOptions = []
  export default {
    name: "courseSelect",
    props: ['getCourse'],
    data(){
      return{
        courseList: [],
        checkedList: [],
        courseName: cityOptions,
        moreBox: false,
        isActive: '',
        checkedCities: '',
        clickNum: 0,
        rightData:'',
        yonndongNum: ''
      }
    },
    methods:{
      clickMenuList(index){
        this.isActive = index;
        this.courseName = this.courseList[this.isActive].courseList;
      },
      clickMenuListMore(e){
        this.isActive = e;
        this.moreBox = false
        this.courseName = this.courseList[this.isActive].courseList;
      },
      handleCheckChange(){
        if(this.yonndongNum >=2){
          this.$message({
            message: '运动课程只能选择一个哦',
            type: 'warning'
          });

          this.$emit('yundongValue', this.yonndongNum)
        }

        if(this.checkedList.length ==10){
          this.$message({
            message: '您已选择完十项课程',
            type: 'warning'
          });
        }
        this.$emit('childByValue', this.checkedList)
      },
      openMore(){
        if(!this.moreBox){
          this.moreBox = true
        }else {
          this.moreBox = false
        }
      },
    },
    mounted(){
      this.courseList = this.getCourse
      this.isActive = 0;
      this.courseName = this.courseList[this.isActive].courseList
    },
  }
</script>

<style scoped lang="less">
  .courseSelect{
    padding: 0 .25rem;
    .menu_list{
      display: flex;
      align-items: center;
      font-size: .24rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(85,85,85,.5);
      position: relative;
      .menu_box{
        width: calc(100% - .55rem);
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        .list_name{
          position: relative;
          display: flex;
          justify-content: center;
          flex-shrink: 0;
          &:not(:last-child){
            margin-right: .35rem;
          }
          &.active{
            &:before{
              content: '';
              position: absolute;
              bottom: 0;
              height: .04rem;
              width: 80%;
              background: rgba(246,85,82,1);
              border-radius: .1rem;
            }
          }
        }
      }
      .more_button{
        background: url("../../assets/images/more.png") no-repeat center center;
        background-size: contain;
        width: .5rem;
        height: .5rem;
        margin-left: .3rem;
      }
      .more_box{
        position: absolute;
        top: .5rem;
        width: 100%;
        padding: .3rem .2rem 0;
        background: #fff;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        >div{
          margin-right: .3rem;
          margin-bottom: .3rem;
        }
      }
    }
    .list_box{
      display: flex;
      align-items: center;
      margin-top: .48rem;
      /deep/.el-checkbox-group{
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .el-checkbox{
          width: 30%;
          height: .8rem;
          margin: 0 0 .3rem 0;
          background:rgba(242,242,242,1);
          border-radius:10px;
          &:not(:nth-child(3n)){
            margin-right: .3rem;
          }
          &.is-checked{
            background:rgba(247,85,82,1);
            box-shadow:1px 2px 7px 1px rgba(247,85,82,0.79);
            .el-checkbox__label{
              color:rgba(255,255,255,1);
            }
          }
          .el-checkbox__input{
            display: none;
          }
          .el-checkbox__label{
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: .22rem;
            font-family:PingFang-SC-Bold;
            color:rgba(153,153,153,1);
            font-weight:bold;
            >img{
              width: 0.45rem;
              height: 0.48rem;
              object-fit: cover;
              margin-right: .14rem;
              font-size: .22rem;
              font-family:PingFang-SC-Bold;
              font-weight:bold;
              color:rgba(255,255,255,1);
            }
          }
        }
      }
    }

  }
</style>
