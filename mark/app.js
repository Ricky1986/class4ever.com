

//jQuery
$(document).ready(function () {
    //主进程
    function main() {
        resizeWindow()//调整模块大小
    }


    //resize窗口时, 重新调整line的大小
    $(window).bind("resize", resizeWindow)


    //resize窗口时的操作
    function resizeWindow(e) {
        //得到窗口高度
        let windowHeight = $(window).height()
        // console.log('新的窗口高度是' + windowHeight)

        //调整line的高度
        $('.line').height(windowHeight - 300)

        //调整line的第一个孩子的高度
        $('.show').height(windowHeight - 330)
    }

    //开始
    main()//激活主进程
})


//vue
const app = new Vue({
    el: '#app',
    data: {
        slashMark: '您好, 欢迎使用[b][i]Class4ever.com Slashmark[/i][/b] 语言\n[i]这是斜体[/i]\n\n这是换行\n\n[b]这是粗体[/b]\n'
    },
    methods: {
        run: function (str) {
            let r = str.replace(/\n/g, '<br>') //把\n转为换行
            r = r.replace(/\s/g, '&nbsp;') //把空格转为实体字符

            r = r.replace(/\[i]/g, '<i>') //[i]转为<i>
            r = r.replace(/\[\/i]/g, '</i>') //[/i]转为</i>

            r = r.replace(/\[b]/g, '<b>') //[b]转为<b>
            r = r.replace(/\[\/b]/g, '</b>') //[/b]转为</b>

            // r = r.replace(/\[code]/g, '<pre style="height:200px;"><code style="height:200px;">') //[b]转为<b>
            // r = r.replace(/\[\/code]/g, '</code></pre>') //[/b]转为</b>


            return r
        }
    },
    computed: {
        toShow: function () {
            return this.run(this.slashMark)
        }
    }
})