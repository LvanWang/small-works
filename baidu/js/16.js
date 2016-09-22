//js
// window.onload=function(){
// 	/**
// 	 * aqiData，存储用户输入的空气指数数据
// 	 * 示例格式：
// 	 * aqiData = {
// 	 *    "北京": 90,
// 	 *    "上海": 40
// 	 * };
// 	 */
// 	var aqiData = {};

// 	/**
// 	 * 从用户输入中获取数据，向aqiData中增加一条数据
// 	 * 然后渲染aqi-list列表，增加新增的数据
// 	 */
// 	function addAqiData() {
// 		var cs=document.getElementById('aqi-city-input'),
// 			kq=document.getElementById('aqi-value-input');
// 		if (cs.value=='') {
// 			alert('城市名不能为空')
// 			return
// 		}else if(!cs.value.match(/^([A-Za-z]+(\s[A-Za-z]+)?|[\u4E00-\u9FA5]+)$/)){
// 				alert('请输入正确的城市名')
// 				return
// 		}
// 		if(kq.value==''){
// 			alert('空气质量指数不能为空')
// 			return
// 		}else if(!kq.value.match(/^\d+$/)){
// 				alert('空气质量指数必须是正整数')
// 				return
// 		}
// 		aqiData[cs.value]=kq.value;
// 		cs.value=kq.value='';	
// 	}
		


// 	/**
// 	 * 渲染aqi-table表格
// 	 */
// 	function renderAqiList() {
// 		var tr=''
// 		for(var i in aqiData){
// 			tr+='<tr><td>'+i+'</td><td>'+aqiData[i]+'</td><td><button>删除</button></td></tr>'

// 		}

// 		document.getElementById('aqi-table').innerHTML=tr;
		
		
// 	}

// 	/**
// 	 * 点击add-btn时的处理逻辑
// 	 * 获取用户输入，更新数据，并进行页面呈现的更新
// 	 */
// 	function addBtnHandle() {
// 	  	addAqiData();
// 	  	renderAqiList();
// 	}

// 	/**
// 	 * 点击各个删除按钮的时候的处理逻辑
// 	 * 获取哪个城市数据被删，删除数据，更新表格显示
// 	 */
// 	function delBtnHandle(OBJ) {
// 		var move= OBJ.parentNode.parentNode.firstElementChild.innerHTML||OBJ.parentNode.parentNode.firstChild.innerHTML
// 		delete(aqiData[move]);
// 		renderAqiList();
// 	}

// 	function init() {
// 		document.getElementById('add-btn').onclick=function(){
// 			addBtnHandle();
// 			mover()
// 		}

// 	}
// 	function mover(){
// 		var ak=document.getElementsByTagName('button');
// 			for (var i = 0; i < ak.length; i++) {
// 				var This=this;
// 				ak[i].onclick=function(){
// 					var This=this;
// 					delBtnHandle(This);
// 					mover()
// 				}
// 			}
// 	}

// 	init();
// }



//jq
$(function(){
	var json={};
	$('#add-btn').click(function(){
		if ($('#aqi-city-input').val()==''){
			alert('城市名不能为空！')
			return
		}else if (!$('#aqi-city-input').val().match(/^([A-Za-z]+(\s[A-Za-z]+)?|[\u4E00-\u9FA5]+)$/)){
			alert('请输入正确的城市名!')
			return
		}

		if ($('#aqi-value-input').val()==''){
			alert('空气质量指数必须是正整数！')
		 	return
		}else if(!$('#aqi-value-input').val().match(/^\d+$/)){
 				alert('空气质量指数必须是正整数!')
 				return
		}
		var str='';
		json[$('#aqi-city-input').val()]=$('#aqi-value-input').val()
		for(var i in json){
			str+='<tr><td>'+i+'</td><td>'+json[i]+'</td><td><button>删除</button></td></tr>'
		}
		$('#aqi-table').html(str);
		$('#aqi-city-input').val('')
		$('#aqi-value-input').val('')
		$('button').click(function(){
			delete(json[$(this).parents('tr').children(':first').html()])
			$(this).parents('tr').remove()
		})
	})

})  
