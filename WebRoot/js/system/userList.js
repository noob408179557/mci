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
	search();
	search2();
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
				$("#activeClient").hide();
				$("#assign").hide();
				$("#blockClient").hide();
				$("#register").hide();
				$("#user").hide();
			} else if (data.type == 2) {
				$("#createClient").hide();
			}
		}
	});
}
function search(i) {
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
								+ "<div class='radio radio-primary radio-single'><input type='radio' name='select' value='"
								+ data[i].id
								+ "'><label></label></div>"
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].id
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].email
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].realName + "</th>";

						var block = "<th style='text-align:left;vertical-align : middle; '>"
								+ "<span class='label label-table label-danger btn-lg'>Block</span></th>"
								+ "</tr>";
						var active = "<th style='text-align:left;vertical-align : middle; '>"
								+ "<span class='label label-table label-success btn-lg'>Active</span></th>"
								+ "</tr>";
						var body2;
						if (data[i].state == "1") {
							body2 = active;
						} else {
							body2 = block;
						}
						var body = body1 + body2;

						$("#userList").append(body);
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
								+ "<div class='radio radio-primary radio-single'><input type='radio' name='select' value='"
								+ data[i].id
								+ "'><label></label></div>"
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].id
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].email
								+ "</th><th style='text-align:left;vertical-align : middle; '>"
								+ data[i].realName + "</th>";

						var block = "<th style='text-align:left;vertical-align : middle; '>"
								+ "<span class='label label-table label-danger btn-lg'>Block</span></th>"
								+ "</tr>";
						var active = "<th style='text-align:left;vertical-align : middle; '>"
								+ "<span class='label label-table label-success btn-lg'>Active</span></th>"
								+ "</tr>";
						var body2;
						if (data[i].state == "1") {
							body2 = active;
						} else {
							body2 = block;
						}
						var body = body1 + body2;

						$("#userList1").append(body);
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
				type : "POST",
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
		if ($("input[name='select']:checked").val() != null) {
			$.ajax({
				type : "POST",
				url : "blockUser.do",
				dataType : "json",
				data : {
					id : $("input[name='select']:checked").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					search();
					search2();
				}
			})
		} else {
			swal("You haven't select any user!");
		}
	})
	$("#active").click(function() {
		if ($("input[name='select']:checked").val() != null) {
			$.ajax({
				type : "POST",
				url : "activeUser.do",
				dataType : "json",
				data : {
					id : $("input[name='select']:checked").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					search2();
					search();
				}
			})
		} else {
			swal("You haven't select any user!");
		}
	})
	$("#reset").click(function() {
		if ($("input[name='select']:checked").val() != null) {
			$.ajax({
				type : "POST",
				url : "resetPassword.do",
				dataType : "json",
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