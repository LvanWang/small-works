window.onload=function () {
	var box		=	document.getElementById('box1'),
		box2	=	document.getElementById('box2'),
		btn		=	document.getElementsByTagName('input'),
		text1	=	btn[0],
		text2	=	document.getElementById('text'),
		tBtn	=	btn[1],
		ali;
	text1.onfocus=function(){
		document.onkeydown=function(){
			newli(undefined,text1,box1,false)
		}
	}
	text1.onblur=function(){
		document.onkeydown=null;
	}

	tBtn.onclick=function(){
		newli(undefined,text2,box2,true)
	}
	function newli(e,val,obj,bull){
		e=e||event;
		var arr=[]
		arr = val.value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/g)
		if ((e.keyCode==13||e.keyCode==1||e.keyCode==188||bull)&&arr.length) {
			arr=arr.reverse()
			for (var i = 0; i < arr.length; i++) {
				var str=new RegExp('>'+arr[i]+'<')
				if (!str.test(obj.innerHTML)) {
					var li=document.createElement('li');
					li.innerHTML=arr[i];
					obj.children?obj.insertBefore(li,obj.children[0]):obj.appendChild(li)
				}
				if(obj.getElementsByTagName('li').length>10){
					obj.removeChild(obj.children[10])

				}
			}
			val.value=''
			move()
		}
	}
	function move(){
		ali=document.getElementsByTagName('li');
		for (var i = 0; i < ali.length; i++) {
			ali[i].onmouseover=function(){
				this.liHTML=this.innerHTML
				this.innerHTML='删除:'+this.innerHTML
			}
			ali[i].onmouseout=function(){
				this.innerHTML=this.liHTML
			}
			ali[i].onclick=function(e){
				this.parentNode.removeChild(this);
			}
		}
		
	}
}




