/*
 * @Author: dongjiabo
 * @Date:   2015-12-18 17:07:50
 * @Last Modified by:   dongjiabo
 * @Last Modified time: 2015-12-18 20:09:37
 */

'use strict';
window.addEventListener('load', function () {
    search();
    secondKill();
    sliderPic();

    //alert(a);
    //alert(window.a);
});
// 搜索栏
var search = function () {
    var search = document.querySelector('.jd-header-box');
    var slider = document.querySelector('.jd-slider');
    var h = slider.offsetHeight;
    window.addEventListener('scroll', function () {
        var t = document.body.scrollTop;
        /**
         * 当滚动的高度大于轮播图的高度的时候，搜索栏背景颜色固定
         * 不在颜色不再变动，当滚动的高度小于轮播图的高度的时候，
         * 是根据滚动的高度的变化，搜索的背景颜色随之渐变
         */
        if (t > h) {
            search.style.background = 'rgba(201, 21, 35, 0.85)';
        } else {
            var op = t / h * 0.85;
            search.style.background = 'rgba(201, 21, 35, ' + op + ')';
        }
    });
}


var secondKill = function () {
    var skTime = document.querySelector('.sk-time');
    var skTimes = document.querySelector('.sk-time').children;
    var times = 4 * 60 * 60;
    var timer = setInterval(function () {
        times--;
        var h = Math.floor(times / 60 / 60);
        var m = Math.floor(times / 60 % 60);
        var s = times % 60;
        skTimes[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
        skTimes[1].innerHTML = h % 10;
        skTimes[3].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
        skTimes[4].innerHTML = m % 10;
        skTimes[6].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
        skTimes[7].innerHTML = s % 10;
        if (times <= 0) {
            clearInterval(timer);
            skTime.style.display = 'none';
        }
    }, 1000);
}

var sliderPic = function () {
    // 获取轮播图的元素
    var slider = document.querySelector('.jd-slider');
    // 获取轮播图的宽度
    var sliderWidth = slider.offsetWidth;

    // 获取小圆点父盒子
    var circle = slider.getElementsByTagName('ul')[1];
    // 获取小圆点数组
    var circles = circle.getElementsByTagName('li');
    //console.log(circles);
    // 获取包裹图片的盒子
    var picBox = slider.getElementsByTagName('ul')[0];
    // console.log(picBox);

    var index = 1;
    var timer = null;
    // 添加过渡函数
    var addTransition = function () {
        picBox.style.transition = "all .3s ease 0s";
        picBox.style.webkitTransition = "all .3s ease 0s";
    }
    // 移除过渡函数
    var removeTransition = function () {
        picBox.style.transition = "none";
        picBox.style.webkitTransition = "none";
    }
    // 改变位置
    var setTransform = function (t) {
        picBox.style.transform = "translateX(" + t + "px)";
        picBox.style.webkitTransform = "translateX(" + t + "px)";
    }

    // 小圆点改变函数
    var circlesFn = function () {

        var iNow = index;
        if (index >= 9) {
            iNow = 1;
        } else if (index <= 0) {
            iNow = 8;
        }
        // 先清除所有的小圆点的样式 再给当前的小圆点添加样式
        for (var i = 0; i < circles.length; i++) {
            circles[i].className = " ";
        }
        circles[iNow - 1].className = "active";
    }
    // 开启定时器
    timer = setInterval(function () {
        index++;
        addTransition();
        setTransform(-index * sliderWidth);
    }, 2000)
    // 动画过渡完成之后做的事情，我们需要判断是不是最后一张或者说是第一张
    picBox.addEventListener('transitionEnd', function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        setTransform(-index * sliderWidth);
        circlesFn();
    });
    picBox.addEventListener('webkitTransitionEnd', function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        setTransform(-index * sliderWidth);
        circlesFn();
    })

    var startX = 0, endX = 0, moveX = 0;
    // 触摸开始，记录第一次的位置
    picBox.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });
    // 移动中，记录最后一次离开时的位置，并计算出移动的距离
    picBox.addEventListener('touchmove', function (e) {
        e.preventDefault();
        endX = e.touches[0].clientX;
        moveX = startX - endX;
        clearInterval(timer);
        removeTransition();
        setTransform(-index * sliderWidth - moveX);
    });
    // 触摸结束时，判断移动的距离，如果小于一张图片宽度的1/3，就回到原来的位置
    // 如果大于一张图片宽度的1/3，就移动位置
    picBox.addEventListener('touchend', function (e) {
        if(Math.abs(moveX) > (1/3*sliderWidth) && endX != 0) {
            // 判断移动的方向，当移动的距离大于0的时候，向左移动
            // 当移动的距离小于0的时候，向右移动
            if(moveX > 0) {
                index ++;
            } else {
                index -- ;
            }
            setTransform(-index*sliderWidth);
        }
        // 移动的距离不足一张的1/3宽度，回到原来的位置
        addTransition();
        setTransform(-index*sliderWidth);

        startX = endX = 0;
        // 在移动结束后，要开启定时器  为了严谨，先清除一下定时器
        clearInterval(timer);

        timer = setInterval(function () {
            index++;
            addTransition();
            setTransform(-index * sliderWidth);
        }, 2000)

    });
}