window.onload=function () {
	var box=document.getElementById('box');
	var text=document.getElementsByTagName('input')[0];
	var Lbtn=document.getElementsByTagName('input')[1];
	var Rbtn=document.getElementsByTagName('input')[2];
	var LMbtn=document.getElementsByTagName('input')[3];
	var RMbtn=document.getElementsByTagName('input')[4];
	var adiv
	Lbtn.onclick=function(){
		alertValue('left')
	}

	Rbtn.onclick=function(){
		alertValue('right')
	}

	LMbtn.onclick=function(){
		if(box.children[0]){
			move()
			alert(box.children[0].innerHTML) 
			box.removeChild(box.children[0])
		}
	}

	RMbtn.onclick=function(){
		if(box.children[0]){
			move()
			alert((box.lastElementChild||box.lastChild).innerHTML) 
			box.removeChild(box.lastElementChild||box.lastChild)
			
		}
	}
	

	function move(){
		adiv=box.getElementsByTagName('div');
		for (var i = 0; i < adiv.length; i++) {
			adiv[i].onclick=function(){
				box.removeChild(this)
			}
		}
	}
	

	function alertValue(set){
		if (text.value==''||text.value.search(/^\d{1,3}$/)==-1) {
			alert('请输入1到3位的数字!');
		}else{
			var div=document.createElement('div');
			div.innerHTML=text.value;
			if (set=='right') {
				box.appendChild(div)
			}else{

				box.children?box.insertBefore(div,box.children[0]):box.appendChild(div)
			}
			text.value=''
			move()
		}	
	}

}




