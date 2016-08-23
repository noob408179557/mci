package mci.main.invoice.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mci.base.util.ExcelExport;
import mci.main.client.pojo.Client;
import mci.main.client.pojo.ClientQuery;
import mci.main.client.pojo.ContactPerson;
import mci.main.client.service.ClientService;
import mci.main.invoice.pojo.Any;
import mci.main.invoice.pojo.Cheque;
import mci.main.invoice.pojo.Invoice;
import mci.main.invoice.pojo.InvoiceDetail;
import mci.main.invoice.pojo.InvoiceHistory;
import mci.main.invoice.pojo.InvoiceKey;
import mci.main.invoice.pojo.InvoiceQuery;
import mci.main.invoice.pojo.ItemC;
import mci.main.invoice.pojo.ItemF;
import mci.main.invoice.pojo.ItemP;
import mci.main.invoice.pojo.ItemT;
import mci.main.invoice.pojo.PayHistory;
import mci.main.invoice.pojo.WorkerC;
import mci.main.invoice.service.InvoiceService;
import mci.main.system.SystemConstant;
import mci.main.user.pojo.User;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.lowagie.text.pdf.BaseFont;

@Controller
public class InvoiceController {
	@Autowired
	private InvoiceService invoiceServiceImpl;
	@Autowired
	private ClientService clientServiceImpl;
	
	@ResponseBody
	@RequestMapping(value = "deleteXls", method = RequestMethod.POST)
	public String deleteXls(){
		System.gc();
		try{
			File file=new File(SystemConstant.save_excel_dir);
			File[] list =file.listFiles();
			for(int i=0;i<list.length;i++){
				System.out.println("file_dir:"+list[i].getAbsoluteFile().getAbsolutePath());
			if(list[i].exists()){
				System.out.println("file.exists("+list[i].getAbsoluteFile().getAbsolutePath()+")");
				list[i].delete();	
			}
			}
			return "0";
		}catch(Exception e){
			e.printStackTrace();
			return "1";

		}
	}
	@ResponseBody
	@RequestMapping(value = "printInvoice", method = RequestMethod.POST)
	public String printInvoice(InvoiceQuery iq,HttpSession session,HttpServletRequest request, HttpServletResponse response) throws Exception{
//		JSONObject arr=JSONObject.fromObject(param);
//		for(int i=1;i<arr.size();i++){
//			System.out.println(arr.get(i));
//		}
		List<String> param=iq.getParam();
//      JSONObject obj=new JSONObject();
//      String[] param=iq.getParam();
//		iq.setPageIndex(param[0]);
//		
//		for(int i=1;i<param.length;i++)
//		{
//			 System.out.println(param[i]);
//		}
		User user = (User) session.getAttribute("user");
		iq.setPic(user.getId());
		iq.setUtype(user.getType());
		String path=invoiceServiceImpl.print(iq,session,request,response);
		return path;
	}
	@ResponseBody
	@RequestMapping(value = "getPayHistory", method = RequestMethod.POST)
	public List<PayHistory> getPayHistory(HttpSession session){
		Invoice in = (Invoice) session.getAttribute("editInvoiceId");
		return invoiceServiceImpl.getPayHistory(in);
	}
	
	@ResponseBody
	@RequestMapping(value = "caculateTItem", method = RequestMethod.POST)
	public String caculateTItem(ItemT t){
		//获取到item所属的worker的id
		return invoiceServiceImpl.getWorkerTHours(t);
	}
	
