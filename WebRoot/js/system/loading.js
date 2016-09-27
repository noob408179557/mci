/*******************************************************************************
 * 
 * 创建人：Quber（qubernet@163.com） 创建时间：2014年6月10日 创建说明：Base=>页面加载（loading）效果
 * 
 * 修改人： 修改时间： 修改说明：
 * 
 ******************************************************************************/
loadPow=1;
// 获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight, _PageWidth = document.documentElement.clientWidth;
// 计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0, _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2
		: 0;
// 在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:'
		+ _PageHeight
		+ 'px;top:0;opacity:1;filter:alpha(opacity=80);z-index:10000; background: #EBEFF2;" class="bgzhang bg-blurzhang"><div class="contentzhang content-frontzhang" style="position: absolute; cursor1: wait; left: '
		+ _LoadingLeft
		+ 'px; top:'
		+ _LoadingTop
		+ 'px; width: auto; height: 80px; line-height:80px; padding-left: 10px; padding-right: 5px; background: #fff ; border: 2px solid #594F8D; color: #594F8D; font-family:\'Microsoft YaHei\';">Please wait , the page is loading ...</div></div>';
// 呈现loading效果
document.write(_LoadingHtml);

// window.onload = function () {
// var loadingMask = document.getElementById('loadingDiv');
// loadingMask.parentNode.removeChild(loadingMask);
// };

// 监听加载状态改变
document.onreadystatechange = completeLoading;

// 加载状态为complete时移除loading效果
function completeLoading() {
	if (document.readyState == "complete") {
		var loadingMask = document.getElementById('loadingDiv');
		loadingMask.parentNode.removeChild(loadingMask);
	}
}

function loadLeft(){
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		async:false,
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			$("#currUser").append(data.realName);
			loadPow=data.type;
			if (data.type == 1) {
//				$("#activeClient").hide();
//				$("#assign").hide();
//				$("#blockClient").hide();
//				$("#register").hide();
//				$("#user").hide();
//				$("#delete").hide();
				$("#dashboard").show();
				$("#invoice").show();
				$("#client").show();
			}else if(data.type==2||data.type==3){
				$("#dashboard").show();
				$("#invoice").show();
				$("#client").show();
				$("#register").show();
				$("#user").show();
			}
			
		}
	});
}
function  loadClient(){

	if(loadPow==1){
		console.log("loadClient:1");
		$("#createClient").show();
		$("#edit").show();
		$("#account").show();
		$("#history").show();
		$("#searchbtn").show();
	}else if(loadPow==2){
		console.log("loadClient:2");
		$("#edit").show();
		$("#assign").show();
		$("#account").show();
		$("#activeClient").show();
		$("#blockClient").show();
		$("#history").show();
		$("#delete").show();
		$("#searchbtn").show();
	}else {
		console.log("loadClient:3");
		$("#createClient").show();
		$("#edit").show();
		$("#assign").show();
		$("#account").show();
		$("#activeClient").show();
		$("#blockClient").show();
		$("#history").show();
		$("#delete").show();
		$("#searchbtn").show();
		
		
	}
}
function loadInvoice(){
	 
	if(loadPow==1){
		console.log("loadClient:1");
		$("#addUserbtn").show();
		$("#detail").show();
		$("#edit").show();
		$("#delete").show();
		$("#history").show();
		$("#print").show();
		$("#export").show();
		$("#searchbtn").show();
	}else if(loadPow==2){
		console.log("loadClient:2");
		$("#detail").show();
		$("#edit").show();
		$("#cancel").show();
		$("#confirm").show();
		$("#delete").show();
		$("#activeInvoice").show();
		$("#history").show();
		$("#print").show();
		$("#export").show();
		$("#searchbtn").show();
	}else{
		console.log("loadClient:3");
		$("#addUserbtn").show();
		$("#detail").show();
		$("#edit").show();
		$("#cancel").show();
		$("#confirm").show();
		$("#delete").show();
		$("#activeInvoice").show();
		$("#history").show();
		$("#print").show();
		$("#export").show();
		$("#searchbtn").show();
	}
}
