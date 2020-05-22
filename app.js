//Vue
const app = new Vue({
    el: '#app',
    data: {
        time: '',
        ts: '',
        timestamp: '',
        siteTitle: 'Class4ever Pages',
        project: [
            {
                title: 'Slashmark',
                ver: '0.1',
                uri: '/slashmark/',
                desc: '',
                blog: ''
            },
            {
                title: 'Wikilog',
                ver: '1.0.5',
                uri: '',
                desc: '<img src="https://blog.class4ever.com/wp-content/uploads/2019/04/gh_34fbae86e3c8_258-2.jpg"  alt="qrcode" style="width:100px;margin:0 auto;">',
                blog: ''

            },
            {
                title: 'Class4ever Admin UI',
                ver: '0.2.2',
                uri: '/admin_ui/',
                desc: '基于Vue.js的后台前端样式',
                blog: '//blog.class4ever.com/2352.html'
            }
        ]
    },
    mounted: function () {//启动
        document.title = this.siteTitle
    },
    computed: {
        time2: function () {
            console.log(is_int(this.ts))
            if (str_is_int(this.ts)) {
                let a = datetime(this.ts)
                // let b=datetime(a)
                return `${a.Y}年${a.m}月${a.d}日 ${a.H}:${a.i}:${a.s}`
            }
            // return this.ts


        }
    }
})

//主程序
function main() {
    //刷新时间
    setInterval(function () {
        app.time = new Date()
        app.timestamp = parseInt(app.time.getTime() / 1000)
    }, 100);

    //
}

/**时间戳转时间 */
function datetime(timestamp) {
    let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    return obj = {
        Y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds()
    }
}

function is_int(obj) {
    return Math.round(obj) === obj
}

function str_is_int(str) {
    return /^\d+$/.test(str)
}
// console.log('ddd')
// console.log(str_is_int('123d'))

//激活主程序
main()

new ClipboardJS('.btn-copy');