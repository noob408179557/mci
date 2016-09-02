window.onload = init;
var x = 1;
// var flag="1";
// 页面加载完毕后执行init
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
function init() {
	$.ajax({
		type : "POST",
		url : "getEditInvoice.do",
		async : false,
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			// 返回Invoice
			$("#id").val(data.type + data.number);
			$("#date").val(data.createDate);
			$("#pic").val(data.picObject.realName);
			$("#term").val(data.term);
			$("#companyAttention").val(data.cpObject.name);
			$("#companyAddress").val(data.cpObject.billaddress);
			$("#companyCountry").val(data.cpObject.country);
			$("#companyName").val(data.clientObject.companyName);
			$("#subTotal").val(data.total);
			$("#gst").val((data.total * 0.07).toFixed(1));
			$("#totalAmount").val((data.total * 1.07).toFixed(1));
			$.ajax({
				type:"POST",
				async:false,
				url:"getAnotherPIC.do",
				dataType:"json",
				error:function(data1){
					swal("getAnotherPIC.do error!");
				},
				success:function(data1){
					for(var i=0;i<data1.length;i++){
						if(data.pic2==data1[i].id){
						$("#anotherPIC").val(data1[i].realName);
					}
						if($("#anotherPIC").val()==""){
							$("#anotherPIC").val("No another PIC");
						}
						}
				}
				})
			showItem();
		}
	});
	 printThisPage();
};
// 打印
function printThisPage() {
	$("#printPage").click();
}
// 刷新datepicker
// edit功能---------------------------------------------------------------------------------------------
// 回显invoice创建状态
function showItem() {
	// 在getEditWorkersC的success中嵌套ajax获取item
	$
			.ajax({
				type : "POST",
				url : "getEditItemP.do",
				dataType : "json",
				async:false,
				error : function(data) {
					swal("getEditItemC.do Error!");
				},
				success : function(data) {
					// 回显当前worker中的item
					for ( var j = 0; j < data.length; j++) {
						$("#workerList")
								.append(
										"<tr style='height:40px' id='item"
												+ data[j].id
												+ "'>"
												+ "<td  style='vertical-align:middle;'>"
												+ "<input class='selectpicker' data-style='btn-white'  id='desc"
												+ data[j].id
												+ "' value="
												+ data[j].date
												+ " style='vertical-align:middle;width:80%;border-top:0px ;border-left:0px;border-right:0px;border-bottom:0px;' readOnly='true'></td><td style='vertical-align:middle;'><input  "
												+ "id='itemAmountPayable"
												+ data[j].id
												+ "' onkeyup='caculateC("
												+ data[j].id
												+ ")' value="
												+ data[j].description
												+ "  type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;border-bottom:0px;' />"
												+ "</td>"
												+ "<td style='vertical-align:middle;'>$<input class='itemAmount' "
												+ "id='itemTotalAmount"
												+ data[j].id
												+ "' value="
												+ data[j].payment
												+" type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;border-bottom:0px;' readOnly='true'/>"
												+ "</td>"
												+ "</tr>");
					}
				}
			});
}

