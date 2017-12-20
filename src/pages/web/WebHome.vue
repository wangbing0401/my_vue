<template>
  <div>
    <div class="nav_title">
      <h3 class="title">h5前端论坛</h3>
      <span class="user_name">810376348@qq.com</span>
    </div>
    <div class="web_main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

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
    }
  }
  .web_main{
    position: absolute;
    top: 0; left: 0;
    padding-top: 50px;
    width: 100%; height: 100%;
  }
</style>
