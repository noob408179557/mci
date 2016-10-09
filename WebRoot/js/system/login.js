//window.onload = init;
//function addx(x) {
// return function(y) {return x+y;};
//}
//
//
//function init(){
//	add8 = addx(8);
//	add9 = addx(9);
//
//	alert(add8(100));
//	alert(add9(100));
//}
$(document).ready(function() {
	$(document).keypress(function(e) {
		if (e.which == 13) {
			$("#login").trigger("click");
		}
	});
	$("#login").click(function() {
		var name = $("#userName").val();
		var password = $("#password").val();
		/*
		 * if (name.trim() == '') { alert("The name cannot be empty!"); return
		 * false; }if (password.trim() == '') { alert("The password cannot be
		 * empty!"); return false; }
		 */

		$.ajax({
			type :"POST",
			url : "user_login.do",
			data : {
				email : name,
				password : password
			},
			dateType : "json",
			beforeSend : function(XMLHttpRequest) {
				$("#login").attr("disabled", "disabled");
				$("#login").html("Signing on. Please wait...");
			},
			error : function(data) {
				alert("Server Error!");
			},
			success : function(data) {
				// setCookie("userName",$("userName").value,24,"/");
				// setCookie("password",$("password").value,24,"/");
				if (data.i == "0") {
					swal("Log in fail!");
				} else if (data.i == "1") {
					window.location.href = "mci-dashboard.do";
				} else if (data.i == "2") {
					swal("The account is blocked!");
				} else if (data.i == "3") {
					alert("The user name or password error!");
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
				$("#login").removeAttr("disabled");
				$("#login").html("Sign in");
			},
		});
	});
});
function logOut() {
	$.ajax({
		type : "POST",
		url : "user_logout.do",
		dateType : "json",
		error : function(data) {
			swal("logout error!");
		},
		success : function(data) {
			window.location.href = "login.html";
		}
	})
}

var user = document.getElementsByTagName("input")[0],
pass = document.getElementsByTagName("input")[1],
check = document.getElementsByTagName("input")[2],
loUser = localStorage.getItem("user") || "";
loPass = localStorage.getItem("pass") || "";
user.value = loUser;
pass.value = loPass;
if(loUser !== "" && loPass !== ""){
check.setAttribute("checked","");
}
function fn(){
if(check.checked){
localStorage.setItem("user",user.value);
localStorage.setItem("pass",pass.value);
}else{
localStorage.setItem("user","");
localStorage.setItem("pass","");
}
}