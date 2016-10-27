//editClient页面除contactperson操作外的所有操作
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
	loadLeft();
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
//			$("#currUser").append(data.realName);
			pow=data.type;
			if(data.type=="1"){
				$("#cName").attr("disabled","disabled");
				$("#cWebsite").attr("disabled","disabled");
				$("#cDays").attr("disabled","disabled");
				$("#cTerm").attr("disabled","disabled");
				$("#cSize").attr("disabled","disabled");
				$("#cTrade").attr("disabled","disabled");
				$("#cRemark").attr("disabled","disabled");
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
							var leg ="<td style='vertical-align:middle;'><a title='edit' class='btn btn-primary  btn-lg' onclick='editRow("
									+ data[i].id
									+ ")' href='javascript:void(0)' id='editRow"
									+ data[i].id
									+ "'>"
									+ "<i class='glyphicon glyphicon-edit'></i></a> <a  title='remove' class='btn btn-danger  btn-lg  remove' onclick='removeRow("
									+ data[i].id
									+ ")' href='javascript:void(0)' id='removeRow"
									+ data[i].id
									+ "'><i class='glyphicon glyphicon-trash'></i></a><a onclick='addKey("
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
						hiddenRemove();
					}
				}
			});
	getEdit();
	
}
function hiddenRemove(){
//	$(".remove").css({ display: none }); 
//	$(".remove").attr("display","none");
	if(pow=="1"){
		$(".remove").each(function(){
			$(this).hide();
			});
	}
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
									+ (data[i].lastdate).substring(0,19)
									+ "<th style='padding=top: 10px;'>"
									+ "<a title='save' class='btn btn-success  btn-lg' onclick='saveRemark("+data[i].id+")'  id='editRow402'><i class='md md-lock'></i></a>"
									+ "<a title='unlock' class='btn btn-primary  btn-lg' onclick='unlockRemark("+data[i].id+")'  id='editRow402'><i class='md md-lock-open'></i></a>"
									+ "<a title='delete' class='btn btn-danger  btn-lg' onclick='deleteRemark("+data[i].id+")'  id='editRow402'><i class='glyphicon glyphicon-trash'></i></a>"
									+ "</th>"
									+ "</th><tr>";
							$("#remarkHistory").append(body);
						}
					}else{
						for (var i = 0; i < data.length; i++) {
							var body ="<tr id='remarkRow"+data[i].id+"'><th><textarea id='remark"+data[i].id+"' readOnly='true'  class='form-control' data-parsley-id='50' style='margin: 0px; width:700px; height: 60px;'>"
									+ data[i].editRemark
									+ "</textarea></th>"
									+ "<th>"
									+ data[i].userObject.realName
									+ "</th>"
									+ "<th>"
									+ (data[i].lastdate).substring(0,19)
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
	console.log("$(#remark"+i+").val():"+$("#remark"+i).val());
	$.ajax({
		type : "POST",
		url : "saveRemark.do",
		dataType : "json",
		data : {
			editRemark:$("#remark"+i).val(),
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
																	.val(),
																	remark : $("#cRemark")
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

				})


