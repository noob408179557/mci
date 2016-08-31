window.onload = init;
var x = 1;
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
				$("#user").hide();
				$("#register").hide();
			}
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
						createClient();
					});

					$("#addRow").click(function() {
						x++;
						addContactPerson();
						// 为保证add时的序号不乱,隐藏上一行的remove
						hideLastRemove();
					});
					// 创建ContactPerson
					$("#createCP")
							.click(
									function() {
										var actived = "<th style='text-align:left;vertical-align : middle; color:green'><span class='label label-table label-success '>Actived</span></th>";
										var resigned = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse'>Resigned</span></th>";

										if ($("#cpName").val() != ""
												&& $("#cpEmail").val() != ""
												&& $("#cpBillAddress").val() != ""
												&& $("#cpPosition").val() != ""
												&& $("#cpPostal").val() != ""
												&& $("#cpTel").val() != "") {
											if (isNaN($("#cpTel").val())
													|| isNaN($("#cpPostal")
															.val())) {
												swal("Please input in correct format!");
												return false;
											}
											$
													.ajax({
														type : "POST",
														url : "addContactPerson.do",
														dateType : "json",
														data : {
															companyid : $(
																	"#clientId")
																	.val(),
															name : $("#cpName")
																	.val(),
															email : $(
																	"#cpEmail")
																	.val(),
															billaddress : $(
																	"#cpBillAddress")
																	.val(),
															position : $(
																	"#cpPosition")
																	.val(),
															postal : $(
																	"#cpPostal")
																	.val(),
															mobile : $(
																	"#cpMobile")
																	.val(),
															tel : $("#cpTel")
																	.val(),
															status : $(
																	"#cpStatus")
																	.val()

														},
														error : function(data) {
															alert("server error!");
														},
														success : function(data) {
															//addKey(data);
															// 点击createContactPerson后显示到table

															var head = "<tr id='row"
																	+ data
																	+ "'>"
																	+ "<td style='vertical-align:middle;'>"
																	+ $(
																			"#cpName")
																			.val()
																	+ "</td>"
																	+ "<td  style='vertical-align:middle;'>"
																	+ $(
																			"#cpEmail")
																			.val()
																	+ "</td><td  style='vertical-align:middle;'>"
																	+ $(
																			"#cpBillAddress")
																			.val()
																	+ "</td><td  style='vertical-align:middle;'>"
																	+ $(
																			"#cpPostal")
																			.val()
																	+ "</td><td  style='vertical-align:middle;'>"
																	+ $(
																			"#cpTel")
																			.val()
																	+ "</td><td  style='vertical-align:middle;'>"
																	+ $(
																			"#cpPosition")
																			.val()
																	+ "</td>";
															var status=null;
															if($("#cpStatus").val()=="active"){
																status=actived;
															}else{
																status=resigned;
															}
															var leg="<td style='vertical-align:middle;'><a class='btn btn-danger  btn-lg' onclick='editRow("
																	+ data
																	+ ")' href='javascript:void(0)' id='editRow"
																	+ data
																	+ "'>"
																	+ "edit</a> <a class='btn btn-danger  btn-lg' onclick='removeRow("
																	+ data
																	+ ")' href='javascript:void(0)' id='removeRow"
																	+ data
																	+ "'>remove</a><a onclick='addKey("
																	+ data
																	+ ")' class='addKey' style='display:none'></td>"
																	+ "</tr>";
															
															var one=head+status+leg;
															$(
																	"#addContactPerson")
																	.append(one);
															// 清空modal中的数据
															x++;
															$("#cpName")
																	.val("");
															$("#cpEmail").val(
																	"");
															$("#cpBillAddress")
																	.val("");
															$("#cpPosition")
																	.val("");
															$("#cpState").val(
																	"");
															$("#cpBlock").val(
																	"");
															$("#cpLevel").val(
																	"");
															$("#cpUnit")
																	.val("");
															$("#cpPostal").val(
																	"");
															$("#cpMobile").val(
																	"");
															$("#cpTel").val("");
															var status = document
																	.getElementById("cpStatus");
															for (var i = 0; i < status.length; i++) {
																if (status[i].value == "active") {
																	status[i].selected = true;
																	$(
																			"#cpStatus")
																			.selectpicker(
																					"refresh");
																}
															}
														}
													});
										} else {
											swal("Required cannot be empty!");
											return false;
										}

									});
					// 点击save保存cp信息时触发事件
					$("#saveCP").click(function() {
						updateContactPerson();
					});
					// 点击创建Client时触发事件
					$("#creatClient").click(function() {
						createClient();
					});
				});
