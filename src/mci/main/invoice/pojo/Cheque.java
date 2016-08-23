package mci.main.invoice.pojo;

import java.io.Serializable;

public class Cheque implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String invoice;
private String number;
private String amount;
private String bank;
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
public String getNumber() {
	return number;
}
public void setNumber(String number) {
	this.number = number;
}
public String getAmount() {
	return amount;
}
public void setAmount(String amount) {
	this.amount = amount;
}
public String getBank() {
	return bank;
}
public void setBank(String bank) {
	this.bank = bank;
}

}
