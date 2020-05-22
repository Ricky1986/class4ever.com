//这是配置文件

// 在此文件中设置网站标题, 和左侧菜单

const site = {
    title: 'Class4ever Admin UI',
    config: {
        default_path: '/home',
        log_out_action: './login',
        edit_pwd_action: './page/edit_pwd.html'
    },
    menu: [
        {
            path: '/home',
            title: '首页',
            uri: './page/home.html'
        },
        {
            path: '/idle',
            title: '摸鱼',
            children: [
                {
                    path: '/toutiao',
                    title: '今日头条',
                    uri: 'https://www.toutiao.com/'
                },
                {
                    path: '/csdn',
                    title: 'CSDN',
                    uri: 'https://www.csdn.net'
                },
            ]
        },
        {
            path: '/360',
            title: '360搜索',
            children: [
                {
                    path: '/36012',
                    title: '360搜索',
                    uri: 'https://www.so.com'
                },
                {
                    path: '/itellu12',
                    title: 'MSDN,我告诉你',
                    uri: 'https://msdn.itellyou.cn/'
                },
                {
                    path: '/bt12',
                    title: '宝塔面板',
                    uri: 'https://www.bt.cn'
                },
            ]
        },
        {
            path: '/itellu',
            title: 'MSDN,我告诉你',
            uri: 'https://msdn.itellyou.cn/'
        },
        {
            path: '/bt',
            title: '宝塔面板',
            uri: 'https://www.bt.cn'
        },
    ]
}