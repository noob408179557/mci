
$(document)
		.ready(
				function() {
				
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

//删除一个contactPerson
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
}
//editContactPerson
//回显ContactPerson的信息
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
//update ContactPerson
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