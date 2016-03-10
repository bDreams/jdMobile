/**
 * Created by dongjiabo on 2015/12/19.
 */
window.addEventListener('load',function(){
	// 复选框
	(function(){
		// 选取所有的复选框
		var checkBox = document.querySelectorAll('.shop-check');
		// 遍历所有的复选框
		for(var i = 0; i< checkBox.length-1; i++) {
			checkBox[i].addEventListener('click',function(){
				console.log(0);
				// 首先获得点击的元素的checked属性，如果没有这个属性,则为null
				var hasChecked = this.getAttribute('checked');
				if(hasChecked != null) {
					this.removeAttribute('checked')
				}
				else {
					this.setAttribute('checked','');
				}
			});
		}
		// 全选按钮效果，判断自身是否有checked属性
		// 如果有，就取消，也同时取消上面的所有复选框
		// 如果没有，就选中，也同时选中上面所有的复选框
		checkBox[checkBox.length-1].addEventListener('click',function(){
			var hasChecked = this.getAttribute('checked');
			if(hasChecked != null) {
				this.removeAttribute('checked')
				for(var i = 0;i< checkBox.length-1; i++) {
					checkBox[i].removeAttribute('checked');
				}
			}
			else {
				this.setAttribute('checked','');
				for(var i = 0; i< checkBox.length-1; i++) {
					checkBox[i].setAttribute('checked','');
				}
			}
		});
	})();
	
	// 删除按钮
	(function(){
		// 选取元素
		var mark = document.querySelector('.mark');
		var popup = document.querySelector('.popup');
		var deleteBox = document.querySelectorAll('.delete-box');
		// 取消按钮元素
		var cancel =  document.querySelector('.cancel');
		
		
		var up = null;
		for(var i = 0; i< deleteBox.length; i++) {
			deleteBox[i].index = i;
			deleteBox[i].addEventListener('click',function(){
				mark.style.display = 'block';
				popup.classList.add('jump');
				
				up = this.children[0];
				up.style.transition = "all 1s ease";
				up.style.transform = "translateX(-4px) translateY(-2px) rotate(-45deg)"
			});
		}
		
		// 取消按钮效果，点击取消，隐藏遮罩层，
		// 同时删除小按钮的盖子也要盖回去
		cancel.addEventListener('click',function(){
			mark.style.display = "none";
			up.style.transform = "translateX(0px) translateY(0px) rotate(0deg)";
		});

	})();
});