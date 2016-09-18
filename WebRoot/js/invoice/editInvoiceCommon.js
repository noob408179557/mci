var pow=1;
window.onload = initial;
function initial(){
	initInvoice();
	loadLeft();
	$.ajax({
		type:"POST",
		url:"getPow.do",
		dataType : "json",
		error : function(data) {
			swal("getPow.do Error!");
		},
		success:function(data){
			pow=data.type;
		}
		
	})
}