// 回显ContactPerson的信息
function editRow(x) {
	$.ajax({
		type : "POST",
		url : "loadContactPerson.do",
		dateType : "json",
		data : {
			id : x
		},
		error : function(data) {
			alert(data);
		},
		success : function(data) {
			// 直接覆盖原本modal中的数据
			$("#edit1").modal('show');
			$("#editId").val(x);
			$("#editName").val(data.name);
			$("#editEmail").val(data.email);
			$("#editBillAddress").val(data.billaddress);
			$("#editPosition").val(data.position);
			$("#editPostal").val(data.postal);
			$("#editMobile").val(data.mobile);
			$("#editTel").val(data.tel);
			var status = document.getElementById("editStatus");
			for (var i = 0; i < status.length; i++) {
				if (status[i].value == data.status) {
					status[i].selected = true;
					$("#editStatus").selectpicker("refresh");
				}
			}
		}
	});
}
// update ContactPerson
function updateContactPerson() {
	var p = $("#editId").val();
	if ($("#editName").val() != "" && $("#editEmail").val() != ""
			&& $("#editBillAddress").val() != ""
			&& $("#editPosition").val() != "" && $("#editPostal").val() != ""
			&& $("#editTel").val() != "") {
		if (isNaN($("#editTel").val()) || isNaN($("#editPostal").val())) {
			swal("Please input in correct format!");
			return false;
		}
		$
				.ajax({
					type : "POST",
					url : "updateContactPerson.do",
					data : {
						id : $("#editId").val(),
						name : $("#editName").val(),
						email : $("#editEmail").val(),
						billaddress : $("#editBillAddress").val(),
						position : $("#editPosition").val(),
						postal : $("#editPostal").val(),
						mobile : $("#editMobile").val(),
						tel : $("#editTel").val(),
						status : $("#editStatus").val()
					},
					error : function(data) {
						alert("执行失败！");
					},
					success : function(data) {
						// 更新后删除原本table中的行
						$("#row" + p).remove();
						// 然后写入新的行

						var actived = "<th style='text-align:left;vertical-align : middle; color:green'><span class='label label-table label-success'>Actived</span></th>";
						var resigned = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse'>Resigned</span></th>";
						var head = "<tr id='row" + data + "'>" + "<td>"
								+ $("#editName").val() + "</td>"
								+ "<td  style='vertical-align:middle;'>"
								+ $("#editEmail").val()
								+ "</td><td  style='vertical-align:middle;'>"
								+ $("#editBillAddress").val()
								+ "</td><td  style='vertical-align:middle;'>"
								+ $("#editPostal").val()
								+ "</td><td  style='vertical-align:middle;'>"
								+ $("#editTel").val()
								+ "</td><td  style='vertical-align:middle;'>"
								+ $("#editPosition").val() + "</td>";
						var status = null;
						if ($("#editStatus").val() == "active") {
							status = actived;
						} else {
							status = resigned;
						}

						var leg = "<td style='vertical-align:middle;'><a class='btn btn-danger  btn-lg' onclick='editRow("
								+ data
								+ ")' href='javascript:void(0)' id='editRow"
								+ data
								+ "'>"
								+ "edit</a> <a class='btn btn-danger  btn-lg' onclick='removeRow("
								+ data
								+ ")' href='javascript:void(0)' id='removeRow"
								+ data
								+ "'>remove</a><a onclick='addKey("
								+ data
								+ ")' class='addKey' style='display:none'></td>"
								+ "</tr>";
						var one = head + status + leg;

						$("#addContactPerson").append(one);
					}
				});
	} else {
		swal("Required cannot be empty!");
		return false;
	}
}

function removeRow(i) {
	$.ajax({
		type : "POST",
		url : "deleteContactPerson.do",
		dateType : "json",
		data : {
			id : i
		},
		error : function(data) {
			alert("删除失败");
		},
		success : function(data) {
			$("#row" + i).remove();
			swal("Delete Success");
		}
	});
	x--;
}

function hideLastRemove() {
	var z = x - 1;
	if (z != 0) {
		document.getElementById("removeRow" + z).style.display = "none";
		document.getElementById("editRow" + z).style.display = "none";
	}
}
// 创建一个ContactPerson
function createContactPerson() {
	$.ajax({
		type : "POST",
		url : "addContactPerson.do",
		dateType : "json",
		data : {
			userId : $("#deleteid").val()
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
		}
	})
}
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
