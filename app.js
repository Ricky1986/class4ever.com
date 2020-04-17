//Vue
const app = new Vue({
    el: '#app',
    data: {
        time: 0,
        siteTitle: 'Class4ever Pages',
        project: {
            0: {
                title: 'Slashmark',
                ver: '0.1',
                uri: '/slashmark/',
                desc: ''
            },
            1: {
                title: 'Wikilog',
                ver: '1.0.5',
                uri: '',
                desc: '<img src="https://blog.class4ever.com/wp-content/uploads/2019/04/gh_34fbae86e3c8_258-2.jpg"  alt="qrcode" style="width:100px;margin:0 auto;">'
            },
            2: {
                title: 'Admin UI',
                ver: '0.1',
                uri: '/admin_ui/',
                desc: '基于Vue.js和jQuery的后台前端样式'
            }
        }
    },
    mounted: function () {//启动
        document.title = this.siteTitle
    }
})

//主程序
function main() {
    //刷新时间
    setInterval(function () {
        app.time = new Date()
    }, 100);
}

//激活主程序
main()
