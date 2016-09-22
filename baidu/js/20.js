window.onload=function () {
	var box		=	document.getElementById('box'),
		text	=	document.getElementById('text'),
		btn		=	document.getElementsByTagName('input'),
		Lbtn	=	btn[0],
		Rbtn	=	btn[1],
		LMbtn	=	btn[2],
		RMbtn	=	btn[3],
		randoms	=	btn[4],
		seekText=	btn[5],
		seek	=	btn[6],
		boxHTML	=	'',
		adiv;
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
	randoms.onclick=function(){
		var str=''
		for (var i = 0; i < 10; i++) {
			var num=Math.floor(Math.random()*999)
			str+='<div>'+num+'</div>'
		}
		box.innerHTML+=str;
		move()
	}
	seek.onclick=function(){
		move();
		if(seekText.value==''||seekText.value.search(/^[0-9a-zA-Z\u4e00-\u9fa5]{5,100}$/g)!=-1){
			alert('请输入正确的搜索信息');
			return
		}
		if (box.children.length==0) {
			alert('没有可以搜索的元素');
			return
		}
		for(var i=0;i<adiv.length;i++){
			if(adiv[i].innerHTML.indexOf(seekText.value)>-1){
				adiv[i].innerHTML=adiv[i].innerHTML.replace(seekText.value,'<span>'+seekText.value+'</span>')
			}
		}

	}

	function move(){
		adiv=box.getElementsByTagName('div');
		for (var i = 0; i < adiv.length; i++) {
			adiv[i].title='点击删除'
			adiv[i].onclick=function(){
				box.removeChild(this);
				
			}
			adiv[i].innerHTML=adiv[i].innerHTML.replace('<span>','');
			adiv[i].innerHTML=adiv[i].innerHTML.replace('</span>','')
		}
		
	}
	

	function alertValue(set){
		if (text.value==''||text.value.search(/[0-9a-zA-Z\u4e00-\u9fa5]{5,100}/g)!=-1) {
			alert('单个元素长度最多为4个字符')
			return
		}
		var arr=[]
		arr = text.value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/g)

		if (set=='left'){arr=arr.reverse()}

		for (var i = 0; i < arr.length; i++) {
			var div=document.createElement('div');
			div.innerHTML=arr[i];
			if (set=='right') {
				box.appendChild(div)
			}else{
				box.children?box.insertBefore(div,box.children[0]):box.appendChild(div)
			}
		}

		text.value=''
		move()
			
	}

}




