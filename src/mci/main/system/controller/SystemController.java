package mci.main.system.controller;

import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import mci.main.invoice.pojo.Invoice;
import mci.main.invoice.service.InvoiceService;
import mci.main.system.pojo.UserInfo;
import mci.main.system.service.SystemService;
import mci.main.user.pojo.User;
import mci.main.user.service.UserService;

@Controller
public class SystemController {

	@Autowired
	private SystemService systemServiceImpl;
	
	@Autowired
	private InvoiceService invoiceServiceImpl;
	
	@Autowired
	private UserService userServiceImpl;
	
	@ResponseBody
	@RequestMapping(value = "sendEmailToAdmin", method = RequestMethod.POST)
	public boolean sendEmailToAdmin() throws MessagingException{
        
		return  systemServiceImpl.sendEmailToAdmin();
	}

	@ResponseBody
	@RequestMapping(value = "sendCustomMail", method = RequestMethod.POST)
	public String sendCustomMail(String content,String id) throws MessagingException{
		Invoice invoice=new Invoice();
		invoice.setId(id);
		invoice=invoiceServiceImpl.getaInvoice(invoice);
		if(!invoice.getState().equals("1")){
			return "1";
		}
		String mess="Invoice of number "+invoice.getType()+invoice.getNumber()+" is activated,active information :"+content;
		systemServiceImpl.sendCustomMail(mess,id);
		invoiceServiceImpl.activeInvoice(invoice);
		return  "0";
	}
	
	@ResponseBody
	@RequestMapping(value = "getUserInfo", method = RequestMethod.POST)
	public UserInfo getUserInfo(HttpSession session){
		User user=(User)session.getAttribute("user");
		if(user.getType().equals("1")){
			return systemServiceImpl.getUserInfo(user);
		}else{
			return systemServiceImpl.getUserInfo4Admin(user);
		}
		
	}
}
