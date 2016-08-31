var selectItem = 0;
function clearInvoice() {
	$.ajax({
		type : "POST",
		url : "clearInvoice.do",
		dateType : "json",
		async : false,
		error : function(data) {
			swal("clearInvoice.do error!");
		}
	})

}
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

// 付款
function confirmPayment(i) {
	$("#cheque").hide();
	$("#bank").hide();
	$("#creditNotes").hide();
	$("#amount").show();
	$("#cheque").val("");
	$("#bank").val("");
	$("#creditNotes").val("");
	$("#amount").val("");
	var trade = document.getElementById("payMode1");
	trade[0].selected = true;
	$("#payMode1").selectpicker("refresh");
	$("#paymentNum").val("");
	$("#remainingAmount").val("");
	$.ajax({
		type : "POST",
		url : "getaInvoice.do",
		dataType : "json",
		data : {
			id : i
		},
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			var num = parseFloat(data.residual);
			$("#remainingAmount").val(num.toFixed(1));
		}
	});
}
function getCommission(i) {
	$("#totalAmount").val("");
	$("#cmAmount").val("");
	$.ajax({
		type : "POST",
		url : "commission.do",
		dataType : "json",
		data : {
			id : i
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			$("#totalAmount").val(data.total);
		}
	});
}
function payit() {
	if ($("#payMode1").val() == "cheque") {
		if ($("#paymentNum").val() != "" && $("#bankName").val() != ""
				&& $("#chequeNumber").val() != "") {
			$.ajax({
				type : "POST",
				url : "payForInvoice3.do",
				dataType : "json",
				data : {
					amount : $("#paymentNum").val(),
					bank : $("#bankName").val(),
					number : $("#chequeNumber").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					if (data != "1") {
						search($("#pageIndex").val());
					}
				}
			});
		} else {
			swal("Required cannot be empty!");
			return false;
		}
	} else if ($("#payMode1").val() == "creditNotes") {
		if ($("#creditNumber").val() != "") {
			$.ajax({
				type : "POST",
				url : "payForInvoice2.do",
				dataType : "json",
				data : {
					str : $("#creditNumber").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					if (data != "1") {
						search($("#pageIndex").val());
					}
				}
			});
		} else {
			swal("Required cannot be empty!");
			return false;
		}
	} else if ($("#payMode1").val() == "cash") {
		if ($("#paymentNum").val() != "") {
			$.ajax({
				type : "POST",
				url : "payForInvoice.do",
				dataType : "json",
				data : {
					str : $("#paymentNum").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					if (data != "1") {
						search($("#pageIndex").val());
					}
				}
			});
		} else {
			swal("Required cannot be empty!");
			return false;
		}
	}

}
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
						for (var i = 0; i < data.length; i++) {
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
$(document)
		.ready(
				function() {
					$("#detail")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "editInvoice.do",
														dataType : "json",

														data : {
															id : $(
																	"input[name='select']:checked")
																	.val()
														},
														error : function(data) {
															swal("editInvoice.do Error!");
														},
														success : function(data) {
															$
																	.ajax({
																		type : "POST",
																		url : "getPow.do",
																		async : false,
																		error : function() {
																			swal("getPow  error!");
																		},
																		success : function(
																				user) {
																			if (user.type == "1"
																					|| user.type == "3"
																					|| (user.type == "2" && data.state == "5")) {
																				if (data.type == "C") {
																					window.location.href = "mci-viewC.do";
																				} else if (data.type == "F") {
																					window.location.href = "mci-viewF.do";
																				} else if (data.type == "P") {
																					window.location.href = "mci-viewP.do";
																				} else if (data.type == "T") {
																					window.location.href = "mci-viewT.do";
																				}

																			} else {
																				swal("You can't check more details!");
																			}
																		}
																	})
														}
													})
										} else {
											swal("You haven't select any invoice!");
										}
									})
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
					// 发送请求将查询条件存到session中
					$("#print")
							.click(
									function() {

										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "editInvoice.do",
														dataType : "json",

														data : {
															id : $(
																	"input[name='select']:checked")
																	.val()
														},
														error : function(data) {
															swal("editInvoice.do Error!");
														},
														success : function(data) {
															if (data.type == "C") {
																window
																		.open("mci-detailC.do");
															} else if (data.type == "F") {
																window
																		.open("mci-detailF.do");
															} else if (data.type == "P") {
																window
																		.open("mci-detailP.do");
															} else if (data.type == "T") {
																window
																		.open("mci-detailT.do");
															}
														}
													})
										} else {
											swal("You haven't select any invoice!");
										}
									})

					$("#getCM").click(function() {
						$.ajax({
							type : "POST",
							url : "getCommission.do",
							data: {commission:$("#cmAmount").val()},
							dataType : "json",
							error : function(data) {
								swal("getCommission.do error");
							},
							success : function(data) {
								search();
							}
						})
					});
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
					$("#confirm")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "confirmInvoice.do",
														data : {
															id : $(
																	"input[name='select']:checked")
																	.val()
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
											$
													.ajax({
														type : "POST",
														url : "getPow.do",
														dataType : "json",
														async : false,
														error : function(data) {
															alert("请求失败~");
														},
														success : function(data) {
															if (data.type != "1") {
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
																		function(
																				isConfirm) {
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
															} else if (data.type == "1") {
																$
																		.ajax({
																			type : "POST",
																			url : "getaInvoice.do",
																			dataType : "json",
																			async : false,
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
																				if (data.state == "1") {
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
																							function(
																									isConfirm) {
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
																				} else {
																					swal("You just can delete the invoice in created status.");
																				}
																			}
																		});
															} else {
																swal("error!");
															}
														}
													})

										} else {
											swal("You haven't select any invoice!")
										}
									});
					$("#search")
							.click(
									function() {
										$
												.ajax({
													type : "POST",
													url : "setInvoiceLimit.do",
													dataType : "json",
													data : {
														id : $(
																"#searchInvoiceNo")
																.val(),
														pic : $(
																"#searchConsultant")
																.val(),
														clientName : $(
																"#searchCompanyName")
																.val(),
														state : $(
																"#searchStatus")
																.val(),
														type : $("#searchType")
																.val(),
														startDate : $(
																"#datepicker-autoclose")
																.val(),
														endDate : $(
																"#datepicker-autoclose1")
																.val()
													},
													error : function(data) {
														swal("setInvoiceLimit.do error!");
													},
													success : function(data) {
														if (data == "0") {
															$
																	.ajax({
																		type : "POST",
																		url : "searchInvoice.do",
																		dataType : "json",
																		data : {
																			id : $(
																					"#searchInvoiceNo")
																					.val(),
																			pic : $(
																					"#searchConsultant")
																					.val(),
																			clientName : $(
																					"#searchCompanyName")
																					.val(),
																			state : $(
																					"#searchStatus")
																					.val(),
																			type : $(
																					"#searchType")
																					.val(),
																			startDate : $(
																					"#datepicker-autoclose")
																					.val(),
																			endDate : $(
																					"#datepicker-autoclose1")
																					.val()
																		},
																		error : function(
																				data) {
																			swal("searchInvoice.do Error!");
																		},
																		success : function(
																				data) {
																			window.location.href = "mci-searchInvoice.do";
																		}
																	});
														} else {
															swal("setInvoiceLimit Error!");
														}

													}
												})

									});
					$("#activeInvoice")
							.click(
									function() {
										if ($("input[name='select']:checked")
												.val() != null) {
											$
													.ajax({
														type : "POST",
														url : "getPow.do",
														dataType : "json",
														async : false,
														error : function(data) {
															alert("请求失败~");
														},
														success : function(data) {
															if (data.type != "1") {
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
																		function(
																				isConfirm) {
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
																							error : function(
																									data) {
																								if (data == "0") {
																									search($(
																											"#pageIndex")
																											.val());
																								}
																							},
																							success : function(
																									data) {
																								// 根据不同返回值做出不同处理
																								if (data == "3") {
																									swal("The invoice has no item,it can't be actived!");
																								}
																								if (data == "2") {
																									swal("The invoice is not created status!");
																								}
																								if (data == "0") {
																									$
																											.ajax({
																												type : "POST",
																												url : "getCPOI.do",
																												dataType : "json",
																												async : false,
																												data : {
																													id : $(
																															"input[name='select']:checked")
																															.val()
																												},
																												error : function(
																														data) {
																													swal("getCPOI.do Error!!");
																												},
																												success : function(
																														data) {
																													window.location.href = "mailto:"
																															+ data.email;
																													search($(
																															"#pageIndex")
																															.val());
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
															} else {
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
				});

function editInvoice() {
	if ($("input[name='select']:checked").val() != null) {
		$.ajax({
			type : "POST",
			url : "editInvoice.do",
			dataType : "json",
			async:false,
			data : {
				id : $("input[name='select']:checked").val()
			},
			error : function(data) {
				swal("editInvoice.do Error!");
			},
			success : function(data) {
				$.ajax({
					type : "POST",
					url : "getPow.do",
					async : false,
					error : function() {
						swal("getPow  error!");
					},
					success : function(user) {
						if (data.state == "1" || user.type == "3"
								|| (user.type == "2" && data.state == "5")||user.type=="3") {
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
				})
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
		async : false,
		data : {
			id : $("input[name='select']:checked").val()
		},
		error : function(data) {
			if (data.state != "1") {
				swal("The invoice can not be delete!");
				return false;
			}
			swal("editInvoice.do Error!");
		},
		success : function(data) {
			// alert($("input[name='select']:checked").val());

			$.ajax({
				type : "POST",
				url : "getPow.do",
				async : false,
				error : function() {
					swal("getPow  error!");
				},
				success : function(user) {
					if (data.state == "1" || user.type == "3"
							|| (user.type == "2" && data.state == "5")) {
						$.ajax({
							type : "POST",
							url : "deleteInvoice.do",
							dataType : "json",
							async : false,
							data : {
								id : $("input[name='select']:checked").val()
							},
							error : function(data) {
								swal("deleteInvoice.do Error!!");
							},
							success : function(data) {
								swal("Delete success!");
							}
						});
					} else {
						swal("You can't delete this invoice!");
					}
				}
			})
		}
	});

}
function getCommission(i) {
	$("#totalAmount").val("");
	$("#cmAmount").val("");
	$.ajax({
		type : "POST",
		url : "commission.do",
		dataType : "json",
		data : {
			id : i
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			$("#totalAmount").val(data.total);
		}
	});
}
function paymode() {
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
function print() {
	$.ajax({
		method : "POST",
		url : "deleteXls.do"
	})
	if ($("#fileName").val() == "") {
		swal("File name can not be null!");
		return false;
	}
	// 获取选中的值
	var chk_value = [];
	$('input[name="export"]:checked').each(function() {
		chk_value.push($(this).val());
	});

	// var json = {};
	// json[0]=$("#pageIndex").val();
	// for(var i=1;i<chk_value.length+1;i++)
	// {
	// json[i]=chk_value[i-1];
	// }
	// for(a in chk_value){
	// alert(chk_value[a]);
	// }

	// ---------------------导出excel
	var fileName = $("#fileName").val();
	$.ajax({
		method : "POST",
		url : "printInvoice.do",
		dataType : "json",
		traditional : true,
		async : false,
		data : {
			pageIndex : $("#pageIndex").val(),
			param : chk_value,
			fileName : fileName
		},
		error : function(addr) {
			window.open(addr.responseText);

		},
		success : function(addr) {
			window.open(addr.responseText);

		}
	})
}
function chooseItem() {
	$("#exportModel").modal();
}
function toOutLook() {
	// 获取invoice 的cp邮箱
	$.ajax({
		url : "getCPOI.do",
		dataType : "json",
		async : false,
		data : {
			id : $("input[name='select']:checked").val()
		},
		error : function(data) {
			swal("getCPOI.do Error!!");
		},
		success : function(data) {
			window.location.href = "mailto:" + data.email;
		}
	})

}
function selectAllItem() {
	var coll = document.getElementsByName("export");
	if (selectItem % 2 == 0) {
		for (var i = 0; i < coll.length; i++)
			coll[i].checked = true;
		$("#exportModel").modal();
	} else {
		for (var i = 0; i < coll.length; i++)
			coll[i].checked = false;
		$("#exportModel").modal();
	}
	selectItem++;
}