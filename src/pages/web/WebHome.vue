<template>
  <div>
    <div class="nav_title">
      <h3 class="title">h5前端论坛</h3>
      <span class="user_name" @click="go_user_info()">{{user_name}}</span>
    </div>
    <div class="web_main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
export default{
  data(){
      return{
          user_name:''
      }
  },
  methods:{
    go_user_info: function () {
      this.$router.push({path:'/web_home/me_info'});
    }
  },
  created(){
    api.get_user_list({user_id:localStorage.user_id}).then(res => {
        this.user_name = res.data.name
    })
  }
}
</script>

<style lang="scss" scoped>
  .nav_title{
    position: relative;
    width: 100%; height: 50px;
    background-color: $main_background_color;
    z-index: 10;
    .title{
      display: inline-block;
      height: 100%; line-height: 50px;
      margin-left: 100px;
    }
    .user_name{
      display: inline-block;
      height: 100%; line-height: 50px;
      float: right;
      margin-right: 100px;
      cursor: pointer;
    }
  }
  .web_main{
    position: absolute;
    top: 0; left: 0;
    padding-top: 50px;
    width: 100%; height: 100%;
  }
</style>
