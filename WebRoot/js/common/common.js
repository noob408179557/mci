var pageSize = 10;
var pageIndex = 1;
var pageSum;
var startPage = 1;
var endPage = 10;

/**
 * 
 * 上一页
 * 
 */
function pre() {
	// 当pageIndex为1,上一页事件不触发
	if (pageIndex != 1) {
		// pageIndex自减1
		pageIndex--;
		// 调用搜索
		search(pageIndex);
	}
}

/**
 * 
 * 下一页
 * 
 */
function next() {
	// 当pageIndex与页码总数相等,下一页事件不触发
	if (pageIndex != pageSum) {
		// pageIndex自增1
		pageIndex++;
		// 调用搜索
		search(pageIndex);
	}
}


$(document).ready(function() {
	$.ajax({
		type : "POST",
		url : "user_loadLoginUser.do",
		dateType : "json",
		error : function(data){
			swal("Server Error!");
		},
		success : function(data) {
			$("#username").html(data);
		}
	});
	
	$("#exit").click(function(){
		$.ajax({
			type : "POST",
			url : "user_exit.do",
			dateType : "json",
			error : function(data){
				swal("Server Error!");
			},
			success : function(data) {
				window.location.href="login.html";
			}
		});
	});
});

function loadCs() {
	$.ajax({
		type : "POST",
		url : "data_loadCs.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if (data != null && data.length > 0) {
				for ( var i = 0; i < data.length; i++) {
					$("#cs").append("<option value='" + data[i].userId + "'>" + data[i].eName + "</option>");
				}
				$("#cs").selectpicker("refresh");
			}
		}
	});
}

function loadTs() {
	$.ajax({
		type : "POST",
		url : "data_loadTs.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if (data != null && data.length > 0) {
				for ( var i = 0; i < data.length; i++) {
					$("#ts").append("<option value='" + data[i].userId + "'>" + data[i].eName + "</option>");
				}
				$("#ts").selectpicker("refresh");
			}
		}
	});
}

function loadClientInfo(){
	$.ajax({
		type : "POST",
		url : "clientInfo_loadClientInfoName.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			$("#salename").val($("#username").text());
			var name = function(title) {
				this.title = title;
				return this;
			}
			var names = [];
			for ( var i = 0; i < data.length; i++) {
				var c = new name();
				c.title = data[i].toLocaleLowerCase();
				names.push(c);
			}
			$("#companyName").bigAutocomplete({
				data : names,
				callback : function(data) {
					var d = data.title.replace("&amp;","&");
					$("#companyName").val(d);
					$.ajax({
						type : "POST",
						url : "clientInfo_ClientInfoNameLoadContactPerson.do",
						data : {name : data.title},
						dateType : "json",
						error : function(data) {
							swal("Server Error!");
						},
						success : function(data) {
							$("#cpTechnical").empty();
							if(data.cpBusiness!=null){
								for ( var i = 0; i < data.cpBusiness.length; i++) {
									$("#cpBusiness").append("<option value='"+data.cpBusiness[i].personID+"'>"+data.cpBusiness[i].name+"</option>");
								}
							}
							if(data.cpTechnical!=null){
								$("#cpTechnical").val(data.cpTechnical.name);
							}
							$("#cpBusiness").selectpicker("refresh");
							
						}
					});
				}
			});
		}
	});
}

function loadSales() {
	$.ajax({
		type : "POST",
		url : "data_loadSales.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if (data != null && data.length > 0) {
				for ( var i = 0; i < data.length; i++) {
					$("#sales").append(
							"<option value='" + data[i].userId + "'>"
									+ data[i].eName + "</option>");
				}
				$("#sales").selectpicker("refresh");
			}
		}
	});
}

function loadParams(){
	$.ajax({
		type : "POST",
		url : "data_loadParams.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if(data.oems!=null){
				$("#oem").val('');
				for ( var i = 0; i < data.oems.length; i++) {
					$("#oem").append("<option value='"+data.oems[i].typeID+"'>"
							+data.oems[i].typeName+"</option>");
				}
				$("#oem").selectpicker("refresh");
			}
			if(data.pricingCriterions!=null){
				$("#pricingCriterions").val('');
				for ( var i = 0; i < data.pricingCriterions.length; i++) {
					$("#pricingCriterions").append("<option value='"+data.pricingCriterions[i].typeID+"'>"
							+data.pricingCriterions[i].typeName+"</option>");
				}
				$("#pricingCriterions").selectpicker("refresh");
			}
			if(data.reportNeed!=null){
				$("#reportNeed").val('');
				for ( var i = 0; i < data.reportNeed.length; i++) {
					$("#reportNeed").append("<option value='"+data.reportNeed[i].typeID+"'>"
							+data.reportNeed[i].typeName+"</option>");
				}
				$("#reportNeed").selectpicker("refresh");
			}
			if(data.reportType!=null){
				$("#reportType").val('');
				for ( var i = 0; i < data.reportType.length; i++) {
					$("#reportType").append("<option value='"+data.reportType[i].typeID+"'>"
							+data.reportType[i].typeName+"</option>");
				}
				$("#reportType").selectpicker("refresh");
			}
			if(data.returnPolicy!=null){
				$("#returnPolicy").val('');
				for ( var i = 0; i < data.returnPolicy.length; i++) {
					$("#returnPolicy").append("<option value='"+data.returnPolicy[i].typeID+"'>"
							+data.returnPolicy[i].typeName+"</option>");
				}
				$("#returnPolicy").selectpicker("refresh");
			}
		}
	});
	
}

function loadQuotationState(){
	$.ajax({
		type : "POST",
		url : "data_loadQuotationState.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if (data != null && data.length > 0) {
				for ( var i = 0; i < data.length; i++) {
					$("#state").append(
							"<option value='" + data[i].typeID + "'>"
									+ data[i].typeName + "</option>");
				}
				$("#state").selectpicker("refresh");
			}
		}
	});
}

function loadTpState(){
	$.ajax({
		type : "POST",
		url : "data_loadTpState.do",
		dateType : "json",
		error : function(data) {
			swal("Server Error!");
		},
		success : function(data) {
			if (data != null && data.length > 0) {
				for ( var i = 0; i < data.length; i++) {
					$("#state").append(
							"<option value='" + data[i].typeID + "'>"
									+ data[i].typeName + "</option>");
				}
				$("#state").selectpicker("refresh");
			}
		}
	});
}


function selectOne(id,data){
	$('#'+id).selectpicker('val',data);
	$("#"+id).selectpicker("refresh");
}

function checkNull(param){
	if(param==null){
		return "";
	}else{
		return param;
	}
}

function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = ""; 
    if (r != null) 
         context = r[2]; 
    reg = null; 
    r = null; 
    return context == null || context == "" || context == "undefined" ? "" : context; 
}