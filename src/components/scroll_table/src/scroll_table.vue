<template>
  <div @touchstart="ontouchstart($event)" @touchmove="ontouchmove($event)" @touchend="ontouchend($event)" @scroll="onscroll($event)">
    <div class="scroll_main" ref="touchMain">
      <div class="scroll_top">
        <p :style="canrefresh?{transition:'0.4s ease-in-out', transform:'rotate(180deg)'}:{}" ref="arrowRef">↓</p>
        <i style="display: none" ref="loadingRef">loading...</i>
      </div>
      <slot></slot>
      <div class="scroll_bottom">

      </div>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    touchRefresh:{
      type: Function
    }
  },
  data(){
    return{
      touch_start:0,
      touch_move:0,
      touch_direction:'',
      touch_long:0,
      canrefresh:false,
      start_timeStamp:0
    }
  },
  methods:{
    ontouchstart: function (e) {
      this.$refs.arrowRef.style.display = 'inline-block'
      this.touch_start = e.touches[0].pageY
      this.start_timeStamp = e.timeStamp
    },
    ontouchmove: function (e) {
      let ele = this.$refs.touchMain
      if (e.touches.length === 2) {
        this.touch_move = Math.abs(e.touches[0].pageY + e.touches[1].pageY) / 2
      } else {
        this.touch_move = e.touches[0].pageY
      }
      this.touch_long = (this.touch_move-this.touch_start)/2
      this.touch_direction = this.touch_long>=0?'down':'up'
      if (this.touch_direction == 'down'){
        ele.style.transition = `${e.timeStamp - this.start_timeStamp}ms linear`
        ele.style.transform = `translateY(${this.touch_long}px)`
        if (this.touch_long >= 30){
          this.canrefresh = true
        }else {
          this.canrefresh = false
        }
      }
    },
    ontouchend: function (e) {
      this.start_timeStamp = 0
      let ele_content = this.$refs.touchMain
      ele_content.style.transition = `.15s linear`
      if (this.canrefresh){
        this.$refs.loadingRef.style.display = 'inline-block'
        this.$refs.arrowRef.style.display = 'none'
        this.touchRefresh(() => {
          ele_content.style.transform = `translateY(-${this.touch_long/2}px)`
          this.canrefresh = false
          this.$refs.loadingRef.style.display = 'none'
        })
      }else {
        this.$refs.arrowRef.style.display = 'none'
        this.$refs.loadingRef.style.display = 'none'
        ele_content.style.transform = `translateY(0px)`
        this.canrefresh = false
      }
    },
    onscroll: function (e) {
      let el = e.target
      this.scrollTop = el.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
  .scroll_main{
    transform: translateY(-20px);
    .scroll_top{
      width: 100%;
      text-align: center;
      p{
        height: 20px;
      }
    }
  }
</style>
