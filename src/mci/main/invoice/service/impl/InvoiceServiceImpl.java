package mci.main.invoice.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.JFileChooser;

import org.apache.commons.httpclient.HttpClient;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mci.main.client.pojo.Client;
import mci.main.client.pojo.ContactPerson;
import mci.main.invoice.mapper.InvoiceMapper;
import mci.main.invoice.pojo.Cheque;
import mci.main.invoice.pojo.Invoice;
import mci.main.invoice.pojo.InvoiceHistory;
import mci.main.invoice.pojo.InvoiceKey;
import mci.main.invoice.pojo.InvoiceQuery;
import mci.main.invoice.pojo.ItemC;
import mci.main.invoice.pojo.ItemF;
import mci.main.invoice.pojo.ItemP;
import mci.main.invoice.pojo.ItemT;
import mci.main.invoice.pojo.ItemTotal;
import mci.main.invoice.pojo.PayHistory;
import mci.main.invoice.pojo.WorkerC;
import mci.main.invoice.service.InvoiceService;
import mci.main.system.Download;
import mci.main.system.SystemConstant;
import mci.main.user.pojo.User;

@Service
public class InvoiceServiceImpl extends HttpServlet implements InvoiceService {

	@Autowired
	private InvoiceMapper invoiceMapper;

	@Override
	public void updateWorkerC(WorkerC worker) {
		invoiceMapper.updateWorkerC(worker);

	}

	@Override
	public void updateItemC(ItemC item) {
		invoiceMapper.updateItemC(item);

	}

	@Override
	public List<ItemC> loadInvoiceItemC(Invoice invoice) {
		return invoiceMapper.loadInvoiceItemC(invoice);
	}

	@Override
	public void removeItemC(ItemC item) {
		invoiceMapper.removeItemC(item);
	}

	@Override
	public Invoice commission(Invoice invoice) {
		return invoiceMapper.commission(invoice);
	}

	@Override
	public List<Invoice> loadInvoice(InvoiceQuery iq) {
		iq.setStartIndex((iq.getPageIndex() - 1) * InvoiceQuery.getPageSize());
		return invoiceMapper.loadInvoice(iq);

	}

	@Override
	public void updateInvoice(Invoice invoice) {
		invoiceMapper.updateInvoice(invoice);

		// 添加修改记录
	}

	@Override
	public Invoice getaInvoice(Invoice invoice) {
		return invoiceMapper.getaInvoice(invoice);
	}

	@Override
	public void activeInvoice(Invoice invoice) {
		invoiceMapper.activeInvoice(invoice);
	}

	@Override
	public int loadInvoiceCount(InvoiceQuery iq) {
		int totalCount = invoiceMapper.loadInvoiceCount(iq);
		int totalPage;
		if ((totalCount % InvoiceQuery.getPageSize()) == 0) {
			totalPage = totalCount / InvoiceQuery.getPageSize();
		} else {
			totalPage = totalCount / InvoiceQuery.getPageSize() + 1;
		}
		return totalPage;
	}

	@Override
	public String createItemF() {
		ItemF item = new ItemF();
		invoiceMapper.createItemF(item);
		return item.getId();
	}

	@Override
	public List<ContactPerson> getCP(String id) {
		List<ContactPerson> list = invoiceMapper.getCP(id);
		return list;
	}

	@Override
	public void addInvoice(Invoice in) {
		invoiceMapper.addInvoice(in);
	}

	@Override
	public Client getClient(String id) {
		return invoiceMapper.getClient(id);
	}

	@Override
	public ContactPerson getaCP(String id) {
		return invoiceMapper.getaCP(id);
	}
	// 给invoice添加外键

	@Override
	public void addInvoicefFK(InvoiceKey ik) {
		invoiceMapper.addInvoicefFK(ik);
	}

	@Override
	public void clearItemF() {
		invoiceMapper.clearItemF();
	}

	@Override
	public void updateItemF(ItemF item) {
		invoiceMapper.updateItemF(item);
	}

