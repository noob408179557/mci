package mci.base.util;

import java.util.List;
/**
 * 
 * ClassName: PageBean
 * @Description: 分页查询实体类
 * @author peter
 * @date 2015-12-1
 */
public class PageBean<T> {
	private int pageIndex; // 需要显示的页码
	private int totalPages; // 总页数
	private int pageSize = 10; // 每页记录数
	private int totalRecords; // 总记录数
	private List<T> lists;

	public void setLists(List<T> lists) {
		this.lists = lists;
	}

	public List<T> getLists() {
		return lists;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getTotalPages() {
		return totalPages;
	}

}