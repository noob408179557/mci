
function testSite(id, name) {
	this.id = id;
	this.name = name;
	return this;
}

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
var testSites = [];
var x = 0;

jQuery(document).ready(function(){
// Date Picker
jQuery('#datepicker-autoclose').datepicker({
	autoclose: true,
	todayHighlight: true
	});
});
$(function() {
	//点击createInvoice按钮后
	$("#createInvoice").click(function(){
		if($("#PSubTotal").val()==null||$("#PSubTotal").val()==""||$("#PSubTotal").val()=="0.0"||isNaN($("#PSubTotal").val())){
			swal("Required cannot be empty!");
			return false;
		}
			$(".addPKey").click();
			$.ajax({
				type : "POST",
				url : "updateInvoiceF.do",
				dataType : "json",
				async:false,
				data : {
					total : $("#PSubTotal").val(),
					pic2: $("#anotherPIC").val()
				},
				error : function(data) {
					swal("请求失败~");
				},
				success:function(data){
					window.location.href="mci-staffInvoice.do";
				}
			});
	});
	$("#addRow").click(function(){
		$.ajax({
			  type : "POST", 
			  url  : "createItemP.do", 
			  dataType : "json",    
			  async:false,
			  error:function(data){
			   alert("请求失败~"); 
			  },
		  success:function(data){
			  x++;
	          //在table中增加一行
			  $("#itemList").append(
					      "<tr id='row"
						+ data
						+ "'><td style='text-align: center;vertical-align:middle;'>"
						+ "<div class='input-group'><input type='text' id='date"
						+ data+"' class='form-control' placeholder='mm/dd/yyyy' id='datepicker-autoclose'><div>"
						+ "</td>"
						+ "<td  style='vertical-align:middle;' colspan='2'><input id='desc"
						+ data
						+ "' type='text' style='width:100%; border-top:0px ;border-left:0px;border-right:0px;' />"
						+ "</td><td  style='vertical-align:middle;' >$<input id='amount"
						+ data
						+ "' type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' onkeyup='caculateP()'  class='payable'/>"
						+ "</td>"
						+ "<td><a title='delete' style='float:right' class='btn btn-danger btn-lg'  onclick='removeRow("
						+ data + ")' href='javascript:void(0)' id='removeRow"
						+ x + "'><i class='glyphicon glyphicon-trash'></i></a> <a class='addPKey' onclick='addPKey("+data+")'/></td></tr>");
			  var date="#date"+data;
			  $(date).datepicker("refresh");
			if(x !=1){
			 hideLastRemove(x);
			}
		  }
		})
	})
});
//取消之前对上行的隐藏
function removeRow(i) {
	var r="#row"+i;
	$(r).remove();
	x--;
	document.getElementById("removeRow" + x).style.display = "";
	removeItemP(i);
	caculateP();
}
// 隐藏上一行的remove
function hideLastRemove(i) {
	var z = i - 1;
	if (z != 0) {
		document.getElementById("removeRow" + z).style.display = "none";
	}
}
function removeItemP(i){
	$.ajax({
		type : "POST",
		url : "removeItemP.do",
		dataType : "json",
		data : {
			invoiceid : i
		},
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
		}
	});
}

