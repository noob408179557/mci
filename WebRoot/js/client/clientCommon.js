$(document)
		.ready(
				function() {
					$("#blockClient")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "blockClient.do",
														dataType : "json",
														data : {
															id : $(
																	"input[name='select']:checked")
																	.val()
														},
														error : function(data) {
															swal("blockClient error!");
														},
														success : function(data) {
															if (data == "1") {
																swal("This client can't be inactive!");

															} else if (data == "0") {
																swal("This client is already inactive!");
																search();
															}

														}
													})
										} else {
											swal("You haven't select any client!");
										}
									});
					$("#editInvoice")
							.click(
									function() {
										if ($(
												"input[name='selectInvoice']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "editInvoice.do",
														dataType : "json",
														data : {
															id : $(
																	"input[name='selectInvoice']:checked")
																	.val()
														},
														error : function(data) {
															swal("editInvoice.do Error!");
														},
														success : function(data) {
															if (data.state == "1") {
																if (data.type == "C") {
																	window.location.href = "mci-editInvoiceC.do";
																} else if (data.type == "F") {
																	window.location.href = "mci-editInvoiceF.do";
																} else if (data.type == "P") {
																	window.location.href = "mci-editInvoiceP.do";
																} else if (data.type == "T") {
																	window.location.href = "mci-editInvoiceT.do";
																}
															} else {
																swal("You can't edit for this invoice!");
															}
														}
													});
										} else {
											swal("You haven't select any invoice!");
										}

									});

					$("#assignTo")
							.click(
									function() {
										if ($("input[name='select1']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "assignToPic.do",
														dataType : "json",
														data : {
															client : $(
																	"input[name='select']:checked")
																	.val(),
															user : $(
																	"input[name='select1']:checked")
																	.val(),
															type : "assign"
														},
														error : function(data) {
															swal("assignToPic.do Error!");
														},
														success : function(data) {
															search($(
																	"#pageIndex")
																	.val());
															swal("assign successful!");
														}
													})
										} else {
											swal("You haven't select MCI-PIC!");
											return false;
										}

									});
					// 点击activeClient
					$("#activeClient").click(function() {
						$.ajax({
							type : "POST",
							url : "activeClient.do",
							dataType : "json",
							data : {
								id : $("input[name='select']:checked").val()
							},
							error : function(data) {
								if (data != "1") {
									search($("#pageIndex").val());
								}
							},
							success : function(data) {
								if (data != "1") {
									search($("#pageIndex").val());
									swal("Active Success!");
								}
							}
						});
					});
					// 点击search button时
					$("#searchbtn").click(function() {
						if ($("#searchBlock")[0].style.display == 'none') {
							$("#searchBlock")[0].style.display = 'block';
						} else {
							$("#searchBlock")[0].style.display = 'none';
						}
					});
					$("#search")
							.click(
									function() {
										$
												.ajax({
													type : "POST",
													url : "setClientLimit.do",
													async : false,
													dataType : "json",
													data : {
														startDate : $(
																"#datepicker-autoclose")
																.val(),
														endDate : $(
																"#datepicker-autoclose1")
																.val(),
														companyName : $(
																"#searchCompanyName")
																.val(),
														state : $(
																"#searchStatus")
																.val(),
														trade : $(
																"#searchTrade")
																.val(),
														picName : $(
																"#searchPic")
																.val()
													},
													error : function(data) {
														swal("searchClient.do Error!");
													},
													success : function(data) {
														if (data == "0") {
															$
																	.ajax({
																		type : "POST",
																		url : "searchClient.do",
																		async : false,
																		dataType : "json",
																		data : {
																			startDate : $(
																					"#datepicker-autoclose")
																					.val(),
																			endDate : $(
																					"#datepicker-autoclose1")
																					.val(),
																			companyName : $(
																					"#searchCompanyName")
																					.val(),
																			state : $(
																					"#searchStatus")
																					.val(),
																			trade : $(
																					"#searchTrade")
																					.val(),
																			picName : $(
																					"#searchPic")
																					.val()
																		},
																		error : function(
																				data) {
																			swal("searchClient.do Error!");
																		},
																		success : function(
																				data) {
																			window.location.href = "mci-searchClient.do";
																		}
																	})
														} else {
															swal("setClientLimit  Error!");
														}

													}
												})

									});
					$("#delete")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											swal(
													{
														title : "Are you sure?",
														text : "You will not be able to recover this client!",
														type : "warning",
														showCancelButton : true,
														confirmButtonColor : "#DD6B55",
														confirmButtonText : "Yes, delete it!",
														cancelButtonText : "No, wrong click!",
														closeOnConfirm : false,
														closeOnCancel : false
													},
													function(isConfirm) {
														if (isConfirm) {
															deleteClient();
															swal(
																	"Deleted!",
																	"Your client has been deleted.",
																	"success");
															search();
														} else {
															swal(
																	"Cancelled",
																	"Your client still there",
																	"error");
														}
													});
										} else {
											swal("You haven't select any client!")
										}

									});
					// 查看选中client update history
					$("#history")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "getClientHistory.do",
														data : "json",
														data : {
															client : $(
																	"input[name='select']:checked")
																	.val()
														},
														error : function(data) {
															alert("请求失败~");
														},
														success : function(data) {
															getClientHistoryResult(1);
														}
													});
										} else {
											swal("You haven't select any client!");
										}
									});
					$("#edit")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											var clientId = $(
													"input[name='select']:checked")
													.val();
											$
													.ajax({
														type : "POST",
														url : "getaClient.do",
														dataType : "json",
														async : false,
														data : {
															id : $(
																	"input[name='select']:checked")
																	.val()
														},
														error : function(data) {
															swal("getaClient.do Error!!");
														},
														success : function(data) {
															$
																	.ajax({
																		type : "POST",
																		url : "getPow.do",
																		dataType : "json",
																		async : false,
																		error : function(
																				data) {
																			alert("请求失败~");
																		},
																		success : function(
																				pow) {

																			if ((data.state== "2"&&pow.type == "1")||(data.state == "3"&&pow.type == "1")){
//																					pow.type == "1") {
																				swal("You can't edit for this client!");
																				return false;
																			} else {
																				$
																						.ajax({
																							type : "POST",
																							url : "preEditClient.do",
																							dataType : "json",
																							data : {
																								id : $(
																										"input[name='select']:checked")
																										.val()
																							},
																							error : function(
																									data) {
																								alert("请求失败~");
																							},
																							success : function(
																									data) {
																								window.location.href = "mci-editClient.do";
																							}
																						})
																			}
																		}
																	});
														}
													});

										} else {
											swal("You haven't select any client!");
										}
									});
				})
				//分页获取clientHistory
