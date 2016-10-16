var  aSection = document.getElementsByName('section')
var  aRetract = document.getElementsByName('retract')
var  aSpan = document.getElementsByName('span')
var  aLabel = document.getElementsByName('label')
var imgClick=document.getElementById('imgClick')
var img=document.getElementsByTagName('img')[0]
for (var i = 0; i < aSection.length; i++) {
	aSection[i].off=true
	aSection[i].index=i
	aLabel[i].text=aLabel[i].innerHTML
	aSection[i].onclick=function () {

		if(this.off){
			this.off=false
			aRetract[this.index].style.display='block'
			aSpan[this.index].className='open'
			aLabel[this.index].innerHTML=''
			this.style.background='#ccc'
		}else{
			this.off=true
			aRetract[this.index].style.display='none'
			aSpan[this.index].className='close'
			aLabel[this.index].innerHTML=aLabel[this.index].text
			this.style.background=''

		}
	}
}
imgClick.onmouseover=function(){
	this.style.background='#ccc'
}
imgClick.onmouseout=function(){
	this.style.background=''
	img.style.display='none'
}
imgClick.onclick=function(){
	img.style.display='block'
}