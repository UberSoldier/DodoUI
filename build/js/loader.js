;'use strict';
layui.define(['jquery', 'nprogress'], function(exports) {
    var $ = layui.jquery,
        _modName = 'loader';

    var loader = {
        version: '1.0.1',
        load: function(options) {
            NProgress.start();
            var url = options.url,
                name = options.name,
                id = options.id,
                _elem = options.elem !== undefined ? $(options.elem) : $('#container');
            _elem.load(url, function(res, status, xhr) {
                if (status === 'error' && typeof options.onError === 'function') {
                    options.onError();
                }
                if (status === 'success') {
                    _elem.html(res);
                    typeof options.onSuccess === 'function' && options.onSuccess({name: name, id: id});
                }
                typeof options.onComplete === 'function' && options.onComplete();
                NProgress.done();
            });
        },
        /**
         * 动态加载script
         */
        getScript: function(url, callback) {
            $.getScript(url, callback());
        }
    };
    exports('loader', loader);
})