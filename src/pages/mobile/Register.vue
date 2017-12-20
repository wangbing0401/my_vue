<template>
  <div class="login_main">
    <h1>注册</h1>
    <md-input-container>
      <label>用户名</label>
      <md-input v-model="user_name"></md-input>
    </md-input-container>
    <md-input-container>
      <label>密码</label>
      <md-input v-model="password" type="password"></md-input>
    </md-input-container>
    <md-input-container>
      <label>再次输入密码</label>
      <md-input v-model="re_password" type="password"></md-input>
    </md-input-container>
    <md-button class="md-raised md-primary button_large" v-on:click="register()">注册</md-button>
  </div>
</template>
<script>
  import api from '../../api/api'
  export default{
    data(){
      return{
        user_name:null,
        password:null,
        re_password:null
      }
    },
    methods:{
      register: function () {
        if (!this.user_name){
          this.$store.dispatch('alert_handle_show', '请输入用户名');
          return;
        }else if (!this.password){
          this.$store.dispatch('alert_handle_show', '请输入密码');
          return;
        }else if (this.password != this.re_password){
          this.$store.dispatch('alert_handle_show', '两次密码不一致');
          return;
        }
        api.register({name:this.user_name, password:this.password}).then((res, config) => {
          if (res.success){
            this.$store.dispatch('alert_handle_show', '注册成功');
            history.back();
          }else{
            this.$store.dispatch('alert_handle_show', res.msg);
          }
        });
      }
    }
  }
</script>
