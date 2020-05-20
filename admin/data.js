//这是配置文件

// 在此文件中设置网站标题, 和左侧菜单






const site = {
    title: 'Class4ever Admin UI',
    // title: '网站后台',
    menu: [
        {
            path: '',
            title: '首页',
            uri: 'home.html'
        },
        {
            path: 'idle',
            title: '摸鱼',
            children: [
                {
                    path: 'toutiao',
                    title: '今日头条',
                    uri: 'https://www.toutiao.com/'
                },
                {
                    path: 'csdn',
                    title: 'CSDN',
                    uri: 'https://www.csdn.net'
                },
            ]
        },
        {
            path: '360',
            title: '360搜索',
            children: [
                {
                    path: '36012',
                    title: '360搜索',
                    uri: 'https://www.so.com'
                },
                {
                    path: 'itellu12',
                    title: 'MSDN,我告诉你',
                    uri: 'https://msdn.itellyou.cn/'
                },
                {
                    path: 'bt12',
                    title: '宝塔面板',
                    uri: 'https://www.bt.cn'
                },
            ]
        },
        {
            path: 'itellu',
            title: 'MSDN,我告诉你',
            uri: 'https://msdn.itellyou.cn/'
        },
        {
            path: 'bt',
            title: '宝塔面板',
            uri: 'https://www.bt.cn'
        },
        {
            path: 'w3c',
            title: 'w3school',
            uri: 'https://www.w3school.com.cn/'
        },
        {
            path: 'csdn3',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'baidu',
            title: '百度',
            uri: 'https://www.baidu.com'
        },
        {
            path: 'csdn2',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'csdn3',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'csdn4',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'csdn5',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'csdn6',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'csdn7',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
        {
            path: 'csdn8',
            title: 'CSDN',
            uri: 'https://www.csdn.net'
        },
    ]
}