window.onload = editClient;
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
			if (data == "0") {
				window.location.href = "login.html";
			} else {
				swal("user_logout.do 500Error!");
			}
		}
	})
}
function editClient() {
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			$("#currUser").append(data.realName);
			pow=data.type;
			if (data.type == 1) {
				$("#cName").attr("readOnly","true");
				$("#cWebsite").attr("readOnly","true");
				$("#cTerm").attr("disabled","disabled");
				$("#cDays").attr("disabled","disabled");
				$("#cSize").attr("disabled","disabled");
				$("#cTrade").attr("disabled","disabled");
				
				$("#register").hide();
				$("#user").hide();
			}
		}
	});
	$.ajax({
		type : "POST",
		url : "editClient.do",
		dataType : "json",
		error : function(data) {
			alert("Server Error!");
		},
		success : function(data) {
			$("#clientId").val(data.id);
			$("#cName").val(data.companyName);
			$("#cWebsite").val(data.webSite);
			$("#cDays").val(data.days);
			var size = document.getElementById("cSize");
			for (var i = 0; i < size.length; i++) {
				if (size[i].value == data.size) {
					size[i].selected = true;
					$("#cSize").selectpicker("refresh");
				}
			}
			var term = document.getElementById("cTerm");
			for (var i = 0; i < term.length; i++) {
				if (term[i].value == data.term) {
					term[i].selected = true;
					$("#cTerm").selectpicker("refresh");
				}
			}
			$("#cRemark").val(data.remark);
			$("#cLastdate").val(data.lastDate);
			$("#cPIC").val(data.picObject.realName);
			var trade = document.getElementById("cTrade");
			for (var i = 0; i < trade.length; i++) {
				if (trade[i].value == data.trade) {
					trade[i].selected = true;
					$("#cTrade").selectpicker("refresh");
				}
			}
		}
	});

	$
			.ajax({
				type : "POST",
				url : "loadAllContactPerson.do",
				dataType : "json",
				error : function(data) {
					alert("Server Error!");
				},
				success : function(data) {
					// $("#clientId").val(data[0].companyid);
					if (data != null) {
						for (var i = 0; i < data.length; i++) {
							var actived = "<th style='text-align:left;vertical-align : middle; color:green'><span class='label label-table label-success'>Actived</span></th>";
							var resigned = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse'>Resigned</span></th>";

							var head = "<tr id='row"
									+ data[i].id
									+ "'>"
									+ "<td  style='vertical-align:middle;'>"
									+ data[i].name
									+ "</td>"
									+ "<td  style='vertical-align:middle;'>"
									+ data[i].email
									+ "</td><td  style='vertical-align:middle;'>"
									+ data[i].billaddress
									+ "</td><td  style='vertical-align:middle;'>"
									+ data[i].postal
									+ "</td><td  style='vertical-align:middle;'>"
									+ data[i].tel
									+ "</td><td  style='vertical-align:middle;'>"
									+ data[i].position + "</td>";
							var status = null;
							if ("active" == data[i].status) {
								status = actived;
							} else {
								status = resigned;
							}
							var leg = "<td style='vertical-align:middle;'><a class='btn btn-danger  btn-lg' onclick='editRow("
									+ data[i].id
									+ ")' href='javascript:void(0)' id='editRow"
									+ data[i].id
									+ "'>"
									+ "edit</a> <a class='btn btn-danger  btn-lg' onclick='removeRow("
									+ data[i].id
									+ ")' href='javascript:void(0)' id='removeRow"
									+ data[i].id
									+ "'>remove</a><a onclick='addKey("
									+ data[i].id
									+ ")' class='addKey' style='display:none'></td>"
									+ "</tr>";
							var one = head + status + leg;
							$("#addContactPerson").append(one);
						}
						// 清空modal中的数据
						$("#cpName").val("");
						$("#cpEmail").val("");
						$("#cpBillAddress").val("");
						$("#cpPosition").val("");
						$("#cpState").val("");
						$("#cpBlock").val("");
						$("#cpLevel").val("");
						$("#cpUnit").val("");
						$("#cpPostal").val("");
						$("#cpMobile").val("");
						$("#cpTel").val("");

					}
				}
			});
	getEdit();
}
// get edit history
function getEdit() {
	$
			.ajax({
				type : "POST",
				url : "loadClientHistory.do",
				dataType : "json",
				data : {
					pageIndex : 1,
					pageSize : 9999999
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					if(pow==3){
						for (var i = 0; i < data.length; i++) {
							var body = "<tr id='remarkRow"+data[i].id+"'><th><textarea id='remark"+data[i].id+"' readOnly='true'  class='form-control' data-parsley-id='50' style='margin: 0px; width:700px; height: 60px;'>"
									+ data[i].editRemark
									+ "</textarea></th>"
									+ "<th>"
									+ data[i].userObject.realName
									+ "</th>"
									+ "<th>"
									+ data[i].lastdate
									+ "<th>"
									+ "<a class='btn btn-success  btn-lg' onclick='saveRemark("+data[i].id+")'  id='editRow402'>Save</a>"
									+ "<a class='btn btn-primary  btn-lg' onclick='unlockRemark("+data[i].id+")'  id='editRow402'>Unlock</a>"
									+ "<a class='btn btn-danger  btn-lg' onclick='deleteRemark("+data[i].id+")'  id='editRow402'>Delete</a>"
									+ "</th>"
									+ "</th><tr>";
							$("#remarkHistory").append(body);
						}
					}else{
						for (var i = 0; i < data.length; i++) {
							var body = "<tr id='remarkRow"+data[i].id+"'><th><textarea id='remark"+data[i].id+"' readOnly='true'  class='form-control' data-parsley-id='50' style='margin: 0px; width:700px; height: 60px;'>"
									+ data[i].editRemark
									+ "</textarea></th>"
									+ "<th>"
									+ data[i].userObject.realName
									+ "</th>"
									+ "<th>"
									+ data[i].lastdate
									+ "<th>"
									+ "</th>"
									+ "</th><tr>";
							$("#remarkHistory").append(body);
						}
					}
				
				}
			});
}
function saveRemark(i){
	$.ajax({
		type : "POST",
		url : "saveRemark.do",
		dataType : "json",
		data : {
          editremark:$("#remark"+i).val(),
          id:i
		},
		error : function(data) {
			alert("请求失败~");
		},
		success:function(data){
			if(data=="0"){
				lockRemark(i);
			}else
			 if(data!="1"){
				swal("Update remark fail!");
				//锁住remark
			}else{
				swal("SaveRemark Error!");
			}
		
		}
	})
}
function unlockRemark(i){
	$('textarea[id=remark'+i+']').attr("readOnly",false);
}
function lockRemark(i){
	$('textarea[id=remark'+i+']').attr("readOnly",true);
}
function deleteRemark(i){
	$.ajax({
		type : "POST",
		url : "deleteRemark.do",
		dataType : "json",
		data : {
          id:i
		},
		error : function(data) {
			alert("请求失败~");
		},
		success:function(data){
			if(data=="0"){
				$("#remarkRow"+i).remove();
			}else
			 if(data!="1"){
				swal("Delete remark fail!");
			}else{
				swal("DeleteRemark Error!");
			}
		
		}
	})
}
$(document)
		.ready(
				function() {
					// 点击save保存cp信息时触发事件
					$("#saveCP").click(function() {

						updateContactPerson($("#editId"));
					});
					// update Client
					// $("#saveClient").click(function(){
					// $.ajax({
					// type : "POST",
					// url : "getCPcount.do",
					// dateType : "json",
					// data : {
					// id : $("#clientId").val()
					// },
					// error : function(data) {
					// swal("getCPcount Error！");
					// },
					// success : function(data1) {
					// if (data1 == 0) {
					// swal("Please create a Client-PIC");
					// // return false;
					// } else {
					// $("#clientId").val(data);
					// // js模拟click事件触发addKey(cp主键)
					// // 将页面中ContactPerson关联刚创建的Client
					// if ($(".addKey") != null) {
					// $(".addKey").click();
					// }// 跳转到staffClient页面
					// $.ajax({
					// type : "POST",
					// url : "updateClient.do",
					// dataType : "json",
					// data:{
					// id:$("#clientId").val(),
					// companyName : $("#cName").val(),
					// webSite : $("#cWebsite").val(),
					// days : $("#cDays").val(),
					// size : $("#cSize").val(),
					// remark : $("#cRemark").val(),
					// trade:$("#cTrade").val(),
					//											
					// },
					// error : function(data){
					// swal("update Fail~");
					// },
					// success:function(data){
					// //add update client history record
					// $.ajax({
					// type:"POST",
					// url:"addClientHistory.do",
					// dataType:"json",
					// async:false,
					// data:{
					// client:$("#clientId").val(),
					// type:"edit",
					// editRemark:$("#editRemark").val()
					// },
					// error:function(data){
					// swal("add client history fail~");
					// },
					// success:function(data){
					// if(data=="0"){
					// window.location.href="mci-staffClient.do";
					// }else{
					// swal("Update Fail!");
					// }
					// }
					// });
					//											
					// }
					// });
					// }
					// }
					// });
					//						
					// });
					$("#saveClient")
							.click(
									function() {
										if ($("#cName").val() != ""
												&& $("#cDays").val() != ""
												&& $("#cSize").val() != ""
												&& $("#editRemark").val() != ""
												&& $("#cTrade").val() != "") {
											$
													.ajax({
														type : "POST",
														url : "updateClient.do",
														dataType : "json",
														data : {
															id : $("#clientId")
																	.val(),
															companyName : $(
																	"#cName")
																	.val(),
															webSite : $(
																	"#cWebsite")
																	.val(),
															days : $("#cDays")
																	.val(),
															size : $("#cSize")
																	.val(),
															// remark :
															// $("#cRemark").val(),
															trade : $("#cTrade")
																	.val()
														},
														error : function(data) {
															swal("update Fail~");
														},
														success : function(data) {
															// add update client
															// history record
															$
																	.ajax({
																		type : "POST",
																		url : "addClientHistory.do",
																		dataType : "json",
																		async : false,
																		data : {
																			client : $(
																					"#clientId")
																					.val(),
																			editRemark : $(
																					"#editRemark")
																					.val(),
																			type : "edit"
																		},
																		error : function(
																				data) {
																			swal("add client history fail~");
																		},
																		success : function(
																				data) {

																		}
																	});
															if (data == "0") {
																window.location.href = "mci-staffClient.do";
															} else {
																swal("Update Fail!");
															}
														}
													});

										} else {
											swal("Required cannot be empty!");
											return false;
										}

									});

					// 创建一个CP
					$("#createCP")
							.click(
									function() {
										
										if ($("#cpName").val() != ""
												&& $("#cpEmail").val() != ""
												&& $("#cpBillAddress").val() != ""
												&& $("#cpPosition").val() != ""
												&& $("#cpPostal").val() != ""
												&& $("#cpTel").val() != "") {
											if (isNaN($("#editTel").val())
													|| isNaN($("#editPostal")
															.val())) {
												swal("Please input in correct format!");
												return false;
											}
											$
													.ajax({
														type : "POST",
														url : "addContactPerson.do",
														dataType : "json",
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
															alert("失败");
														},
														success : function(data) {
															// 点击createContactPerson后显示到table
															var actived = "<th style='text-align:left;vertical-align : middle; color:green'><span class='label label-table label-success'>Actived</span></th>";
															var resigned = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse'>Resigned</span></th>";
															
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
															var status = null;
															if ($("#cpStatus").val() == "active") {
																status = actived;
															} else {
																status = resigned;
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
															$("#addContactPerson").append(one);
															// 清空modal中的数据
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
				})
// 删除一个contactPerson
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
		}

	});
}
// editContactPerson
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
			$("#editState").val(data.state);
			$("#editBlock").val(data.block);
			$("#editLevel").val(data.level);
			$("#editUnit").val(data.unitno);
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
	if ($("#editName").val() != "" && $("#editEmail").val() != ""
			&& $("#editBillAddress").val() != ""
			&& $("#editPosition").val() != "" && $("#editPostal").val() != ""
			&& $("#editTel").val() != "" && $("#cTrade").val() != "") {
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
						state : $("#editState").val(),
						block : $("#editBlock").val(),
						level : $("#editLevel").val(),
						unitno : $("#editUnit").val(),
						postal : $("#editPostal").val(),
						mobile : $("#editMobile").val(),
						tel : $("#editTel").val(),
						term : $("#editTerm").val(),
						status : $("#editStatus").val()
					},
					error : function(data) {
						alert("Ajax Fail！");
					},
					success : function(data) {
						// 更新后删除原本table中的行
						$("#row" + $("#editId").val()).remove();
						// 然后写入新的行
						var actived = "<th style='text-align:left;vertical-align : middle; color:green'><span class='label label-table label-success'>Actived</span></th>";
						var resigned = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse'>Resigned</span></th>";
					
						var head=
										"<tr id='row"
												+ data
												+ "'>"
												+ "<td  style='vertical-align:middle;'>"
												+ $("#editName").val()
												+ "</td>"
												+ "<td  style='vertical-align:middle;'>"
												+ $("#editEmail").val()
												+ "</td><td  style='vertical-align:middle;'>"
												+ $("#editBillAddress").val()
												+ "</td><td  style='vertical-align:middle;'>"
												+ $("#editPostal").val()
												+ "</td><td  style='vertical-align:middle;'>"
												+ $("#editTel").val()
												+ "</td><td  style='vertical-align:middle;'>"
												+ $("#editPosition").val()
												+ "</td>";
						
						var status = null;
						if ($("#editStatus").val() == "active") {
							status = actived;
						} else {
							status = resigned;
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
						$("#addContactPerson")
						.append(one);
					}
				});
	} else {
		swal("Required cannot be empty!");
		return false;
	}
}