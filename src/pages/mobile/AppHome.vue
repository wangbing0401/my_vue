<template>
  <div class="home_main" @touchstart="ontouchstart($event)" @touchmove="ontouchmove($event)" @touchend="ontouchend($event)">
    <div class="search_input">
      <vue-input placeholder="输入搜索标题" width='100%' @transferData="get_input_text"></vue-input>
    </div>
    <div class="card_block" v-for="l in article_list.data" v-on:click="card_block_click(l._id)">
      <img :src="l.article_category_id | article_icon_filter(article_category_list)">
      <div class="text" v-html="l.article_content">
      </div>
      <div class="bottom">
        <h3>{{l.article_title}}</h3>
        <md-button class="md-icon-button float_right" :style="article_list.collect_article.indexOf(l._id)!=-1?{color:'red'}:{}" v-if="l.author_id!=myself_id" v-on:click.stop="collect_article_click(l._id)">
          <md-icon>favorite</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../api/api'
  import VueInput from '../../components/search/index'
  export default{
    components:{
      VueInput
    },
    data(){
      return{
        article_list:[],
        article_category_list:[],
        myself_id:localStorage.user_id
      }
    },
    methods:{
      card_block_click: function (id) {
        this.$router.push({path:'/article_info/'+id})
      },
      collect_article_click: function (id) {
        if (this.article_list.collect_article.indexOf(id)==-1){
          api.collect_article({user_id:localStorage.user_id, article_id:id}).then(res => {
            if (res.success){
              this.$store.dispatch('alert_handle_show', res.msg);
              this.article_list.collect_article.push(id);
            }
          });
        }
      },
      get_input_text: function (msg) {
        api.search_article({article_title:msg, user_id:localStorage.user_id}).then(res => {
          this.article_list = res;
        });
      },
      ontouchmove: function (e) {
        console.log(e.touches[0].pageY);
      },
      ontouchstart: function (e) {
        console.log(e.touches[0].pageY);
      },
      ontouchend: function (e) {

      }
    },
    created(){
      api.article_category_list({}).then((res) => {
        this.article_category_list = res.data;
      });
      api.get_article_list({author_id:'all', user_id:localStorage.user_id}).then((res) => {
        if (res.success){
          this.article_list = res;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .home_main{
    position: relative;
    padding: 50px 15px 0 15px;
    .search_input{
      position: fixed;
      height: 52px;
      padding-top: 15px;
      top: 0; left: 15px; right: 15px;
      z-index: 100;
      background-color: white;
    }
    .card_block{
      position: relative;
      margin-bottom: 10px;
      margin-top: 10px;
      box-shadow: 0 0 10px #333333;
      -webkit-box-shadow: 0 0 10px #333333;
      img{
        width: 100%; height: 150px;
      }
      .text{
        display: -webkit-box;
        margin: 10px 15px 0 15px;
        line-height: 20px; height: 40px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .bottom{
        width: 100%; height: 40px;
        margin-top: 10px;
        h3{
          display: inline-block;
          margin: 10px 15px;
        }
        .float_right{
          float: right;
        }
      }
    }
  }
</style>
