var hjobj=[
  '1001100',
  '2001100',
  '3001100',
  '4001100'
]
var genre={
'00':{sd:30,consume:5,supply:2},
'01':{sd:30,consume:5,supply:3},
'02':{sd:30,consume:5,supply:4},
'10':{sd:50,consume:7,supply:2},
'11':{sd:50,consume:7,supply:3},
'12':{sd:50,consume:7,supply:4},
'20':{sd:90,consume:9,supply:2},
'21':{sd:90,consume:9,supply:3},
'22':{sd:90,consume:9,supply:4}
}
var sd=document.getElementById('sd').getElementsByTagName('input')
var replenish=document.getElementById('replenish').getElementsByTagName('input')

var img=new Image();
    img.src="img/hj.png";

var btn1=document.getElementById("btn");
var btn2,This,arr=[{},{},{},{}]
var form=document.getElementById('console')
var bulletin=document.getElementById('bulletin')

var can=document.getElementById('can')
var ctx=can.getContext("2d");
var w=can.width=700;
var h=can.height=670;
btn1.onclick=btn

setInterval(function(){

	ctx.clearRect(0,0,w,h)
	orbit(ctx)
  hj(ctx,hjobj,arr)

},50)


function btn(e){
  var e=e||event
  var off=true;
  form.innerHTML=''
  for (var i = 0; i < sd.length; i++) {
    if(sd[i].checked ==true)var speed=sd[i].value.toString();
    if(replenish[i].checked ==true)var supply=replenish[i].value.toString()

  }
  for (var i = 0; i <hjobj.length; i++){
    var exercise=(/0001$/).test(hjobj[i])
    var stop=(/0010$/).test(hjobj[i])

    if (off){
      
      if(!stop&&!exercise){
        hjobj[i]=hjobj[i].substring(0,1)+speed+supply+'0010'
          stop=true;
          off=false;
          bulletin.innerHTML='<p>'+(i+1)+'号飞船已创建！</p>'+bulletin.innerHTML
      }
    }
    
    if(exercise||stop)
      form.innerHTML+="<label data-id='"+(i+1)+"'>对"+(i+1)+"号飞船下达指令：<button>开始飞行</button><button>停止飞行</button><button>销毁</button></label><br>";
    
    
    btn2=form.getElementsByTagName('button')
    for (var j = 0; j < btn2.length; j++)
      btn2[j].onclick=function(e){
        This=this
        e.preventDefault ? e.preventDefault() : e.returnValue = false; 
        var id=This.parentNode.dataset.id
        bulletin.innerHTML='<p>'+id+'号飞船:'+This.innerText +'  命令已发出！</p>'+bulletin.innerHTML
        if (This.innerText=='销毁'){
            form.removeChild(This.parentNode)
          }
        fn(id)
      }
    } 
}
function fn(id){
  setTimeout(function(){

          if(Math.random()>0.33){
              if (This.innerText=='开始飞行'){
                  if(!(/0001$/).test(hjobj[id-1]))
                      hjobj[id-1]=hjobj[id-1].substring(0,3)+'0001'
                  else
                      return
              }
              if (This.innerText=='销毁'){
                  hjobj[id-1]=hjobj[id-1].substring(0,3)+'1100'
                  arr[id-1].i=0;
                  arr[id-1].ene=1000;
              }
              if (This.innerText=='停止飞行')hjobj[id-1]=hjobj[id-1].substring(0,3)+'0010'
              bulletin.innerHTML='<p>'+id+'号飞船已'+This.innerText+'！</p>'+bulletin.innerHTML
              
          }else{
              bulletin.innerHTML='<p>'+id+'号飞船：‘'+This.innerText+'’ 命令未接收到！正在重新发送命令！</p>'+bulletin.innerHTML
              fn.apply(This,[id])
          }
        },300)
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

function hj(ctx,obj,arr){
  for (var i = 0; i < obj.length; i++){
    var num=obj[i].substring(1,3)
    var exercise=(/01$/).test(obj[i])
    var stop=(/10$/).test(obj[i])
    arr[i].i=(arr[i].i>0?arr[i].i:0)
    arr[i].ene=(arr[i].ene<1000?arr[i].ene:1000)
    
    if (exercise||stop){
      ctx.beginPath() 

      arr[i].angle = arr[i].i * Math.PI / 180;
      arr[i].dx = 350+ (318 - i*60)* Math.sin(arr[i].i * Math.PI / 180); 
      arr[i].dy = 335- (318 - i*60)* Math.cos(arr[i].i * Math.PI / 180);


      if(arr[i].ene<=1000)
        arr[i].ene+=genre[num].supply
      else
        arr[i].ene=1000

      
      
      if (arr[i].ene<=0){
         obj[i]=obj[i].substring(0,3)+'0010'
      }else if (exercise){
        arr[i].i+=genre[num].sd/10+Number(obj[i])/1000000
        arr[i].ene-=genre[num].consume
      }


      if (arr[i].ene>=400)
      	ctx.fillStyle="green"
      else if(arr[i].ene<=200)
      	ctx.fillStyle="red"
      else
      	ctx.fillStyle="yellow" 
      
      ctx.save();
      ctx.translate(arr[i].dx,arr[i].dy);
      ctx.rotate(arr[i].angle);
      ctx.translate(-arr[i].dx, -arr[i].dy);
      ctx.drawImage(img, arr[i].dx - img.width / 2, arr[i].dy - img.height / 2);
      ctx.fillRect(arr[i].dx+32,arr[i].dy-24,10,arr[i].ene/22)
      ctx.restore();
    }
  }
}