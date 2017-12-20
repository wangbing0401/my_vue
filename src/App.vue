<template>
  <div class="app_body" :style="CurrentRouter=='app_home'||CurrentRouter=='article'?{paddingBottom:'57px'}:{}">
    <alert :show="AlertShow"></alert>
    <div class="router_main">
      <router-view></router-view>
    </div>
    <md-bottom-bar v-if="BottomShow" class="md-transparent tab_bottom" md-shift>
      <md-bottom-bar-item md-icon="ondemand_video" :md-active="CurrentRouter=='app_home'?true:false" v-on:click="home_click()">首页</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="music_note">音乐</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="books" :md-active="CurrentRouter=='article'?true:false" v-on:click="article_click()">文章</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="photo">图片</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Alert from './components/myself_alert/index'
export default {
  components:{
      Alert
  },
  methods:{
    home_click: function () {
      this.$router.push('app_home')
    },
    article_click: function () {
      this.$router.push('article')
    }
  },
  computed:{
    ...mapState({
      BottomShow:state => state.app_all.bottom_show,
      CurrentRouter:state => state.app_all.current_router,
      AlertShow:state => state.app_all.alert_show
    })
  }
}
</script>

<style lang="scss">
  *{
    margin: 0; padding: 0;
    color: rgba(0, 0, 0, 0.54);
  }
  body{
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
  }
  .app_body{
    position: absolute;
    width: 100%; height: 100%;
    .router_main{
      position: relative;
      width: 100%; height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling : touch;
    }
    .tab_bottom{
      position: absolute;
      left: 0; bottom: 0;
    }
    .login_main{
      width: 80%;
      margin: 50px auto 0 auto;
      h1{
        text-align: center;
      }
      .button_large{
        width: 100%; height: 40px;
        margin: 50px 0 0 0;
      }
    }
  }
  .md-select-content{
    z-index:10001;
  }
</style>
