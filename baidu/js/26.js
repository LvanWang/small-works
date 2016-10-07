var json={ 
  hjobj:[
  	{id:1,commond:"not","i":0,j:0,r:17},
  	{id:2,commond:"not","i":0,j:0,r:77},
  	{id:3,commond:"not","i":0,j:0,r:137},
  	{id:4,commond:"not","i":0,j:0,r:197}
  ],
  newfn:function(){
    var This=this
    this.img=new Image();
    this.img.src="img/hj.png";

    this.btn1=document.getElementById("btn");

    this.form=document.getElementById('console')
    this.bulletin=document.getElementById('bulletin')

    this.can=document.getElementById('can')
    this.ctx=this.can.getContext("2d");
    this.can.width=700;
    this.can.height=670;
    this.btn1.onclick=function(){This.btn(This)}
    this.initialize(this.hjobj)
    setInterval(function(){
      This.ctx.clearRect(0,0,700,670)
      This.orbit(This.ctx,This)
      This.hj(This.ctx,This.hjobj,This)

    },50)
  },


  btn:function (obj){
    obj.off=false;
    obj.form.innerHTML=''
    for (var i = 0; i <obj.hjobj.length; i++){
      if (!obj.off){
        if(obj.hjobj[i].commond=='not'){
            obj.hjobj[i].commond='stop'
            obj.off=true;
            obj.bulletin.innerHTML='<p>'+(i+1)+'号飞船已创建！</p>'+bulletin.innerHTML

        }

      }
      if(obj.hjobj[i].commond!='not')
        obj.form.innerHTML+="<label data-id='"+(i+1)+"'>对"+(i+1)+"号飞船下达指令：<button>开始飞行</button><button>停止飞行</button><button>销毁</button></label><br>";
            
      obj.btn2=obj.form.getElementsByTagName('button')
      var This=obj
      for (var j = 0; j < obj.btn2.length; j++)
        this.btn2[j].onclick=function(e){
          var clickThis=this,e=e||event;
          e.preventDefault ? e.preventDefault() : e.returnValue = false;
          This.bulletin.innerHTML='<p>命令已发出！</p>'+bulletin.innerHTML
          var id=clickThis.parentNode.dataset.id

          if (clickThis.innerText=='销毁')
            This.form.removeChild(clickThis.parentNode)
            
          setTimeout(function(){
            if(Math.random()>0.33){
              if (clickThis.innerText=='开始飞行')
                This.hjobj[id-1].commond='exercise';
              
              if (clickThis.innerText=='停止飞行')
                This.hjobj[id-1].commond='stop'

              if (clickThis.innerText=='销毁'){
                This.hjobj[id-1].i=0;
                This.hjobj[id-1].j=0;
                This.hjobj[id-1].commond='not';
              }
              This.bulletin.innerHTML='<p>'+id+'号飞船已'+clickThis.innerText+'！</p>'+bulletin.innerHTML
            }else{
              This.bulletin.innerHTML='<p>'+id+'号飞船：‘'+clickThis.innerText+'’ 命令未接收到！</p>'+bulletin.innerHTML
            }
          },1000)
        }
      } 
  },
  orbit:function(ctx){
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
  },

  initialize:function(obj){
    for (var i = 0; i < obj.length; i++){
    	  obj[i].r=(obj[i].id-1)*60+17
        obj[i].rx =350; obj[i].ry = 335; 
        obj[i].px =350; obj[i].py =obj[i].r; 
        obj[i].radius = obj[i].ry - obj[i].py;
    }
  },
  hj:function (ctx,obj){
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
        ctx.drawImage(this.img, obj[i].dx - this.img.width / 2, obj[i].dy - this.img.height / 2);
        ctx.fillRect(obj[i].dx+32,obj[i].dy-21,10,40-obj[i].j/10)
        ctx.restore();
      }
  }
}

json.newfn();