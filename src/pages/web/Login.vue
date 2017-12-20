<template>
  <div class="web_login_main">
    <div class="login_content">
      <div class="login_white_bg">
        <span class="head_icon"></span>
        <div class="input_block input_block1">
          <span></span>
          <input type="text" v-model="userName" placeholder="用户名">
        </div>
        <div class="input_block input_block2">
          <span></span>
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="handle_line">
          <span>
              <input type="checkbox">记住密码
          </span>
          <router-link :to="{path:'/web_register'}">
            <span>注册</span>
          </router-link>
        </div>
        <div class="login_button" @click="login_click()">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
export default{
  data(){
    return{
      userName:'',
      password:''
    }
  },
  methods: {
    login_click: function () {
      api.login({name:this.userName, password:this.password}).then(res => {
        if (res.success){
          this.$store.dispatch('alert_handle_show', '登录成功');
          localStorage.user_id = res.data
          this.$router.push('web_home')
        }else{
          this.$store.dispatch('alert_handle_show', '用户名或密码错误');
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .web_login_main{
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url("../../assets/img/login_bg.png");
    background-size: 100% 85%;
    background-repeat: no-repeat;
    .login_content{
      position: relative;
      text-align: center;
      width: 388px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      .login_white_bg{
        position: relative;
        width: 100%;
        margin-top: 30px;
        padding-top: 75px;
        padding-bottom: 30px;
        -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, .08);
        -moz-box-shadow: 0 0 16px rgba(0, 0, 0, .08);
        box-shadow: 0 0 16px rgba(0, 0, 0, .08);
        background-color: white;
        .head_icon{
          position: absolute;
          display: inline-block;
          margin-left: -33px; top: -33px;
          width: 66px; height: 66px;
          border-radius: 50%;
          background-color: white;
          &:before{
            display: inline-block;
            width: 46px; height: 46px;
            margin-top: 8px;
            background-image: url("../../assets/img/icon.png");
            background-position: -244px -178px;
            background-repeat: no-repeat;
            content: '';
          }
        }
        .input_block{
          input{
            width: 100%; height: 46px;
            padding-left: 52px;
            border: 1px solid #E2E2E2;
          }
        }
        .input_block1{
          position: relative;
          width: 326px;
          margin:0 auto;
          span{
            position: absolute;
            display: inline-block;
            width: 20px; height: 24px;
            margin: 10px 12px;
            background-image: url("../../assets/img/icon.png");
            background-position: -295px -188px;
            background-repeat: no-repeat;
          }
          span:after{
            display: inline-block;
            width: 1px; height: 20px;
            margin-top: 4px;  margin-left: 32px;
            background-color: #bfbfbf;
            content: '';
          }
        }
        .input_block2{
          position: relative;
          width: 326px;
          margin: 30px auto 0 auto;
          span{
            position: absolute;
            display: inline-block;
            width: 16px; height: 24px;
            margin: 10px 12px;
            background-image: url("../../assets/img/icon.png");
            background-position: -362px -189px;
            background-repeat: no-repeat;
          }
          span:after{
            display: inline-block;
            width: 1px; height: 20px;
            margin-top: 4px;  margin-left: 32px;
            background-color: #bfbfbf;
            content: '';
          }
        }
        .handle_line{
          width: 326px;
          text-align: left;
          font-size: 13px; color: #bfbfbf;
          margin: 20px auto 0 auto;
          span{
            input{
              margin-right: 10px;
            }
          }
          a{
            span{
              float: right;
            }
          }
        }
        .login_button{
          width: 326px; height: 46px;
          text-align: center; line-height: 46px;
          font-size: 18px; color: white;
          margin: 20px auto 0 auto;
          background-color: #497AC4;
          cursor: pointer;
        }
      }
    }
  }
</style>
