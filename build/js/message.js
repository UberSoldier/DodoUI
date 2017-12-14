'use strict';
layui.define(['jquery', 'dodoconfig'], function(exports) {
    var $ = layui.jquery,
        dodoconfig = layui.dodoconfig,
        _modName = 'message',
        _doc = $('body'),
        _MESSAGE = '.dodo-message';
    var message = {
        v: '1.0.0',
        times: 1,
        _message: function() {
            var _msg = $(_MESSAGE);
            if (_msg.length > 0) {
                return _msg;
            }
            _body.append('<div class="dodo-message"></div>');
            return $(_MESSAGE);
        },
        show: function(options) {
            var that = this,
                _message = that._message(),
                id = that.times,
                options = options || {},
                skin = options.skin === undefined ? 'default' : options.skin,
                msg = options.msg === undefined ? '请输入一些信息！' : options.msg,
                autoClose = options.autoClose === undefined ? true : options.autoClose;
            var tpl = [
                '<div class="dodo-message-item layui-anim layui-anim-upbit" data-times="' + id + '">',
                '<div class="dodo-message-body dodo-skin-' + skin + '">',
                msg,
                '</div>',
                '<div class="dodo-close dodo-skin-' + skin + '"><i class="fa fa-times" aria-hidden="true"></i></div>',
                '</div>'
            ];
            _message.append(tpl.join(''));
            var _times = _message.children('div[data-times=' + id + ']').find('i.fa-times');
            _times.off('click').on('click', function() {
                var _t = $(this).parent('div.dodo-message-item').removeClass('layui-anim-upbit').addClass('layui-anim-fadeout');
                setTimeout(function() {
                    _t.remove();
                }, 1000);
            });
            if (autoClose) { // 是否自动刷新
                setTimeout(function() {
                    _times.click();
                }, 3000);
            }
            that.times++;
        }
    };
    layui.link(dodoconfig.resourcePath + 'css/message.css');
    exports('message', message);
});