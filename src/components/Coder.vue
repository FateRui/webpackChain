<template>
  <div class="in-coder-panel">
    <textarea ref="textarea" ></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入全局实例
  import _CodeMirror from 'codemirror'

  // 核心样式
  import 'codemirror/lib/codemirror.css'
  // 引入主题后还需要在 options 中指定主题才会生效
  import 'codemirror/theme/cobalt.css'

  // 需要引入具体的语法高亮库才会有对应的语法高亮效果
  // codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
  // 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/mode/python/python.js'
  import 'codemirror/mode/r/r.js'
  import 'codemirror/mode/shell/shell.js'
  import 'codemirror/mode/sql/sql.js'
  import 'codemirror/mode/swift/swift.js'
  import 'codemirror/mode/vue/vue.js'

  // 尝试获取全局实例
  const CodeMirror = window.CodeMirror || _CodeMirror

  export default {
    name: 'in-coder',
    props: {
      // 外部传入的内容，用于实现双向绑定
      value: String,
      // 外部传入的语法类型
      language: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        // 内部真实的内容
        code: '',
        // 默认的语法类型
        mode: 'javascript',
        // 编辑器实例
        coder: null,
        // 默认配置
        options: {
          // 缩进格式
          tabSize: 2,
          // 主题，对应主题库 JS 需要提前引入
          theme: 'cobalt',
          // 显示行号
          lineNumbers: true,
          line: true
        },
        // 支持切换的语法高亮类型，对应 JS 已经提前引入
        // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
        modes: [{
          value: 'css',
          label: 'CSS'
        }, {
          value: 'javascript',
          label: 'Javascript'
        }, {
          value: 'html',
          label: 'XML/HTML'
        }, {
          value: 'x-java',
          label: 'Java'
        }, {
          value: 'x-objectivec',
          label: 'Objective-C'
        }, {
          value: 'x-python',
          label: 'Python'
        }, {
          value: 'x-rsrc',
          label: 'R'
        }, {
          value: 'x-sh',
          label: 'Shell'
        }, {
          value: 'x-sql',
          label: 'SQL'
        }, {
          value: 'x-swift',
          label: 'Swift'
        }, {
          value: 'x-vue',
          label: 'Vue'
        }, {
          value: 'markdown',
          label: 'Markdown'
        }]
      }
    },
    mounted () {
      // 初始化
      this._initialize()
    },
    methods: {
      // 初始化
      _initialize () {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
        // 编辑器赋值
        this.coder.setValue(this.value || this.code)

        // 支持双向绑定
        this.coder.on('change', (coder) => {
          this.code = coder.getValue()
          this.$emit('change',this.code);
        })
        this.coder.on('blur', (coder) => {
          this.$emit('blur',coder.getValue());
        })
      }
    }
  }
</script>

<style lang="less">
  .in-coder-panel
  {
    position: relative;
    width: 100%;
    height: 100%;
    .CodeMirror{
      width: 100%;
      height: 100%;
    }
  }
</style>