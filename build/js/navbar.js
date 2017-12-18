'use strict';
layui.define(['layer', 'laytpl', 'element'], function(exports) {
    var $ = layui.jquery,
        layer = layui.layer,
        _modName = 'navbar',
        _win = $(window),
        _doc = $(document),
        laytpl = layui.laytpl,
        element = layui.element;

    var navbar = {
        v: '1.0.4',
        config: {
            data: undefined,  // 静态数据
            remote: {
                url: undefined, // 接口地址
                type: 'GET', // 请求方式
                jsonp: false // 跨域
            },
            cached: false, // 是否缓存
            elem: undefined, // 容器
            filter: 'dodoNavbar' // 过滤器名称
        },
        set: function(options) {
            var that = this;
            that.config.data = undefined;
            $.extend(true, that.config, options);
            return that;
        },
        /**
         * 是否已设置了elem
         */
        hasElem: function() {
            var that = this, _config = that.config;
            if (_config.elem === undefined && _doc.find('ul[dodo-navbar]').length === 0 && $(_config.elem)) {
                layui.hint().error('Navbar error:请配置navbar容器.');
                return false;
            }
            return true;
        },
        /**
         * 获取容器的jq对象
         */
        getElem: function() {
            var _config = this.config;
            return (_config.elem !== undefined && $(_config.elem).length > 0) ? $(_config.elem) : _doc.find('ul[dodo-navbar]');
        },
        /**
         * 绑定特定a标签的点击事件
         */
        bind: function(callback, params) {
            var that = this, _config = that.config;
            var defaults = {
                target: undefined,
                showTips: true
            };
            $.extend(true, defaults, params);
            var _target = defaults.target === undefined ? _doc : $(defaults.target);

            _target.find('a[dodo-target]').each(function() {
                var _that = $(this), tipsId = undefined;
                if (defaults.showTips) {
                    _that.hover(function() {
                        tipsId = layer.tips($(this).children('span').text, this);
                    }, function() {
                        if (tipsId) {
                            layer.close(tipsId);
                        }
                    });
                }
                _that.off('click').on('click', function() {
                    var options = _that.data('options');
                    var data;
                    if (options !== undefined) {
                        try {
                            data = new Function('return' + options)();
                        } catch (e) {
                            layui.hint().error('Navbar 组件 a[data-option]配置预存在语法错误：' + options);
                        }
                    } else {
                        data = {
                            icon: _that.data('icon'),
                            id: _that.data('id'),
                            title: _that.data('title'),
                            url: _that.data('url')
                        };
                    }
                    typeof callback === 'function' && callback(data);
                });
            });
            $('.dodo-side-fold').off('click').on('click', function() {
                var _side = _doc.find('div.dodo-side');
                if (_side.hasClass('dodo-sided')) {
                    _side.removeClass('dodo-sided');
                    _doc.find('div.layui-body').removeClass('dodo-body-folded');
                    _doc.find('div.layui-footer').removeClass('dodo-footer-folded');
                } else {
                    _side.addClass('dodo-sided;');
                    _doc.find('div.layui-body').addClass('dodo-body-folded');
                    _doc.find('div.layui-footer').addClass('dodo-footer-folded');
                }
            });
            return that;
        },
        /**
         * 渲染navbar
         */
         render: function(callback) {
            var that = this,
                _config = that.config, // 配置
                _remote = _config.remote, // 远程参数配置
                _tpl = [
                    '{{# layui.each(d, function(index, item){ }}',
                    '{{# if(item.spread){ }}',
                    '<li class="layui-nav-item layui-nav-itemed">',
                    '{{# }else{ }}',
                    '<li class="layui-nav-item">',
                    '{{# } }}',
                    '{{# var hasChildren = item.children!==undefined && item.children.length>0; }}',
                    '{{# if(hasChildren){ }}',
                    '<a href="javascript:void(0);">',
                    '{{# if (item.icon.indexOf("fa-") !== -1) { }}',
                    '<i class="fa {{item.icon}}" aria-hidden="true"></i>',
                    '{{# }else{ }}',
                    '<i class="layui-icon">{{item.icon}}</i>',
                    '{{# } }}',
                    '<span> {{item.title}}</span>',
                    '</a>',
                    '{{# var children = item.children; }}',
                    '<dl class="layui-nav-child">',
                    '{{# layui.each(children, function(childrenIndex, child){ }}',
                    '<dd>',
                    '<a href="javascript:void(0);" dodo-target data-option="{url:\'{{child.url }}\',icon:\'{{child.icon }}\',title:\'{{child.title }}\',id:\'{{child.id }}\'}">',
                    '{{# if (child.icon.indexOf("fa-") !== -1) { }}',
                    '<i class="fa {{child.icon }}" aria-hidden="true"></i>',
                    '{{# }else{ }}',
                    '<i class="layui-icon">{{child.icon }}</i>',
                    '{{# } }}',
                    '<span> {{child.title }}</span>',
                    '</a>',
                    '</dd>',
                    '{{# }); }}',
                    '</dl>',
                    '{{# }else{ }}',
                    '<a href="javascript:void(0); dodo-target data-option="{url:\'{{item.url }}\',icon:\'{{item.icon }}\',title:\'{{item.title }}\',id:\'{{item.id}}\'">',
                    '{{# if (item.icon.indexOf("fa-") !== -1) { }}',
                    '<i class="fa {{item.icon }} aria-hidden="true"></i>',
                    '{{# }else{ }}',
                    '<i class="layui-icon">{{item.icon }}</i>',
                    '{{# } }}',
                    '<span> {{item.title }}</span>',
                    '</a>',
                    '{{# } }}',
                    '</li>',
                    '{{# }); }}'
                ], // 模板
                _data = [];
            var navbarLoadIndex = layer.load(2);
            if (!that.hasElem()) {
                return that;
            }
            var _elem = that.getElem();
            // 本地数据优先
            if (_config.data !== undefinded && _config.data.length > 0) {
                _data = _config.data;
            } else {
                var dataType = _remote.jsonp ? 'jsonp' : 'json';
                var options = {
                    url: _remote.url,
                    type: _remote.type,
                    error: function(xhr, status, thrown) {
                        layui.hint().error('Navbar error: AJAX 请求出错.' + thrown);
                        navbarLoadIndex && layer.close(navbarLoadIndex);
                    },
                    success: function(res) {
                        _data = res;
                    }
                };
                $.extend(true, options, _remote.jsonp ? {
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'jsonpCallback'
                } : {
                    dataType: 'json'
                });
                $.support.cors = true;
                $.ajax(options);
            }
            var tIndex = setInterval(function() {
                if (_data.length > 0) {
                    clearInterval(tIndex );
                    // 渲染模板
                    laytpl(_tpl.join('')).render(_data, function(html) {
                        _elem.html(html);
                        element.init();
                        // 绑定a标签的点击事件
                        that.bind(function(data) {
                            typeof callback === 'function' && callback(data);
                        });
                        // 关闭等待层
                        navbarLoadIndex && layer.close(navbarLoadIndex);
                    });
                }
            }, 50);
            return that;
         }
    };
    exports('navbar', navbar);
});