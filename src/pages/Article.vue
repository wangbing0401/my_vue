<template>
  <div class="article_main">
    <div class="article_top">
      <router-link :to="{path:'/publish_article'}">
        发布文章
      </router-link>
    </div>
    <div class="article_block" v-for="(l, index) in article_list" v-on:click="article_line_click(l._id)">
      {{l.article_title}}
      <md-button class="md-icon-button" style="float: right;" v-on:click.stop="delete_article(l._id, index)">
        <md-icon>delete</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  export default{
    data(){
      return{
        article_list: null
      }
    },
    methods:{
      article_line_click: function (id) {
        this.$router.push({path:'/article_info/'+id});
      },
      delete_article: function (id, index) {
        api.delete_article({article_id:id}).then(res => {
          if (res.success){
            this.$store.dispatch('alert_handle_show', res.msg);
            this.article_list.splice(index, 1);
          }
        });
      }
    },
    created(){
      api.get_article_list({author_id:localStorage.user_id}).then((res) => {
        this.article_list = res.data;
      });
    }
  }
</script>

<style lang="scss" scoped>
  .article_main{
    padding: 15px;
    .article_top{
      color: blue;
      text-align: right;
      margin-bottom: 20px;
    }
    .article_block{
      width: 100%; height: 40px;
      padding: 0 10px;
      line-height: 40px;
      margin-bottom: 10px;
      border-radius: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      box-shadow: 0 0 10px #333333;
      -webkit-box-shadow: 0 0 5px #333333;
    }
  }
</style>
