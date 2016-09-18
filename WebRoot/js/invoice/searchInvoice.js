window.onload = init;

function init() {
//	$.ajax({
//		type : "POST",
//		url : "getPow.do",
//		dataType : "json",
//		asycn:false,
//		error : function(data) {
//			alert("请求失败~");
//		},
//		success : function(data) {
//			$("#currUser").append(data.realName);
//			if (data.type == 1) {
//
//				$("#cancel").hide();
//				$("#confirm").hide();
//				$("#activeInvoice").hide();
//				$("#register").hide();
//				$("#user").hide();
//			}else if(data.type==2){
//				$("#addUserbtn").hide();
//			}
//		}
//	});
	loadLeft();
	loadInvoice();
	$.ajax({
		type : "POST",
		url : "getInvoiceLimit.do",
		dataType : "json",
		async : false,
		error : function(data) {
			// swal("getInvoiceLimit Error!");
		},
		success : function(data) {
			$("#searchInvoiceNo").val(data.id);
			$("#searchConsultant").val(data.pic);
			$("#searchCompanyName").val(data.clientName);
			var type = document.getElementById("searchType");
			for ( var i = 0; i < type.length; i++) {
				if (type[i].value == data.type) {
					type[i].selected = true;
					$("#searchType").selectpicker("refresh");
				}
			}
			// $("#searchStatus").val(data.state);

			var state = document.getElementById("searchStatus");
			for ( var i = 0; i < state.length; i++) {
				if (state[i].value == data.state) {
					state[i].selected = true;
					$("#searchStatus").selectpicker("refresh");
				}
			}
			$("#datepicker-autoclose").val(data.startDate);
			$("#datepicker-autoclose1").val(data.endDate);
		}
	})
	search();
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			if (data.type == 1) {
				$("#activeInvoice").hide();
			} else if (data.type == 2) {
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
				url : "loadInvoiceResult.do",
				async : false,
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
											+ data[i].number
											+ "</th>"
											+ "<th style='text-align:left;vertical-align : middle; ' >"
											+ (data[i].total*1.07).toFixed(1)+"/"+data[i].total
											+ "</th>"
											+ "<th style='text-align:left;vertical-align : middle; '>"
											+ (data[i].creditNotes*1.0).toFixed(1)
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
											+ data[i].number
											+ "</th>"
											+ "<th style='text-align:left;vertical-align : middle; ' >"
											+ (data[i].total*1.07).toFixed(1)+"/"+data[i].total
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
		url : "loadInvoiceResultCount.do",
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
//分页获取clientHistory
