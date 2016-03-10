/**
 * Created by dongjiabo on 2015/12/19.
 */
'use strict';
window.addEventListener('load',function(){
	// 左边导航栏效果
	(function () {
		var parentBox = document.querySelector('.nav');
		var childBox = document.querySelector('.navbar');
		var topBox = document.querySelector('header');
		var childLi = childBox.getElementsByTagName('li');
		//alert(childLi.length);
		var height = parentBox.offsetHeight - topBox.offsetHeight;
		//console.log(height);

		var h = childBox.offsetHeight - parentBox.offsetHeight + topBox.offsetHeight;
		var currY = 0, startY = 0, endY = 0, moveY = 0;
		var disY = 150;
		var startTime = 0;
		var endTime = 0;
		var addTransition = function () {
			childBox.style.transition = "all .3s e se 0s";
			childBox.style.webkitTransition = "all .3s ease 0s";
		};
		var removeTransition = function () {
			childBox.style.transition = "none";
			childBox.style.webkitTransition = "none";
		};
		var setTransform = function (t) {
			childBox.style.transform = "translateY(" + t + "px)";
			childBox.style.webkitTransform = "translateY(" + t + "px)";
		};

		childBox.addEventListener('touchstart', function (e) {
			startY = e.touches[0].clientY;
			
			startTime = new Date().getTime();
		}, false);
		childBox.addEventListener('touchmove', function (e) {
			e.preventDefault();
			endY = e.touches[0].clientY;

			moveY = startY - endY;
			if (currY - moveY < disY && currY - moveY > -h - disY) {
				removeTransition();
				setTransform(currY - moveY);
			}
		}, false);
		childBox.addEventListener('touchend', function (e) {
			endTime = new Date().getTime();
			if((currY-moveY)>=0) {
				addTransition();
				setTransform(0);
				currY = 0;
			}else if((currY-moveY)<=-h) {
				addTransition();
				setTransform(-h);
				currY = -h;
			}else {
				currY = currY - moveY;
			}
		
			if(endTime - startTime < 150 && moveY == 0) {
				for(var i = 0; i < childLi.length; i++) {
					childLi[i].className = " ";
					childLi[i].index = i;
				}
				
				var li = e.target.parentNode;
				li.className = "active";
				var translateY = li.index * 50;
				if(translateY < h) {
					addTransition();
					setTransform(-translateY);
					currY = - translateY;
				}else {
					addTransition();
					setTransform(-h);
					currY = -h;
				}
			}
		
			var tabs = document.querySelector('.tabs');
			tabs.style.transition = "all .3s ease 0s";
			tabs.style.webkitTransition = "all .3s ease 0s";
			tabs.style.opacity = 0;
			setTimeout(function(){
				tabs.style.opacity = 1;
			},200);
		}, false);
	})();
	// 右侧商品板块切换效果
	(function () {
		var parentBox = document.querySelector('.goods-list');
		var childBox = document.querySelector('.tabs');
		//alert(childLi.length);
		var height = parentBox.offsetHeight ;
		console.log(height);
		console.log(childBox.offsetHeight);
		var h = childBox.offsetHeight - height;
		console.log(h);
		var currY = 0, startY = 0, endY = 0, moveY = 0;
		var disY = 150;
		var startTime = 0;
		var endTime = 0;
		var addTransition = function () {
			childBox.style.transition = "all .3s e se 0s";
			childBox.style.webkitTransition = "all .3s ease 0s";
		};
		var removeTransition = function () {
			childBox.style.transition = "none";
			childBox.style.webkitTransition = "none";
		};
		var setTransform = function (t) {
			childBox.style.transform = "translateY(" + t + "px)";
			childBox.style.webkitTransform = "translateY(" + t + "px)";
		};

		childBox.addEventListener('touchstart', function (e) {
			startY = e.touches[0].clientY;
			
			startTime = new Date().getTime();
		}, false);
		childBox.addEventListener('touchmove', function (e) {
			e.preventDefault();
			endY = e.touches[0].clientY;

			moveY = startY - endY;
			if (currY - moveY < disY && currY - moveY > -h - disY) {
				removeTransition();
				setTransform(currY - moveY);
			}
		}, false);
		childBox.addEventListener('touchend', function (e) {
			endTime = new Date().getTime();
			if((currY-moveY)>=0) {
				addTransition();
				setTransform(0);
				currY = 0;
			}else if((currY-moveY)<=-h) {
				addTransition();
				setTransform(-h);
				currY = -h;
			}else {
				currY = currY - moveY;
			}

		}, false);
	})();
});




