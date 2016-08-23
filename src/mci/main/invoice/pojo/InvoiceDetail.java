package mci.main.invoice.pojo;

import java.io.Serializable;

public class InvoiceDetail implements Serializable {
	private static final long serialVersionUID = 1L;
private String id;
private String text;
private String action="0";
//action为动作标志位 0为detail 1为print 默认为0
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getAction() {
	return action;
}
public void setAction(String action) {
	this.action = action;
}
public String getText() {
	return text;
}
public void setText(String text) {
	this.text = text;
}

}
