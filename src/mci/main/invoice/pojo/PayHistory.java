package mci.main.invoice.pojo;

import java.io.Serializable;

public class PayHistory implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String amount;
private String mode;
private String invoice;
private String time;
private String bank;
private String number;

public String getBank() {
	return bank;
}
public void setBank(String bank) {
	this.bank = bank;
}
public String getNumber() {
	return number;
}
public void setNumber(String number) {
	this.number = number;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getAmount() {
	return amount;
}
public void setAmount(String amount) {
	this.amount = amount;
}
public String getMode() {
	return mode;
}
public void setMode(String mode) {
	this.mode = mode;
}
public String getInvoice() {
	return invoice;
}
public void setInvoice(String invoice) {
	this.invoice = invoice;
}
public String getTime() {
	return time;
}
public void setTime(String time) {
	this.time = time;
}

}
