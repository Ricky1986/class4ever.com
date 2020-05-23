/**预备 */
function prepare() {
    //vue使用的routes
    var routes = []
    //初始化路由表
    routeTable = []

    //复制菜单为路由
    let _route = JSON.parse(JSON.stringify(site.menu))

    //给路由添加 编辑密码 页面
    const editPwd = { path: '/edit_pwd', uri: site.config.edit_pwd_action }
    _route.push(editPwd)

    //给路由添加 404页面    
    const notFound = { path: '*', uri: './page/404.html' }
    _route.push(notFound)

    for (let k in _route) {
        //解析一级菜单
        let v = _route[k]
        let uri = v.uri == undefined ? '' : v.uri
        let node = { path: v.path, component: { template: getFrame(uri) } }
        routes.push(node)

        //构建路由表元素-1级的
        let nodeOfTable = {}

        if (v.children != undefined && v.children.length) {
            for (let kk in v.children) {
                // 解析二级菜单
                let vv = v.children[kk]
                let node = { path: vv.path, component: { template: getFrame(vv.uri) } }
                routes.push(node)

                //构建路由表元素-2级的
                let nodeOfTable2 = {}
                nodeOfTable2.hasChild = false//2级菜单没有小孩
                nodeOfTable2.parent = v.path

                //是外链则同时记录链接
                if (vv.is_ourter) {
                    nodeOfTable2.isOuter = true
                    nodeOfTable2.uri = vv.uri
                } else nodeOfTable2.isOuter = false

                //加入路由表
                routeTable[vv.path] = nodeOfTable2
            }

            //1级菜单是否有小孩
            nodeOfTable.hasChild = true
        } else nodeOfTable.hasChild = false

        //1级节点没有父级
        nodeOfTable.parent = false

        //是外链则同时记录链接
        if (v.is_ourter) {
            nodeOfTable.isOuter = true
            nodeOfTable.uri = v.uri
        } else nodeOfTable.isOuter = false

        //加入路由表
        routeTable[v.path] = nodeOfTable
    }

    // 建立vue路由器
    router = new VueRouter({ routes })
}


/**启动Vue */
function runVue() {
    app = new Vue({
        data: {
            showAdminBar: false, //是否显示adminBar
            pathOpen: false, //打开某1级菜单
        },

        mounted: function () {
            //书写网站标题
            document.title = site.title

            //无指定路由则跳转首页
            let _home = site.config.default_path
            if (this.$route.path == '/' && _home != '/')
                this.$router.push(_home)

            //打开当前菜单的父级
            this.shake()
        },

        methods: {
            /**跳转或者打开菜单 */
            goto: function (path) {
                let _node = routeTable[path]

                //是外链则弹出
                if (_node.isOuter)
                    window.open(_node.uri)

                //有小孩的打开自己
                else if (_node.hasChild)
                    this.pathOpen = this.pathOpen == path ? false : path

                //直接路由
                else if (this.$route.path != path)
                    this.$router.push(path)
            },


            /**左侧归位 */
            shake: function () {
                let _node = routeTable[this.$route.path]
                this.pathOpen = _node == undefined ? false : _node.parent

                this.showAdminBar = false
            },


            /**退出登录 */
            logOut: function () {
                layer.confirm('真的退出吗？', {
                    btn: ['是', '不是'] //按钮
                }, function () {
                    window.location.href = site.config.log_out_action
                }, function () {
                    layer.close()
                });
            }
        },

        router
    }).$mount('#app')
}


/**取得iframe */
function getFrame(uri) {
    return `<iframe src="${uri}" class="main-frame"></iframe>`
}


/**开始 */
var router, //路由器
    app,//vue程序
    routeTable //路由表

//启动预备进程
prepare()

//启动Vue
runVue()