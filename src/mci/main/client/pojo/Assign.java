package mci.main.client.pojo;

import java.io.Serializable;

public class Assign implements Serializable {
	private static final long serialVersionUID = 1L;
private String user;
private String client;
private String type;
public String getUser() {
	return user;
}

public String getType() {
	return type;
}

public void setType(String type) {
	this.type = type;
}

public void setUser(String user) {
	this.user = user;
}
public String getClient() {
	return client;
}
public void setClient(String client) {
	this.client = client;
}

}
