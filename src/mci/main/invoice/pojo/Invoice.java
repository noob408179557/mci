package mci.main.invoice.pojo;

import java.io.Serializable;

import mci.main.client.pojo.Client;
import mci.main.client.pojo.ContactPerson;
import mci.main.user.pojo.User;

public class Invoice implements Serializable,Cloneable {
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	public Invoice() {
		super();
	}

	public void InvoiceZero() {
		this.creditNotes ="0" ;
		this.AmountpayblewithGST ="0" ;
		this.total ="0" ;
		this.Cashpayment ="0" ;
		this.ChequePayment ="0" ;
		this.Creditnotespayment ="0" ;
		this.commission ="0" ;
		this.Overtimes10X ="0" ;
		this.Overtimes15X ="0" ;
		this.Overtimes20X ="0" ;
		this.CPF ="0" ;
		this.SDF ="0" ;
		this.WICA2 ="0" ;
		this.MedicalCoverageFee2 ="0" ;
		this.AdminFee ="0" ;
		this.TransportAllowance ="0" ;
		this.LaundryAllowance ="0" ;
		this.AfternoonShiftAllowance ="0" ;
		this.MedicalReimbursement ="0" ;
		this.MileageERPReimbursement ="0" ;
		this.LessUnpaidLeave ="0" ;
		this.TransportReimbursement ="0" ;
		this.MealAllowance ="0" ;
		this.AttendanceAllowance ="0" ;
		this.Allowance ="0" ;
		this.PublicHolidayOT ="0" ;
		this.Lateness ="0" ;
		this.AnnualLeaveEncashment ="0" ;
		this.Bonus ="0" ;
		this.CompletionBonus ="0" ;
		this.Incentive ="0" ;
		this.BackPaySalary ="0" ;
		this.BackPayOvertimes ="0" ;
		this.AdjustmentSalary ="0" ;
		this.AdjustmentOvertimes ="0" ;
		this.SalaryInLieu ="0" ;
		this.PaidAnnualLeave ="0" ;
		this.LessMidMonthSalary ="0" ;
		this.PaidMedicalLeave ="0" ;
		this.PaidChildcareLeave ="0" ;
		this.ApplicationfeeforWP ="0" ;
		this.ApplicationfeeforSP ="0" ;
		this.EissueforWP ="0" ;
		this.PurchaseofsecurityBond ="0" ;
		this.EissueforSP ="0" ;
	}

	private static final long serialVersionUID = 1L;
	private String id;
	private Client clientObject;
	private String client;
	private User picObject;
	private String pic;
	private String pic2;
	private User pic2Object;
	private ContactPerson cpObject;
	private String cp;
	private String createDate;
	private String state;
	private String term;
	private String type;
	
	private String remark;
	private String residual;
	private String lastdate;
	private String realname1;
	private String realname2;
	
	//F
	private String desc;
    private String workerNum;
    private String billingRate;
    private String cost;
    
	
	// 查询用变量
	private String startDate;
	private String endDate;
	private String clientName;
	private String consaultantName;
    private String creditNotes;
	private String action;
	//分级
	private String utype;
	private String upic;
	public static String flag="1";
//--------------------------------------所有item------
	private String AmountpayblewithGST;
	
	private String total;
	
	private String Cashpayment;
	
	private String ChequePayment;
	
	private String Creditnotespayment;
	 
	private String commission;
	
	private String Overtimes10X;
	
	private String Overtimes15X;
	
	private String Overtimes20X;
	
	private String CPF;
	
	private String SDF;
	
	private String WICA2;
	
	private String MedicalCoverageFee2;
	
	private String AdminFee;
	
	private String TransportAllowance;
	
	private String LaundryAllowance;
	
	private String AfternoonShiftAllowance;
	
	private String MedicalReimbursement;
	
	private String MileageERPReimbursement;
	
	private String LessUnpaidLeave;
	
	private String TransportReimbursement;
	
	private String MealAllowance;
	
	private String AttendanceAllowance;
	
	private String Allowance;
	
	private String PublicHolidayOT;
	
	private String Lateness;
	
	private String AnnualLeaveEncashment;
	
	private String Bonus;
	
	private String CompletionBonus;
	
	private String Incentive;
	
	private String BackPaySalary;
	
	private String BackPayOvertimes;
	
	private String AdjustmentSalary;
	
	private String AdjustmentOvertimes;

	private String SalaryInLieu;

	private String PaidAnnualLeave;

	private String LessMidMonthSalary;

	private String PaidMedicalLeave;

	private String PaidChildcareLeave;
//-------------------------------------
	private String ApplicationfeeforWP;

	private String ApplicationfeeforSP;

	private String EissueforWP;

	private String PurchaseofsecurityBond;

	private String EissueforSP;

	
	
	
	
	
	
	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getWorkerNum() {
		return workerNum;
	}

	public void setWorkerNum(String workerNum) {
		this.workerNum = workerNum;
	}

	public String getBillingRate() {
		return billingRate;
	}

