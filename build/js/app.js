/** app.js */
var tab;
layui.define(['element', 'form', 'table', 'laytpl'], function(exports) {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        _win = $(window),
        _doc = $(document),
        // _body = $('.dodo-body'),
        form = layui.form,
        table = layui.table;
    tab = layui.tab;
    var app = {

    };
    exports('app', app);
});