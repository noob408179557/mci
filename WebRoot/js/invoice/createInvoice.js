window.onload =  search;
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
function search(i){
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
	if(isNaN(i)){
		 i=$("#pageIndex").val();
	}
	var pageIndex=i;
	 $.ajax({
		  type : "POST", 
		  url :  "loadActivedClient.do", 
		  dataType : "json", 
		  data:{
			pageIndex:i
			},
	      error:function(data){
		   alert("请求失败~"); 
		  },
	  success:function(data){
		  $("#invoiceList").empty();
		  for(var i=0;i<data.length;i++){
			  var head="<tr><th style='text-align:left;vertical-align : middle; '>"+(i+1)+"</th>"
				+ "<th style='text-align:left;vertical-align : middle; '>"
				+ data[i].companyName+"</th>"
				+ "<th style='text-align:left;vertical-align : middle; '>"
				+ data[i].picObject.realName+"</th>"
				+ "<th style='text-align:left;vertical-align : middle; ' id='contact"+i+"'>"
				+ "</th>"	
				+ "<th style='text-align:left;vertical-align : middle; ' id='email"+i+"'>"
				+ "</th>"
				+ "<th  style='text-align:left;vertical-align : middle; ' >" 
				+ "<div class='btn btn-primary waves-effect waves-light  btn-lg' id='' data-target='#edit0' data-toggle='modal' onclick='getCP("+data[i].id+")'>"
				+ "<i class='glyphicon glyphicon-shopping-cart'></i>&nbsp;Create</div>&nbsp;"
				+ "<div class='btn btn-primary waves-effect waves-light btn-lg' id='' onclick='getAccount("+data[i].id+")'>"
				+ "<i class='glyphicon glyphicon-th-large'></i>&nbsp;Account</div>"
				+ "</th></tr>";
	        $("#invoiceList").append(head);
			  //获取client的第一个contactperson
			 $.ajax({
				  type : "POST", 
				  url :  "loadFirstCP.do", 
				  async:false,
				  data:{
					  id:data[i].id
				  },
				  dataType : "json",    
			  error:function(data){
				  alert("请求失败~"); 
				  },
			  success:function(data){
				  var contact="#contact"+i;
				  var email="#email"+i;
				  $(contact).append(data.name);
				  $(email).append(data.email);
				}
			 });
		   }
		  
			//先获取client的总条数和总页数     
		   $.ajax({
				  type : "POST", 
				  url  : "loadActivedClientCount.do", 
				  dataType : "json",  
				  data:{
						pageIndex:i
						},
				  error:function(data){
				   alert("请求失败~"); 
				  },
				 
			  success:function(data){
				  //返回的data为页数
				  $("#pageIndex").val(pageIndex);
				  $("#pageProgress").empty();
				  $("#pageProgress").append(pageIndex+"/"+data);
				  $("#firstPage").attr("onclick","search(1)");
				 $("#lastPage").attr("onclick","search("+data+")");
				  if(($("#pageIndex").val())>data-1){
					  $("#nextPage").attr("onclick","search("+data+")");
				  }else{
					  $("#nextPage").attr("onclick","search("+(Number($("#pageIndex").val())+1)+")");
				  }
				  if(($("#pageIndex").val()<=1)){
					  $("#previousPage").attr("onclick","search(1)");
				  }else{
					  $("#previousPage").attr("onclick","search("+(Number($("#pageIndex").val())-1)+")");
				  }
			  }
			  });  
		  }
	});
	 $.ajax({
			type : "POST",
			url : "autoClientList.do",
			dateType : "json",
			async : false,
			error : function(data){
				swal("Server Error!");
			},
			success : function(data){
				var name = function(title){
					this.title = title;
					return this;
				}
				var names = new Array();
				for ( var i = 0; i < data.length; i++) {
					var c = new name();
					c.title = data[i].companyName;
					names.push(c);
				}
				$("#searchName").bigAutocomplete({
					data : names,
					callback : function(data) {

					}
				});
			}
		});
}
//获取这个client下的所有invoice
function getAccount(i) {
	$.ajax({
		type : "POST",
		url : "getAccount.do",
		data : {
			id : i
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
$(document).ready(function(){
	$("#createClient").click(function(){
		window.location.href ="mci-createClient.do";
	});
	$("#searchbtn").click(function(){
		$.ajax({
			type : "POST",
			url : "setCreateInvoiceLimit.do",
			dataType : "json",
			async:false,
			data : {
				companyName: $("#searchName").val(),
			},
			error : function(data) {
				swal("searchInvoice.do Error!");
			},
			success:function(data){
				if(data=="1"){
					swal("setCreateInvoiceLimit Error!");
				}else{
					$.ajax({
						type : "POST",
						url : "searchActiveClient.do",
						dataType : "json",
						data : {
							companyName: $("#searchName").val(),
						},
						error : function(data) {
							swal("searchInvoice.do Error!");
						},
						success : function(data) {
							// swal("SUCCESS");
							window.location.href = "mci-searchCreateInvoice.do";
						}
					})
				}
			}
		})
		
	})
	
	//先创建Invoice
	$("#next").click(function(){
		var type=$("#addType").val();
		var cp=$("#addCP").val();
		var date=$("#datepicker-autoclose").val();
		var client=$("#addClient").val();
		$.ajax({
			type : "POST", 
			  url  : "addInvoice.do", 
			  dataType : "json",   
			  data:{
				  cp:cp,
				  createDate:date,
				  type:type,
				  client:client
			  },
			  error:function(data){
			   alert("Ajax Fail~"); 
			  },
			 success:function(data){
				       if(data=="0"){
					 swal("Success~");
				 }else if(data=="1"){
					 swal("Fail~");
				 }else if(data=="2"){
					 swal("You haven't login your account");
				 }
			 }
		})
		$.ajax({
			type : "POST", 
			  url  : "addInvoice.do", 
			  dataType : "json",   
			  data:{
				  cp:cp,
				  createDate:date,
				  type:type,
				  client:client
			  },
			  error:function(data){
			   alert("Ajax Fail~"); 
			  },
			 success:function(data){
				       if(data=="0"){
				 }else if(data=="1"){
					 swal("Fail~");
				 }else if(data=="2"){
					 swal("You haven't login your account");
				 }
			 }
		})
		addInvoice(type);
	});
})

function getCP(x){
	$.ajax({
		type : "POST", 
		url  : "getCP.do", 
		dataType : "json",   
		data:{
			id:x
		},
		error:function(data){
		   alert("请求失败~"); 
		  },
		success:function(data){
			$("#addClient").val(x);
			  $("#addCP").empty();
			  $("#addCP").selectpicker('refresh');
			  if(data.length==0){
				  $("#addCP").selectpicker({
					  noneSelectedText:"No ContactPerson"
				  });
			  }else{
			  for(var i=0;i<data.length;i++){
				  $("#addCP").append("<option value='"+data[i].id+"'>"+data[i].name+"</option>");
			  }
			  }
			   $("#addCP").selectpicker('refresh');
		  }
		})
}

function addInvoice(type){
          if(type=="T"){
    	window.location.href="mci-invoiceT.do";
    }else if(type=="P"){
    	window.location.href="mci-invoiceP.do";
    }else if(type=="F"){
    	window.location.href="mci-invoiceF.do";
    }else if(type=="C"){
    	window.location.href="mci-invoiceC.do";
    }else{
    	swal("Error!");
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