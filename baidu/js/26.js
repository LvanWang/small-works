var hjobj=[
	{id:1,commond:"not","i":0,j:0,r:17},
	{id:2,commond:"not","i":0,j:0,r:77},
	{id:3,commond:"not","i":0,j:0,r:137},
	{id:4,commond:"not","i":0,j:0,r:197},
]

var img=new Image();
    img.src="img/hj.png";

var btn1=document.getElementById("btn");
var btn2,This
var form=document.getElementById('console')
var bulletin=document.getElementById('bulletin')

var can=document.getElementById('can')
var ctx=can.getContext("2d");
can.width=700;
can.height=670;
btn1.onclick=btn


initialize(hjobj)
setInterval(function(){

	ctx.clearRect(0,0,700,670)
	orbit(ctx)
  hj(ctx,hjobj)

},50)
function btn(e){
  var e=e||event
  var off=false;
  form.innerHTML=''
  for (var i = 0; i <hjobj.length; i++){
    if (!off){
      if(hjobj[i].commond=='not'){
          hjobj[i].commond='stop'
          off=true;
          bulletin.innerHTML='<p>'+(i+1)+'号飞船已创建！</p>'+bulletin.innerHTML

      }

    }
    if(hjobj[i].commond!='not')
      form.innerHTML+="<label data-id='"+(i+1)+"'>对"+(i+1)+"号飞船下达指令：<button>开始飞行</button><button>停止飞行</button><button>销毁</button></label><br>";
          
    btn2=form.getElementsByTagName('button')
    for (var j = 0; j < btn2.length; j++)
      btn2[j].onclick=function(e){
        This=this
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        bulletin.innerHTML='<p>命令已发出！</p>'+bulletin.innerHTML
        var id=This.parentNode.dataset.id
        if (This.innerText=='销毁'){
            form.removeChild(This.parentNode)
          }
        setTimeout(function(){

        console.log(This)
          if(Math.random()>0.33){
            if (This.innerText=='开始飞行'){
              if(hjobj[id-1].commond!='exercise')
                hjobj[id-1].commond='exercise';
              else
                return
            }
            if (This.innerText=='停止飞行')hjobj[id-1].commond='stop'
            if (This.innerText=='销毁'){
              hjobj[id-1].i=0;
              hjobj[id-1].j=0;
              hjobj[id-1].commond='not';
            }
            bulletin.innerHTML='<p>'+id+'号飞船已'+This.innerText+'！</p>'+bulletin.innerHTML
          }else{
              bulletin.innerHTML='<p>'+id+'号飞船：‘'+This.innerText+'’ 命令未接收到！</p>'+bulletin.innerHTML
          }
        },1000)
      }
    } 
}
function orbit(ctx){
	ctx.strokeStyle='#ccc';
	ctx.fillStyle="blue";
	ctx.beginPath()
    ctx.arc(350,335,70,0,2*Math.PI);
    ctx.fill()

	ctx.beginPath()
    ctx.arc(350,335,320,0,2*Math.PI);
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(350,335,260,0,2*Math.PI);
	ctx.stroke()
		 
	ctx.beginPath()
    ctx.arc(350,335,200,0,2*Math.PI);
	ctx.stroke()

	ctx.beginPath()
    ctx.arc(350,335,140,0,2*Math.PI);
	ctx.stroke()
}

function initialize(obj){
  for (var i = 0; i < obj.length; i++){
  	  obj[i].r=(obj[i].id-1)*60+17
      obj[i].rx =350; obj[i].ry = 335; 
      obj[i].px =350; obj[i].py =obj[i].r; 
      obj[i].radius = obj[i].ry - obj[i].py;
  }
}
function hj(ctx,obj){
  for (var i = 0; i < obj.length; i++)
    if (obj[i].commond!='not'){
      ctx.beginPath() 
      obj[i].angle = obj[i].i * Math.PI / 180;
      obj[i].dx = obj[i].rx + obj[i].radius * Math.sin(obj[i].angle); 
      obj[i].dy = obj[i].ry - obj[i].radius * Math.cos(obj[i].angle);
      if (obj[i].j>=400||obj[i].commond=='stop') {
      	obj[i].commond='stop';

      	if(obj[i].j>=0)
      		obj[i].j-=2
      	
      }else if (obj[i].commond=="exercise"){
          obj[i].i+=1+(obj[i].id/2);
          obj[i].j++
      }

      if (obj[i].j<=200)
      	ctx.fillStyle="green"
      else if(obj[i].j>=320)
      	ctx.fillStyle="red"
      else
      	ctx.fillStyle="yellow" 
      
      ctx.save();
      ctx.translate(obj[i].dx,obj[i].dy);
      ctx.rotate(obj[i].angle);
      ctx.translate(-obj[i].dx, -obj[i].dy);
      ctx.drawImage(img, obj[i].dx - img.width / 2, obj[i].dy - img.height / 2);
      ctx.fillRect(obj[i].dx+32,obj[i].dy-21,10,40-obj[i].j/10)
      ctx.restore();
    }
}