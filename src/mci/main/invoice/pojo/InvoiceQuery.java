package mci.main.invoice.pojo;

import java.io.Serializable;
import java.util.List;


public class InvoiceQuery implements Serializable {
	private static final long serialVersionUID = 1L;
	private Invoice invoice;
	private int pageIndex;
	private static int pageSize=10;
	private int startIndex;
	private int totalPage;
	private int totalCount;
	//导出excel文件名称
	private String fileName;
	//权限控制条件
	private String utype;
	private String pic;
	private String pic2;
	public static String flag="1";
	
	private List<String> param;
		
	
	
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public List<String> getParam() {
		return param;
	}
	public void setParam(List<String> param) {
		this.param = param;
	}
	public String getPic2() {
		return pic2;
	}
	public void setPic2(String pic2) {
		this.pic2 = pic2;
	}
	public String getUtype() {
		return utype;
	}
	public void setUtype(String utype) {
		this.utype = utype;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public static String getFlag() {
		return flag;
	}
	public static void setFlag(String flag) {
		InvoiceQuery.flag = flag;
	}
	public Invoice getInvoice() {
		return invoice;
	}
	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
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
		InvoiceQuery.pageSize = pageSize;
	}
	public int getStartIndex() {
		return startIndex;
	}
	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
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
	
}
