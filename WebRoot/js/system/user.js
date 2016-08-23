window.onload = init;
function init() {
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			$("#currUser").append(data.realName);
			if (data.type == 1) {
				$("#register").hide();
				$("#user").hide();
			}else if(data.type ==2){
				$("#createClient").hide();
			}
		}
	});
}
$(document).ready(function() {
	$("#createUser").click(function(){
		if($("#email").val()==""){
			swal("Email can't be empty!");
			return false;
		}else if($("#realname").val()==""){
			swal("Realname can't be empty!");
			return false;
		}else if($("#password").val()==""){
			swal("Password can't be empty!");
			return false;
		}else if($("#repassword").val()==""){
			swal("Confirmpassword can't be empty!");
			return false;
		}else if($("#password").val()!=$("#repassword").val()){
			swal("Confirmpassword must be same as password!");
			return false;
		}else{
		$.ajax({
		type:"POST",
		url:"createUser.do",
		dataType:"json",
		data:{
			username:$("#username").val(),
			password:$("#password").val(),
			email:$("#email").val(),
			realName:$("#realname").val(),
			type:$("#userType").val()
		},
		error:function(data){
			swal("createUser.do error!");
		},
		success:function(data){
			
			if(data=='0'){
			window.location.href="mci-user.do";
		} else if(data=='3'){
			swal("Existing user name!");
		}else{
			swal("create User Fail!");
		}
		}
		})
		}
	});
	
	
	
})
function　logout(){
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
