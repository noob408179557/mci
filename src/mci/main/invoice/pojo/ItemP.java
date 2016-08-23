package mci.main.invoice.pojo;

import java.io.Serializable;

public class ItemP implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String description;
private String amount;
private Invoice invoiceObject;
private String invoice;
private String date;
private String payment;


public String getPayment() {
	return payment;
}
public void setPayment(String payment) {
	this.payment = payment;
}
public String getDate() {
	return date;
}
public void setDate(String date) {
	this.date = date;
}
public Invoice getInvoiceObject() {
	return invoiceObject;
}
public void setInvoiceObject(Invoice invoiceObject) {
	this.invoiceObject = invoiceObject;
}
public String getInvoice() {
	return invoice;
}
public void setInvoice(String invoice) {
	this.invoice = invoice;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public String getAmount() {
	return amount;
}
public void setAmount(String amount) {
	this.amount = amount;
}

}
