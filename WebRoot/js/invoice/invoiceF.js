window.onload = init;

var x = 0;
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
function createInvoiceF(){
	if ($("#invoiceDesc").val() != "" && $("#invoiceNum").val() != "" && $("#invoiceRate").val() != ""&&$("#invoiceCost").val()!="") {
	$.ajax({
		type : "POST",
		url : "updateInvoiceF.do",
		dataType : "json",
		data : {
			total : $("#FSubTotal").val(),
			pic2: $("#anotherPIC").val(),
			desc:$("#invoiceDesc").val(),
			workerNum:$("#invoiceNum").val(),
			billingRate:$("#invoiceRate").val(),
			cost:$("#invoiceCost").val()
		},
		error : function(data) {
			swal("请求失败~");
		},
		success:function(data){
			window.location.href = "mci-staffInvoice.do";
		}
	});
}
}
$(document)
		.ready(
				function() {
					// 点击createInvoice按钮后
					$("#createInvoice ").click(function() {
						$(".addFKey").click();
						cancelInactiveClient();
						createInvoiceF();
					});

					$("#addRow")
							.click(
									function() {
										$
												.ajax({
													type : "POST",
													url : "createItemF.do",
													dataType : "json",
													async : false,
													error : function(data) {
														alert("请求失败~");
													},
													success : function(data) {
														// 返回的data为contactperson主键
														// 在table中增加一行
														x++;
														$("#itemList")
																.append(
																				 "<tr id='row"+data+"' style='height:55px'>"
																				+ "<td colspan='2'  style='text-align: center;vertical-align:middle;'>"
																				+ "<select  class='selectpicker' data-style='btn-white'  id='itemName"+data+"'"
																				+ ">"
																				+ "<option value='Overtimes10X'>Overtimes 1.0X</option>"
																				+ "<option value='Overtimes15X'>Overtimes 1.5X</option>"
																				+ "<option value='Overtimes20X'>Overtimes 2.0X</option>"
																				+ "<option value='CPF'>CPF</option>"
																				+ "<option value='SDF'>SDF</option>"
																				+ "<option value='WICA 2%'>WICA 2%</option>"
																				+ "<option value='Medical Coverage Fee 2%'>Medical Coverage Fee 2%</option>"
																				+ "<option value='Admin Fee'>Admin Fee</option>"
																				+ "<option value='Transport Allowance'>Transport Allowance</option>"
																				+ "<option value='Laundry Allowance'>Laundry Allowance</option>"
																				+ "<option value='Afternoon Shift Allowance'>Afternoon Shift Allowance</option>"
																				+ "<option value='Medical Reimbursement'>Medical Reimbursement</option>"
																				+ "<option value='Mileage & ERP Reimbursement '>Mileage & ERP Reimbursement </option>"
																				+ "<option value='Less: Unpaid Leave'> Less: Unpaid Leave</option>"
																				+ "<option value='Transport Reimbursement'>Transport Reimbursement</option>"
																				+ "<option value='Meal Allowance'>Meal Allowance</option>"
																				+ "<option value='Attendance Allowance'>Attendance Allowance</option>"
																				+ "<option value='Allowance'>Allowance</option>"
																				+ "<option value='Public Holiday OT'>Public Holiday OT</option>"
																				+ "<option value='Lateness'>Lateness</option>"
																				+ "<option value='Annual Leave Encashment'>Annual Leave Encashment</option>"
																				+ "<option value='Bonus'>Bonus</option>"
																				+ "<option value='Completion Bonus'>Completion Bonus</option>"
																				+ "<option value='Incentive'>Incentive</option>"
																				+ "<option value='Back Pay Salary'>Back Pay Salary</option>"
																				+ "<option value='Back Pay Overtimes'>Back Pay Overtimes</option>"
																				+ "<option value='Adjustment Salary'>Adjustment Salary</option>"
																				+ "<option value='Adjustment Overtimes'>Adjustment Overtimes</option>"
																				+ "<option value='Salary In Lieu'>Salary In Lieu</option>"
																				+ "<option value='Paid Annual Leave'>Paid Annual Leave</option>"
																				+ "<option value='Paid Medical Leave'>Paid Medical Leave</option>"
																				+ "<option value='Paid Childcare Leave'>Paid Childcare Leave</option>"
																				+ "<option value='Less: Mid Month Salary'>Less: Mid Month Salary</option>"
																				+ "</select></td>"
																				+ "<td  style='vertical-align:middle;'>"
																				+ "$<input class='itemBillRate'   type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' id='itemRate"
																				+ data
																				+ "' onkeyup='caculateF("
																				+ ")'/></td>"
																				+ "<td  style='vertical-align:middle;'>"
																				+ "$<input   type='text' style='width:80%; border-top:0px ;border-left:0px;border-right:0px;' id='itemCost"
																				+ data
																				+ "'/></td><td></td>"
																				+ "<td><a class='btn btn-danger btn-lg ' href='javascript:void(0)' onclick='removeFRow("
																				+ data
																				+ ")' id='removeRow"
																				+ x
																				+ "'>remove</a>"
																				+ "<a class='addFKey' onclick='addFKey("
																				+ data
																				+ ")'/>"
																				+ "</td>"
																                +"</tr>");
														var select = "#itemName" + data;
														$(select).selectpicker('refresh');
														if (x != 1) {
															hideLastRemove(x);
														}
													}
												})
												caculateF();
									})
				})

