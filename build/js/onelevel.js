'use strict';
layui.define(['jquery', 'laytpl', 'element'], function(exports) {
    var $ = layui.jquery,
        _modName = 'onelevel',
        _win = $(window),
        _doc = $(document),
        laytpl = layui.laytpl;

    var onelevel = {
        v: '1.0.1',
        config: {
            elem: undefined,
            data: undefined,
            remote: {
                url: undefined,
                type: 'GET'
            },
            onClicked: undefined
        },
        set: function(options) {
            var that = this;
            $.extend(true, that.config, options);
            return that;
        },
        /**
         * 是否已设置了elem
         */
        hasElem: function() {
            var that = this,
                _config = that.config;
            if (_config.elem === undefined && _doc.find('ul[dodo-one-level]').length === 0 && $(_config.elem)) {
                return false;
            }
            return true;
        },
        /**
         * 获取容器的jq对象
         */
        getElem: function() {
            var _config = this.config;
            return (_config.elem !== undefined && $(_config.elem).length > 0) ? $(_config.elem) : _doc.find('ul[dodo-one-level]');
        },
        render: function() {
            var that = this,
                _config = that.config,
                _remote = _config.remote,
                _tpl = [
                    '{{# layui.each(d,function(index, item) { }}',
                    '<li class="layui-nav-item">',
                    '<a href="javascript:void(0); data-title="{{item.title }}" data-icon="{{item.icon }}" data-id="{{item.id }}">',
                    '{{# if(item.icon.indexOf("fa-") !== -1) { }}',
                    '<i class="fa {{item.icon}}" aria-hidden="true"></i>',
                    '{{# }else { }}',
                    '<i class="layui-icon">{{item.icon}}</i>',
                    '{{# } }}',
                    '<span> {{item.title}}</span>',
                    '</a>',
                    '</li>',
                    '{{# }); }}'
                ],
                _data = [];
            var navbarLoadIndex = layui.load(2);
            if (!that.hasElem()) {
                return that;
            }
            var _elem = that.getElem();
            // 本地数据优先
            if (_config.data !== undefined && _config.data.length > 0) {
                _data = _config.data;
            } else {
                var dataType = _remote.jsonp ? 'jsonp' : 'json';
                var options = {
                    url: _remote.url,
                    type: _remote.type,
                    error: function(xhr, status, thrown) {
                        layui.hint().error('One-Level error: AJAX请求出错.' + thrown);
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
                    clearInterval(tIndex);
                }
                // 渲染模板
                laytpl(_tpl.join('')).render(_data, function(html) {
                    _elem.html(html);
                    layui.element.init();
                    typeof _config.onClicked === 'function' && _elem.children('li.layui-nav-item').off('click').on('click', function() {
                        var _a = $(this).children('a');
                            id = _a.data('id');
                            _config.onClicked(id);
                    });
                    // 关闭等待层
                    navbarLoadIndex && layer.close(navbarLoadIndex);
                    typeof _config.renderAfter === 'function' && _config.renderAfter(_elem);
                });
            }, 50);
            return that;
        }
    };
    exports('onelevel', onelevel);
});