	@ResponseBody
	@RequestMapping(value = "clearInvoice", method = RequestMethod.POST)
	public String clearInvoice(){
		try{
			invoiceServiceImpl.clearInvoice();
			return "0";
		}catch(Exception e){
			e.printStackTrace();
			return "1";
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "addPayHistory", method = RequestMethod.POST)
    public String addPayHistory(PayHistory ph){
		try{
			return "0";
		}catch(Exception e){
			e.printStackTrace();
			return "1";
		}
	}
	// 将invoiceDetail存入session中
	@ResponseBody
	@RequestMapping(value = "getAnotherPIC", method = RequestMethod.POST)
	public List<User> getAnotherPIC(HttpSession session) {
		Invoice in = (Invoice) session.getAttribute("editInvoiceId");
		List<User> list = autoClientList();
		for (int i = 0; i < list.size(); i++) {
			if (in.getPic().equals(list.get(i).getId())) {
				list.remove(i);
				if(i!=0){
					i--;	
				}
			}
			if (list.get(i).getType().equals("2")) {
				list.remove(i);
				if(i!=0){
					i--;	
				}
			}
		}
		return list;
	}

	// 获取当前登录的user全部信息
	@ResponseBody
	@RequestMapping(value = "getCurrentUser", method = RequestMethod.POST)
	public User getCurrUser(HttpSession session) {
		User user = (User) session.getAttribute("user");
		return user;
	}

	// 列表显示pic
	@ResponseBody
	@RequestMapping(value = "getPic", method = RequestMethod.POST)
	public Invoice getPic(Invoice invoice) {
		return invoiceServiceImpl.getPic(invoice);
	}

	@ResponseBody
	@RequestMapping(value = "setInvoiceLimit", method = RequestMethod.POST)
	public String setInvoiceLimit(Invoice invoice, HttpSession session) {
		try {
			session.removeAttribute("invoiceLimit");
			session.setAttribute("invoiceLimit", invoice);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "getInvoiceLimit", method = RequestMethod.POST)
	public Invoice getInvoiceLimit(HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("invoiceLimit");
		return invoice;
	}

	@ResponseBody
	@RequestMapping(value = "saveInvoiceDetail", method = RequestMethod.POST)
	public String saveInvoiceDetail(InvoiceDetail id, HttpSession session) {
		try {
			session.removeAttribute("InvoiceDetail");
			session.setAttribute("InvoiceDetail", id);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	//
//	@ResponseBody
//	@RequestMapping(value = "printInvoice", method = RequestMethod.POST)
//	public String printInvoice(InvoiceDetail id) {
//		try {
//			String outputFile = "D:/" + id.getId() + ".pdf";
//			OutputStream os = new FileOutputStream(outputFile);
//			ITextRenderer renderer = new ITextRenderer();
//			ITextFontResolver fontResolver = renderer.getFontResolver();
//			fontResolver.addFont("C:/Windows/fonts/simsun.ttc",
//					BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
//			StringBuffer html = new StringBuffer();
//			// DOCTYPE 必需写否则类似于 这样的字符解析会出现错误
//			html.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
//			html.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
//			html.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">")
//					.append("<head>")
//					.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />")
//					.append("</head>").append("<body>");
//			html.append(id.getText());
//			html.append("</body></html>");
//			System.out.println(html.toString());
//			renderer.setDocumentFromString(html.toString());
//			// 解决图片的相对路径问题
//			// renderer.getSharedContext().setBaseURL("file:/F:/teste/html/");
//			renderer.layout();
//			renderer.createPDF(os);
//			os.close();
//
//			return "0";
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "1";
//		}
//	}

	// 创建pdf文件
	@ResponseBody
	@RequestMapping(value = "createPDF", method = RequestMethod.POST)
	public String createPDF(String body) {
		try {
			String outputFile = "D:/test.pdf";
			OutputStream os = new FileOutputStream(outputFile);
			ITextRenderer renderer = new ITextRenderer();
			ITextFontResolver fontResolver = renderer.getFontResolver();
			fontResolver.addFont("C:/Windows/fonts/simsun.ttc",
					BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			StringBuffer html = new StringBuffer();
			// DOCTYPE 必需写否则类似于 这样的字符解析会出现错误
			html.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
			html.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
			html.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">")
					.append("<head>")
					.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />")
					.append("<style type=\"text/css\" mce_bogus=\"1\">body {font-family: SimSun;}</style>")
					.append("</head>")
					.append("<body><strong><span style=\"font-size: 20pt; \">欢迎使用</span></strong>");
			html.append("<div>支持中文！</div>");
			html.append("</body></html>");
			System.out.println(html.toString());
			renderer.setDocumentFromString(html.toString());
			// 解决图片的相对路径问题
			// renderer.getSharedContext().setBaseURL("file:/F:/teste/html/");
			renderer.layout();
			renderer.createPDF(os);
			os.close();

			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	// 获取指定invoice 下的Cp
	@ResponseBody
	@RequestMapping(value = "getCPOI", method = RequestMethod.POST)
	public ContactPerson getCPOI(Invoice in) {
		return invoiceServiceImpl.getCPOI(in);
	}

	// invoiceHistory部分
	// 将查询条件放session中
	@ResponseBody
	@RequestMapping(value = "getInvoiceHistory", method = RequestMethod.POST)
	public String getInvoiceHistory(InvoiceHistory ih, HttpSession session) {
		try {
			session.removeAttribute("invoiceHistory");
			session.setAttribute("invoiceHistory", ih);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	// cancel Client
	@ResponseBody
	@RequestMapping(value = "cancelInvoice", method = RequestMethod.POST)
	public String cancelInvoice(Invoice invoice) {
		// id为invoice id
		try {
			Invoice in1 = invoiceServiceImpl.getaInvoice(invoice);
			if ((in1.getState()).equals("1")) {
				invoiceServiceImpl.cancelInvoice(invoice);
			} else {
				return "2";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// confirm invoice
	@ResponseBody
	@RequestMapping(value = "confirmInvoice", method = RequestMethod.POST)
	public String confirmInvoice(Invoice invoice) {
		// id为invoice id
		try {
			Invoice in1 = invoiceServiceImpl.getaInvoice(invoice);
			if ((in1.getState()).equals("5")) {
				invoiceServiceImpl.confirmInvoice(invoice);
			} else {
				return "2";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";

	}

	// 获取clientHistory分页
	@ResponseBody
	@RequestMapping(value = "loadInvoiceHistory", method = RequestMethod.POST)
	// 参数ch为分页条件信息
	public List<InvoiceHistory> loadInvoiceHistory(InvoiceHistory ih,
			HttpSession session) {
		// 获取session中的原查询条件
		InvoiceHistory ih1 = (InvoiceHistory) session
				.getAttribute("invoiceHistory");
		System.out.println("ih.getPageIndex()：" + ih.getPageIndex());
		List<InvoiceHistory> list = invoiceServiceImpl.getInvoiceHistory(ih1);
		session.removeAttribute("invoiceHistoryResult");
		session.setAttribute("invoiceHistoryResult", list);
		ih.setStartIndex((ih.getPageIndex() - 1) * InvoiceHistory.getPageSize());
		if (list.size() > (ih.getStartIndex() + InvoiceHistory.getPageSize())) {
			list = list.subList(ih.getStartIndex(),
					(ih.getStartIndex() + InvoiceHistory.getPageSize()));
		} else {
			list = list.subList(ih.getStartIndex(), list.size());
		}

		return list;

	}

	// 获取clientHistory的总页数
	@ResponseBody
	@RequestMapping(value = "loadInvoiceHistoryCount", method = RequestMethod.POST)
	public int loadInvoiceHistoryCount(HttpSession session) {
		List<InvoiceHistory> list = invoiceServiceImpl
				.getInvoiceHistory((InvoiceHistory) (session
						.getAttribute("invoiceHistory")));
		int totalCount = list.size();
		int totalPage;
		if ((totalCount % InvoiceHistory.getPageSize()) == 0) {
			totalPage = totalCount / InvoiceHistory.getPageSize();
		} else {
			totalPage = totalCount / InvoiceHistory.getPageSize() + 1;
		}
		return totalPage;
	}

	@ResponseBody
	@RequestMapping(value = "updateInvoiceC", method = RequestMethod.POST)
	public String updateInvoiceC(Invoice invoice, HttpSession session) {
		try {
			Invoice in1 = (Invoice) (session.getAttribute("editInvoiceId"));
			in1.setResidual(invoice.getTotal());
			in1.setTotal(invoice.getTotal());
			in1.setType("C");
//			SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
//			Date date = new Date();
//			in1.setLastdate(format2.format(date));
			in1.setResidual(invoice.getTotal());
			//
//			SimpleDateFormat format1 = new SimpleDateFormat("dd-MM-yyyy");
//			Date create =format2.parse(in1.getCreateDate());
//			String create1 =format1.format(create);
//			in1.setCreateDate(create1);
			invoiceServiceImpl.updateInvoice(in1);

			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(in1.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 删除一个worker
	@ResponseBody
	@RequestMapping(value = "removeWorkerC", method = RequestMethod.POST)
	public String removeWorkerC(WorkerC worker) {
		try {
			invoiceServiceImpl.removeItemOfWorkerC(worker);
			invoiceServiceImpl.removeWorker(worker);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "removeItemC", method = RequestMethod.POST)
	public String removeItemC(ItemC item) {
		try {
			invoiceServiceImpl.removeItemC(item);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "commission", method = RequestMethod.POST)
	public Invoice commission(Invoice in, HttpSession session) {
		session.removeAttribute("cmInvoice");
		session.setAttribute("cmInvoice", in);
		return invoiceServiceImpl.commission(in);
	}

	@ResponseBody
	@RequestMapping(value = "getCommission", method = RequestMethod.POST)
	public String getCommission(Invoice invoice1,HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("cmInvoice");
		invoice1.setId(invoice.getId());
		try {
			//修改invoice的状态
			//invoiceServiceImpl.getCommission(invoice1);
			//将invoice的commission 存到表中
			invoiceServiceImpl.setCommission(invoice1);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}
	@ResponseBody
	@RequestMapping(value = "setCommission", method = RequestMethod.POST)
	public String setCommission(HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("cmInvoice");
		try {
			invoiceServiceImpl.setCommission(invoice);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "addItemC", method = RequestMethod.POST)
	public String addItemC(ItemC item, HttpSession session) {
		try {
			Invoice invoice = (Invoice) session.getAttribute("editInvoiceId");
			item.setInvoice(invoice.getId());
			invoiceServiceImpl.addItemC(item);
		} catch (Exception e) {
			e.printStackTrace();
			return "0";
		}
		return item.getId();
	}

	// add workerC
	@ResponseBody
	@RequestMapping(value = "addWorkerC", method = RequestMethod.POST)
	public String addWorkerC(HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("editInvoiceId");
		WorkerC worker = new WorkerC();
		worker.setInvoice(invoice.getId());
		System.out.println("invoice.getId():" + invoice.getId());
		try {
			invoiceServiceImpl.addWorkerC(worker);
		} catch (Exception e) {
			e.printStackTrace();
			return "0";
		}
		return worker.getId();
	}

	// create a Invoice
	@ResponseBody
	@RequestMapping(value = "addInvoice", method = RequestMethod.POST)
	public String addInvoice(Invoice in, HttpSession session) {
		try {
			Client client1=clientServiceImpl.getaClient(in.getClient());
			in.setTerm(client1.getTerm());
			User pic = (User) session.getAttribute("user");
			// System.out.println("pic.getId:"+pic.getId());
			System.out.println("转前invoice.getDate():" + in.getCreateDate());
			SimpleDateFormat format1 = new SimpleDateFormat("MM/dd/yyyy");
			SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
			in.setCreateDate(format2.format(format1.parse(in.getCreateDate())));
			System.out.println("转后invoice.getDate():" + in.getCreateDate());
			// 转换Date格式,从dd/mm/yyyy到yyyy-mm-dd
			// 没有登录此行会报空指针异常
			in.setPic(pic.getId());
			invoiceServiceImpl.addInvoice(in);
			in.setPicObject(pic);

			// 将之后需要的信息存到session中
			session.removeAttribute("editClient");
			// 获取contactperson的实体
			ContactPerson cp = invoiceServiceImpl.getaCP(in.getCp());
			in.setCpObject(cp);
			in.setState("1");
			// 获取client的实体
			Client client = invoiceServiceImpl.getClient(in.getClient());
			session.setAttribute("editClient", client);
			session.removeAttribute("editInvoiceId");
			session.setAttribute("editInvoiceId", in);
//			ClientController cc=new ClientController();
//		    cc.activeClient(client);
		} catch (NullPointerException a){
			a.printStackTrace();
			return "2";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// pay for Invoice in cash
	@ResponseBody
	@RequestMapping(value = "payForInvoice", method = RequestMethod.POST)
	public String payForInvoice(Any any, HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("editInvoice");
		double payment = Double.valueOf(any.getStr());
		double residual = Double.valueOf(invoice.getResidual());
		double residualNow = residual - payment;
		if (residualNow != Double.valueOf(invoice.getTotal())) {
			invoice.setState("3");
		}
		if (residualNow <= 0) {
			invoice.setState("4");
		}
		Double amount;
		if(null==invoice.getCashpayment()){
			amount=0d;
		}else{
			amount=Double.valueOf(invoice.getCashpayment());
		}
		invoice.setCashpayment(String.valueOf(amount+Double.valueOf(any.getStr())));
		try {
			invoice.setResidual(String.valueOf(residualNow));
			invoiceServiceImpl.updateInvoice(invoice);
			//添加payHistory
			PayHistory ph=new PayHistory();
			ph.setAmount(any.getStr());
			ph.setInvoice(invoice.getId());
			ph.setMode("cash");
			invoiceServiceImpl.addPayHistory(ph);
            //添加invoiceHistory
			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(invoice.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}

	}

	// pay for Invoice in credit notes
	@ResponseBody
	@RequestMapping(value = "payForInvoice2", method = RequestMethod.POST)
	public String payForInvoiceInCash(Any any, HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("editInvoice");
		double credit = Double.valueOf(any.getStr());
		double residual = Double.valueOf(invoice.getResidual());
		double residualNow = residual - credit;
		double creditNotes = Double.valueOf(invoice.getCreditNotes()) + credit;
		if (residualNow != Double.valueOf(invoice.getTotal())) {
			invoice.setState("3");
		}
		if (residualNow <= 0) {
			invoice.setState("4");
		}
		Double amount;
		if(null==invoice.getCreditnotespayment()){
			amount=0d;
		}else{
			amount=Double.valueOf(invoice.getCreditnotespayment());
		}
		invoice.setCreditnotespayment(String.valueOf(amount+Double.valueOf(any.getStr())));
		try {
			invoice.setCreditNotes(String.valueOf(creditNotes));
			invoice.setResidual(String.valueOf(residualNow));
			invoiceServiceImpl.updateInvoice(invoice);
			//添加payHistory
			PayHistory ph=new PayHistory();
			ph.setAmount(any.getStr());
			ph.setInvoice(invoice.getId());
			ph.setMode("creditNotes");
			invoiceServiceImpl.addPayHistory(ph); 
			//添加invoiceHistory
			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(invoice.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}

	}

	// pay for Invoice in cheque
	@ResponseBody
	@RequestMapping(value = "payForInvoice3", method = RequestMethod.POST)
	public String payForInvoiceInCheque(Cheque cq, HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("editInvoice");
		double amount = Double.valueOf(cq.getAmount());
		double residual = Double.valueOf(invoice.getResidual());
		double residualNow = residual - amount;
		if (residualNow != Double.valueOf(invoice.getTotal())) {
			invoice.setState("3");
		}
		if (residualNow <= 0) {
			invoice.setState("4");
		}
		Double amount1;
		//update invoice中的cheque
		if(null==invoice.getChequePayment()){
			amount1=0d;
		}else{
			amount1=Double.valueOf(invoice.getChequePayment());
		}
		invoice.setChequePayment(String.valueOf(amount1+Double.valueOf(cq.getAmount())));
		try {
			cq.setInvoice(invoice.getId());
			invoiceServiceImpl.createCheque(cq);
			invoice.setResidual(String.valueOf(residualNow));
			invoiceServiceImpl.updateInvoice(invoice);
			//添加payHistory
			PayHistory ph=new PayHistory();
			ph.setAmount(cq.getAmount());
			ph.setInvoice(invoice.getId());
			ph.setMode("cheque");
			ph.setBank(cq.getBank());
			ph.setNumber(cq.getNumber());
			invoiceServiceImpl.addPayHistory(ph); 
			
			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(invoice.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}

	}

	// Active Invoice
	@ResponseBody
	@RequestMapping(value = "activeInvoice", method = RequestMethod.POST)
	public String activeInvoice(Invoice invoice, HttpSession session) {
		try {
			Invoice in1 = invoiceServiceImpl.getaInvoice(invoice);
			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(in1.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
			if (in1.getTotal().length() == 0) {
				return "3";
			}
			// 当状态为created的时候才会激活
			if (in1.getState().equals("1")) {
				invoiceServiceImpl.activeInvoice(invoice);
			} else if (!in1.getState().equals("1")) {
				// 否则返回代码2，表示该invoice并不处于created状态
				return "2";
			}
		} catch (NullPointerException e) {
			e.printStackTrace();
			return "3";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 获取invoice C中的全部item
	@ResponseBody
	@RequestMapping(value = "loadInvoiceItemC", method = RequestMethod.POST)
	public List<ItemC> loadInvoiceItemC(Invoice invoice) {
		return invoiceServiceImpl.loadInvoiceItemC(invoice);
	}

	// 获取要付款的invoice
	@ResponseBody
	@RequestMapping(value = "getaInvoice", method = RequestMethod.POST)
	public Invoice getaInvoice(Invoice invoice, HttpSession session) {
		Invoice in = invoiceServiceImpl.getaInvoice(invoice);
		session.removeAttribute("editInvoice");
		session.setAttribute("editInvoice", in);
		return in;
	}

	// 修改 invoice----------------------------------------------
		@ResponseBody
		@RequestMapping(value = "editInvoice", method = RequestMethod.POST)
		public Invoice editInvoice(Invoice in, HttpSession session)
			throws ParseException {
		session.removeAttribute("editClient");
		// 先获取invoice及其关联表中内容
		in = invoiceServiceImpl.getaInvoice(in);
		Client client = invoiceServiceImpl.getClient(in.getClient());
		User pic = invoiceServiceImpl.getaPIC(in.getPic());
		session.setAttribute("editClient", client);
		session.removeAttribute("editInvoiceId");
		in.setPic(pic.getId());
		Invoice in1 = invoiceServiceImpl.getEditInvoice(in);
		ContactPerson cp = invoiceServiceImpl.getaCP(in1.getCp());
		in1.setRemark(in.getRemark());
		in1.setClient(client.getId());
		in1.setType(in.getType());
		in1.setCpObject(cp);
		in1.setPicObject(pic);
		session.setAttribute("editInvoiceId", in1);
		// 获取对应的invoice
		return in;
	}
	// 获取要编辑的Invoice中的Invoice信息
	@ResponseBody
	@RequestMapping(value = "getEditInvoice", method = RequestMethod.POST)
	public Invoice getEditInvoice(HttpSession session)  {
		Invoice in = (Invoice) session.getAttribute("editInvoiceId");
	    SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
	    String format=in.getCreateDate();
	    Invoice in1=null;
		try {
			in1 = (Invoice)in.clone();
			Date date=sdf.parse(format);
			SimpleDateFormat sdf1=new SimpleDateFormat("dd-MM-yyyy");
			in1.setCreateDate(sdf1.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}catch (CloneNotSupportedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return in1;
	}

	// 获取要编辑的Invoice中的Client信息
	@ResponseBody
	@RequestMapping(value = "getEditClient", method = RequestMethod.POST)
	public Client getEditClient(HttpSession session) {
		Client client = (Client) session.getAttribute("editClient");
		return client;
	}

	@ResponseBody
	@RequestMapping(value = "loadInvoice", method = RequestMethod.POST)
	public List<Invoice> loadInvoice(InvoiceQuery iq, HttpSession session) {
		session.removeAttribute("InvoiceQuery");
		User user = (User) session.getAttribute("user");
		iq.setPic(user.getId());
		iq.setUtype(user.getType());
		List<Invoice> list = invoiceServiceImpl.loadInvoice(iq);
		return list;
	}

	@ResponseBody
	@RequestMapping(value = "loadInvoiceCount", method = RequestMethod.POST)
	public int loadInvoiceCount(HttpSession session) {
		User user = (User) session.getAttribute("user");
		InvoiceQuery iq = new InvoiceQuery();
		iq.setPic(user.getId());
		iq.setUtype(user.getType());
		return invoiceServiceImpl.loadInvoiceCount(iq);
	}

	// 获取client的全部CP
	@ResponseBody
	@RequestMapping(value = "getCP", method = RequestMethod.POST)
	public List<ContactPerson> getCP(String id) {
		List<ContactPerson> list = invoiceServiceImpl.getCP(id);
		return list;
	}

	// --------------------invoiceF---------------------
	// 为Invoice中item添加外键
	@ResponseBody
	@RequestMapping(value = "addInvoicefFK", method = RequestMethod.POST)
	public String addInvoicefFK(HttpSession session, String id) {
		try {
			// id为item的id
			Invoice in = (Invoice) session.getAttribute("editInvoiceId");
			InvoiceKey ik = new InvoiceKey();
			ik.setInvoice(in.getId());
			ik.setItem(id);
			invoiceServiceImpl.addInvoicefFK(ik);

			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(in.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);

		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 直接返回刚插入的itemF的主键
	@ResponseBody
	@RequestMapping(value = "createItemF", method = RequestMethod.POST)
	public String createItemF() {
		return invoiceServiceImpl.createItemF();
	}

	// update Invoice
	@ResponseBody
	@RequestMapping(value = "updateItemF", method = RequestMethod.POST)
	public String updateItemF(ItemF item) {
		invoiceServiceImpl.updateItemF(item);
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "removeItemF", method = RequestMethod.POST)
	public String removeItemF(String id) {
		invoiceServiceImpl.removeItemF(id);
		return "0";
	}

	// 为invoice F添加remark
	@ResponseBody
	@RequestMapping(value = "addInvoiceRemark", method = RequestMethod.POST)
	public String addInvoiceRemark(Invoice in, HttpSession session) {
		try {
			String id = ((Invoice) (session.getAttribute("editInvoiceId")))
					.getId();
			in.setId(id);
			//
			invoiceServiceImpl.addInvoiceRemark(in);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// --------------------invoiceP---------------------
	@ResponseBody
	@RequestMapping(value = "createItemP", method = RequestMethod.POST)
	public String createItemP(ItemP item) {
		invoiceServiceImpl.createItemP(item);
		return item.getId();
	}

	@ResponseBody
	@RequestMapping(value = "updateItemP", method = RequestMethod.POST)
	public String updateItemP(ItemP item) throws ParseException {
		SimpleDateFormat format1 = new SimpleDateFormat("MM/dd/yyyy");
		SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
		item.setDate(format2.format(format1.parse(item.getDate())));
		invoiceServiceImpl.updateItemP(item);

		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "addInvoicepFK", method = RequestMethod.POST)
	public String createItemP(HttpSession session, String id) {
		try {
			// id为item的id
			// 取出session中要编辑的invoice
			Invoice in = (Invoice) session.getAttribute("editInvoiceId");
			InvoiceKey ik = new InvoiceKey();
			ik.setInvoice(in.getId());
			ik.setItem(id);
			// 为item添加外键
			invoiceServiceImpl.addInvoicepFK(ik);

			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(in.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 为invoice添加总价
	@ResponseBody
	@RequestMapping(value = "addInvoiceTotal", method = RequestMethod.POST)
	public String addInvoiceTotal(HttpSession session, String total) {
		try {
			Invoice in = (Invoice) session.getAttribute("editInvoiceId");
			in.setTotal(total);
			invoiceServiceImpl.addInvoiceTotal(in);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}
	
	
	@ResponseBody
	@RequestMapping(value = "updateInvoiceF", method = RequestMethod.POST)
	public String updateInvoiceF(HttpSession session, Invoice invoice) {
		try {
			Invoice in = (Invoice) session.getAttribute("editInvoiceId");
			invoice.setId(in.getId());
			invoice.setResidual(invoice.getTotal());
			//
			SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat format1 = new SimpleDateFormat("dd-MM-yyyy");
			Date create =format2.parse(in.getCreateDate());
			String create1 =format1.format(create);
			in.setCreateDate(create1);
			invoiceServiceImpl.updateInvoice(invoice);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// --------------------invoiceT---------------------

	// --------------------invoiceC---------------------
	@ResponseBody
	@RequestMapping(value = "updateItemC", method = RequestMethod.POST)
	public String updateItemC(ItemC item) {
		try {
			invoiceServiceImpl.updateItemC(item);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "updateWorkerC", method = RequestMethod.POST)
	public String updateWorkerC(WorkerC worker) {
		System.out
				.println("进入updateWorkerC-----------------------------------------------------");
		try {
			invoiceServiceImpl.updateWorkerC(worker);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// --------------------invoiceT---------------------
	@ResponseBody
	@RequestMapping(value = "addItemT", method = RequestMethod.POST)
	public String addItemT(ItemT item, HttpSession session) {
		try {
			Invoice invoice = (Invoice) session.getAttribute("editInvoiceId");
			item.setInvoice(invoice.getId());
			invoiceServiceImpl.addItemT(item);
		} catch (Exception e) {
			e.printStackTrace();
			return "0";
		}
		return item.getId();
	}

	@ResponseBody
	@RequestMapping(value = "addWorkerT", method = RequestMethod.POST)
	public String addWorkerT(HttpSession session) {
		Invoice invoice = (Invoice) session.getAttribute("editInvoiceId");
		WorkerC worker = new WorkerC();
		worker.setInvoice(invoice.getId());
		System.out.println("invoice.getId():" + invoice.getId());
		try {
			invoiceServiceImpl.addWorkerT(worker);
		} catch (Exception e) {
			e.printStackTrace();
			return "0";
		}
		return worker.getId();
	}

	@ResponseBody
	@RequestMapping(value = "removeWorkerT", method = RequestMethod.POST)
	public String removeWorkerT(WorkerC worker) {
		try {
			invoiceServiceImpl.removeItemOfWorkerT(worker);
			invoiceServiceImpl.removeWorker(worker);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "removeItemT", method = RequestMethod.POST)
	public String removeItemT(ItemT item) {
		try {
			invoiceServiceImpl.removeItemT(item);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "updateInvoiceT", method = RequestMethod.POST)
	public String updateInvoiceT(Invoice invoice, HttpSession session) {
		try {
			Invoice in1 = (Invoice) (session.getAttribute("editInvoiceId"));
			in1.setResidual(invoice.getTotal());
			in1.setTotal(invoice.getTotal());
			SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
			Date date = new Date();
			in1.setLastdate(format2.format(date));
			in1.setResidual(invoice.getTotal());
			//
			SimpleDateFormat format1 = new SimpleDateFormat("dd-MM-yyyy");
			Date create =format2.parse(in1.getCreateDate());
			String create1 =format1.format(create);
			in1.setCreateDate(create1);
			invoiceServiceImpl.updateInvoice(in1);

			InvoiceHistory ih = new InvoiceHistory();
			User user = (User) session.getAttribute("user");
			ih.setInvoice(in1.getId());
			ih.setUser(user.getId());
			invoiceServiceImpl.addInvoiceHistory(ih);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "updateItemT", method = RequestMethod.POST)
	public String updateItemT(ItemT item) {
		try {
			invoiceServiceImpl.updateItemT(item);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "updateWorkerT", method = RequestMethod.POST)
	public String updateWorkerT(WorkerC worker) {
		System.out
				.println("进入updateWorkerC-----------------------------------------------------");
		try {
			invoiceServiceImpl.updateWorkerT(worker);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	

	// 获取invoice C下的所有worker
	@ResponseBody
	@RequestMapping(value = "getEditWorkersC", method = RequestMethod.POST)
	public List<WorkerC> getEditWorkersC(HttpSession session) {
		String invoiceid = ((Invoice) session.getAttribute("editInvoiceId"))
				.getId();
		List<WorkerC> list = invoiceServiceImpl.getEditWorkersC(invoiceid);
		return list;
	}

	// 获取workerC 下的所有item
	@ResponseBody
	@RequestMapping(value = "getEditItemC", method = RequestMethod.POST)
	public List<ItemC> getEditItemC(Any a) {
		String str = a.getStr();
		List<ItemC> list = invoiceServiceImpl.getEditItemC(str);
		return list;
	}

	// 获取invoice T下的所有worker
	@ResponseBody
	@RequestMapping(value = "getEditWorkersT", method = RequestMethod.POST)
	public List<WorkerC> getEditWorkersT(HttpSession session) {
		String invoiceid = ((Invoice) session.getAttribute("editInvoiceId"))
				.getId();
		List<WorkerC> list = invoiceServiceImpl.getEditWorkersT(invoiceid);
		return list;
	}

	// 获取invoice T下的所有item
	@ResponseBody
	@RequestMapping(value = "getEditItemT", method = RequestMethod.POST)
	public List<ItemT> getEditItemT(String id) {
		return invoiceServiceImpl.getEditItemT(id);
	}

	// 获取invoice F 下的所有item
	@ResponseBody
	@RequestMapping(value = "getEditItemF", method = RequestMethod.POST)
	public List<ItemF> getEditItemF(HttpSession session) {
		String invoiceid = ((Invoice) session.getAttribute("editInvoiceId"))
				.getId();
		List<ItemF> list = invoiceServiceImpl.getEditItemF(invoiceid);
		return list;
	}

	// 获取invoice P 下的所有item
	@ResponseBody
	@RequestMapping(value = "getEditItemP", method = RequestMethod.POST)
	public List<ItemP> getEditItemP(HttpSession session) {
		String invoiceid = ((Invoice) session.getAttribute("editInvoiceId"))
				.getId();
		List<ItemP> list = invoiceServiceImpl.getEditItemP(invoiceid);

		SimpleDateFormat format2 = new SimpleDateFormat("MM/dd/yyyy");
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
		for (int i = 0; i < list.size(); i++) {
			try {
				list.get(i).setDate(
						format2.format(format1.parse(list.get(i).getDate())));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return list;
	}

	// 删除p的item
	@ResponseBody
	@RequestMapping(value = "removeItemP", method = RequestMethod.POST)
	public String removeItemP(String invoiceid) {
		try {
			invoiceServiceImpl.removeItemP(invoiceid);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 删除一个invoice
	@ResponseBody
	@RequestMapping(value = "deleteInvoice", method = RequestMethod.POST)
	public String deleteInvoice(Invoice in1) {
		try {
			Invoice in = invoiceServiceImpl.getaInvoice(in1);
			// 分类型进行删除其下的worker 和item表中数据
			if (in.getType().equals("T")) {
				System.out.println("进入T");
				List<WorkerC> listT = invoiceServiceImpl
						.getEditWorkersT(in.getId());
				for (int i = 0; i < listT.size(); i++) {
					// 删除所有item
					invoiceServiceImpl.removeItemOfWorkerT(listT.get(i));
					// 删除worker
					invoiceServiceImpl.removeWorker(listT.get(i));
				}
				// 删除invoice
				invoiceServiceImpl.deleteInvoice(in.getId());
			} else if (in.getType().equals("C")) {
				System.out.println("进入C");
				List<WorkerC> listC = invoiceServiceImpl
						.getEditWorkersC(in.getId());
				for (int i = 0; i < listC.size(); i++) {
					invoiceServiceImpl.removeItemOfWorkerC(listC.get(i));
					invoiceServiceImpl.removeWorker(listC.get(i));
				}
				invoiceServiceImpl.deleteInvoice(in.getId());
			} else if (in.getType().equals("F")) {
				System.out.println("进入F");
				invoiceServiceImpl.removeItemFOfInvoice(in.getId());
				invoiceServiceImpl.deleteInvoice(in.getId());
			} else if (in.getType().equals("P")) {
				System.out.println("进入P");
				invoiceServiceImpl.removeItemPOfInvoice(in.getId());
				invoiceServiceImpl.deleteInvoice(in.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 查询invoice
	@ResponseBody
	@RequestMapping(value = "autoConsultantList", method = RequestMethod.POST)
	// 自动补全invoice
	public List<User> autoClientList() {
		return invoiceServiceImpl.autoConsultantList();
	}

	@ResponseBody
	@RequestMapping(value = "searchInvoice", method = RequestMethod.POST)
	public String searchInvoice(Invoice invoice, HttpSession session) {
		try {
			User user = (User) session.getAttribute("user");
			invoice.setUtype(user.getType());
			invoice.setUpic(user.getId());
			SimpleDateFormat format1 = new SimpleDateFormat("MM/dd/yyyy");
			SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
			if (null != invoice.getStartDate() && invoice.getStartDate() != "") {
				invoice.setStartDate(format2.format(format1.parse(invoice
						.getStartDate())));
			}
			if (null != invoice.getEndDate() && invoice.getEndDate() != "") {
				invoice.setEndDate(format2.format(format1.parse(invoice
						.getEndDate())));
			}
			List<Invoice> list = invoiceServiceImpl.searchInvoice(invoice);
			session.removeAttribute("InvoiceQuery");
			session.setAttribute("InvoiceQuery", invoice);
			session.removeAttribute("invoiceResult");
			session.setAttribute("invoiceResult", list);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 分页显示Invoice的查询结果
	@ResponseBody
	@RequestMapping(value = "loadInvoiceResult", method = RequestMethod.POST)
	public List<Invoice> loadInvoiceResult(ClientQuery cq, HttpSession session) {
		// 获取session中的查询条件
		Invoice invoice = (Invoice) session.getAttribute("InvoiceQuery");
		List<Invoice> list = invoiceServiceImpl.searchInvoice(invoice);
		session.removeAttribute("invoiceResult");
		session.setAttribute("invoiceResult", list);
		cq.setStartIndex((cq.getPageIndex() - 1) * ClientQuery.getPageSize());
		if (list.size() > (cq.getStartIndex() + ClientQuery.getPageSize())) {
			list = list.subList(cq.getStartIndex(), cq.getStartIndex()
					+ InvoiceQuery.getPageSize());
		} else {
			list = list.subList(cq.getStartIndex(), list.size());
		}
		return list;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "loadInvoiceResultCount", method = RequestMethod.POST)
	public int loadInvoiceResultCount(HttpSession session) {
		List<Invoice> list = (List<Invoice>) (session
				.getAttribute("invoiceResult"));
		int totalCount = list.size();
		int totalPage;
		if ((totalCount % ClientQuery.getPageSize()) == 0) {
			totalPage = totalCount / ClientQuery.getPageSize();
		} else {
			totalPage = totalCount / ClientQuery.getPageSize() + 1;
		}
		return totalPage;
	}
	
	
	
	
	
	
	@RequestMapping("downmoney")
	public String downmoney(String id,String[] columnName,HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String fileName = "缴费表格";
		String[] columnNames = columnName;// 列名
		String[] keys = columnName;// map中的key
		ExcelExport.excelExport( request, response,
				invoiceServiceImpl.moneytable(id,columnName,fileName),
				columnNames, keys, fileName);
		HSSFWorkbook hs=new HSSFWorkbook();
		return null;
	}
	
}