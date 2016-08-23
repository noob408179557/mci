package mci.main.invoice.pojo;

import java.io.Serializable;

public class WorkerC implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String name;
private String nric;
private String salary;
private String employee;
private String employer;
private String dob;
private String invoice;
private Invoice invoiceObject;
private String cost;
private String position;
private String remark;
//T type
private String hours;


public String getHours() {
	return hours;
}
public void setHours(String hours) {
	this.hours = hours;
}
public String getRemark() {
	return remark;
}
public void setRemark(String remark) {
	this.remark = remark;
}
public String getPosition() {
	return position;
}
public void setPosition(String position) {
	this.position = position;
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
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getNric() {
	return nric;
}
public void setNric(String nric) {
	this.nric = nric;
}
public String getSalary() {
	return salary;
}
public void setSalary(String salary) {
	this.salary = salary;
}
public String getEmployee() {
	return employee;
}
public void setEmployee(String employee) {
	this.employee = employee;
}
public String getEmployer() {
	return employer;
}
public void setEmployer(String employer) {
	this.employer = employer;
}
public String getDob() {
	return dob;
}
public void setDob(String dob) {
	this.dob = dob;
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

}
