package mci.main.system.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import mci.main.invoice.pojo.Invoice;
import mci.main.invoice.service.InvoiceService;
import mci.main.system.service.SystemService;

@Controller
public class SystemController {

	@Autowired
	private SystemService systemServiceImpl;
	
	@Autowired
	private InvoiceService invoiceServiceImpl;
	
	@ResponseBody
	@RequestMapping(value = "sendEmailToAdmin", method = RequestMethod.POST)
	public boolean sendEmailToAdmin() throws MessagingException{
        
		return  systemServiceImpl.sendEmailToAdmin();
	}

	@ResponseBody
	@RequestMapping(value = "sendCustomMail", method = RequestMethod.POST)
	public boolean sendCustomMail(String content,String id) throws MessagingException{
		Invoice invoice=new Invoice();
		invoice.setId(id);
		invoice=invoiceServiceImpl.getaInvoice(invoice);
		if(!invoice.getState().equals("1")){
			return false;
		}
		invoiceServiceImpl.activeInvoice(invoice);
		return  systemServiceImpl.sendCustomMail(content,id);
	}
}
