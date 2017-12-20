<template>
  <div class="article_info_content">
    <h2 class="title">{{article_info.data.article_title}}</h2>
    <div class="top">
      <span>作者：{{article_info.data.author}}</span>
      <span class="create_time">{{article_info.data.create_time | format_date}}</span>
    </div>
    <div class="content" v-html="article_info.data.article_content">

    </div>
  </div>
</template>

<script>
import api from '../../api/api'
export default{
  data(){
      return{
        article_info:{
          data:{}
        }
      }
  },
  created(){
    api.get_article_info({article_id:this.$route.params.article_id}).then(res => {
      if (res.success){
        this.article_info = res;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  .article_info_content{
    padding: 0 100px;
    .title{
      text-align: center;
      margin-top: 20px;
    }
    .top{
      margin-top: 10px;
      .create_time{
        float: right;
      }
    }
    .content{
      margin-top: 20px;
    }
  }
</style>