function initInvoice(){
	$.ajax({
		type : "POST",
		url : "getPow.do",
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
		success : function(data) {
			if (data.type == 1) {
				$("#register").hide();
				$("#user").hide();
			}
		}
	});
	$.ajax({
		  type : "POST", 
		  url  : "getEditClient.do", 
		  dataType : "json",   
		  error:function(data){
		   alert("请求失败~"); 
		  },
		  success:function(data){
			  //返回Client
			 $("#companyName").val(data.companyName);
		  }
	});
	$.ajax({
		  type : "POST", 
		  url  : "getEditInvoice.do", 
		  dataType : "json",   
		  error:function(data){
		   alert("请求失败~"); 
		  },
		  success:function(data){
			  //返回Invoice
			 $("#id").val(data.type+data.number);
			 $("#date").val(data.createDate);
			 $("#pic").val(data.picObject.realName);
			 $("#term").val(data.term);
			 $("#companyAttention").val(data.cpObject.name);
			 $("#companyAddress").val(data.cpObject.billaddress);
			 $("#companyCountry").val(data.cpObject.country);
			 $("#remark").val(data.remark);
			 
	
		
		// 获取其他的pic并选中invocie中的pic2
		$.ajax({
			type:"POST",
			url:"getAnotherPIC.do",
			dataType:"json",
			async:false,
			error:function(data1){
				swal("getAnotherPIC.do error!");
			},
			success:function(data1){
				$("#anotherPIC").append("<option value=''>No another pic</option>");
				for(var i=0;i<data1.length;i++){
				if(data.pic2!=null){
					if(data.pic2==data1[i].id){
			
					$("#anotherPIC").append("<option selected='selected'   value='"+data1[i].id+"'>"+data1[i].realName+"</option>");
				}else{
					$("#anotherPIC").append("<option  value='"+data1[i].id+"'>"+data1[i].realName+"</option>");
				}
				}else{
					$("#anotherPIC").append("<option  value='"+data1[i].id+"'>"+data1[i].realName+"</option>");
				}
				}
				$("#anotherPIC").selectpicker("refresh");
			}
			})
		// 决定选中哪个pic,是否锁定状态
		$.ajax({
			type:"POST",
			url:"getCurrentUser.do",
			dataType:"json",
			error:function(data2){
				swal("getCurrentUser.do error!");
			},
			success:function(data2){
				if(data2.id!=data.pic&&pow===1){
					 $("#anotherPIC").attr({ disabled: "disabled" });
				}
			}
		});
        showItem();
		  }
	});
}
function showItem(){
	$.ajax({
		type : "POST",
		url : "getEditItemP.do",
		async:false,
		dataType : "json",
		error : function(data) {
			alert("请求失败~");
		},
        success:function(data){
        	for(var i=0;i<data.length;i++){
        		x++;
        		var id=data[i].id;
        		 $("#itemList").append(
					      "<tr id='row"
						+ data[i].id
						+ "'><td style='text-align: center;vertical-align:middle;'>"
						+ "<div class='input-group'><input type='text' id='date"
						+ data[i].id
						+"' class='form-control' placeholder='mm/dd/yyyy' id='datepicker-autoclose'><div>"
						+ "</td>"
						+ "<td  style='vertical-align:middle;' colspan='2'><input id='desc"
						+ data[i].id
						+ "' type='text' style='width:100%; border-top:0px ;border-left:0px;border-right:0px;' />"
						+ "</td><td  style='vertical-align:middle;' >$<input id='amount"
						+ data[i].id
						+ "' type='text' style='width:80%;border-top:0px ;border-left:0px;border-right:0px;' onkeyup='caculateP()'  class='payable'/>"
						+ "</td>"
						+ "<td><a class='btn btn-danger btn-lg' style='float:right' onclick='removeRow("
						+ data[i].id
						+ ")' href='javascript:void(0)' id='removeRow"
						+ x 
						+ "'><i class='glyphicon glyphicon-trash'></i></a> <a class='addPKey' onclick='addPKey("
						+id
						+")'/></td></tr>");
        	$("#date"+id).val(data[i].date);
         	$("#date"+id).datepicker("refresh");
        	$("#desc"+id).val(data[i].description);
        	$("#amount"+id).val(data[i].payment);
        	caculateP(id);
        	if (x != 1) {
				hideLastRemove(x);
			}
        	}
        }
	});

}
function caculateP(){
	var $list=$(".payable");
//	alert($list.length);
	 var subTotal=0;
	 subTotal= parseFloat(subTotal);
	 for(var j=0;j<$list.length;j++){
		 if(!isNaN(parseFloat($list.eq(j).val()))){
				if($list.eq(j).val()!=""||$list.eq(j).val()!="0"){
			    	subTotal+= parseFloat($list.eq(j).val());
			    	}
		 }else{
			 continue;
		 }
	    
	    }
	  $("#PSubTotal").val((subTotal).toFixed(1));
	    $("#gst").val((subTotal*0.07).toFixed(1));
	    $("#totalAmount").val((subTotal*1.07).toFixed(2));
}
//为invoice中item添加外键
function addPKey(i){
	var date="#date"+i;
	var desc="#desc"+i;
	var amount="#amount"+i;
	var total="#totalAmount";
	var dateV=$(date).val();
	var descV=$(desc).val();
	var amountV=$(amount).val();
	var totalV=$(total).val();
	//alert("date:"+dateV+"  desc:"+descV+"  amount:"+amountV);
	if(dateV!=""&&descV!=""&&amountV!=""){
		//itemF update
		$.ajax({
			  type : "POST", 
			  url  : "updateItemP.do", 
			  dataType : "json",  
			  data:{
				  id:i,
				date:dateV,
				description:descV,
				amount:amountV
			  },
			  error:function(data){
			   swal("请求失败~"); 
			  },
			  success:function(data){
				  
			  }
		});
	
		  //添加remark
    	$.ajax({
    		type:"POST",
    		url:"addInvoiceRemark.do",
    		dataType:"json",
    		data:{
    			remark:$("#remark").val()
    		},
    		error:function(data){
    		swal("请求失败~");	
    		}
    		});
		//为itemF添加外键
		$.ajax({
	  type : "POST", 
	  url  : "addInvoicepFK.do", 
	  dataType : "json",   
	  data:{
		  id:i
	  },
	  error:function(data){
	   swal("请求失败~"); 
	  },
	  success:function(data){
			window.location.href="mci-staffInvoice.do";
	  }
		});
	}else{
    	swal("Null value not allowed!");
	}

}	

  