function getClientHistoryResult(i){
	if (isNaN(i)) {
		i = $("#historyPageIndex").val();
	}
	$.ajax({
		type:"POST",
		url:"loadClientHistory.do",
		dataType:"json",
		data:{
			pageIndex:i
		},
		error:function(data){
			swal("loadClientHistory.do error!");
		},
		success:function(data){
			if (data.length != 0) {
				$(
						"#historyList")
						.empty();
				$(
						"#clientHistory")
						.val("");
				$(
						"#clientHistory")
						.val(
								data[0].clientObject.companyName);
				for ( var i = 0; i < data.length; i++) {
					if(data[i].editRemark==null||data[i].editRemark==""){
						$(
						"#historyList")
						.append(
								"<tr><th style='text-align:left;vertical-align : middle; '>"
										+ (i + 1)
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ data[i].userObject.realName
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ data[i].lastdate
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ data[i].type
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ "</th>"
										+ "<tr>");
					}else{
						$(
						"#historyList")
						.append(
								"<tr height='35'><th style='text-align:left;vertical-align : middle; '>"
										+ (i + 1)
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ data[i].userObject.realName
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ data[i].lastdate
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ data[i].type
										+ "</th>"
										+ "<th style='text-align:left;vertical-align : middle; '>"
										+ "<a class='btn btn-primary  btn' onclick='getRemark("
										+ data[i].id
										+ ")' href='javascript:void(0)' "
										+ ">"
										+ "remark</a>"
										+ "</th>"
										+ "<tr>");
					}
				
				}
				$("#view0")
						.modal();
			} else {
				swal("This client's update history is empty!");
			}
		
		}
		
	})
	$.ajax({
		type:"POST",
		url:"loadClientHistoryCount.do",
		dataType:"json",
		error:function(data){
			swal("loadClientHistory.do error!");
		},
		success:function(data){
			$("#hisPageIndex").val(i);
			$("#pageHis").empty();
			$("#pageHis").append(i + "/" + data);
			$("#firstHis").attr("onclick", "getClientHistoryResult(1)");
			$("#lastHis").attr("onclick", "getClientHistoryResult(" + data + ")");
			if (($("#hisPageIndex").val()) > data - 1) {
				$("#nextHis").attr("onclick", "getClientHistoryResult(" + data + ")");
			} else {
				$("#nextHis").attr(
						"onclick",
						"getClientHistoryResult(" + (Number($("#hisPageIndex").val()) + 1)
								+ ")");
			}
			if (($("#hisPageIndex").val() < 2)) {
				$("#previousHis").attr("onclick", "getClientHistoryResult(1)");
			} else {
				$("#previousHis").attr(
						"onclick",
						"getClientHistoryResult(" + (Number($("#hisPageIndex").val()) - 1)
								+ ")");
			}
		
		}
	})
}
function getRemark(id){
	$.ajax({
		type : "POST",
		url : "getRemark.do",
		dataType : "json",
		async : false,
		data:{
			id:id
		},
		error:function(data){
			alert("getRemark.do Error!");
		},
		success:function(data){
			$("#editRemark").val(data.editRemark);
			$("#editRemark1").modal();
		}
		})
}