	@Override
	public void removeItemF(String id) {
		invoiceMapper.removeItemF(id);

	}

	@Override
	public void addInvoiceRemark(Invoice in) {
		invoiceMapper.addInvoiceRemark(in);

	}

	// invoice P--------------------------------------------
	@Override
	public void createItemP(ItemP item) {
		invoiceMapper.createItemP(item);

	}

	@Override
	public void addInvoicepFK(InvoiceKey ik) {
		invoiceMapper.addInvoicepFK(ik);

	}

	@Override
	public void updateItemP(ItemP item) {
		invoiceMapper.updateItemP(item);
	}

	@Override
	public void addInvoiceTotal(Invoice in) {
		invoiceMapper.addInvoiceTotal(in);
	}

	@Override
	public void addWorkerC(WorkerC worker) {
		invoiceMapper.addWorkerC(worker);
	}

	@Override
	public void addItemC(ItemC item) {
		invoiceMapper.addItemC(item);

	}

	@Override
	public void removeWorker(WorkerC worker) {
		invoiceMapper.removeWorkerC(worker);
	}

	@Override
	public void removeItemOfWorkerC(WorkerC worker) {
		invoiceMapper.removeItemOfWorkerC(worker);
	}

	@Override
	public void removeItemOfWorkerT(WorkerC worker) {
		invoiceMapper.removeWorkerT(worker);

	}

	@Override
	public void addWorkerT(WorkerC worker) {
		invoiceMapper.addWorkerT(worker);
	}

	@Override
	public void addItemT(ItemT item) {
		invoiceMapper.addItemT(item);
	}

	@Override
	public void removeItemT(ItemT item) {
		invoiceMapper.removeItemT(item);
	}

	@Override
	public void removeWorkerT(WorkerC worker) {
		invoiceMapper.removeWorkerT(worker);
	}

	@Override
	public void updateItemT(ItemT item) {
		invoiceMapper.updateItemT(item);
	}

	@Override
	public void updateWorkerT(WorkerC worker) {
		invoiceMapper.updateWorkerT(worker);
	}

	@Override
	public Invoice getEditInvoice(Invoice invoice) {
		return invoiceMapper.getEditInvoice(invoice);
	}

	@Override
	public List<WorkerC> getEditWorkersC(String invoiceid) {
		return invoiceMapper.getEditWorkersC(invoiceid);
	}

	@Override
	public List<ItemC> getEditItemC(String str) {
		return invoiceMapper.getEditItemC(str);
	}

	@Override
	public User getaPIC(String id) {
		return invoiceMapper.getaPIC(id);
	}

	@Override
	public List<WorkerC> getEditWorkersT(String invoiceid) {
		return invoiceMapper.getEditWorkersT(invoiceid);
	}

	@Override
	public List<ItemT> getEditItemT(String id) {
		return invoiceMapper.getEditItemT(id);
	}

	@Override
	public List<ItemF> getEditItemF(String invoiceid) {
		return invoiceMapper.getEditItemF(invoiceid);
	}

	@Override
	public List<ItemP> getEditItemP(String invoiceid) {
		return invoiceMapper.getEditItemP(invoiceid);
	}

	@Override
	public void removeItemP(String invoiceid) {
		invoiceMapper.removeItemP(invoiceid);
	}

	@Override
	public void deleteInvoice(String invoiceid) {
		invoiceMapper.deleteInvoice(invoiceid);

	}

	@Override
	public void removeItemFOfInvoice(String invoiceid) {
		invoiceMapper.removeItemFOfInvoice(invoiceid);

	}

	@Override
	public void removeItemPOfInvoice(String invoiceid) {
		invoiceMapper.removeItemPOfInvoice(invoiceid);

	}

	@Override
	public List<User> autoConsultantList() {
		return invoiceMapper.autoConsultantList();
	}

	@Override
	public List<Invoice> searchInvoice(Invoice invoice) {
		return invoiceMapper.searchInvoice(invoice);
	}

