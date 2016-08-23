window.onload = init;

function init() {
	clearInvoice();
	search();
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

				$("#cancel").hide();
				$("#confirm").hide();
				$("#activeInvoice").hide();
				$("#register").hide();
				$("#user").hide();
			}else if(data.type==2){
				$("#addUserbtn").hide();
			}
		}
	});
	$.ajax({
		type : "POST",
		url : "autoClientList.do",
		dateType : "json",
		async : false,
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			var name = function(title) {
				this.title = title;
				return this;
			}
			var names = new Array();
			for ( var i = 0; i < data.length; i++) {
				var c = new name();
				c.title = data[i].companyName;
				names.push(c);
			}
			$("#searchCompanyName").bigAutocomplete({
				data : names,
				callback : function(data) {

				}
			});
		}
	});
	$.ajax({
		type : "POST",
		url : "autoConsultantList.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			var name = function(title) {
				this.title = title;
				return this;
			}
			var names = new Array();
			for ( var i = 0; i < data.length; i++) {
				var c = new name();
				c.title = data[i].realName;
				names.push(c);
			}
			$("#searchConsultant").bigAutocomplete({
				data : names,
				callback : function(data) {

				}
			});
		}
	});
}
function search(i) {
	$("#invoiceList").empty();
	if (isNaN(i)) {
		i = $("#pageIndex").val();
	}
	$
			.ajax({
				type : "POST",
				url : "loadInvoice.do",
				dataType : "json",
				data : {
					pageIndex : i
				},
				error : function(data) {
					swal("Fail!!");
				},
				success : function(data) {
					$
							.ajax({
								type : "POST",
								url : "getPow.do",
								dataType : "json",
								data : {
									pageIndex : i
								},
								error : function(data) {
									swal("Fail!!");
								},
								success : function(data1) {
									if (data1.type != "1") {
										for ( var i = 0; i < data.length; i++) {
											var created = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-inverse btn-lg'>Created</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var unpaid = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-danger btn-lg'>Unpaid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "&nbsp;<div data-target='#payment' data-toggle='modal' class='btn btn-primary waves-effect waves-light btn-lg' id='' onclick='confirmPayment("
												+ data[i].id
												+ ")'>"
												+ "<i class='glyphicon glyphicon-usd'></i>Comfirm Payment</div></th></tr>";
										var partialpaid = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-warning btn-lg'>Partial Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "&nbsp;<div data-target='#payment' data-toggle='modal' class='btn btn-primary waves-effect waves-light btn-lg' id='' onclick='confirmPayment("
												+ data[i].id
												+ ")'>"
												+ "<i class='glyphicon glyphicon-usd'></i>Comfirm Payment</div></th></tr>";
										var fullypaid = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle;padding-left:12px '>"
												+"<div data-target='#commission' data-toggle='modal' class='btn btn-primary waves-effect waves-light btn-lg' id='' onclick='getCommission("
													+ data[i].id
													+ ")'>"
												+ "<i class='glyphicon glyphicon-ok'></i>&nbsp;Pay commission</div></th></tr>";

										var unpaid1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-danger btn-lg'>Unpaid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var partialpaid1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-warning btn-lg'>Partial Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var fullypaid1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var cancel = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-danger btn-lg'>Canceled</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";  
										var cm = "<th style='text-align:left;vertical-align : middle; '>"
											+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
											+ "<th style='text-align:left;vertical-align : middle; '>"
											+ "<span class='label label-table label-success btn-lg'>CM Paid</span></th></tr>";
											var leg;
											if (null == data[i].total) {
												data[i].total = "No Item";
											}
											if (data[i].state == "1") {
												leg = created;
											} else if (data[i].state == "2") {
												leg = unpaid;
											} else if (data[i].state == "3") {
												leg = partialpaid;
											} else if (data[i].state == "4") {
												if(data[i].commission=="0"){
												leg = fullypaid;
												}else{
													leg = cm;
												}
											} else if (data[i].state == "5") {
												leg = cancel;
											} 
											if (data[i].creditNotes == "0"
												|| data[i].creditNotes == null) {
											data[i].creditNotes = "";
										}
											var pic="";
											// 获取这个invoice中的pic
											$.ajax({
												type :"POST",
												url : "getPic.do",
												dataType : "json",
												async : false,
												data : {
													id:data[i].id,
													pic:data[i].pic,
													pic2:data[i].pic2
												},
												error:function(data){
												},
												success:function(data){
													if(data.pic2!=null&&data.pic2!=""){
														pic=data.picObject.realName+","+data.pic2Object.realName;
													}else{
														pic=data.picObject.realName;
													}
												}
											});
											var head = "<tr><th style='text-align:left;vertical-align : middle; '>"
													+ (i + 1)
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ "<div class='radio radio-primary radio-single' width='64px'><input type='radio' name='select' value='"
													+ data[i].id
													+ "'><label></label></div></th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ data[i].type
													+ data[i].id
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' >"
													+ data[i].total+"/"+(data[i].total*1.07).toFixed(1)
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ data[i].creditNotes
													+ "</th><th style='text-align:left;vertical-align : middle; '>"
													+ pic
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' id='contact"
													+ i
													+ "'>"
													+ data[i].clientObject.companyName
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' id='tel"
													+ i
													+ "'>"
													+ data[i].createDate
													+ "</th>";
											var one = head + leg;
											$("#invoiceList").append(one);
										}
									} else if (data1.type == "1") {
										
										for ( var i = 0; i < data.length; i++) {
											var created = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-inverse btn-lg'>Created</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var unpaid = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-danger btn-lg'>Unpaid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "<div class='btn btn-primary waves-effect waves-light btn-lg' id=''><i class='glyphicon glyphicon-list-alt'></i>&nbsp;Detail</div>"
												+ "&nbsp;<div data-target='#payment' data-toggle='modal' class='btn btn-primary waves-effect waves-light btn-lg' id='' onclick='confirmPayment("
												+ data[i].id
												+ ")'>"
												+ "<i class='glyphicon glyphicon-usd'></i>Comfirm Payment</div></th></tr>";
										var partialpaid = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-warning btn-lg'>Partial Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "&nbsp;<div data-target='#payment' data-toggle='modal' class='btn btn-primary waves-effect waves-light btn-lg' id='' onclick='confirmPayment("
												+ data[i].id
												+ ")'>"
												+ "<i class='glyphicon glyphicon-usd'></i>Comfirm Payment</div></th></tr>";
										var fullypaid = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "<div data-target='#commission' data-toggle='modal' class='btn btn-primary waves-effect waves-light btn-lg' id='' "
												+ "onclick='getCommission("
												+ data[i].id
												+ ")'><i class='glyphicon glyphicon-ok'></i>&nbsp;Pay commission</div></th></tr>";
									
										var unpaid1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-danger btn-lg'>Unpaid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var partialpaid1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-warning btn-lg'>Partial Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var fullypaid1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var cancel1 = "<th style='text-align:left;vertical-align : middle; '>"
												+ "<span class='label label-table label-danger btn-lg'>Canceled</span></th>"
												+ "<th style='text-align:left;vertical-align : middle; '>"
												+ "</th></tr>";
										var cm = "<th style='text-align:left;vertical-align : middle; '>"
											+ "<span class='label label-table label-success btn-lg'>Fully Paid</span></th>"
											+ "<th style='text-align:left;vertical-align : middle; '>"
											+ "<span class='label label-table label-success btn-lg'>CM Paid</span></th></tr>";
											var leg;
											if (null == data[i].total) {
												data[i].total = "No Item";
											}
											if (data[i].state == "1") {
												leg = created;
											} else if (data[i].state == "2") {
												leg = unpaid1;
											} else if (data[i].state == "3") {
												leg = partialpaid1;
											} else if (data[i].state == "4") {
												if(data[i].commission=="0"){
													leg = fullypaid;
													}else{
														leg = cm;
													}
												} else if (data[i].state == "5") {
												leg = cancel1;
											} 
											var pic="";
											// 获取这个invoice中的pic
											$.ajax({
												type : "POST",
												url : "getPic.do",
												dataType : "json",
												async : false,
												data : {
													id:data[i].id,
													pic:data[i].pic,
													pic2:data[i].pic2
												},
												error:function(data){
													swal("getPic.do error!");
												},
												success:function(data){
													if(data.pic2!=null&&data.pic2!=""){
														pic=data.picObject.realName+","+data.pic2Object.realName;
													}else{
														pic=data.picObject.realName;
													}
												}
											});
											if (data[i].creditNotes == "0"
												|| data[i].creditNotes == null) {
											data[i].creditNotes = "";
										}
 											var head = "<tr><th style='text-align:left;vertical-align : middle; '>"
													+ (i + 1)
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ "<div class='radio radio-primary radio-single' width='64px'><input type='radio' name='select' value='"
													+ data[i].id
													+ "'><label></label></div></th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ data[i].type
													+ data[i].id
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' >"
													+ data[i].total+"/"+(data[i].total*1.07).toFixed(1)
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' >"
													+ data[i].creditNotes
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ pic
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' id='contact"
													+ i
													+ "'>"
													+ data[i].clientObject.companyName
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; ' id='tel"
													+ i
													+ "'>"
													+ data[i].createDate
													+ "</th>";
											var one = head + leg;
											$("#invoiceList").append(one);
										}
									}
								}
							});

				}
			});
	$.ajax({
		type : "POST",
		url : "loadInvoiceCount.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			// 返回的data为页数
			$("#pageIndex").val(i);
			$("#pageProgress").empty();
			$("#pageProgress").append(i + "/" + data);
			$("#firstPage").attr("onclick", "search(1)");
			$("#lastPage").attr("onclick", "search(" + data + ")");
			if (($("#pageIndex").val()) > data - 1) {
				$("#nextPage").attr("onclick", "search(" + data + ")");
			} else {
				$("#nextPage").attr("onclick",
						"search(" + (Number($("#pageIndex").val()) + 1) + ")");
			}
			if (($("#pageIndex").val() <= 1)) {
				$("#previousPage").attr("onclick", "search(1)");
			} else {
				$("#previousPage").attr("onclick",
						"search(" + (Number($("#pageIndex").val()) - 1) + ")");
			}
		}
	});
}

