package mci.main.invoice.pojo;

import java.io.Serializable;

public class ItemT implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String desc;
private String hours;
private String amount;
private String cost;
//所属的worker和invoice
private String worker;
private String invoice;
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getDesc() {
	return desc;
}
public void setDesc(String desc) {
	this.desc = desc;
}
public String getHours() {
	return hours;
}
public void setHours(String hours) {
	this.hours = hours;
}
public String getAmount() {
	return amount;
}
public void setAmount(String amount) {
	this.amount = amount;
}
public String getCost() {
	return cost;
}
public void setCost(String cost) {
	this.cost = cost;
}
public String getWorker() {
	return worker;
}
public void setWorker(String worker) {
	this.worker = worker;
}
public String getInvoice() {
	return invoice;
}
public void setInvoice(String invoice) {
	this.invoice = invoice;
}

}
