<template>
    <div class="vue_input">
        <input type="text" :style="{width:width, height:height}" v-model="input_text" :placeholder="placeholder">
        <md-button class="md-icon-button search_icon" v-on:click.stop="input_search()">
            <md-icon>search</md-icon>
        </md-button>
    </div>
</template>

<script>
export default{
    data(){
        return{
            input_text:''
        }
    },
    props:{
        width:{
            type:String,
            default:'300px'
        },
        height:{
            type:String,
            default:'35px'
        },
        placeholder:String
    },
    methods:{
        input_search: function () {
            this.$emit('transferData', this.input_text);
        }
    }
}
</script>

<style lang="scss" scoped>
    .vue_input{
        position: relative;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
        input{
            outline: none;
            padding: 0 10px;
        }
        .search_icon{
            position: absolute;
            right: 0;
            top: -3px;
        }
    }
</style>