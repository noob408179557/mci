window.onload = init;
function logout() {
	$.ajax({
		type : "POST",
		url : "user_logout.do",
		dataType : "json",
		error : function(data) {
			swal("user_logout.do Error!");
		},
		success : function(data) {
			if (data == "0") {
				window.location.href = "login.html";
			} else {
				swal("user_logout.do 500Error!");
			}
		}
	})
}
function init() {
	$("#blockbtn").click();
	search();
	search2();
	loadLeft();
	
}
function search(i) {
	 selectItem1 = 0;
	if (isNaN(i)) {
		i = $("#pageIndex").val();
	}
	$
			.ajax({
				type : "POST",
				url : "getUserList.do",
				dataType : "json",
				async : false,
				data : {
					pageIndex : i
				},
				error : function(data) {
					swal("No result!");
					},
				success : function(data) {
					$("#userList").empty();
					for (var i = 0; i < data.length; i++) {
						var body1 = "<tr><th style='text-align:left;vertical-align : middle; '>"
								+ (i + 1)
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; ' width='1%'>"
								+ "<div class='checkbox checkbox-primary checkbox-single'><input type='checkbox' name='select1' value='"
								+ data[i].id
								+ "'><label></label></div>"
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].id
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].email
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].realName + "</th>"
						        +"<th style='text-align:left;vertical-align : middle; '>"
								+ "<span class='label label-table label-success btn-lg'>Active</span></th>"
								+ "</tr>";
						

						$("#userList").append(body1);
					}
				}
			})
	$
			.ajax({
				type : "POST",
				url : "loadUserPage.do",
				dataType : "json",
				error : function(data) {
					swal("No result!");
					},
				success : function(data) {
					$("#pageIndex").val(i);
					$("#pageProgress").empty();
					$("#pageProgress").append(i + "/" + data);
					$("#firstPage").attr("onclick", "search(1)");
					$("#lastPage").attr("onclick", "search(" + data + ")");
					if (($("#pageIndex").val()) > data - 1) {
						$("#nextPage").attr("onclick", "search(" + data + ")");
					} else {
						$("#nextPage").attr(
								"onclick",
								"search("
										+ (Number($("#pageIndex1").val()) + 1)
										+ ")");
					}
				
					if (($("#pageIndex").val() <= 1)) {
						$("#previousPage").attr("onclick", "search(1)");
					} else {
						$("#previousPage").attr(
								"onclick",
								"search("
										+ (Number($("#pageIndex").val()) - 1)
										+ ")");
					}
				}
			});

}
function search2(i) {
	 selectItem2 = 0;
	if (isNaN(i)) {
		i = $("#pageIndex1").val();
	}
	$
			.ajax({
				type : "POST",
				url : "getUserList2.do",
				dataType : "json",
				async : false,
				data : {
					pageIndex : i
				},
				error : function(data) {
					swal("No result!");
				},
				success : function(data) {
					$("#userList1").empty();
					for (var i = 0; i < data.length; i++) {
						var body1 = "<tr><th style='text-align:left;vertical-align : middle; '>"
								+ (i + 1)
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; ' width='1%'>"
								+ "<div class='checkbox checkbox-primary checkbox-single'><input type='checkbox' name='select2' value='"
								+ data[i].id
								+ "'><label></label></div>"
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].id
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].email
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].realName + "</th>"
								+"<th style='text-align:left;vertical-align : middle; '>"
								+ "<span class='label label-table label-danger btn-lg'>Block</span></th>"
								+ "</tr>";
						$("#userList1").append(body1);
					}
				}
			})

	$
			.ajax({
				type : "POST",
				url : "loadUserPage1.do",
				dataType : "json",
				error : function(data) {
					swal("No result!");
				},
				success : function(data) {
					$("#pageIndex1").val(i);
					$("#pageProgress1").empty();
					$("#pageProgress1").append(i + "/" + data);
					$("#firstPage1").attr("onclick", "search2(1)");
					$("#lastPage1").attr("onclick", "search2(" + data + ")");
					if (($("#pageIndex1").val()) > data - 1) {
						$("#nextPage1").attr("onclick", "search2(" + data + ")");
					} else {
						$("#nextPage1").attr(
								"onclick",
								"search2("
										+ (Number($("#pageIndex1").val()) + 1)
										+ ")");
					}
					
					if (($("#pageIndex1").val() <= 1)) {
						$("#previousPage1").attr("onclick", "search2(1)");
					} else {
						$("#previousPage1").attr(
								"onclick",
								"search2("
										+ (Number($("#pageIndex1").val()) - 1)
										+ ")");
					}
				}
			});

}
$(function() {
	$("#edit").click(function() {
		if ($("input[name='select']:checked").val() != null) {
			var clientId = $("input[name='select']:checked").val();
			$.ajax({
				type :"POST",
				url : "preEditUser.do",
				dataType : "json",
				data : {
					id : $("input[name='select']:checked").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					window.location.href = "mci-editUser.do";
				}
			})
		} else {
			swal("You haven't select any user!");
		}
	});
	$("#delete").click(function() {


		var obj = document.getElementsByName("select1");
		check_val = [];
		for (k in obj) {
			if (obj[k].checked) {
				check_val.push(obj[k].value);
				blockUser(obj[k].value)
			}

		}
		if (obj.length == 0) {
			swal("You haven't select any user");
			return false;
		}
        swal("Block Complete!");
		search(1);
		search2(1);
	
		
		
		
		
	})
	$("#active").click(function() {



		var obj = document.getElementsByName("select2");
		check_val = [];
		for (k in obj) {
			if (obj[k].checked) {
				check_val.push(obj[k].value);
				activeUser(obj[k].value)
			}

		}
		if (obj.length == 0) {
			swal("You haven't select any user");
			return false;
		}
        swal("Active Complete!");
		search(1);
		search2(1);
	})
	$("#reset").click(function() {
		if ($("input[name='select']:checked").val() != null) {
			$.ajax({
				type : "POST",
				url : "resetPassword.do",
				dataType : "json",
				async : false,
				data : {
					userid : $("input[name='select']:checked").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					swal("ID for "+$("input[name='select']:checked").val()+" user's password is reset to 123456!");
				}
			})
		} else {
			swal("You haven't select any user!");
		}
	});
});
function blockUser(id){
	$.ajax({
		type : "POST",
		url : "blockUser.do",
		dataType : "json",
		async:false,
		data : {
			id : id
		},
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
		return true;
		}
	})
}

function activeUser(id){
		$.ajax({
			type : "POST",
			url : "activeUser.do",
			dataType : "json",
			async:false,
			data : {
				id : id
			},
			error : function(data) {
				alert("请求失败~");
			},
			success : function(data) {
				return true;
			}
		})
}