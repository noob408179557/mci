package mci.main.invoice.pojo;

public class ItemTotal {
private String invoiceId;
private String itemName;
private String type;


public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public String getInvoiceId() {
	return invoiceId;
}
public void setInvoiceId(String invoiceId) {
	this.invoiceId = invoiceId;
}
public String getItemName() {
	return itemName;
}
public void setItemName(String itemName) {
	this.itemName = itemName;
}
public ItemTotal(String invoiceId, String itemName) {
	super();
	this.invoiceId = invoiceId;
	this.itemName = itemName;
}
public ItemTotal() {
	super();
}

}
