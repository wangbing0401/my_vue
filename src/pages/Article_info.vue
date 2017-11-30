<template>
  <div class="article_info_main">
    <h3>{{article_info.data.article_title}}</h3>
    <div class="top">
      <span>作者：{{article_info.data.author}}</span>
      <span class="create_time">{{article_info.data.create_time | format_date}}</span>
    </div>
    <div class="content" v-html="article_info.data.article_content">

    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  export default{
    data(){
      return{
        article_info:{
          data:{}
        }
      }
    },
    methods:{

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
  .article_info_main{
    padding: 15px;
    h3{
      text-align: center;
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
