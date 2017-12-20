<template>
  <div class="web_main">
    <div class="left_main">
      <div class="article_title">文章类别</div>
      <div class="article_category_line" v-for="l in article_category_list" @click="article_category_line_click(l)" :style="select_category_id==l._id?{backgroundColor:'#f6f7fb'}:{}">
        {{l.name}}
      </div>
    </div>
    <div class="right_main">
      <h2>文章列表</h2>
      <div class="list_main" v-for="l in article_list" @click="article_info_line_click(l)">
        <span class="title">{{l.article_title}}</span>
        <span class="time">{{l.create_time | format_date}}</span>
        <span class="author">{{l.author}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api'
export default{
  data(){
      return{
        article_category_list:null,
        select_category_id:null,
        article_list: [],
        user_list: []
      }
  },
  methods:{
    article_category_line_click: function (l) {
      api.get_article_list({category_id:l._id}).then(res => {
        this.select_category_id = l._id
        this.article_list = res.data
      })
    },
    article_info_line_click: function (l) {
      this.$router.push({path:'/web_home/article_info/'+l._id});
    }
  },
  created(){
    api.article_category_list({}).then(res => {
      this.article_category_list = res.data
      api.get_article_list({category_id:this.article_category_list[0]._id}).then(res => {
        this.select_category_id = this.article_category_list[0]._id
        this.article_list = res.data
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .web_main{
    .left_main{
      float: left;
      width: 20%; height: 100%;
      overflow-y: scroll;
      border-right: 1px solid #eeeeee;
      .article_title{
        width: 100%; height: 50px;
        text-align: center; line-height: 50px;
        background-color: gray;
      }
      .article_category_line{
        width: 100%; height: 40px;
        text-align: center; line-height: 40px;
        cursor: pointer;
        &:hover{
          background-color: #f6f7fb;
        }
      }
    }
    .right_main{
      float: left;
      width: 80%; height: 100%;
      padding: 0 50px;
      h2{
        width: 100%; height: 50px;
        text-align: center; line-height: 50px;
      }
      .list_main{
        position: relative;
        width: 100%; height: 50px;
        border: 1px solid #eeeeee;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
        .title{
          position: absolute;
          top: 5px;
          left: 20px;
        }
        .time{
          position: absolute;
          top: 25px;
          left: 20px;
        }
        .author{
          position: absolute;
          top: 14px; right: 10px;
        }
      }
    }
  }
</style>
