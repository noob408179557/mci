
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
	loadLeft();

	if(isNaN(i)){
		 i=$("#pageIndex").val();
	}
	$.ajax({
		 type : "POST", 
		  url : "getCreateInvoiceLimit.do",
		  dataType : "json", 
		  async:false,
	      error:function(data){
		   swal("getCreateInvoiceLimit 请求失败");
		  },
		  success:function(data){
			  $("#searchName").val(data.companyName);
		  }
	});
	var pageIndex=i;
	 $.ajax({
		  type : "POST", 
		  url : "loadSearchClient.do",
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
			  var head="<tr><th style='text-align:left;vertical-align : middle; '>"+(i+1)+"</th><th style='text-align:left;vertical-align : middle; '>"+data[i].id+"</th>"
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
				+ "<div class='btn btn-primary waves-effect waves-light btn-lg' id='' >"
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
				url : "loadSearchClientCount.do",
				dataType : "json",
				error : function(data) {
					alert("请求失败~");
				},
				success : function(data) {
					// 返回的data为页数
					$("#pageIndex").val(pageIndex);
					$("#pageProgress").empty();
					$("#pageProgress").append(pageIndex + "/" + data);
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
		var term=$("#addTerm").val();
		var client=$("#addClient").val();
		$.ajax({
			type : "POST", 
			  url  : "addInvoice.do", 
			  dataType : "json",   
			  data:{
				  cp:cp,
				  createDate:date,
				  term:term,
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

 
