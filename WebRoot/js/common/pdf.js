$(function(){
	$.ajax({
		type : "POST",
		url : "quotation_loadQuotationPDF.do",
		data : {
			projectNumber : getQueryString("projectNumber")
		},
		success : function(data) {
			$("#companyname").html(data.companyName);
			$("#date").html(data.createDate);
			$("#projectNumber").html(data.projectNumber);
			$("#address").html(data.companyAddress);
			$("#contactPersionBusiness").html(data.contactPersionBusiness);
			$("#contactPersonTechnical").html(data.contactPersonTechnical);
			$("#buyercellphone").html(data.buyercellphone);
			$("#buyerphone").html(data.buyerphone);
			$("#buyeremail").html(data.buyeremail);
			$("#technicalcellphone").html(data.technicalcellphone);
			$("#technicalphone").html(data.technicalphone);
			$("#technicalemail").html(data.technicalemail);
			$("#generalProductName").html(data.generalProductName);
			$("#requiredSampleQuantity").html(data.requiredSampleQuantity+" sets");
			$("#carModel").html(data.carModel);
			$("#testStandard").html(data.testStandard);
			$("#comment").html(data.comment);
			$("#downpayment").html(data.downpayment);
			$("#paymentTerms").html(data.paymentTerms);
			$("#salename").html(data.sale.cName+"/"+data.sale.eName);
			$("#saletelphone").html(data.sale.telePhone);
			$("#salemobilephone").html(data.sale.mobilePhone);
			$("#saleemail").html(data.sale.email);
			$("#csname").html(data.cs.cName+"/"+data.cs.eName);
			$("#cstelphone").html(data.cs.telePhone);
			$("#csmobilephone").html(data.cs.mobilePhone);
			$("#csemail").html(data.cs.email);
			$("#tsname").html(data.ts.cName+"/"+data.ts.eName);
			$("#tstelphone").html(data.ts.telePhone);
			$("#tsmobilephone").html(data.ts.mobilePhone);
			$("#tsemail").html(data.ts.email);
			$("#version").html(data.version+".0");
			$("#oem").html(data.oem);
			$("#returnPolicy").html(data.returnPolicy);
			$("#reportNeed").html(data.reportNeed);
			$("#reportType").html(data.reportType);
			$("#pricingCriterion").html(data.pricingCriterion);
			$("#generalProductModel").html(data.generalProductModel);
			$("#bizhong").html("Subtotal("+data.currency+")");
			var countTotal = parseFloat(0);
			var p = 0;
			if(data.testPlanDetails!=null&&data.testPlanDetails.length>0){
				for ( var i = 0; i < data.testPlanDetails.length; i++) {
					var test = data.testPlanDetails[i];
					var count = parseFloat(parseFloat(test.salePrice) * parseFloat(test.testDuration)).toFixed(2);
					if(i==0){
						p = 1;
						$("#testplanlist").append('<tr align="center">'+
								'<td style="border-bottom: 0px;">'+test.reference+'</td>'+
								'<td style="border-bottom: 0px;" height="100px">'+test.testName+'</td>'+
								'<td style="border-bottom: 0px;">'+test.testingModels+'</td>'+
								'<td style="border-bottom: 0px;">'+test.sampleNeeds+'</td>'+
								'<td style="border-bottom: 0px;">'+test.testDuration+'</td>'+
								'<td style="border-bottom: 0px;">'+test.standardPrice+'</td>'+
								'<td style="border-bottom: 0px;">'+test.salePrice+'</td>'+
								'<td style="border-bottom: 0px;" colspan="2">'+count+'</td><td style="border-bottom: 0px;" colspan="2">'+test.annotation+'</td></tr>');
					}else{
						$("#testplanlist").append('<tr align="center">'+
								'<td style="border-bottom: 0px;border-top:0px;">'+test.reference+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;" height="100px">'+test.testName+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;">'+test.testingModels+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;">'+test.sampleNeeds+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;">'+test.testDuration+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;">'+test.standardPrice+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;">'+test.salePrice+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;" colspan="2">'+count+'</td><td style="border-bottom: 0px;border-top:0px;" colspan="2">'+test.annotation+'</td></tr>');
					}
					
					countTotal = parseFloat(countTotal) + parseFloat(count);
				}
			}
			if(data.quotationSaleRows!=null&&data.quotationSaleRows.length>0){
				for ( var i = 0; i < data.quotationSaleRows.length; i++) {
					var salerow = data.quotationSaleRows[i];
					if(p==0){
						$("#testplanlist").append('<tr align="center">'+
								'<td style="border-bottom: 0px;"></td>'+
								'<td style="border-bottom: 0px;" height="100px">'+salerow.name+'</td>'+
								'<td style="border-bottom: 0px;"></td>'+
								'<td style="border-bottom: 0px;"></td>'+
								'<td style="border-bottom: 0px;"></td>'+
								'<td style="border-bottom: 0px;"></td>'+
								'<td style="border-bottom: 0px;"></td>'+
								'<td style="border-bottom: 0px;" colspan="2">'+salerow.money+'</td><td style="border-bottom: 0px;" colspan="2">'+salerow.annotation+'</td></tr>');
					}else{
						$("#testplanlist").append('<tr align="center">'+
								'<td style="border-bottom: 0px;border-top:0px;"></td>'+
								'<td style="border-bottom: 0px;border-top:0px;" height="100px">'+salerow.name+'</td>'+
								'<td style="border-bottom: 0px;border-top:0px;"></td>'+
								'<td style="border-bottom: 0px;border-top:0px;"></td>'+
								'<td style="border-bottom: 0px;border-top:0px;"></td>'+
								'<td style="border-bottom: 0px;border-top:0px;"></td>'+
								'<td style="border-bottom: 0px;border-top:0px;"></td>'+
								'<td style="border-bottom: 0px;border-top:0px;" colspan="2">'+salerow.money+'</td><td style="border-bottom: 0px;border-top:0px;" colspan="2">'+salerow.annotation+'</td></tr>');
					}
					countTotal = parseFloat(countTotal) + parseFloat(salerow.money);
				}
			}
			var total = parseFloat(countTotal).toFixed(2);
			var vat = total * 0.06;
			var grandTotal = parseFloat(total) +parseFloat(vat);
			$("#testplanlist").append('<tr height="30px" align="center"><td style="border-bottom: 0px;border-top: 0px"></td>'+
						'<td colspan="4" rowspan="3">'+data.remark+'</td>'+
						'<td colspan="2">Net Amount:</td>'+
						'<td colspan="2">'+total+'</td>'+
						'<td>'+data.currency+'</td></tr>'+
						'<tr height="30px" align="center">'+
						'<td style="border-bottom: 0px;border-top: 0px"></td>'+
						'<td colspan="2">VAT + 6.00%</td>'+
						'<td colspan="2">'+vat.toFixed(2)+'</td>'+
						'<td>'+data.currency+'</td></tr>'+
						'<tr height="30px" align="center">'+
						'<td style="border-bottom: 0px;border-top: 0px"></td>'+
						'<td colspan="2">Grand Total</td><td colspan="2">'+grandTotal.toFixed(2)+'</td><td>'+data.currency+'</td></tr>');
		}
	});
});
function getPDF() {
	html2canvas($('#divPDF'), {
		onrendered : function(canvas) {
			var imgUrl = canvas.toDataURL();// 获取截图的Base64编码
			$.ajax({
				type : "POST",
				url : "downLoadQuotationPDF.do",
				data : {
					base64Image : imgUrl,
					projectNumber : getQueryString("projectNumber")
				},
				success : function(data) {
					var url = window.location.href;
					var index = url.indexOf("/bv/");
					var downloadurl = url.substring(0, index + 4) + data;
					window.open(downloadurl);
				}
			});
		}
	});
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
	var context = "";
	if (r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? ""
			: context;
}