	@Override
	public List<InvoiceHistory> getInvoiceHistory(InvoiceHistory ih) {
		return invoiceMapper.getInvoiceHistory(ih);
	}

	@Override
	public void addInvoiceHistory(InvoiceHistory ih) {
		invoiceMapper.addInvoiceHistory(ih);
	}

	@Override
	public void cancelInvoice(Invoice invoice) {
		invoiceMapper.cancelInvoice(invoice);
	}

	@Override
	public void confirmInvoice(Invoice invoice) {
		invoiceMapper.confirmInvoice(invoice);

	}

	@Override
	public ContactPerson getCPOI(Invoice invoice) {
		return invoiceMapper.getCPOI(invoice);
	}

	@Override
	public void getCommission(Invoice invoice) {
		invoiceMapper.getCommission(invoice);
	}

	@Override
	public void createCheque(Cheque cq) {
		invoiceMapper.createCheque(cq);

	}

	@Override
	public Invoice getPic(Invoice invoice) {
		return invoiceMapper.getPic(invoice);
	}

	@Override
	public void addPayHistory(PayHistory ph) {
		invoiceMapper.addPayHistory(ph);

	}

	@Override
	public void clearInvoice() {
		invoiceMapper.clearInvoice();
	}

	@Override
	public String getWorkerTHours(ItemT t) {
		return invoiceMapper.getWorkerTHours(t);
	}

	@Override
	public List<PayHistory> getPayHistory(Invoice invoice) {
		return invoiceMapper.getPayHistory(invoice);
	}

	@Override
	public void setCommission(Invoice invoice) {
		invoiceMapper.setCommission(invoice);
	}

