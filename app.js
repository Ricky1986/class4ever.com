var $ = layui.$
const app = new Vue({
    el: '#app',
    data: {
        list: [],
        type_current: 'all',
        page_current: 1,
        is_loading: false,
        is_end: false,
        hotlink: [{
            uri: '//www.v2ex.com',
            site_name: 'V2EX'
        },
        {
            uri: '//github.com',
            site_name: 'GitHub'
        },
        {
            uri: '//segmentfault.com/',
            site_name: 'SegmentFault'
        },
        {
            uri: '//stackoverflow.com/',
            site_name: 'Stack Overflow'
        },
        {
            uri: '//dev.to/',
            site_name: 'DEV Community'
        },
        {
            uri: '//www.cnblogs.com/',
            site_name: '博客园'
        },
        {
            uri: '//www.oschina.net',
            site_name: 'OSCHINA'
        },
        {
            uri: '//www.toutiao.com',
            site_name: '今日头条'
        },
        {
            uri: '//www.twle.cn',
            site_name: '简单教程'
        },
        {
            uri: '//www.36kr.com',
            site_name: '36氪'
        },
        {
            uri: 'https://gitee.com',
            site_name: 'Gitee'
        },
        {
            uri: 'https://whois.chinaz.com/',
            site_name: 'Whois查询'
        },
        {
            uri: 'https://icp.chinaz.com/',
            site_name: 'ICP查询'
        },
        {
            uri: 'https://blog.class4ever.com/',
            site_name: '话语的服侍'
        },
        {
            uri: 'https://gitee.com/ricky1986',
            site_name: 'ricky@Gitee'
        },
        {
            uri: 'https://github.com/ricky1986',
            site_name: 'ricky@GitHub'
        },

        ],
    },
    mounted: function () {
        this.get_data()

        this.watch_height()


    },
    methods: {
        watch_height: function () {
            //距离顶部大于100时出现到顶部按钮
            $(window).on('scroll', () => {
                var fromTop = $(window).scrollTop(); // 已滚动卷去的高度
                let windowHeight = $(window).height(); // 可视窗口的高度

                if (fromTop > 100)
                    $('.go-to-top').fadeIn()
                else
                    $('.go-to-top').fadeOut()
            })
        },

        /** 搞数据 */
        get_data: function () {
            this.is_loading = true
            let api = 'https://api.class4ever.com/updatelog'
            $.get(api, {
                type: this.type_current,
                page: this.page_current
            }, function (res) {
                if (res.code === 200) {
                    app.list = app.list.concat(res.data.list)
                    if (res.data.list.length < res.data.page_size)
                        app.is_end = true
                    app.is_loading = false
                }
            })
        },

        /**更改分类 */
        set_type: function (type) {
            this.type_current = type
            this.page_current = 1
            this.list = []
            this.is_end = false
            this.get_data()
            this.go_to_top()
        },

        /**取得类别 */
        get_type: function (site_id) {
            let table = {
                1: {
                    route: 'blog',
                    name: '博客',
                    style: 'layui-btn-normal'
                },
                10: {
                    route: 'system',
                    name: '系统',
                    style: 'layui-btn-danger'

                },
                11: {
                    route: 'christian',
                    name: '基督徒公众号',
                    style: ''
                },
                12: {
                    route: 'shuoshuo',
                    name: '说说',
                    style: 'layui-btn-primary'
                }
            }

            return table[site_id]
        },

        /**
            应用时间格式:
               @param format string 如'Y-m-d H:i:s'
               @param unixtime int Unix时间戳, 如 1604389233

               目前只支持关键字Y,m,d,H,i,s
        */
        date: function (format, unixtime) {
            t = new Date(unixtime * 1000)
            let Y = t.getFullYear()
            let m = (t.getMonth() + 1) < 10 ? ('0' + (t.getMonth() + 1)) : (t.getMonth() + 1)
            let d = t.getDate() < 10 ? ('0' + t.getDate()) : t.getDate()
            let H = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
            let i = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
            let s = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()

            return format.replace(/Y/g, Y).replace(/m/g, m).replace(/d/g, d).replace(/H/g, H).replace(/i/g, i).replace(/s/g, s)
        },

        /**搞到更多 */
        more: function () {
            this.page_current++
            this.get_data()
        },

        nl2br: function (str) {
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
        },

        go_to_top: function () {
            $("html,body").animate({
                scrollTop: 0
            }, 100);
        },
    }
})