//解析路由
var routes = []
for (let k in site.menu) {
    let v = site.menu[k]
    let html = `<iframe src="${v.uri}" class="main-frame"></iframe>`
    routes[k] = { path: `/${v.path}`, component: { template: html } }
}
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