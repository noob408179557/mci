package mci.main.system.pojo;

public class UserInfo {
	private String invoiceQty="0";
	private String totalAmount="0";
	private String amountPaid="0";
	private String unpaidAmount="0";
	private String clientQty="0";
	private String commission="0";
	private String userQty="0";

	public String getInvoiceQty() {
		return invoiceQty;
	}

	public void setInvoiceQty(String invoiceQty) {
		this.invoiceQty = invoiceQty;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(String amountPaid) {
		this.amountPaid = amountPaid;
	}

	public String getUnpaidAmount() {
		return unpaidAmount;
	}

	public void setUnpaidAmount(String unpaidAmount) {
		this.unpaidAmount = unpaidAmount;
	}

	public String getClientQty() {
		return clientQty;
	}

	public void setClientQty(String clientQty) {
		this.clientQty = clientQty;
	}

	public String getCommission() {
		return commission;
	}

	public void setCommission(String commission) {
		this.commission = commission;
	}

	public String getUserQty() {
		return userQty;
	}

	public void setUserQty(String userQty) {
		this.userQty = userQty;
	}
}
