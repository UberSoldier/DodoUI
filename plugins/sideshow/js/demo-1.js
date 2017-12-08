'use strict';
(function() {
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    initHeader();

    function initHeader() {
        width = window.innerWidth(); // 这种写法不兼容IE8，可使用jQuery.js 的 $(window).width() 方法代替
        height = window.innerHeight();
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById("large-header");
        largeHeader.style.height = height + "px";

        canvas = document.getElementById("demo-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // 创建指针
        points = [];
        for (var x = 0; x < width; x = x + width/20) {
            for (var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random() * width/20;
                var py = y + Math.random() * height/20;
                var p = {x: px, originX: px, y: py, originY: py};
                points.push(p);
            }
        }

        // 遍历指针 得到5个相邻的指针
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j];
                if(!p1 == p2) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < 5; K++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
                p1.closest = closest;
            }
        }
    }

    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
})();