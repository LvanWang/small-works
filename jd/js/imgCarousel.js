
function imgCarousel(id){
	var imgCarousel=document.getElementById(id);
	var aA=imgCarousel.getElementsByTagName('a')
	var aImg=imgCarousel.getElementsByTagName('img')
	var aLi=imgCarousel.getElementsByTagName('li')
	var prev=imgCarousel.getElementsByTagName('div')[0]
	var next=imgCarousel.getElementsByTagName('div')[1]
	var num=0;
	var time=null;

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index=i
		aLi[i].onmouseover=function(){
			num=this.index;
			initialize()
		}
	}
	imgCarousel.onmouseover=function(){
		prev.style.display=next.style.display='block'
		clearTimeout(time)
	}
	imgCarousel.onmouseout=function(){
		prev.style.display=next.style.display='none'
		time=setInterval(fn,5000)
	}
	prev.onclick=function(){
		num--;
		initialize()
	}
	next.onclick=function(){
		fn()
	}
	
	time=setInterval(fn,5000)
	function initialize(){
		if (num>=6)num=0;
		else if (num<0) {num=5}
		for (var i = 0; i < aImg.length; i++) {
			if (i==num) continue
			aLi[i].style.background="#3e3e3e"
			aImg[i].style.opacity='0'
			aA[i].style.zIndex='0'
		}

		aLi[num].style.background="#b61b1f"
		aImg[num].style.opacity='1'
		aA[num].style.zIndex='1'

	}
	function fn(){
		num++;
		initialize()
	}
}

imgCarousel('imgCarousel1')