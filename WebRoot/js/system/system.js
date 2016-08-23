function staffClient(){
	$.ajax({
		type : "POST",
		url : "mci-staffClient.do",
		success:function(data) {
			return "mci-staffClient.do";
			}
	})
	
	
	
}
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