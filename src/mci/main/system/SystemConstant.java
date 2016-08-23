package mci.main.system;

public class SystemConstant {
//	static public String save_excel_dir = "D:\\workplace10\\mci\\WebRoot\\upload\\";
//	static public String get_excel_dir = "http://localhost:8080/mci/upload/";
	static public String save_excel_dir = "/web/apache-tomcat-7.0.68/webapps/mci/upload/";
	static public String get_excel_dir = "http://139.196.28.181/mci/upload/";
	
	 
	static public String change_dir(String dir){
		if(dir.substring(0,33).equals("http://localhost:8080/mci/upload/")){
			System.out.println("返回:D:\\workplace10\\mci\\WebRoot\\upload\\");
			return "D:\\workplace10\\mci\\WebRoot\\upload\\";
		}else if(dir.substring(0,33).equals(("http://139.196.28.181/mci/upload/").substring(0,33))){
			return "/web/apache-tomcat-7.0.68/webapps/mci/upload/";
		}else{
			return "";
		}
		
	}
    static public String change_item(String item){
    	if(item.equals("total")){
    		return " Amount payble without GST";
    	}
    	else if(item.equals("AmountpayblewithGST")){
    		return " Amount payble with GST";
    	}
    	else if(item.equals("Cashpayment")){
    		return " Cash payment ";
    	}
    	else if(item.equals("ChequePayment")){
    		return " Cheque Payment ";
    	}
    	else if(item.equals("creditNotes")){
    		return "Credit notes payment ";
    	}
    	else if(item.equals("commission")){
    		return " Commission";
    	}
    	else if(item.equals("Overtimes10X")){
    		return "Overtimes 1.0X";
    	}
    	else if(item.equals("Overtimes15X")){
    		return "Overtimes 1.5X";
    	}
    	else if(item.equals("Overtimes20X")){
    		return "Overtimes 2.0X";
    	}
    	else if(item.equals("CPF")){
    		return "CPF";
    	}
    	else if(item.equals("SDF")){
    		return "SDF";
    	}
    	else if(item.equals("WICA2")){
    		return "WICA 2%";
    	}
    	else if(item.equals("MedicalCoverageFee2")){
    		return " Medical Coverage Fee 2%";
    	}
    	else if(item.equals("AdminFee")){
    		return "Admin Fee";
    	}
    	else if(item.equals("TransportAllowance")){
    		return " Transport Allowance";
    	}
    	else if(item.equals("LaundryAllowance")){
    		return "Laundry Allowance";
    	}
    	else if(item.equals("AfternoonShelse iftAllowance")){
    		return "Afternoon Shelse ift Allowance";
    	}
    	else if(item.equals("MedicalReimbursement")){
    		return "Medical Reimbursement";
    	}
    	else if(item.equals("MileageERPReimbursement")){
    		return "Mileage&ERP Reimbursement";
    	}
    	else if(item.equals("LessUnpaidLeave")){
    		return " Less: Unpaid Leave";
    	}
    	else if(item.equals("TransportReimbursement")){
    		return "Transport Reimbursement";
    	}
    	else if(item.equals("MealAllowance")){
    		return "Meal Allowance";
    	}
    	else if(item.equals("AttendanceAllowance")){
    		return "Attendance Allowance";
    	}
    	else if(item.equals("Allowance")){
    		return "Allowance";
    	}
    	else if(item.equals("PublicHolidayOT")){
    		return "Public Holiday OT";
    	}
    	else if(item.equals("Lateness")){
    		return "Lateness";
    	}
    	else if(item.equals("AnnualLeaveEncashment")){
    		return "Annual Leave Encashment";
    	}
    	else if(item.equals("Bonus")){
    		return "Bonus";
    	}
    	else if(item.equals("CompletionBonus")){
    		return "Completion Bonus";
    	}
    	else if(item.equals("Incentive")){
    		return "Incentive";
    	}
    	else if(item.equals("BackPaySalary")){
    		return "Back Pay Salary";
    	}
    	else if(item.equals("BackPayOvertimes")){
    		return "Back Pay Overtimes";
    	}
    	else if(item.equals("AdjustmentSalary")){
    		return "Adjustment Salary";
    	}
    	else if(item.equals("AdjustmentOvertimes")){
    		return "Adjustment Overtimes";
    	}
    	else if(item.equals("SalaryInLieu")){
    		return "Salary In Lieu";
    	}
    	else if(item.equals("PaidAnnualLeave")){
    		return "Paid Annual Leave";
    	}
    	else if(item.equals("PaidMedicalLeave")){
    		return "Paid Medical Leave";
    	}
    	else if(item.equals("PaidChildcareLeave")){
    		return "Paid Childcare Leave";
    	}
    	else if(item.equals("LessMidMonthSalary")){
    		return "Less: Mid Month Salary";
    	}
    	else if(item.equals("ApplicationfeeforWP")){
    		return "Application fee for WP";
    	}
    	else if(item.equals("ApplicationfeeforSP")){
    		return "Application fee for SP";
    	}
    	else if(item.equals("EissueforWP")){
    		return "E-issue for WP ";
    	}
    	else if(item.equals("PurchaseofsecurityBond")){
    		return "Purchase of security Bond";
    	}
    	else if(item.equals("EissueforSP")){
    		return "E-issue for SP";
    	}


    	else if(item.equals("id")){
    		return "Invoice No.";
    	}
    	else if(item.equals("pic")){
    		return "MCI-PIC";
    	}
    	else if(item.equals("client")){
    		return "Client";
    	}
    	else if(item.equals("createDate")){
    		return "Date";
    	}
    	else if(item.equals("AfternoonShiftAllowance")){
    		return "Afternoon Shift Allowance";
    	}
    	else{
    		return "0";
    	}
    }



}
