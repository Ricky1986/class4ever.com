//取得frame
function getFrame(uri) {
    return `<iframe src="${uri}" class="main-frame"></iframe>`
}


//解析路由
var routes = []
for (let k in site.menu) {
    let v = site.menu[k]

    //解析一级菜单
    if (v.uri != undefined) routes[k] = { path: `/${v.path}`, component: { template: getFrame(v.uri) } }

    //解析二级菜单
    if (v.children != undefined) {
        for (let kk in v.children) {
            let vv = v.children[kk]
            routes[kk] = { path: `/${vv.path}`, component: { template: getFrame(vv.uri) } }
        }
    }
}
//设置404页面
const notFound = { path: `*`, component: { template: getFrame('404.html') } }
routes.push(notFound)

const router = new VueRouter({
    routes
})


//Vue
const app = new Vue({
    data: { //数据
        siteName: site.title,
        menu: site.menu,
        adminBar: false,
        menuOpen: 0
    },
    mounted: function () {
        document.title = this.siteName

        //如果默认首页路由不是空的,则跳转至第1个那个首页
        if (site.menu[0].path.length && this.$route.path == '/') this.$router.push(`/home`)
    },
    methods: {
        goto: function (key) {
            let _path = '/' + this.menu[key].path
            if (this.$route.path != _path) this.$router.push(_path)
        },
        logOut: function () {
            layer.confirm('真的退出吗？', {
                btn: ['是', '不是'] //按钮
            }, function () {
                layer.msg('的确很重要', { icon: 1 });
            }, function () {
                layer.msg('也可以这样', {
                    time: 20000, //20s后自动关闭
                    btn: ['明白了', '知道了']
                });
            });
        }
    },
    router
}).$mount('#app')