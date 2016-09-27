window.onload = editClient;
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
function editClient() {
	loadLeft();
	$.ajax({
		type : "POST",
		url : "getEditUser.do",
		dataType : "json",
		error : function(data) {
			alert("Server Error!");
		},
		success : function(data) {
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

	});
}
$(document).ready(function() {
	$("#saveUser").click(function(){
		if(veryfyEmail($("#email").val())){
		 if($("#email").val()==""){
			swal("Email can't be empty!");
			return false;
		}else if($("#realname").val()==""){
			swal("Realname can't be empty!");
			return false;
		}else{
		$.ajax({
    		type : "POST",
    		url : "saveUser.do",
    		dataType : "json",
    		data:{
    			email:$("#email").val(),
    			realName:$("#realname").val(),
    			password:$("#password").val(),
    			type:$("#userType").val()
    		},
    		error : function(data) {
    			alert("Server Error!");
    		},
    		success:function(data){
    			if(data=="0"){
    				window.location.href="mci-user.do";	
    			}else{
    				swal("Update Fail!");
    			}
    			
    		}
       })
		}
	}
	})
});