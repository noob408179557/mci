package mci.main.invoice.pojo;

import java.io.Serializable;

public class ItemC implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String desc;
private String amount;
private String cost;
private String worker;
private String invoice;

public String getInvoice() {
	return invoice;
}
public void setInvoice(String invoice) {
	this.invoice = invoice;
}
public String getWorker() {
	return worker;
}
public void setWorker(String worker) {
	this.worker = worker;
}
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

}
