window.onload = init;
function logout(){
	$.ajax({
		type : "POST",
		url : "user_logout.do",
		dataType : "json",
		error : function(data) {
			swal("user_logout.do Error!");
		},
		success:function(data){
			if(data=="0"){
				window.location.href="login.html";
			}else{
				swal("user_logout.do 500Error!");
			}
		}
	})
}
function init(){
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			$("#currUser").append(data.realName);
			$("#userId").val(data.id);
			if (data.type == 1) {
				$("#register").hide();
				$("#user").hide();
			}
		}
	});
	$.ajax({
		type:"POST",
		url:"getLoginUser.do",
 		dateType:"json",
 		async:false,
		error:function(data){
			swal("getLoginUser.do 500error!");
		},
		success:function(data){
			$("#email").val(data.email);
			$("#realname").val(data.realName);
			$("#password").val(data.password);
			var trade = document.getElementById("userType");
			for ( var i = 0; i < trade.length; i++) {
				if (trade[i].value == data.type) {
					trade[i].selected = true;
					$("#userType").selectpicker("refresh");
				}
			}	
		}
	})
}
$(function() {
	
	$("#editUser").click(function() {
		$.ajax({
			type : "POST",
			url : "preEditUser.do",
			dataType : "json",
			data : {
				id : $("#userId").val()
			},
			error : function(data) {
				alert("请求失败~");
			},
			success : function(data) {
				window.location.href = "mci-editMyAccount.do";
			}
		})
	});
});