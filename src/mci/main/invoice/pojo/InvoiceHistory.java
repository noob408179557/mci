package mci.main.invoice.pojo;
import java.io.Serializable;

import mci.main.user.pojo.User;

public class InvoiceHistory implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String invoice;
	private Invoice invoiceObject;
	private User userObject;
	private String lastdate;
	private String user;
	//分页变量
	private int startIndex;
	private static int pageSize=5;
	private int pageIndex;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getInvoice() {
		return invoice;
	}
	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}
	public Invoice getInvoiceObject() {
		return invoiceObject;
	}
	public void setInvoiceObject(Invoice invoiceObject) {
		this.invoiceObject = invoiceObject;
	}
	public User getUserObject() {
		return userObject;
	}
	public void setUserObject(User userObject) {
		this.userObject = userObject;
	}
	public String getLastdate() {
		return lastdate;
	}
	public void setLastdate(String lastdate) {
		this.lastdate = lastdate;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public int getStartIndex() {
		return startIndex;
	}
	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}
	public static int getPageSize() {
		return pageSize;
	}
	public static void setPageSize(int pageSize) {
		InvoiceHistory.pageSize = pageSize;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

}
