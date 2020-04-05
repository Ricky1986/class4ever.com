//Vue
const app = new Vue({
    el: '#app',
    data: {
        time: 0
    },
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