	@Override
	public List<Map<String, Object>> moneytable(String id, String[] columnName, String sqlFiled) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String print(InvoiceQuery iq, HttpSession session, HttpServletRequest request, HttpServletResponse response)
			throws NoSuchFieldException, SecurityException, NoSuchMethodException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException, IOException, ServletException {
		// List<Invoice> list = invoiceMapper.loadInvoice(iq);
		// invoice的list
		List<Invoice> list;
		Invoice invoice = (Invoice) session.getAttribute("InvoiceQuery");
		if (invoice == null) {
			list = invoiceMapper.loadInvoiceForPrint(iq);
		} else {
			list = invoiceMapper.searchInvoiceForPrint(invoice);
		}

		Invoice total = new Invoice();
		total.setId("Total");
		total.InvoiceZero();
		// 需要的数据的list
		List<String> param = iq.getParam();
		// 不同类型对应的item的list
		// List<ItemF> itemFList;
		// List<ItemC> itemCList;
		// List<ItemT> itemTList;
		// List<ItemP> itemPList;
		// 第一步，创建一个webbook，对应一个Excel文件
		
		
		
		HSSFWorkbook wb = new HSSFWorkbook();
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
		HSSFSheet sheet = wb.createSheet("Invoice Table");
		// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
		HSSFRow row = sheet.createRow((int) 0);
		// 第四步，创建单元格，并设置值表头 设置表头居中
		HSSFCellStyle style = wb.createCellStyle();
		for(int i=0;i<param.size();i++){
			sheet.setColumnWidth(i,6500);
		}
		
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		for (int i = 0; i < param.size(); i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			// 表头名称转换
			cell.setCellValue(SystemConstant.change_item(param.get(i)));
		}
		// HSSFCell cell = row.createCell(0);
		// cell.setCellValue("Invoice No.");
		// cell.setCellStyle(style);
		// cell = row.createCell(1);
		// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
		// 构建一个InvoiceQuery对象
		iq.setPageIndex(1);
		iq.setStartIndex(0);
		iq.setTotalCount(0);
		iq.setTotalPage(0);

		Invoice query = new Invoice();
		DecimalFormat d1 = new DecimalFormat("######0.00");
		for (int i = 0; i < list.size(); i++) {
			list.get(i).setPicObject(getPic(list.get(i)).getPicObject());
			list.get(i).setPic2Object(getPic(list.get(i)).getPic2Object());
			// 先set itemTotal到invoice中,需要分类型执行，先执行sql获取到itemTotal，再使用反射给field赋值
			// preSetItem(param,list.get(0).getId());
			ItemTotal it = new ItemTotal();
			System.out.println(list.get(i).getId() + ":" + list.get(i).getTotal());
			for (int j = 0; j < param.size(); j++) {
				if ((!param.get(j).equals("id")) && (!param.get(j).equals("createDate"))
						&& (!param.get(j).equals("pic")) && (!param.get(j).equals("client"))
						&& (!param.get(j).equals("total"))) {
					it.setType(list.get(i).getType());
					it.setInvoiceId(list.get(i).getId());
					it.setItemName(param.get(j));
					String itemTotal = setItemTotal(it);
					System.out.println("param:" + param.get(j) + ",:" + itemTotal);
					if (null==itemTotal ) {
						itemTotal = "0";
					}
					list.get(i);
					StringBuffer sf = new StringBuffer(param.get(j));
					String str = sf.substring(0, 1).toUpperCase() + sf.substring(1);
					Method set = Invoice.class.getDeclaredMethod("set" + str, String.class);
					Method get = Invoice.class.getDeclaredMethod("get" + str);
//					set.invoke(list.get(i), itemTotal);
					//本次该列数据
					String param1="0";
					if(null!=get.invoke(list.get(i))||"0"==get.invoke(list.get(i))){
						param1=(String) get.invoke(list.get(i));
					}
					//原本该列数据
					String param2="0";
					if(null!=get.invoke(total)||"0"==get.invoke(total)){
						param2=(String) get.invoke(total);
					}
					
					set.invoke(total, String.valueOf(Double.valueOf(param2)+ Double.valueOf(param1)));
				} else if (param.get(j).equals("total")) {
					total.setTotal(
							String.valueOf(Double.valueOf(total.getTotal()) + Double.valueOf(list.get(i).getTotal())));
				}
			}
			row = sheet.createRow((int) i + 1);
			// Student stu = (Student) list.get(i);
			Invoice in = (Invoice) list.get(i);
			// 第四步，创建单元格，并设置值
			query.setPic(in.getPic());
			query.setPic2(in.getPic2());
			query.setId(in.getId());

			for (int j = 0; j < param.size(); j++) {
				// 利用反射给格子赋值
				Field field = Invoice.class.getDeclaredField(param.get(j));
				field.setAccessible(true);
				StringBuffer sf = new StringBuffer(param.get(j));
				String str = sf.substring(0, 1).toUpperCase() + sf.substring(1);
				Method get = Invoice.class.getDeclaredMethod("get" + str);
				if (param.get(j).equals("pic")) {
					if (null == in.getPic2Object()) {
						row.createCell(j).setCellValue(in.getPicObject().getRealName());
					} else {
						row.createCell(j)
								.setCellValue(in.getPicObject().getRealName() + "," + in.getPic2Object().getRealName());
					}
				} else if (param.get(j).equals("client")) {
					row.createCell(j).setCellValue(in.getClientObject().getCompanyName());
				} else if (param.get(j).equals("AmountpayblewithGST")) {
					row.createCell(j).setCellValue(d1.format(Double.valueOf(in.getTotal()) * 1.07));
				} else if (param.get(j).equals("id")) {
					row.createCell(j).setCellValue(in.getType() + in.getId());
				} else if (param.get(j).equals("createDate")) {
					row.createCell(j).setCellValue(in.getCreateDate());
				}else {
					if(null!=get.invoke(in)){
						row.createCell(j).setCellValue(d1.format(Double.valueOf(String.valueOf(get.invoke(in)))));
					}else{
						row.createCell(j).setCellValue(d1.format(0d));
					}
					
				}
			}

		}
		// 最后一行写入各列总数
		row = sheet.createRow(list.size() + 1);
		for (int i = 0; i < param.size(); i++) {
			StringBuffer sf = new StringBuffer(param.get(i));
			String str = sf.substring(0, 1).toUpperCase() + sf.substring(1);
			Method get = Invoice.class.getDeclaredMethod("get" + str);
			if ((!param.get(i).equals("createDate")) && (!param.get(i).equals("pic"))
					&& (!param.get(i).equals("client"))) {
				System.out.println(param.get(i));
				if (param.get(i).equals("id")) {
					row.createCell(i).setCellValue("Total");
				} else if (param.get(i).equals("AmountpayblewithGST")) {
					row.createCell(i).setCellValue(d1.format(Double.valueOf(total.getTotal()) * 1.07));
				} else {
					row.createCell(i).setCellValue(d1.format(Double.valueOf(String.valueOf(get.invoke(total)))));
				}
			} else {
				row.createCell(i).setCellValue("");
			}
		}
		// 第二种--------------------------------------------------
		// 获取网站部署路径(通过ServletContext对象)，用于确定下载文件位置，从而实现下载

		// 第一种---------------------------------------
		// System.out.println(filePath);
		// 第六步，将文件存到指定位置
		// 本地测试
		// String
		// uploadFilePath="http://localhost:8080/mci/upload/"+iq.getFileName()+".xls";
		// String
		// save="D:\\workplace10\\mci\\WebRoot\\upload\\"+iq.getFileName()+".xls";
		// 服务器使用
		String uploadFilePath = SystemConstant.get_excel_dir + iq.getFileName() + ".xls";
		String save = SystemConstant.save_excel_dir + iq.getFileName() + ".xls";
		try {
			FileOutputStream fout = new FileOutputStream(save);
			// 将文件存到tomcat目录下
			System.out.println(uploadFilePath);
			wb.write(fout);
			fout.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 将文件下载到本地指定位置-------------------------------------------------------
		// URL url=new URL(uploadFilePath);
		//
		// URLConnection connection = url.openConnection();
		// InputStream in = connection.getInputStream();
		// FileOutputStream os = new FileOutputStream("C:\\Documents and
		// Settings\\Administrator\\Desktop\\invoice.xls");
		// byte[] buffer = new byte[4 * 1024];
		// int read;
		// while ((read = in.read(buffer)) > 0) {
		// os.write(buffer, 0, read);
		// }
		// os.close();
		// in.close();

		return uploadFilePath;
	}

	@Override
	public String setItemTotal(ItemTotal it) {
		if (it.getType().equals("F")) {
			return invoiceMapper.setItemTotalF(it);
		} else if (it.getType().equals("C")) {
			return invoiceMapper.setItemTotalC(it);
		} else if (it.getType().equals("T")) {
			return invoiceMapper.setItemTotalT(it);
		} else {
			return null;
		}
	}

	@Override
	public void preSetItem(List<String> list, String invoiceId) {
		ItemTotal it = new ItemTotal();
		it.setInvoiceId(invoiceId);
		for (int i = 0; i < list.size(); i++) {
			it.setItemName(list.get(i));
			setItemTotal(it);
		}

	}

	// @Override
	// public List<Map<String, Object>> moneytable(String id,String[]
	// columnName, String fileName) {
	// String sqlFiled = "";
	// for (String name : columnName) {
	// sqlFiled += name+",";
	// }
	// sqlFiled = sqlFiled.substring(0,sqlFiled.length()-1);
	// List<Obj> ojb =invoi .load(sqlFiled);
	//
	// List<Map<String,Object>> listmap = new
	// Map new obj
	// map.put("sheetName", fileName);
	// listmap.add(map);
	// fore(ojb){
	//
	// Map map = new
	// fore(columnName){
	// if(ojb.getC1()!=null){
	// map.push("c1",obj.getC1());
	// }
	// if(ojb.getC2()!=null){
	// map.push("c2",obj.getC2());
	// }
	// }
	// listmap.add(map);
	// }
	// return listmap;
	// }

}
