//解析路由
var routes = []
var whoHasChild = []
for (let k in site.menu) {
    //解析一级菜单
    let v = site.menu[k]
    let uri = v.uri == undefined ? '' : v.uri
    let node = { path: `/${v.path}`, component: { template: getFrame(uri) } }
    routes.push(node)

    // 解析二级菜单
    if (v.children != undefined) {
        whoHasChild.push(v.path)
        for (let kk in v.children) {
            let vv = v.children[kk]
            let node = { path: `/${vv.path}`, component: { template: getFrame(vv.uri) } }
            routes.push(node)
        }
    }
}

//添加404页面
const notFound = { path: `*`, component: { template: getFrame('404.html') } }
routes.push(notFound)

console.log(routes)
console.log(whoHasChild)

// 建立路由
const router = new VueRouter({
    routes
})


//Vue
const app = new Vue({
    data: { //数据
        siteName: site.title,
        menu: site.menu,
        adminBar: false,
        pathOpen: false
    },
    mounted: function () {
        document.title = this.siteName

        //如果默认首页路由不是空的,则跳转至第1个那个首页
        if (site.menu[0].path.length && this.$route.path == '/') this.$router.push(`/home`)
    },
    methods: {
        /**跳转或者打开菜单 */
        goto: function (path) {
            if (in_array(path, whoHasChild)) {//打开一级菜单
                this.pathOpen = this.pathOpen == path ? false : path
            } else {//直接路由
                let _path = '/' + path
                if (this.$route.path != _path) this.$router.push(_path)
            }
        },

        /**退出登录 */
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


/**取得iframe */
function getFrame(uri) {
    return `<iframe src="${uri}" class="main-frame"></iframe>`
}


/**通用方法: js版in_array */
function in_array(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}