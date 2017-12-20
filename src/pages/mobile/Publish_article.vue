<template>
  <transition name="slide-fade">
    <div class="publish_article_main">
      <md-input-container>
        <label for="movie">文章类别</label>
        <md-select name="movie" id="movie" v-model="article_category_id">
          <md-option v-for="l in article_category_list" :key="l._id" :value="l._id">{{l.name}}</md-option>
        </md-select>
      </md-input-container>
      <md-input-container style="margin-bottom: 40px;">
        <label>文章标题</label>
        <md-input maxlength="20" v-model="article_title" ></md-input>
      </md-input-container>
      <div id="editor">

      </div>
      <md-button class="md-raised md-primary larger_button" v-on:click="publish_article_click()" >提交</md-button>
    </div>
  </transition>
</template>

<script>
  import api from '../../api/api'
  import E from 'wangeditor'
  export default{
    data(){
      return{
        article_category_list:null,
        article_category_id:'',
        article_title:null,
        article_content:null,
        editor:null
      }
    },
    methods:{
      publish_article_click: function () {
        const params = {
          author_id:localStorage.user_id,
          article_category_id:this.article_category_id,
          article_title:this.article_title,
          article_content:this.editor.txt.html(),
          create_time:new Date()
        }
        api.add_article(params).then((res) => {
          if (res.success){
            this.$store.dispatch('alert_handle_show', res.msg);
            history.back();
          }
        });
      }
    },
    created(){
      api.article_category_list({}).then((res) => {
        this.article_category_list = res.data;
      })
    },
    mounted(){
      this.editor = new E('#editor');
      this.editor.create();
    }
  }
</script>

<style lang="scss" scoped>
  .publish_article_main{
    padding: 15px;
    .larger_button{
      width: 100%; height: 40px;
      margin: 50px 0 0 0;
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
