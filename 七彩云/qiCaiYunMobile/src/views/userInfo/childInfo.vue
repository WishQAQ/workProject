<template>
  <div class="childInfo" v-loading="loading">
    <NavTitle :title="'孩子信息'"></NavTitle>

    <div class="main">
      <div class="main_banner"></div>
      <div class="main_content" v-for="(item , index) in childInfo" :key="index">
        <div class="title">
          <p class="title_name">孩子信息</p>
        </div>
        <div class="child_content" v-if="editChildInfoBtm !== index">
          <div class="child_box">
            <div class="child_message child_name">
              <img src="../../assets/images/child_name.png" alt="">
              姓名：{{item.children_name}}
            </div>
            <div class="child_message child_sex" v-if="item.children_sex === '女'">
              <img src="../../assets/images/female.png" alt="">
              女
            </div>
            <div class="child_message child_sex" v-else>
              <img src="../../assets/images/male.png" alt="">
              男
            </div>
          </div>
          <div class="child_message child_age">
            <img src="../../assets/images/child_age.png" alt="">
            年龄：{{item.children_age}}
          </div>
          <div class="child_message child_id">
            <img src="../../assets/images/message_id.png" alt="">
            孩子身份证件：{{item.children_card}}
          </div>
          <div class="child_message child_school">
            <img src="../../assets/images/child_school.png" alt="">
            孩子就读学校：{{item.children_school}}
          </div>
          <div class="childInfo_edit" @click="editChildInfo(index)">
            <img src="../../assets/images/message_edit.png" alt="">
            信息修改
          </div>
        </div>

        <div class="edit_content" v-else>
          <el-form ref="form">
            <div class="child_box">
              <div class="child_message child_name">
                <img src="../../assets/images/child_name.png" alt="">
                姓名：<el-input v-model="form.userName =item.children_name"></el-input>
              </div>
              <div class="child_message child_sex">
                <el-radio v-model="form.radio = item.children_sex" label="女"><img src="../../assets/images/female.png" alt="">女</el-radio>
                <el-radio v-model="form.radio = item.children_sex" label="男"><img src="../../assets/images/male.png" alt="">男</el-radio>
              </div>
            </div>
            <div class="child_message child_age">
              <img src="../../assets/images/child_age.png" alt="">
              年龄：<el-input type="number" v-model="form.userAge = item.children_age"></el-input>
            </div>
            <div class="child_message child_id">
              <img src="../../assets/images/message_id.png" alt="">
              孩子身份证件：<el-input type="number" v-model="form.userId = item.children_card"></el-input>
            </div>
            <div class="child_message child_school">
              <img src="../../assets/images/child_school.png" alt="">
              孩子就读学校：<el-input v-model="form.userShcool = item.children_school"></el-input>
            </div>
          </el-form>

          <div class="childInfo_edit" @click="addChildInfo(index,form,item)">
            <img src="../../assets/images/message_edit.png" alt="">
            保存信息
          </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import NavTitle from '@/components/navTitle'

  export default {
    name: "childInfo",
    data (){
      return {
        childInfo: [],
        loading: true,

        editChildInfoBtm: -1,
        form:{
          userName: '',
          radio: '',
          userAge: '',
          userId: '',
          userShcool: '',
          userID: '',
        }
      }
    },
    components:{
      NavTitle
    },
    methods:{
      editChildInfo(index){
        this.editChildInfoBtm = this.editChildInfoBtm == index ? -1 : index;
        // this.editChildInfoBtm = true
      },
      addChildInfo(index,form,item){

        let formData = new FormData();

        formData.append('id', item.id)
        formData.append('children_name', form.userName);
        formData.append('children_sex', form.radio === '男'?'1':'2');
        formData.append('children_age', form.userAge);
        formData.append('children_card', form.userId);
        formData.append('children_school', form.userShcool);

        // const param = {
        //   id: item.id,
        //   children_name: form.userName,
        //   children_sex: form.radio,
        //   children_age: form.userAge,
        //   children_card: form.userId,
        //   children_school: form.userShcool
        // }
        this.$http.post('/children/updateChildren.action',formData)
          .then(res =>{
            if(res.data.code === 20000){
              this.editChildInfoBtm = false
              this.loading = true
              this.getChildInfo()
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
          })
      },
      getChildInfo(){
        this.$http.get('/children/queryChildrenAndUserById.action?userId='+this.userID)
          .then(res =>{
            if(res.data.code === 20000){
              this.loading = false
              this.childInfo = res.data.data.childrenList

            }
            console.log(res)
          })
      }
    },
    mounted() {
      var userMessage = JSON.parse(localStorage.getItem('userInfo'))
      this.userID = userMessage.id
      this.getChildInfo()
    }
  }
</script>

<style scoped lang="less">
  .childInfo{
    .main{
      height: calc(100vh - 1.9rem);
      padding-bottom: .5rem;
      overflow: auto;
      .main_banner{
        height:4.22rem;
        width: 100%;
        background: url("../../assets/images/child_banner.png") no-repeat center center;
        background-size: cover;
      }
      .main_content{
        padding: .8rem .25rem 0;
        .title{
          margin-bottom: .3rem;
          .title_name{
            font-size: .28rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(85,85,85,1);
          }

        }
        .edit_content{
          /deep/.el-input{
            .el-input__inner{
              height: .5rem;
              line-height: .5rem;
            }
          }
          .child_box{

            /deep/.el-radio{
              &:first-child{
                &.is-checked{
                  .el-radio__input{
                    .el-radio__inner{
                      border-color: #F65552;
                      background: #F65552;
                    }
                  }
                  .el-radio__label{
                    color: #F65552;
                  }
                }

              }
              display: inline-flex;
              align-items: center;
              .el-radio__label{
                display: inline-flex;
                align-items: center;
                padding: unset;
                >img{
                  margin-right: unset;
                }
              }
            }
            .child_name{
              width: 65%;
              /deep/.el-input{
                width: 2.5rem;
              }
            }
          }
          .child_age{
            /deep/.el-input{
              width: 5.7rem;
            }
          }
          .child_id{
            /deep/.el-input{
              width: 4.8rem;
            }
          }
          .child_school{
            /deep/.el-input{
              width: 4.8rem;
            }
          }
        }
        .child_content,.edit_content{
          font-size: .22rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(85,85,85,1);
          img{
            width: .44rem;
            height: .44rem;
            object-fit: contain;
            margin-right: .14rem;
          }

          .child_box{
            display: flex;
            align-items: center;
            .child_name{
              margin-right: .5rem;
            }
          }
          .child_message{
            display: flex;
            align-items: center;
            margin-bottom: .3rem;
          }
          .childInfo_edit{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            img{
              width: .3rem;
              height: .3rem;
            }
          }
        }
      }
    }
  }
</style>