// edit功能--------------------------------------end---------------------------------------------------------
// 页面效果
$(function() {
	// 点击创建invoice时
	$("#createInvoice").click(function() {
		// flag="1";
		$(".updateItem").click();
		$(".updateWorker").click();
		// if(flag=="1"){
		updateInvoiceC();
		// }
	});

	$("#addWorker")
			.click(
					function() {
						$
								.ajax({
									url : "addWorkerC.do",
									type : "POST",
									async : false,
									dataType : "json",
									error : function(data) {
										swal("Server Error！");
									},
									success : function(data) {
										// ajax结束
										$("#workerList")
												.append(
														"<tbody id='worker"
																+ data
																+ "'><tr id='row0'>"
																+ "<td style='text-align: center;vertical-align:middle;'></td>"
																+ "<table width='500px' style='border:0px'>"
																+ "<tr><td><strong>Position:</strong></td>"
																+ "<td><input id='position"
																+ data
																+ "'  type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' />"
																+ "</td></tr><tr>"
																+ "<td><strong>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>"
																+ "</td><td><input id='name"
																+ data
																+ "' type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' />"
																+ "</td></tr><tr><td><strong>NRIC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>"
																+ "</td><td><input id='nric"
																+ data
																+ "' type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' />"
																+ "</td></tr>"
//																+ "<tr><td><strong>Employee"
//																+ "Account&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong></td>"
//																+ "<td><input id='employee"
//																+ data
//																+ "' type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' />"
//																+ "</td></tr><tr><td><strong>Employer"
//																+ "Account&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong></td>"
//																+ "<td><input id='employer"
//																+ data
//																+ "' type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' />"
//																+ "</td></tr>"
																+ "<tr><td><strong>DOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>"
																+ "</td><td><input id='dob"
																+ data
																+ "' type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' />"
																+ "</td></tr></table></td></tr>"
																+ "<tr><td style='vertical-align:middle;text-align: center;'>"
																+ "<strong><h4>"
																+ "</h4> </strong></td>"
																+ "<td style='vertical-align:middle;'>Salary</td>"
																+ "<td style='vertical-align:middle;'>$<input type='text'"
																+ "id='salary"
																+ data
																+ "' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' onkeyup='caculateC("
																+ data
																+ ")'/>"
																+ "</td>"
																+ "<td style='vertical-align:middle;'>$<input  type='text'"
																+ "id='salaryCost"
																+ data
																+ "' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' onkeyup='caculateC("
																+ data
																+ ")'/></td>"
																+ "<td style='vertical-align:middle;'>$<input   type='text' class='workerSalary'"
																+ "id='salaryTotal"
																+ data
																+ "' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' onkeyup='caculateC("
																+ data
																+ ")' readOnly='true'/>"
																+ "</td>"
																+ "<td width='300px'><a class='btn btn-info waves-effect waves-light btn-lg' id='addItem"
																+ data
																+ "' onclick='addItem("
																+ data
																+ ")'> Add Item </a>&nbsp;<a class='btn btn-danger btn-lg' onclick='removeWorker("
																+ data
																+ ")' id=''>Remove"
																+ "&nbsp;Worker</a><a class='updateWorker' onclick='updateWorker("
																+ data
																+ ")' />"
																+ "</td></tr></tbody id='worker"
																+ data
																+ "'><tbody id='remark"
																+ data
																+ "'></tbody>");
										$("#addItem" + data).click();
										x++;
										// 删除时根据Invoice Id删除remark
										$("#remark" + data)
												.append(
														"<tr><td></td><td colspan='3'><div style='float:left;width:500px' align='left' >"
																+ "Remark<textarea id='remarkV"
																+ data
																+ "' required class='form-control'"
																+ "data-parsley-id='50' style=' width: 100%; height: 50px;'></textarea>"
																+ "</div></td><td></td><td></td></tr>");
									}
								})
					})

});
// 为一个worker添加一个item
function addItem(i) {
	// 参数i为worker主键
	$
			.ajax({
				type : "POST",
				url : "addItemC.do",
				dataType : "json",
				async : false,
				data : {
					worker : i
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					// 给worker加item
					var worker = "#worker" + i;
					$(worker)
							.append(
									"<tr style='height:55px' id='item"
											+ data
											+ "'>"
											+ "<td></td>"
											+ "<td colspan=2'>"
											+ "<div style='padding-left:0px;width:254px'>"
											+ "<select class='selectpicker' data-style='btn-white'  id='desc"
											+ data
											+ "'>"
											+ "<option value='CPF'>CPF</option>"
											+ "<option value='SDF'>SDF</option>"
											+ "<option value='WICA'>WICA</option>"
											+ "<option value='Medical'>Medical Coverage Fee</option>"
											+ "<option value='Admin'>Admin fee</option>"
											+ "</select></div></td><td>$<input "
											+ "id='itemAmountPayable"
											+ data
											+ "' onkeyup='caculateC("
											+ data
											+ ")'  type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' />"
											+ "</td><td style='vertical-align:middle;'>$<input "
											+ "id='itemCost"
											+ data
											+ "' onkeyup='caculateC("
											+ data
											+ ")' type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' />"
											+ "</td><td style='vertical-align:middle;'>$<input class='itemAmount'"
											+ "id='itemTotalAmount"
											+ data
											+ "' type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' readOnly='true'/>"
											+ "</td>" + "</tr>");
					var select = "#desc" + data;
					$(select).selectpicker('refresh');
				}
			})
}
function updateWorker(i) {
	var salary = "#salary" + i;
	var salaryCost = "#salaryCost" + i;
	var salaryV = $(salary).val();
	var salaryCostV = $(salaryCost).val();
	var position = $("#position" + i).val();
	var name = $("#name" + i).val();
	var nric = $("#nric" + i).val();
//	var employee = $("#employee" + i).val();
//	var employer = $("#employer" + i).val();
	var dob = $("#dob" + i).val();
	var remarkV = $("#remarkV" + i).val();
	var total = $("#salaryTotal" + i).val();
	// if(total==""){
	$.ajax({
		type : "POST",
		url : "updateWorkerC.do",
		dataType : "json",
		data : {
			id : i,
			position : position,
			name : name,
			nric : nric,
			employee : employee,
			employer : employer,
			dob : dob,
			salary : salaryV,
			cost : salaryCostV,
			remark : remarkV
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
		}
	});
	// }else{
	//		
	// swal("Null value is not allowed!");
	// flag="0";
	// }
}
function updateItem(i) {
	// swal("进入updateItem");
	// 执行至此停止----
	var desc = "#desc" + i;
	var amountPayable = "#itemAmountPayable" + i;
	var cost = "#itemCost" + i;
	var descV = $(desc).val();
	var amountPayableV = $(amountPayable).val();
	var costV = $(cost).val();
	$.ajax({
		type : "POST",
		url : "updateItemC.do",
		dataType : "json",
		async : false,
		data : {
			id : i,
			desc : descV,
			amount : amountPayableV,
			cost : costV
		},
		error : function(data) {
			swal("UpdateItem Fail");
		}
	});
}
function removeItem(i) {
	$.ajax({
		type : "POST",
		url : "removeItemC.do",
		async : false,
		dataType : "json",
		data : {
			id : i
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			$("#item" + i).remove();
		}
	});
	caculateC();
}
// 删除一个worker
function removeWorker(i) {
	// 参数为worker主键
	$.ajax({
		type : "POST",
		url : "removeWorkerC.do",
		dataType : "json",
		async : false,
		data : {
			id : i
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if (data == "0") {
				$("#worker" + i).remove();
				$("#remark" + i).remove();
			} else {
				swal("Server Error！");
			}
		}
	});
	caculateC();
}
function caculateC(i) {
	if (null != i && i != "") {
		// 计算item total amount
		var itemAmountPayable = "#itemAmountPayable" + i;
		var itemAmountPayableV = parseFloat($(itemAmountPayable).val());
		if (itemAmountPayableV == "" || itemAmountPayableV == null) {
			itemAmountPayableV = parseFloat(0);
		}

		var itemTotal = 0;
		itemTotal = parseFloat(itemTotal);
		itemTotal = parseFloat(itemAmountPayableV);
		var itemTotalAmount = "#itemTotalAmount" + i;
		if (!isNaN(itemTotal)) {
			$(itemTotalAmount).val(itemTotal);
		}
		// 计算worker salary
		var salary = "#salary" + i;
		var salaryTotal = "#salaryTotal" + i;
		var salaryV = parseFloat($(salary).val());
		var salaryT = 0;
		salaryT = parseFloat(salaryT);
		salaryT = parseFloat(salaryV);
		if (!isNaN(salaryT)) {
			$(salaryTotal).val(salaryT);
		}
	}

	var totalAmount = 0;
	// 计算invoice总价------------------------------------------------------
	// 先计算salary
	var $workerList = $(".workerSalary");
	totalAmount = parseFloat(totalAmount);
	for ( var j = 0; j < $workerList.length; j++) {
		if ($workerList.eq(j).val() != "" && $workerList.eq(j).val() != "0") {
			totalAmount += parseFloat($workerList.eq(j).val());
		}
	}
	// 再计算item
	var $itemList = $(".itemAmount");
	for ( var j = 0; j < $itemList.length; j++) {
		if ($itemList.eq(j).val() != "" && $itemList.eq(j).val() != "0") {
			totalAmount += parseFloat($itemList.eq(j).val());
		}
	}
	swal(totalAmount);
	if (!isNaN(totalAmount)) {
		$("#subTotal").val(totalAmount);
		$("#gst").val((totalAmount * 0.07).toFixed(1));
		$("#totalAmount").val((totalAmount * 1.07).toFixed(1));
	}
}
function updateInvoiceC() {
	var subTotal = $("#subTotal").val();
	$.ajax({
		type : "POST",
		url : "updateInvoiceC.do",
		dataType : "json",
		data : {
			total : subTotal
		},
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			window.location.href = "mci-staffInvoice.do";
		}
	});
}
