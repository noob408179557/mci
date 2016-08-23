package mci.main.user.pojo;

import java.io.Serializable;

import mci.main.client.pojo.Client;

public class UserQuery implements Serializable {
	private static final long serialVersionUID = 1L;
	private User user;
	private int pageIndex;
	public static int pageSize = 10;
	private int startIndex;
	private int endIndex;
	private int totalPage;
	private int totalCount;

	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public static int getPageSize() {
		return pageSize;
	}

	public static void setPageSize(int pageSize) {
		UserQuery.pageSize = pageSize;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