/*$(document)
		.ready(
				function() {
				
					$("#getCM").click(function(){
						$.ajax({
							type : "POST",
							url : "getCommission.do",
							dataType : "json",
							data:{
								commission:$("#cmAmount").val()
							},
							error:function(data){
								swal("getCommission.do error");
							},
							success:function(data){
								search();
							}
						})
					})
					$("#detail").click(function(){
						if ($("input[name='select']:checked").val() != null) {
						$.ajax({
							type : "POST",
							url : "editInvoice.do",
							dataType : "json",
							
							data : {
								id : $("input[name='select']:checked").val()
							},
							error : function(data) {
								swal("editInvoice.do Error!");
							},
							success : function(data) {
									if (data.type == "C") {
										window.location.href = "mci-viewC.do";
									} else if (data.type == "F") {
										window.location.href = "mci-viewF.do";
									} else if (data.type == "P") {
										window.location.href = "mci-viewP.do";
									} else if (data.type == "T") {
										window.location.href = "mci-viewT.do";
									}
							}
						})
						}else{
							swal("You haven't select any invoice!");
						}
					})
					// 发送请求将查询条件存到session中
					$("#print").click(function(){
						if ($("input[name='select']:checked").val() != null) {
						$.ajax({
							type : "POST",
							url : "editInvoice.do",
							dataType : "json",
							
							data : {
								id : $("input[name='select']:checked").val()
							},
							error : function(data) {
								swal("editInvoice.do Error!");
							},
							success : function(data) {
									if (data.type == "C") {
										window.open("mci-detailC.do");
									} else if (data.type == "F") {
										window.open("mci-detailF.do");
									} else if (data.type == "P") {
										window.open("mci-detailP.do");
									} else if (data.type == "T") {
										window.open("mci-detailT.do");
									}
							}
						})
						}else{
							swal("You haven't select any invoice!");
						}
					})
					$("#cancel")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "cancelInvoice.do",
														data : {
															id : $(
																	"input[name='select']:checked")
																	.val()
														},
														dataType : "json",
														error : function(data) {
															alert("请求失败~");
														},
														success : function(data) {
															if (data == "0") {
																swal("This invoice is already canceled.");
																search();
															} else if (data == "1") {
																swal("Server Error!");
															} else if (data == "2") {
																swal("This invoice can not be canceled!");
															}
														}
													})
										} else {
											swal("You haven't select any invoice!")
										}
									});
					$("#confirm").click(function() {
						if ($("input[name='select']:checked").val() != null) {
						$.ajax({
							type : "POST",
							url : "confirmInvoice.do",
							data : {
								id : $("input[name='select']:checked").val()
							},
							dataType : "json",
							error : function(data) {
								swal("Server Error!!");
							},
							success : function(data) {
								if (data == "2") {
									swal("This invoice can't be confirm!");
								} else if (data == "0") {
									swal("Confirm Success!");
									search();
								} else if (data == "1") {
									swal("Server Error!");
								}

							}
						});
						} else {
											swal("You haven't select any invoice!")
										}
					});
					$("#delete")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
										$.ajax({
											type : "POST",
											url : "getPow.do",
											dataType : "json",
											async:false,
											error : function(data) {
												alert("请求失败~");
											},
											success : function(data) {
												if(data.type!="1"){
														swal(
																{
																	title : "Are you sure?",
																	text : "You will not be able to recover this client!",
																	type : "warning",
																	showCancelButton : true,
																	confirmButtonColor : "#DD6B55",
																	confirmButtonText : "Yes, delete it!",
																	cancelButtonText : "No,cancel it!",
																	closeOnConfirm : false,
																	closeOnCancel : false
																},
																function(isConfirm) {
																	if (isConfirm) {
																		deleteInvoice();
																		swal(
																				"Deleted!",
																				"Your client has been deleted.",
																				"success");
																		search($(
																				"#pageIndex")
																				.val());
																	} else {
																		swal(
																				"Cancelled",
																				"Your invoice still there.",
																				"error");
																	}
																});
												}else if(data.type=="1"){
													$.ajax({
														type : "POST",
														url : "getaInvoice.do",
														dataType : "json",
														async:false,
														data:{
															id:$("input[name='select']:checked").val()
														},
														error : function(data) {
															alert("请求失败~");
														},
														success:function(data){
															if(data.state=="1"){ 
																swal(
																		{
																			title : "Are you sure?",
																			text : "You will not be able to recover this client!",
																			type : "warning",
																			showCancelButton : true,
																			confirmButtonColor : "#DD6B55",
																			confirmButtonText : "Yes, delete it!",
																			cancelButtonText : "No,cancel it!",
																			closeOnConfirm : false,
																			closeOnCancel : false
																		},
																		function(isConfirm) {
																			if (isConfirm) {
																				deleteInvoice();
																				swal(
																						"Deleted!",
																						"Your client has been deleted.",
																						"success");
																				search($(
																						"#pageIndex")
																						.val());
																			} else {
																				swal(
																						"Cancelled",
																						"Your invoice still there.",
																						"error");
																			}
																		});
															}else{
																swal("You just can delete the invoice in created status.");
															}
														}
													});
														}else{
															swal("error!");
														}
												}
											})
										
									} else {
										swal("You haven't select any invoice!")
									}
										});
					$("#search").click(function(){});
					
					$("#activeInvoice")
					.click(
							function() {
								if ($("input[name='select']:checked")
										.val() != null) {
								$.ajax({
									type : "POST",
									url : "getPow.do",
									dataType : "json",
									async:false,
									error : function(data) {
										alert("请求失败~");
									},
									success : function(data) {
										if(data.type!="1"){
												swal(
														{
															title : "Are you sure?",
															text : "You will send an email to client!",
															type : "warning",
															showCancelButton : true,
															confirmButtonColor : "#DD6B55",
															confirmButtonText : "Yes, send it!",
															cancelButtonText : "No,don't send!",
															closeOnConfirm : false,
															closeOnCancel : false
														},
														function(isConfirm) {
															if (isConfirm) {
																swal(
																		"Success",
																		"The email will be send!",
																		"success");
																$
																.ajax({
																	type : "POST",
																	url : "activeInvoice.do",
																	dataType : "json",
																	data : {
																		id : $(
																				"input[name='select']:checked")
																				.val()
																	},
																	error : function(data) {
																		if (data == "0") {
																			search($(
																					"#pageIndex")
																					.val());
																		}
																	},
																	success : function(data) {
																		// 根据不同返回值做出不同处理
																		if (data == "3") {
																			swal("The invoice has no item,it can't be actived!");
																		}
																		if (data == "2") {
																			swal("The invoice is not created status!");
																		}
																		if (data == "0") {
																			$.ajax({
																				type:"POST",
																				url : "getCPOI.do",
																				dataType : "json",
																				async:false,
																				data:{
																					id:$("input[name='select']:checked").val()
																				},
																				error : function(data) {
																					swal("getCPOI.do Error!!");
																				},
																				success : function(data) {
																					window.location.href="mailto:"+data.email;
																					search($("#pageIndex").val());
																				}
																			})
																			
																		}
																	}
																});
															} else {
																swal(
																		"Cancelled",
																		"Your haven't send the email.",
																		"error");
															}
														});
										}else{
													swal("error!");
												}
										}
									})
								
							} else {
								swal("You haven't select any invoice!")
							}
								});
					// 点击search button时
					$("#searchbtn").click(function() {
						if ($("#searchBlock")[0].style.display == 'none') {
							$("#searchBlock")[0].style.display = 'block';
						} else {
							$("#searchBlock")[0].style.display = 'none';
						}
					});
					
					$("#history")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "getInvoiceHistory.do",
														data : "json",
														data : {
															invoice : $(
																	"input[name='select']:checked")
																	.val()
														},
														error : function(data) {
															alert("请求失败~");
														},
														success : function(data) {
															getInvoiceHistoryResult(1);
														}
													});
										} else {
											swal("You haven't select any invoice!");
										}
									});
				});
// 分页获取clientHistory
function getInvoiceHistoryResult(i) {
	if (isNaN(i)) {
		i = $("#historyPageIndex").val();
	}
	$
			.ajax({
				type : "POST",
				url : "loadInvoiceHistory.do",
				dataType : "json",
				data : {
					pageIndex : i
				},
				error : function(data) {
					swal("loadInvoiceHistory.do error!");
				},
				success : function(data) {
					if (data.length != 0) {
						$("#historyList").empty();
						$("#invoiceHistory").val("");
						$("#invoiceHistory").val(data[0].invoice);
						for ( var i = 0; i < data.length; i++) {
							$("#historyList")
									.append(
											"<tr><th style='text-align:left;vertical-align : middle; '>"
													+ (i + 1)
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ data[i].userObject.realName
													+ "</th>"
													+ "<th style='text-align:left;vertical-align : middle; '>"
													+ data[i].lastdate
													+ "</th>" + "<tr>");
						}
						$("#view0").modal();
					} else {
						swal("This invoice's update history is empty!");
					}
					// 模拟点击隐藏按钮

				}

			})
	$
			.ajax({
				type : "POST",
				url : "loadInvoiceHistoryCount.do",
				dataType : "json",
				error : function(data) {
					swal("loadInvoiceHistory.do error!");
				},
				success : function(data) {
					$("#hisPageIndex").val(i);
					$("#pageHis").empty();
					$("#pageHis").append(i + "/" + data);
					$("#firstHis")
							.attr("onclick", "getInvoiceHistoryResult(1)");
					$("#lastHis").attr("onclick",
							"getInvoiceHistoryResult(" + data + ")");
					if (($("#hisPageIndex").val()) > data - 1) {
						$("#nextHis").attr("onclick",
								"getInvoiceHistoryResult(" + data + ")");
					} else {
						$("#nextHis")
								.attr(
										"onclick",
										"getInvoiceHistoryResult("
												+ (Number($("#hisPageIndex")
														.val()) + 1) + ")");
					}
					if (($("#hisPageIndex").val() < 2)) {
						$("#previousHis").attr("onclick",
								"getInvoiceHistoryResult(1)");
					} else {
						$("#previousHis")
								.attr(
										"onclick",
										"getInvoiceHistoryResult("
												+ (Number($("#hisPageIndex")
														.val()) - 1) + ")");
					}

				}
			})
}
function editInvoice() {
	if ($("input[name='select']:checked").val() != null) {
		$.ajax({
			type : "POST",
			url : "editInvoice.do",
			dataType : "json",
			data : {
				id : $("input[name='select']:checked").val()
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

}
function deleteInvoice() {
	$.ajax({
		type : "POST",
		url : "editInvoice.do",
		dataType : "json",
		async:false,
		data : {
			id : $("input[name='select']:checked").val()
		},
		error : function(data) {
			if(data.state!="1"){
				swal("The invoice can not be delete!");
				return false;
			}
			swal("editInvoice.do Error!");
		},
		success : function(data) {
			//alert($("input[name='select']:checked").val());
			if (data.state == "1") {
				$.ajax({
					type : "POST",
					url : "deleteInvoice.do",
					dataType : "json",
					async:false,
					data : {
						invoiceid : $("input[name='select']:checked").val()
					},
					error : function(data) {
						swal("deleteInvoice.do Error!!");
					},
					success : function(data) {
					}
				});
				
			}else{
				swal("You can't delete this invoice!");
				return false;
			}
		}
	});

}
function toOutLook() {
	// 获取invoice 的cp邮箱
	$.ajax({
		url : "getCPOI.do",
		dataType : "json",
		async:false,
		data:{
			id:$("input[name='select']:checked").val()
		},
		error : function(data) {
			swal("getCPOI.do Error!!");
		},
		success : function(data) {
			window.location.href="mailto:"+data.email;
		}
	})
	
}
function paymode(){
	if ($("#payMode1").val() == "cheque") {
		$("#paymentNum").val("");
		$("#chequeNumber").val("");
		$("#bankName").val("");
		$("#cheque").show();
		$("#amount").show();
		$("#creditNotes").hide();
		$("#bank").show();
	} else if ($("#payMode1").val() == "creditNotes") {
		$("#creditNumber").val();
		$("#cheque").hide();
		$("#amount").hide();
		$("#bank").hide();
		$("#creditNotes").show();
	} else if ($("#payMode1").val() == "cash") {
		$("#paymentNum").val("");
		$("#cheque").hide();
		$("#bank").hide();
		$("#creditNotes").hide();
		$("#amount").show();
	}
}
function print(){
	  if($("#fileName").val()==""){
		  swal("File name can not be null!");
		  return false;
	  }
	//获取选中的值
	  var chk_value =[];    
	  $('input[name="export"]:checked').each(function(){
	   chk_value.push($(this).val());    
	  }); 
	  
//	  var json = {};
//	  json[0]=$("#pageIndex").val();
//	  for(var i=1;i<chk_value.length+1;i++)
//	  {
//	      json[i]=chk_value[i-1];
//	  }
//	  for(a in chk_value){
//		  alert(chk_value[a]);
//	  }
	
//---------------------导出excel
	
	$.ajax({
		method:"POST",
		url : "printInvoice.do",
		dataType : "json",
		traditional:true,
		async:false,
		data : {
			pageIndex:$("#pageIndex").val(),
			param:chk_value,
			fileName:$("#fileName").val()
		},
		error : function(addr) {
			window.open(addr.responseText);
		},
		success :function(addr){
			window.open(addr.responseText);
		}
	
	})
}
function chooseItem(){
		$("#exportModel").modal();
}
function selectAllItem(){
	  var coll = document.getElementsByName("export");
	  if (selectItem%2==0){
	     for(var i = 0; i < coll.length; i++)
	       coll[i].checked = true;
	     $("#exportModel").modal();
	  }else{
	     for(var i = 0; i < coll.length; i++)
	       coll[i].checked = false;
	     $("#exportModel").modal();
	  }
	  selectItem++;
}*/