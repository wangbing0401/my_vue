<template>
  <div class="login_main">
    <h1>登录</h1>
    <md-input-container>
      <label>用户名</label>
      <md-input v-model="userName"></md-input>
    </md-input-container>
    <md-input-container>
      <label>密码</label>
      <md-input v-model="password" type="password"></md-input>
    </md-input-container>
    <router-link :to="{path:'/register'}">
      <md-button class="register_button">注册</md-button>
    </router-link>
    <md-button class="md-raised md-primary button_large" v-on:click="click()">登录</md-button>
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
    methods:{
      click: function () {
        api.login({name:this.userName, password:this.password}).then((res) => {
          if (res.success){
            this.$store.dispatch('alert_handle_show', '登录成功');
            localStorage.user_id = res.data
            this.$router.push('app_home')
          }else{
            this.$store.dispatch('alert_handle_show', '用户名或密码错误');
          }
        });
      }
    },
    created(){
      this.$store.dispatch('bottom_handel_hide')
//      localStorage.removeItem('user_id')
    }
  }
</script>

<style lang="scss" scoped>
  .register_button{
    float: right;
    color: black;
  }
</style>
