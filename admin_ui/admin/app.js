//取得frame
function getFrame(uri) {
    return `<iframe src="${uri}" class="main-frame"></iframe>`
}


//解析路由
var routes = []
for (let k in site.menu) {
    let v = site.menu[k]
    routes[k] = { path: `/${v.path}`, component: { template: getFrame(v.uri) } }
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
        }
    },
    router
}).$mount('#app')