function hideLastRemove(i) {
	var z = i - 1;
	if (z != 0) {
		document.getElementById("removeRow" + z).style.display = "none";
	}
}

function removeFRow(i) {
	var r = "#row" + i;
	$(r).remove();
	caculateF();
	x--;
	document.getElementById("removeRow" + x).style.display = "block";
}
// 回显session中存的Invoice
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
				$("#register").hide();
				$("#user").hide();
			}
		}
	});

	$.ajax({
		type : "POST",
		url : "getEditInvoice.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			// 返回Invoice
			$("#id").val("F"+data.number);
			$("#date").val(data.createDate);
			$("#pic").val(data.picObject.realName);
			$("#term").val(data.term);
			$("#companyAttention").val(data.cpObject.name);
			$("#companyAddress").val(data.cpObject.billaddress);
			$("#companyCountry").val(data.cpObject.country);
		}
	});
	$.ajax({
		type:"POST",
		url:"getAnotherPIC.do",
		dataType:"json",
		error:function(data){
			swal("getAnotherPIC.do error!");
		},
		success:function(data){
			$("#anotherPIC").append("<option value=''>No another pic</option>");
			for(var i=0;i<data.length;i++){
				$("#anotherPIC").append("<option value='"+data[i].id+"'>"+data[i].realName+"</option>");
			}
		}
	})
	$.ajax({
		type : "POST",
		url : "getEditClient.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			// 返回Client
			$("#companyName").val(data.companyName);
		}
	});
	$("#addRow").click();
}
// 为item添加外键及一系列请求
function addFKey(i) {
	
	var itemName="#itemName"+i;
	var itemCost="#itemCost"+i;
	var itemRate="#itemRate"+i;
	
	var itemNameV=$(itemName).val();
	var itemCostV=$(itemCost).val();
	var itemRateV=$(itemRate).val();
	

		// 先update
		$.ajax({
			type : "POST",
			url : "updateItemF.do",
			dateType : "json",
			data : {
				id : i,
				itemName:itemNameV,
				itemCost:itemCostV,
				itemRate:itemRateV
			},
			error : function(data) {
				swal("请求失败~");
			},
			success : function(data) {

			}
		});
		
		// 添加remark
		$.ajax({
			type : "POST",
			url : "addInvoiceRemark.do",
			dataType : "json",
			data : {
				remark : $("#remark").val()
			},
			error : function(data) {
				swal("请求失败~");
			}
		});
		// 后添加外键
		$.ajax({
			type : "POST",
			url : "addInvoicefFK.do",
			dataType : "json",
			data : {
				id : i
			},
			error : function(data) {
				swal("请求失败！");
			},
			success : function(data) {
				//window.location.href = "mci-staffInvoice.do";
			}
		});

	
}

function removeRow(i) {
	$.ajax({
		type : "POST",
		url : "removeItemF.do",
		dataType : "json",
		data : {
			id : i
		},
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {

		}
	});
}
// 计算总价
function caculateF() {
	var subTotal = parseFloat(0);
	
	var $itemBillRateList=$(".itemBillRate");
	for ( var j = 0; j < $itemBillRateList.length; j++) {
			subTotal =subTotal+ parseFloat($itemBillRateList.eq(j).val());
	
	}
	
	//计算invoice第一行的结果
	var num = "#invoiceNum";
	var rate = "#invoiceRate" ;
	
	
	// 先按行从左到右计算
	var numV =parseInt( $("#invoiceNum").val());
	var rateV =parseFloat( $("#invoiceRate").val());
	console.log("numV:"+numV+" rateV:"+rateV);
	
	
	// 若行中无空值
	subTotal=parseFloat( parseFloat(subTotal)+(numV * rateV));
	console.log(parseFloat( subTotal));
//	console.log(subTotal);
		if(!isNaN(subTotal)){	
		$("#invoiceTotal").val((subTotal).toFixed(1));
		$("#FSubTotal").val((subTotal).toFixed(1));
		$("#gst").val((subTotal * 0.07).toFixed(1));
		$("#totalAmount").val((subTotal * 1.07).toFixed(1));
		}
	
}
function cancelInactiveClient(){
	$.ajax({
		type : "POST",
		url : "cancelInactiveClient.do",
		dataType : "json",
		async : false
	});
}
function formatItem(i){
	$("#rowTotal"+i).val($("#itemRate"+i).val());
}
// function countMoney(){
// $("#itemList tr").find("td")[5];
// }
