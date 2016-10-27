var selectItem1 = 0;
var selectItem2 = 0;
$(function() {
	$("#selectAll1").click(function() {
		var coll = document.getElementsByName("select1");
		if (selectItem1 % 2 != 0) {
			for (var i = 0; i < coll.length; i++)
				coll[i].checked = false;
		} else {
			for (var i = 0; i < coll.length; i++)
				coll[i].checked = true;
		}
		selectItem1++;

	})
	$("#selectAll2").click(function() {
			var coll = document.getElementsByName("select2");
			if (selectItem2 % 2 != 0) {
				for (var i = 0; i < coll.length; i++)
					coll[i].checked = false;
			} else {
				for (var i = 0; i < coll.length; i++)
					coll[i].checked = true;
			}
			selectItem2++;

		})
	
	$("#editInvoice")
	.click(
			function() {
				
				if ($("input[name='selectInvoice']:checked").val() != null) {
					$.ajax({
						type : "POST",
						url : "editInvoice.do",
						dataType : "json",
						async:false,
						data : {
							id : $("input[name='selectInvoice']:checked").val()
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

});

});
function getInvoice(index){
	if(index==""||index== undefined){
		index=1;
	}
	if ($("input[name='select']:checked").val() != null) {
		$.ajax({
			type :"POST",
			url : "getInvoiceOfUser.do",
			dataType : "json",
			async:false,
			data : {
				userid : $("input[name='select']:checked").val(),
				pageIndex:index
			},
			error : function(data) {

			},
			success : function(data) {
				if(data.length==0){
					swal("No invoice!");
					return false;
				}
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
						+ "'><label></label></div></td>"
						+ "<td style='text-align:left;vertical-align : middle; '><div style='cursor:pointer;color:#00F' onclick=searchInvoice("+data[i].id+")>"
						+ data[i].type+data[i].number+"</td>"
						+ "<td style='text-align:left;vertical-align : middle; '><div >"
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
			$.ajax({
				type : "POST",
				url : "loadInvoiceOfUserCount.do",
				dataType : "json",
				async:false,
				data:{
					id : $("input[name='select']:checked").val()
				},
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					// 返回的data为页数
					$("#accountPageIndex").val(index);
					$("#pageAccount").empty();
					$("#pageAccount").append(index + "/" + data);
					$("#firstAccount").attr("onclick", "getInvoice(1)");
					$("#lastAccount").attr("onclick", "getInvoice(" + data + ")");
					if (($("#accountPageIndex").val()) > data - 1) {
						$("#nextAccount").attr("onclick",
								"getInvoice(" + data + ")");
					} else {
						$("#nextAccount").attr(
								"onclick",
								"getInvoice("
										+ (Number($("#accountPageIndex").val()) + 1)
										+ ")");
					}
					if (($("#accountPageIndex").val() <= 1)) {
						$("#previousAccount").attr("onclick", "getInvoice(1)");
					} else {
						$("#previousAccount").attr(
								"onclick",
								"getInvoice("
										+ (Number($("#accountPageIndex").val()) - 1)
										+ ")");
					}
				}
			});
			$("#invoice1").modal();
		}
		})
	
	}else{
		swal("You haven't select any user!");
	}
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