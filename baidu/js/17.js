/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed,tj) {
  tj=(tj?tj:0)
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 0; i < 100; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * (seed-tj))+tj;
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
function PJriq(){
  var arr=[];
  var str=''
  var num=1
  for(var i in randomBuildData(100,50)){
     riq[0].push(i);
     if(i.charAt(6)==num)arr.push(i)
     	else {
    		riq[2].push(arr.shift()+'至'+arr.pop());
    		arr=[];
     		num++
     		arr.push(i)
     	}
  }
  riq[2].push(arr.shift()+'至'+arr.pop());
  arr=[];
  for (var i = 0; i <Math.ceil(riq[0].length/7); i++) {
    for (var j = i*7; j < (i+1)*7; j++) {
    if(!riq[0][j])break;
      arr.push(riq[0][j])
    }
    str=arr.shift()+'至'+arr.pop();
    riq[1].push(str);
    arr=[]
  }
}
var riq=[[],[],[]]
PJriq()
var aqiSourceData = {
    "北京": randomBuildData(100,50),  
    "上海": randomBuildData(80,40),  
    "广州": randomBuildData(60,30),  
    "深圳": randomBuildData(40),  
    "成都": randomBuildData(80,40),  
    "西安": randomBuildData(50,20),  
    "福州": randomBuildData(50),  
    "厦门": randomBuildData(50,20),  
    "沈阳": randomBuildData(100,50)
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项

var oul=document.querySelector('.ul'),
    ali=oul.querySelectorAll('li'),
    time=document.querySelector('#time'),
    input=document.querySelectorAll('input'),
    select=document.querySelector('#select'),
    ospan1=document.querySelector('.span1'),
    ospan2=document.querySelector('.span2');
var pageState = {
  nowGraTime: "",
  newli:null
}
/**

 * 渲染图表
 */

function renderChart() {
  var lihtml=''
  var color=''
  for (var i = 0; i < riq[0].length; i++) {
    color='#'+Math.floor(Math.random()*16777215).toString(16);
    if(!color.charAt(6)) color=color+'0'
    lihtml+='<div style="width:7px;background:'+color+'"><span></span></div>'
  }
  ali[0].innerHTML=lihtml;
  lihtml='';
  for (var i = 0; i < riq[1].length; i++) {
    color='#'+Math.floor(Math.random()*16777215).toString(16);
    if(!color.charAt(6))color=color+'0'
    lihtml+='<div style="width:56px;background:'+color+'"><span></span></div>'
  }
  ali[1].innerHTML=lihtml;
  lihtml='';
  for (var i = 0; i < riq[2].length; i++) {
  color='#'+Math.floor(Math.random()*16777215).toString(16);
  	if(!color.charAt(6))color=color+'0'
    lihtml+='<div style="width:220px;background:'+color+'"><span></span></div>'
  }
  ali[2].innerHTML=lihtml;
  graTimeChange()
  
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */

var Target
function graTimeChange() {
  time.onclick=function(e){
    if (e.target.tagName=='LABEL') {
        Target=e.target.querySelector('input').value;
    }else if(e.target.tagName=='INPUT'){
        Target=e.target.value
    }else{return}
    mover()
    if (pageState.nowGraTime!=Target) {
      pageState.nowGraTime=Target
      ospan2.innerHTML=Target;
      if (ospan1.innerHTML=='') {return}
      citySelectChange();
    }else{return}
  }
  

  // 设置对应数据

  // 调用图表渲染函数
  select.onclick=function(){
      var index=this.selectedIndex;
      if (!index) {
      	ospan1.innerHTML='';
        mover()
        return
      }else{
        ospan1.innerHTML=this.options[index].text;
      }
    if (pageState.nowGraTime=='') { return}
	   	citySelectChange();
	  	return false
	}
  function mover(){
  	
    for (var i = 0; i < ali.length; i++) {

      for (var j = 0; j < ali[i].children.length; j++) {
        ali[i].children[j].children[0].innerHTML='';
        ali[i].children[j].style.height=0+'px'
       }
      ali[i].style.display='none'
      if(ali[i].dataset.value==Target){
        pageState.newli=ali[i];
        pageState.newli.style.display='flex'
      }
    }

  }
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var arr=[];
  var num=0;
  var arr1=[];
  rq=null
  sj=''
  for (var i in aqiSourceData[ospan1.innerHTML]) {
     arr.push(aqiSourceData[ospan1.innerHTML][i])
  }
  if (pageState.newli.getElementsByTagName('div').length==riq[1].length) {
    sj='周平均'
    rq=riq[1]
    for (var i = 0; i < riq[1].length; i++) {
      num=0
      for (var j = i*7; j < (i+1)*7; j++) {
      	if (!arr[j])break
        num+=arr[j]

      
      console.log(num+"+"+arr[j])
      }    
      arr1.push(num/(j-i*7))
    }
  }
  else if (pageState.newli.getElementsByTagName('div').length==riq[2].length) {
    sj='月平均'
    rq=riq[2]
    for (var i = 0; i < riq[2].length; i++) {
      num=0
      for (var j = i*30; j < (i+1)*30; j++) {
      	if (!arr[j])break
        num+=arr[j]
      }    
      arr1.push(num/(j-i*30))
    }
  }else{ 
    for (var i = 0; i < arr.length; i++) {
    arr1[i]=arr[i]; 
     rq=riq[0]
    }
  }
  for (var i = 0; i < pageState.newli.getElementsByTagName('div').length; i++) {
    var odiv=pageState.newli.getElementsByTagName('div')[i]
    odiv.style.height=arr1[i]*5+'px'
    odiv.style.transition='0.2s '+i*0.02+'s';
    odiv.title="当前城市: " +ospan1.innerHTML+ "," + "时间: " +  rq[i] + ", "+sj+"空气污染指数: " + Math.floor(arr1[i])*3;         
    odiv.getElementsByTagName('span')[0].innerHTML=Math.floor(arr1[i])*3
  }    
} 

renderChart()