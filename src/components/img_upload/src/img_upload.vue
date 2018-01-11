<template>
  <div :style="style_self" class="main">
    <img src="../../../assets/img/angular_icon.png">
    <input type="file" ref="file" @change="file_input_change()">
  </div>
</template>

<script>
export default{
  data(){
      return{

      }
  },
  props:{
    style_self:{
      type:Object,
      default: function () {
        return {}
      }
    }
  },
  methods:{
    file_input_change: function () {
      this.$emit('transferData', this.$refs.file.files[0]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    position: relative;
    img{
      width: 100%; height: 100%;
    }
    input{
      position: absolute;
      width: 100%; height: 100%;
      top: 0; left: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer;
    }
    div{
      width: 30px;height: 30px;
    }
  }
</style>
