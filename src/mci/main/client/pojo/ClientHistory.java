package mci.main.client.pojo;

import java.io.Serializable;

import mci.main.user.pojo.User;

public class ClientHistory implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String client;
	private Client clientObject;
	private User userObject;
	private String lastdate;
	private String user;
	private ClientQuery cq;
	private String editRemark;
	// 修改类型
	private String type;
	// 分页变量
	private int startIndex;
	private static int pageSize = 10;
	private int pageIndex;

	public String getEditRemark() {
		return editRemark;
	}

	public void setEditRemark(String editRemark) {
		this.editRemark = editRemark;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public static int getPageSize() {
		return pageSize;
	}

	public static void setPageSize(int pageSize) {
		ClientHistory.pageSize = pageSize;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public ClientQuery getCq() {
		return cq;
	}

	public void setCq(ClientQuery cq) {
		this.cq = cq;
	}

	public Client getClientObject() {
		return clientObject;
	}

	public void setClientObject(Client clientObject) {
		this.clientObject = clientObject;
	}

	public User getUserObject() {
		return userObject;
	}

	public void setUserObject(User userObject) {
		this.userObject = userObject;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getLastdate() {
		return lastdate;
	}

	public void setLastdate(String lastdate) {
		this.lastdate = lastdate;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
