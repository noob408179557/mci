package mci.main.invoice.pojo;

import java.io.Serializable;

//为item添加外键时用该类对象
public class InvoiceKey implements Serializable {
	private static final long serialVersionUID = 1L;
private String invoice;
private String item;
public String getInvoice() {
	return invoice;
}
public void setInvoice(String invoice) {
	this.invoice = invoice;
}
public String getItem() {
	return item;
}
public void setItem(String item) {
	this.item = item;
}

}
