<template>
  <div class="app">
    <div class="top">
        <div class="left">
        <Coder @blur="blur" @change="blur"></Coder>
      </div>
      <div class="right">
        <CodeShow :value="execCode"></CodeShow>
      </div>
    </div>
    <div class="bottom">
      <CodeShow :value="errorCode" :lineNumbers="false"></CodeShow>
    </div>
  </div>
</template>
<script >
import Coder from './components/Coder.vue';
import CodeShow from './components/CodeShow.vue';
import { debounce } from './utils/util';
const WebpackChain = require('webpack-chain');
var beautify = require('js-beautify').js;
window.WebpackChain = WebpackChain;
export default {
  components:{
    Coder,
    CodeShow
  },
  data(){
    return {
      execCode: '',
      errorCode: '',
      debounceFunc: debounce(this.execFunc,1000)
    }
  },
  methods:{
    execFunc(code){
      try {
        try {
          this.execCode = beautify(eval(code),{ indent_size: 2, space_in_empty_paren: true });
          console.log(eval(code) + '');
        } catch(err) {
          this.execCode = eval(code) + '';
          console.log(eval(code) + '');
        }
        this.errorCode = '';
      } catch(err){
        console.log(err);
        this.errorCode = err.toString();
      }
    },
    blur(code){
      this.execFunc(code);
    }
  }
}
</script>

<style lang="less" scoped>
.app{
  .top{
    display: flex;
    height: 80vh;
    flex-direction: row;
    border-bottom: 1px solid #f00;
    .left, .right{
      flex: 1;
    }
    .right {
      border-left: 1px solid #f00;
    }
  }
  .bottom{
    height: 20vh;
  }
}
</style>
<style lang="less" >
* {
  margin: 0;
  padding: 0;
}
</style>