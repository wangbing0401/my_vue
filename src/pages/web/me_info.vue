<template>
  <div class="main">
    <div class="content">
      <img-upload :style_self="{width: '200px', height:'200px'}" @transferData="get_file_data"></img-upload>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import imgUpload from '../../components/img_upload/index'
export default{
  components:{
    imgUpload
  },
  methods:{
    get_file_data: function (file) {
      let formData = new FormData
      formData.append(file, file)
      axios({
        url:server_url+'/add_user_img',
        method:'post',
        data:formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    width: 100%; height: 100%;
    .content{
      width: 500px; height: 300px;
      -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, .08);
      -moz-box-shadow: 0 0 16px rgba(0, 0, 0, .08);
      box-shadow: 0 0 16px rgba(0, 0, 0, .08);
    }
  }
</style>
