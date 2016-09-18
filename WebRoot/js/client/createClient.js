
window.onload = init;
var x = 1;
var pow=1;
function logout() {
	$.ajax({
		type : "POST",
		url : "user_logout.do",
		dataType : "json",
		error : function(data) {
			swal("user_logout.do Error!");
		},
		success : function(data) {
			if (data == "0")  window.location.href = "login.html";
			else  swal("user_logout.do 500Error!");
			
		}
	})
}
function init() {
	loadLeft();
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			pow=data;
		}
	});
	$.ajax({
		type : "POST",
		url : "addClient.do",
		dataType : "json",
		data : {
			companyName : "",
		},
		error : function(data) {
		},
		success : function(data) {
			// 存储client的id
			$("#clientId").val(data);
		}
	})
}

$(document)
		.ready(
				function() {
					// 添加client
					$("#createClient").click(function() {
						  $(this).attr("disabled","disabled");  
						  $(this).html("waiting...");  
						createClient();
					});

					$("#addRow").click(function() {
						x++;
						addContactPerson();
						// 为保证add时的序号不乱,隐藏上一行的remove
						hideLastRemove();
					});
					// 创建ContactPerson
					
				});



// 创建Client
function createClient() {
	// 查询cp的数量
	var flag;

	if ($("#cName").val() != "" && $("#cDays").val() != ""
			&& $("#cSize").val() != "" && $("#cRemark").val() != ""
			&& $("#cTrade").val() != "") {
		// 创建Client,返回主键值()
		$.ajax({
			type : "POST",
			url : "createClient.do",
			dateType : "json",
			data : {
				id : $("#clientId").val(),
				companyName : $("#cName").val(),
				webSite : $("#cWebsite").val(),
				days : $("#cDays").val(),
				size : $("#cSize").val(),
				remark : $("#cRemark").val(),
				trade : $("#cTrade").val(),
				state : "1",
				term : $("#cTerm").val()
			},
			error : function(data) {
				alert("请求失败！");
			},
			success : function(data) {
				$.ajax({
					type : "POST",
					url : "getCPcount.do",
					dateType : "json",
					data : {
						id : $("#clientId").val()
					},
					error : function(data) {
						swal("getCPcount Error！");
					},
					success : function(data1) {
						if (data1 == 0) {
							swal("Please create a Client-PIC");
							return false;
						} else {
							$("#clientId").val(data);
							// js模拟click事件触发addKey(cp主键)
							// 将页面中ContactPerson关联刚创建的Client
							if ($(".addKey") != null) $(".addKey").click();
							// 跳转到staffClient页面
							window.location.href = "mci-staffClient.do";
						}
					}
				})
			}
		});
	} else {
		swal("Required cannot be empty!");
		return false;
	}
}
// 给ContactPerson增加外键关联
function addKey(i) {
	// i为ContactPerson的主键,key为client主键
	$.ajax({
		type : "POST",
		url : "addCPFK.do",
		dataType : "json",
		data : {
			id : i,
//			,
	 	companyid : $("#clientId").val()
		},
		error : function(data) {
			alert("请求失败！");
		},
		success : function(data) {
		}
	});
}