// 删除一个Client
function deleteClient() {

	$.ajax({
		type : "POST",
		url : "getaClient.do",
		dataType : "json",
		async : false,
		data : {
			id : $("input[name='select']:checked").val()
		},
		error : function(data) {
			swal("getaClient.do Error!!");
		},
		success : function(data) {
			$.ajax({
				type : "POST",
				url : "getPow.do",
				dataType : "json",
				async:false,
                error : function(data) {
					alert("请求失败~");
				},
				success : function(user) {
					if((data.state=="0"||data.state=="1")&&user.type!="3"){
						swal("You can't delete this client!");
						return false;
					}else{
						$.ajax({
							type : "POST",
							url : "getAccountPage.do",
							dataType : "json",
							async : false,
							data : {
								pageIndex:"1"
							},
							error : function(data) {
								swal("getaClient.do Error!!");
							},
							success:function(data){
								if(data.length!=0){
									swal("Please delete the client's invoice！");
									return false;
								}
								}
						});
						
						
						$.ajax({
							type : "POST",
							url : "deleteClient.do",
							dataType : "json",
							async : false,
							data : {
								id : $("input[name='select']:checked").val()
							},
							error : function(data) {
								alert("请求失败~");
							},
							success : function(data) {
								if (data == "0") {
									swal("Delete Success!");
									search();
									return true;
									} else if(data=="1"){
										swal("Please delete the client's invoice！");
										return false;
									}
							}
						});
						}
				}
				});
			
			
			
			
			
			}
		
	});
	
	
	
}
// 获取全部user,assign的分页
function getUser(i) {
	if ($("input[name='select']:checked").val() != null) {
		$.ajax({
			type : "POST",
			url : "getUserName.do",
			dataType : "json",
			data : {
				id : $("input[name='select']:checked").val()
			},
			error : function(data) {
				swal("getUserName.do Error!");
			},
			success : function(data) {
				$("#picName").val(data.picObject.realName)
				$("#userName").val(data.companyName);
			}
		});

		if (isNaN(i)) {
			i = "1";
		}
		$
				.ajax({
					type : "POST",
					url : "getUser.do",
					dataType : "json",
					data : {
						pageIndex : i
					},
					error : function(data) {
						swal("Server Fail!");
					},
					success : function(data) {
						$("#userList").empty();
						for ( var i = 0; i < data.length; i++) {
							$("#userList")
									.append(
											"<tr><th width='5%'><div class='radio radio-primary radio-single'><input type='radio' name='select1' value='"
													+ data[i].id
													+ "'><label></label></div></th><th style='text-align:left;vertical-align : middle; '>"
													+ data[i].realName
													+ "</th><tr>");
						}

					}
				})
		$.ajax({
			type : "POST",
			url : "getUserCount.do",
			dataType : "json",
			error : function(data) {
				swal("Server Fail!");
			},
			success : function(data) {
				$("#userIndex").val(i);
				$("#pageUser").empty();
				$("#pageUser").append(i + "/" + data);
				$("#firstUser").attr("onclick", "getUser(1)");
				$("#lastUser").attr("onclick", "getUser(" + data + ")");
				if (($("#userIndex").val()) > data - 1) {
					$("#nextUser").attr("onclick", "getUser(" + data + ")");
				} else {
					$("#nextUser").attr(
							"onclick",
							"getUser(" + (Number($("#userIndex").val()) + 1)
									+ ")");
				}
				if (($("#userIndex").val() < 2)) {
					$("#previousUser").attr("onclick", "getUser(1)");
				} else {
					$("#previousUser").attr(
							"onclick",
							"getUser(" + (Number($("#userIndex").val()) - 1)
									+ ")");
				}
				$("#assign0").modal();
			}
		});
	} else {
		swal("You haven't select any client!");
	}
}
// 把查询条件存到session中
function getAccount() {
	if ($("input[name='select']:checked").val() != null) {
		$.ajax({
			type : "POST",
			url : "getAccount.do",
			data : {
				id : $("input[name='select']:checked").val()
			},
			dataType : "json",
			error : function(data) {
				swal("Server Fail!");
			},
			success : function(data) {
				if(data=="2"){
					swal("This client haven't any invoice!");
				}else{
				if (data == "0") {
					getAccountPage(1);
				} else {
					swal("code Error!");
				}
				}
			}
		});
	} else {
		swal("You haven't select any client!");
	}
}
//获取查询account的结果
function getAccountPage(i) {
	if (isNaN(i)) {
		i = $("#accountPageIndex").val();
	}
	$.ajax({
				type : "POST",
				url : "getAccountPage.do",
				data : {
					pageIndex : i
				},
				error : function(data) {
					swal("getAccountPage.do Error!");
				},
				success : function(data) {
					var created = "<th style='text-align:left;vertical-align : middle; '>"
							+ "<span class='label label-table label-inverse btn-lg'>Created</span></th>"
					var unpaid = "<th style='text-align:left;vertical-align : middle; '>"
							+ "<span class='label label-table label-danger btn-lg'>Unpaid</span></th>"
					var partialpaid = "<th style='text-align:left;vertical-align : middle; '>"
							+ "<span class='label label-table label-warning btn-lg'>Partial Paid</span></th>"
					var fullypaid = "<th style='text-align:left;vertical-align : middle; '>"
							+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
					$("#accountList").empty();
					// data类型为invoice
					for ( var i = 0; i < data.length; i++) {
						if (data[i].remark == null) {
							data[i].remark = "";
						}
						if (data[i].total == null) {
							data[i].total = "";
						}
						var body1 = "<tr><td width='5%'><div class='radio radio-primary radio-single'><input type='radio' name='selectInvoice' value='"
								+ data[i].id
								+ "'><label></label></div></td><td style='text-align:left;vertical-align : middle; '><div style='cursor:pointer;color:#00F' onclick=searchInvoice("+data[i].id+")>"
								+ data[i].clientObject.companyName
								+ "</div></td><td style='text-align:left;vertical-align : middle; '>"
								+ data[i].total
								+ "</td><td style='text-align:left;vertical-align : middle; '>"
								+ data[i].remark + "</td>";
						var body2;
						if (data[i].state == "1") {
							body2 = created;
						} else if (data[i].state == "2") {
							body2 = unpaid;
						} else if (data[i].state == "3") {
							body2 = partialpaid;
						} else {
							body2 = fullypaid;
						}
						var body3 = "<td style='text-align:left;vertical-align : middle; '>"
								+ data[i].createDate + "</td><tr>";
						var one = body1 + body2 + body3;
						$("#accountList").append(one);
					}
					$("#account1").modal();
				}
			});
	$.ajax({
		type : "POST",
		url : "loadClientAccountCount.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			// 返回的data为页数
			$("#accountPageIndex").val(i);
			$("#pageAccount").empty();
			$("#pageAccount").append(i + "/" + data);
			$("#firstAccount").attr("onclick", "getAccountPage(1)");
			$("#lastAccount").attr("onclick", "getAccountPage(" + data + ")");
			if (($("#accountPageIndex").val()) > data - 1) {
				$("#nextAccount").attr("onclick",
						"getAccountPage(" + data + ")");
			} else {
				$("#nextAccount").attr(
						"onclick",
						"getAccountPage("
								+ (Number($("#accountPageIndex").val()) + 1)
								+ ")");
			}
			if (($("#accountPageIndex").val() <= 1)) {
				$("#previousAccount").attr("onclick", "getAccountPage(1)");
			} else {
				$("#previousAccount").attr(
						"onclick",
						"getAccountPage("
								+ (Number($("#accountPageIndex").val()) - 1)
								+ ")");
			}
		}
	});
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
function searchInvoice(i){
$.ajax({
	type : "POST",
	url : "searchInvoice.do",
	dataType : "json",
	data : {
		id:i
	},
	error : function(data) {
		swal("searchClient.do Error!");
	},
	success : function(data) {
		window.location.href = "mci-searchInvoice.do";
	}
})
}
function clearClient(){
$.ajax({
	type : "POST",
	url : "clearClient.do",
	async:false
})
}
