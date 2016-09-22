window.onload=function () {
	var box		=	document.querySelector('#box'),
		input	=	document.querySelectorAll('input'),
		text	=	input[0],
		Lbtn	=	input[1],
		Rbtn 	=	input[2],
		LMbtn	=	input[3],
		RMbtn	=	input[4],
		random	=	input[5],
		sort1	=	input[6],
		sort2	=	input[7],
		sort3	=	input[8],
		adiv,
		time;
	Lbtn.onclick=function(){
		alertValue('left')
	}

	Rbtn.onclick=function(){
		alertValue('right');
	}

	LMbtn.onclick=function(){
		move(function(){
			alert(box.children[0].offsetHeight) 
			box.removeChild(box.children[0])
		})
	}

	RMbtn.onclick=function(){
		move(function(){
			alert((box.lastElementChild||box.lastChild).offsetHeight) 
			box.removeChild(box.lastElementChild||box.lastChild)
		})
	}
	
	random.onclick=function(){
		onRandom();
	}	

	sort1.onclick=function(){
		onsort1();
	}

	sort2.onclick=function(){
		onsort2();
	}

	sort3.onclick=function(){
		onsort3();
	}
	function move(fn){
		if(box.children[0]){
			adiv=box.querySelectorAll('div')
			for (var i = 0; i < adiv.length; i++) {
				adiv[i].onclick=function(){
					box.removeChild(this)
				}
			}
			if(fn){fn()}
		}else{
			alert('没有可以删除的元素！')
		}
		
	}
	

	function alertValue(set){
		if (text.value==''||text.value.search(/^([1-9]\d|1[0]{2})$/)==-1) {
			alert('请输入10到100之间的数字!');
		}else{
			var div=document.createElement('div');
			div.style.height=text.value+'px';
			if (set=='right') {
				box.appendChild(div)
			}else{

				box.children?box.insertBefore(div,box.children[0]):box.appendChild(div)
			}
			text.value=''
			move()
		}	
	}

	function onRandom(){
		clearTimeout(time)
		box.innerHTML=''
		var str=''
		for (var i = 0; i < 10; i++) {
			var div=document.createElement('div');
			div.style.height=Math.floor(Math.random()*90)+10+'px';
			box.appendChild(div);
		}
		move()
	}

	function onsort1(){
		clearTimeout(time)
		var j		=	0,
			adiv	=	box.querySelectorAll('div'),
			len 	=	adiv.length,
			i 		=	len-1;
		if (!len||len==1) {
			alert('不需要排列！') 
			return
		}
		
		time=setInterval(function(){
			if (i<1) {
				clearTimeout(time)
			}
			
			if(j>=i){
				i--;
				j=0;
				
			}
			if (adiv[j].offsetHeight>adiv[j+1].offsetHeight) {
				replace(adiv[j],adiv[j+1]);
			}
			j++
		},50)
	}

	function onsort2(){
		clearTimeout(time)
		var j		=	1,
			adiv	=	box.querySelectorAll('div'),
			len 	=	adiv.length,
			i 		=	0,
			min		=	0;
		if (!len||len==1) {
			alert('不需要排列！') 
			return
		}
		
		time=setInterval(function(){
			if (i>=len-1) {
				clearTimeout(time)
			}
			if(j>=len){
				replace(adiv[min],adiv[i]);
				i++;
				j=i+1;
				min=i;
			}
			if (adiv[j]&&adiv[min].offsetHeight>adiv[j].offsetHeight) {
				min=j
			}
			j++
		},50)
	}

	function onsort3(){
		clearTimeout(time)
		var j		=	0,
			adiv	=	box.querySelectorAll('div'),
			len 	=	adiv.length,
			i 		=	0,
			inner 	=	true,
			outer	=	false,
			compare;

		if (!len||len==1) {
			alert('不需要排列！') 
			return
		}
		
		time=setInterval(function(){
			if (inner){
				if (i>len-2) {return}
				if (adiv[i+1].offsetHeight&&adiv[i].offsetHeight>adiv[i+1].offsetHeight) {
					compare=adiv[i+1].offsetHeight;
					adiv[i+1].style.height=adiv[i].style.height;
					adiv[i].style.height=compare+'px';
					inner=!inner;
					outer=!outer;
					j=i;
				}else{
					i++
				}

			}
			if (outer) {

				if (adiv[j-1]&&adiv[j].offsetHeight<adiv[j-1].offsetHeight) {
					compare=adiv[j].offsetHeight;
					adiv[j].style.height=adiv[j-1].style.height;
					adiv[j-1].style.height=compare+'px';
					j--;
				}else{
					inner=!inner;
					outer=!outer;
					i++;
				}
					
			}
				
		},50)
	}



}

function replace(ev1,ev2){
	var evH=ev1.offsetHeight;
	ev1.style.height=ev2.offsetHeight+'px';
	ev2.style.height=evH+'px';
}


