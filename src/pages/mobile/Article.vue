<template>
  <div class="article_main">
    <div class="article_top">
      <router-link :to="{path:'/publish_article'}">
        发布文章
      </router-link>
    </div>
    <scroll-table class="content_main" :touch-refresh="refreshFetchData">
      <div class="article_block" v-for="(l, index) in article_list" v-on:click="article_line_click(l._id)">
        {{l.article_title}}
        <md-button class="md-icon-button" style="float: right;" v-on:click.stop="delete_article(l._id, index)">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </scroll-table>
  </div>
</template>

<script>
  import ScrollTable from '../../components/scroll_table'
  import api from '../../api/api'
  export default{
    components:{
      ScrollTable
    },
    data(){
      return{
        article_list: null,
        out_canrefresh:false
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
      },
      refreshFetchData:  function(finished) {
        setTimeout(function () {
          finished()
        }, 2000)
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
    height: 100%; width: 100%;
    padding-top: 45px;
    .article_top{
      position: absolute;
      top: 15px;
      color: blue;
      text-align: right;
      padding: 0 15px;
    }
    .content_main, scroll_main{
      height: 100%; width: 100%;
      padding: 0 15px;
      overflow-y: scroll;
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
  }
</style>
