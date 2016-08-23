package mci.main.invoice.pojo;

import java.io.Serializable;

public class ItemF implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String description;
private String number;
private Invoice invoiceObject;
private String invoice;
private String billingrate;
private String cost;
//item信息
private String itemRate;
private String itemName;
private String itemCost;





public String getItemRate() {
	return itemRate;
}
public void setItemRate(String itemRate) {
	this.itemRate = itemRate;
}
public String getItemCost() {
	return itemCost;
}
public void setItemCost(String itemCost) {
	this.itemCost = itemCost;
}

public String getItemName() {
	return itemName;
}
public void setItemName(String itemName) {
	this.itemName = itemName;
}
public String getCost() {
	return cost;
}
public void setCost(String cost) {
	this.cost = cost;
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
public String getNumber() {
	return number;
}
public void setNumber(String number) {
	this.number = number;
}

public Invoice getInvoiceObject() {
	return invoiceObject;
}
public void setInvoiceObject(Invoice invoiceObject) {
	this.invoiceObject = invoiceObject;
}
public String getInvoice(){
	return invoice;
}
public void setInvoice(String invoice){
	this.invoice = invoice;
}
public String getBillingrate(){
	return billingrate;
}
public void setBillingrate(String billingrate){
	this.billingrate = billingrate;
}

}
