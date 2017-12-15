/** app.js */
'use strict';
var tab;
layui.define(['element', 'form', 'table', 'navbar', 'onelevel', 'laytpl', 'spa'], function(exports) {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        _win = $(window),
        _doc = $(document),
        // _body = $('.dodo-body'),
        form = layui.form,
        navbar = layui.navbar,
        table = layui.table,
        _componentPath = 'components/',
        spa = layui.spa;
    tab = layui.tab;
    var app = {
        hello: function(str) {
            layer.alert('Hello ' + (str || 'test'));
        },
        config: {
            type: 'iframe'
        },
        set: function(options) {
            var that = this;
            $.extend(true, this.config, options);
            return that;
        },
        init: function() {
            var that = this;
                _config = that.config;
            if (_config.type === 'spa') {
                navbar.bind(function(data) {
                    spa.render(data.url, function() {
                        console.log('渲染完成。。。');
                    });
                });
            }
            if (_config.type === 'page') {
                tab.set({
                    renderType: 'page',
                    mainUrl: 'table.html',
                    elem: '#container',
                    onSwitch: function(data) { //选项卡切换时触发
                        //console.log(data.layId); //lay-id值
                        //console.log(data.index); //得到当前Tab的所在下标
                        //console.log(data.elem); //得到当前的Tab大容器
                    },
                    closeBefore: function(data) { //关闭选项卡之前触发
                        // console.log(data);
                        // console.log(data.icon); //显示的图标
                        // console.log(data.id); //lay-id
                        // console.log(data.title); //显示的标题
                        // console.log(data.url); //跳转的地址
                        return true; //返回true则关闭
                    }
                }).render();
                // navbar 加载方式一，直接绑定已有的dom元素事件
                navbar.bind(function(data) {
                    tab.tabAdd(data);
                });
            }
            if (_config.type === 'iframe') {
                tab.set({
                    //renderType: 'iframe',
                    //mainUrl: 'table.html',
                    //openWait: false,
                    elem: '#container',
                    onSwitch: function(data) { //选项卡切换时触发
                        //console.log(data.layId); //lay-id值
                        //console.log(data.index); //得到当前Tab的所在下标
                        //console.log(data.elem); //得到当前的Tab大容器
                    },
                    closeBefore: function(data) { //关闭选项卡之前触发
                        // console.log(data);
                        // console.log(data.icon); //显示的图标
                        // console.log(data.id); //lay-id
                        // console.log(data.title); //显示的标题
                        // console.log(data.url); //跳转的地址
                        return true; //返回true则关闭
                    }
                }).render();
                navbar.bind(function(data) {
                    tab.tabAdd(data);
                });
                //navbar加载方式二，设置远程地址加载
                // navbar.set({
                //     remote: {
                //         url: '/datas/navbar1.json'
                //     }
                // }).render(function(data) {
                //     tab.tabAdd(data);
                // });
                //navbar加载方式三，设置data本地数据
                // navbar.set({
                //     data: [{
                //         id: "1",
                //         title: "基本元素",
                //         icon: "fa-cubes",
                //         spread: true,
                //         children: [{
                //             id: "7",
                //             title: "表格",
                //             icon: "&#xe6c6;",
                //             url: "test.html"
                //         }, {
                //             id: "8",
                //             title: "表单",
                //             icon: "&#xe63c;",
                //             url: "form.html"
                //         }]
                //     }, {
                //         id: "5",
                //         title: "这是一级导航",
                //         icon: "fa-stop-circle",
                //         url: "https://www.baidu.com",
                //         spread: false
                //     }]
                // }).render(function(data) {
                //     tab.tabAdd(data);
                // });

                // 处理顶部一级菜单
                var onelevel = layui.onelevel;

            }
        }
    };
    exports('app', app);
});