	public void setBillingRate(String billingRate) {
		this.billingRate = billingRate;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getCommission() {
		return commission;
	}

	public void setCommission(String commission) {
		this.commission = commission;
	}

	public String getAmountpayblewithGST() {
		return AmountpayblewithGST;
	}

	public void setAmountpayblewithGST(String amountpayblewithGST) {
		AmountpayblewithGST = amountpayblewithGST;
	}

	public String getCashpayment() {
		return Cashpayment;
	}

	public void setCashpayment(String cashpayment) {
		Cashpayment = cashpayment;
	}

	public String getChequePayment() {
		return ChequePayment;
	}

	public void setChequePayment(String chequePayment) {
		ChequePayment = chequePayment;
	}

	public String getCreditnotespayment() {
		return Creditnotespayment;
	}

	public void setCreditnotespayment(String creditnotespayment) {
		Creditnotespayment = creditnotespayment;
	}

	public String getOvertimes10X() {
		return Overtimes10X;
	}

	public void setOvertimes10X(String overtimes10x) {
		Overtimes10X = overtimes10x;
	}

	public String getOvertimes15X() {
		return Overtimes15X;
	}

	public void setOvertimes15X(String overtimes15x) {
		Overtimes15X = overtimes15x;
	}

	public String getOvertimes20X() {
		return Overtimes20X;
	}

	public void setOvertimes20X(String overtimes20x) {
		Overtimes20X = overtimes20x;
	}

	public String getCPF() {
		return CPF;
	}

	public void setCPF(String cPF) {
		CPF = cPF;
	}

	public String getSDF() {
		return SDF;
	}

	public void setSDF(String sDF) {
		SDF = sDF;
	}

	public String getWICA2() {
		return WICA2;
	}

	public void setWICA2(String wICA2) {
		WICA2 = wICA2;
	}

	public String getMedicalCoverageFee2() {
		return MedicalCoverageFee2;
	}

	public void setMedicalCoverageFee2(String medicalCoverageFee2) {
		MedicalCoverageFee2 = medicalCoverageFee2;
	}

	public String getAdminFee() {
		return AdminFee;
	}

	public void setAdminFee(String adminFee) {
		AdminFee = adminFee;
	}

	public String getTransportAllowance() {
		return TransportAllowance;
	}

	public void setTransportAllowance(String transportAllowance) {
		TransportAllowance = transportAllowance;
	}

	public String getLaundryAllowance() {
		return LaundryAllowance;
	}

	public void setLaundryAllowance(String laundryAllowance) {
		LaundryAllowance = laundryAllowance;
	}

	public String getAfternoonShiftAllowance() {
		return AfternoonShiftAllowance;
	}

	public void setAfternoonShiftAllowance(String afternoonShiftAllowance) {
		AfternoonShiftAllowance = afternoonShiftAllowance;
	}

	public String getMedicalReimbursement() {
		return MedicalReimbursement;
	}

	public void setMedicalReimbursement(String medicalReimbursement) {
		MedicalReimbursement = medicalReimbursement;
	}

	public String getMileageERPReimbursement() {
		return MileageERPReimbursement;
	}

	public void setMileageERPReimbursement(String mileageERPReimbursement) {
		MileageERPReimbursement = mileageERPReimbursement;
	}

	public String getLessUnpaidLeave() {
		return LessUnpaidLeave;
	}

	public void setLessUnpaidLeave(String lessUnpaidLeave) {
		LessUnpaidLeave = lessUnpaidLeave;
	}

	public String getTransportReimbursement() {
		return TransportReimbursement;
	}

	public void setTransportReimbursement(String transportReimbursement) {
		TransportReimbursement = transportReimbursement;
	}

	public String getMealAllowance() {
		return MealAllowance;
	}

	public void setMealAllowance(String mealAllowance) {
		MealAllowance = mealAllowance;
	}

	public String getAttendanceAllowance() {
		return AttendanceAllowance;
	}

	public void setAttendanceAllowance(String attendanceAllowance) {
		AttendanceAllowance = attendanceAllowance;
	}

	public String getAllowance() {
		return Allowance;
	}

	public void setAllowance(String allowance) {
		Allowance = allowance;
	}

	public String getPublicHolidayOT() {
		return PublicHolidayOT;
	}

	public void setPublicHolidayOT(String publicHolidayOT) {
		PublicHolidayOT = publicHolidayOT;
	}

	public String getLateness() {
		return Lateness;
	}

	public void setLateness(String lateness) {
		Lateness = lateness;
	}

	public String getAnnualLeaveEncashment() {
		return AnnualLeaveEncashment;
	}

	public void setAnnualLeaveEncashment(String annualLeaveEncashment) {
		AnnualLeaveEncashment = annualLeaveEncashment;
	}

	public String getBonus() {
		return Bonus;
	}

	public void setBonus(String bonus) {
		Bonus = bonus;
	}

	public String getCompletionBonus() {
		return CompletionBonus;
	}

	public void setCompletionBonus(String completionBonus) {
		CompletionBonus = completionBonus;
	}

	public String getIncentive() {
		return Incentive;
	}

	public void setIncentive(String incentive) {
		Incentive = incentive;
	}

	public String getBackPaySalary() {
		return BackPaySalary;
	}

	public void setBackPaySalary(String backPaySalary) {
		BackPaySalary = backPaySalary;
	}

	public String getBackPayOvertimes() {
		return BackPayOvertimes;
	}

	public void setBackPayOvertimes(String backPayOvertimes) {
		BackPayOvertimes = backPayOvertimes;
	}

	public String getAdjustmentSalary() {
		return AdjustmentSalary;
	}

	public void setAdjustmentSalary(String adjustmentSalary) {
		AdjustmentSalary = adjustmentSalary;
	}

	public String getAdjustmentOvertimes() {
		return AdjustmentOvertimes;
	}

	public void setAdjustmentOvertimes(String adjustmentOvertimes) {
		AdjustmentOvertimes = adjustmentOvertimes;
	}

	public String getSalaryInLieu() {
		return SalaryInLieu;
	}

	public void setSalaryInLieu(String salaryInLieu) {
		SalaryInLieu = salaryInLieu;
	}

	public String getPaidAnnualLeave() {
		return PaidAnnualLeave;
	}

	public void setPaidAnnualLeave(String paidAnnualLeave) {
		PaidAnnualLeave = paidAnnualLeave;
	}

	public String getLessMidMonthSalary() {
		return LessMidMonthSalary;
	}

	public void setLessMidMonthSalary(String lessMidMonthSalary) {
		LessMidMonthSalary = lessMidMonthSalary;
	}

	public String getPaidMedicalLeave() {
		return PaidMedicalLeave;
	}

	public void setPaidMedicalLeave(String paidMedicalLeave) {
		PaidMedicalLeave = paidMedicalLeave;
	}

	public String getPaidChildcareLeave() {
		return PaidChildcareLeave;
	}

	public void setPaidChildcareLeave(String paidChildcareLeave) {
		PaidChildcareLeave = paidChildcareLeave;
	}

	public String getApplicationfeeforWP() {
		return ApplicationfeeforWP;
	}

	public void setApplicationfeeforWP(String applicationfeeforWP) {
		ApplicationfeeforWP = applicationfeeforWP;
	}

	public String getApplicationfeeforSP() {
		return ApplicationfeeforSP;
	}

	public void setApplicationfeeforSP(String applicationfeeforSP) {
		ApplicationfeeforSP = applicationfeeforSP;
	}

	public String getEissueforWP() {
		return EissueforWP;
	}

	public void setEissueforWP(String eissueforWP) {
		EissueforWP = eissueforWP;
	}

	
	public String getPurchaseofsecurityBond() {
		return PurchaseofsecurityBond;
	}

	public void setPurchaseofsecurityBond(String purchaseofsecurityBond) {
		PurchaseofsecurityBond = purchaseofsecurityBond;
	}

	public String getEissueforSP() {
		return EissueforSP;
	}

	public void setEissueforSP(String eissueforSP) {
		EissueforSP = eissueforSP;
	}


	public String getRealname1() {
		return realname1;
	}

	public void setRealname1(String realname1) {
		this.realname1 = realname1;
	}

	public String getRealname2() {
		return realname2;
	}

	public void setRealname2(String realname2) {
		this.realname2 = realname2;
	}

	public User getPic2Object() {
		return pic2Object;
	}

	public void setPic2Object(User pic2Object) {
		this.pic2Object = pic2Object;
	}

	public String getPic2() {
		return pic2;
	}

	public void setPic2(String pic2) {
		this.pic2 = pic2;
	}

	public String getCreditNotes() {
		return creditNotes;
	}

	public void setCreditNotes(String creditNotes) {
		this.creditNotes = creditNotes;
	}

	public String getUpic() {
		return upic;
	}

	public void setUpic(String upic) {
		this.upic = upic;
	}

	public String getUtype() {
		return utype;
	}

	public void setUtype(String utype) {
		this.utype = utype;
	}

	public static String getFlag() {
		return flag;
	}

	public static void setFlag(String flag) {
		Invoice.flag = flag;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getConsaultantName() {
		return consaultantName;
	}

	public void setConsaultantName(String consaultantName) {
		this.consaultantName = consaultantName;
	}

	public String getLastdate() {
		return lastdate;
	}

	public void setLastdate(String lastdate) {
		this.lastdate = lastdate;
	}

	public String getResidual() {
		return residual;
	}

	public void setResidual(String residual) {
		this.residual = residual;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}


	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getCp() {
		return cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Client getClientObject() {
		return clientObject;
	}

	public void setClientObject(Client clientObject) {
		this.clientObject = clientObject;
	}

	public User getPicObject() {
		return picObject;
	}

	public void setPicObject(User picObject) {
		this.picObject = picObject;
	}

	public ContactPerson getCpObject() {
		return cpObject;
	}

	public void setCpObject(ContactPerson cpObject) {
		this.cpObject = cpObject;
	}

}
