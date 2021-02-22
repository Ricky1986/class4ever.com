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
            uri: 'https://learnku.com/',
            site_name: 'LearnKu'
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
            uri: 'https://blog.class4ever.com/',
            site_name: '话语的服侍'
        },
        {
            uri: 'https://gitee.com/ricky1986',
            site_name: 'Ricky@Gitee'
        },
        {
            uri: 'https://github.com/ricky1986',
            site_name: 'Ricky@GitHub'
        },

        ],
    },
    mounted: function () {
        this.go_to_top()

        this.get_data()

        this.watch_height()

        //todo: 防止重复加载, 去掉"更多按钮", 没有更多后, 停止调用加载
        $(window).scroll(function () {
            let scrollTop = $(this).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(this).height();

            console.log('-----')
            console.log(scrollTop)
            console.log(scrollHeight)
            console.log(windowHeight)


            if (!app.is_loading && scrollTop + windowHeight > scrollHeight - 10)
                app.more()
        })


    },
    methods: {
        watch_height: function () {
            //距离顶部大于100时出现到顶部按钮
            $(window).on('scroll', () => {
                var fromTop = $(window).scrollTop(); // 已滚动卷去的高度

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
         * 显示更好看的时间 : 
         *
         *   diff(含)   
         *   0 ~ 86399 今天
         *   -86400 ~ -1 昨天
         *   -86400*2 ~ -86401 前天
         * 
         * */
        better_time: function (obj) {
            let date, diff

            diff = this.get_now() - obj.unixtime
            if (diff < 60)
                return diff + '秒前'
            if (diff < 3600)
                return parseInt(diff / 60) + '分钟前'

            diff = obj.unixtime - this.get_today()

            if (diff >= 0 && diff <= 86399)
                date = '今天'
            else if (diff >= -86400 && diff <= -1)
                date = '昨天'
            else if (diff >= -86400 * 2 && diff <= -86401)
                date = '前天'
            else
                date = this.date('Y-m-d', obj.unixtime)


            if (obj.type === 'christian')
                return date
            else {
                return date + ' ' + this.date('H:i:s', obj.unixtime)
            }
        },


        /**取得此刻时间戳 */
        get_now: function () {
            return parseInt(new Date().getTime() / 1000)
        },

        /**取得今天00:00:00的时间戳 */
        get_today: function () {
            return new Date(new Date().toDateString()).getTime() / 1000
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


