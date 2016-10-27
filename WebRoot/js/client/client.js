//-------------------------------Client主界面js--------------------------------------------------------------------
window.onload = init;

function init() {
	//删除无效的client
	
	search();
	loadLeft();
	loadClient();
//	$.ajax({
//		type : "POST",
//		url : "getPow.do",
//		dataType : "json",
//		error : function(data) {
//			alert("请求失败~");
//		},
//		success : function(data) {
//			$("#currUser").append(data.realName);
//			if (data.type == 1) {
////				$("#activeClient").hide();
////				$("#assign").hide();
////				$("#blockClient").hide();
////				$("#register").hide();
////				$("#user").hide();
////				$("#delete").hide();
//				$("#dashboard").show();
//				$("#invoice").show();
//				$("#client").show();
//			}else if(data.type ==2){
//
//			}
//			
//		}
//	});
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
				c.title = data[i].realName;
				names.push(c);
			}
			$("#searchPic").bigAutocomplete({
				data : names,
				callback : function(data) {
				}
			});
		}
	});

}
function search(i) {
	selectItem = 0;
	clearClient();
	if (isNaN(i)) {
		i = $("#pageIndex").val();
	}
	$
			.ajax({
				type : "POST",
				url : "loadClient.do",
				dataType : "json",
				async : false,
				data : {
					pageIndex : i
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					$("#clientList").empty();
					var created = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse '>Created</span></th>";
					var actived = "<th style='text-align:left;vertical-align : middle; color:green'><span class='label label-table label-success'>Actived</span></th>";
					var updated = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-inverse'>Updated</span></th>";
					var  inactive = "<th style='text-align:left;vertical-align : middle; color:red'><span class='label label-table label-danger'>Inactive</span></th>";
					for ( var i = 0; i < data.length; i++) {
						var body;
						if (data[i].state == "0") {
							body = updated;
						} else if(data[i].state=="1"){
							body = created;
						} else if(data[i].state=="2"){
							body=actived;
						} else if(data[i].state=="3"){
							body=inactive;
						}
						var head = "<tr><th style='text-align:left;vertical-align : middle; '>"
								+ (i + 1)
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; ' width='1%'>"
								+ "<div class='checkbox checkbox-primary checkbox-single'><input type='checkbox' name='select' value='"
								+ data[i].id
								+ "'><label></label></div></th>"
								// + "<th style='text-align:left;vertical-align
								// : middle; '>"
								// + data[i].id+"</th>"
								+ "<th style='text-align:left;vertical-align : middle; '>"
								+ data[i].companyName
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; '>"
								+ data[i].picObject.realName
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; ' id='contact"
								+ i
								+ "'>"
								+ "<th style='text-align:left;vertical-align : middle; ' >"
								+ data[i].trade
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; ' id='email"
								+ i
								+ "'>"
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; ' id='tel"
								+ i + "'>";
						         var leg = "<th style='text-align:left;vertical-align : middle; '>"
								+  data[i].createDate
								+ "</th>"
								+ "<th style='text-align:left;vertical-align : middle; '>"
								+ data[i].lastDate.substring(0,data[i].lastDate.indexOf(".")) + "</th></tr>";
						var one = head + body + leg;
						$("#clientList").append(one);
						// 获取client的第一个contactperson
						$.ajax({
							type : "POST",
							url : "loadFirstCP.do",
							async : false,
							data : {
								id : data[i].id
							},
							dataType : "json",
							error : function(data) {
								alert("请求失败~");
							},
							success : function(data) {
								var contact = "#contact" + i;
								var email = "#email" + i;
								var tel = "#tel" + i;
								if (data.i == "0") {
									$(contact).append("");
								} else {
									$(contact).append(data.name);
									$(email).append(data.email);
									$(tel).append(data.tel);
								}
							}
						});
					}
				}
			// 先获取client的总条数和总页数

			});
	$.ajax({
		type : "POST",
		url : "loadClientCount.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
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
