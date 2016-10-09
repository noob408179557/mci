window.onload = init;
function init(){
	loadLeft();
	loadUserInfo();
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
function loadUserInfo(){

	$.ajax({
		type : "POST",
		url : "getUserInfo.do",
		dataType : "json",
		error : function(data) {
			swal("getUserInfo.do Error!");
		},
		success:function(data){
			$("#invoiceQty").html(data.invoiceQty);
			$("#totalAmount").html(parseFloat(data.totalAmount).toFixed(1));
			$("#amountPaid").html(parseFloat(data.amountPaid).toFixed(1));
			$("#unpaidAmount").html(parseFloat(data.unpaidAmount).toFixed(1));
			$("#commission").html(parseFloat(data.commission).toFixed(1));
			$("#clientQty").html(data.clientQty);
		}
	})

}