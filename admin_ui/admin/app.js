//Vue
const app = new Vue({
    el: '#app',
    data: { //数据
        siteName: site.title,
        menu: site.menu,
        activeKey: 0
    },
    mounted: function () {
        document.title = this.siteName
    },
    methods: {}
})


//jQuery
$(document).ready(function () {
    /**监听: 窗口resize */
    function resizeWindow(e) {
        var w = $(window).width()
        console.log('新的是' + w)
        $('.main-frame').width(w - 200)
    }

    /**主进程 */
    function main() {
        $(window).bind("resize", resizeWindow);
        resizeWindow()
    }

    /**开始 */
    main() //激活主进程
})
