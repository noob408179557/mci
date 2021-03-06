package mci.main.system.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mci.main.client.mapper.ClientMapper;
import mci.main.client.pojo.Client;
import mci.main.invoice.mapper.InvoiceMapper;
import mci.main.invoice.pojo.Invoice;
import mci.main.system.mapper.SystemMapper;
import mci.main.system.pojo.UserInfo;
import mci.main.system.service.SystemService;
import mci.main.user.mapper.UserMapper;
import mci.main.user.pojo.User;

@Service
public class SystemServiceImpl implements SystemService {

	@Autowired
	private SystemMapper systemMapper;
	
	@Autowired
	private ClientMapper clientMapper;
	
	@Autowired
	private InvoiceMapper invoiceMapper;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private Properties prop = new Properties();
	
    private Set<String> idSet=new HashSet<String>();
	
	private static Transport ts;
	
	
	@Override
	public boolean sendEmailToAdmin() throws MessagingException {
		Client client=clientMapper.getLastClient();
		if(idSet.contains(client.getId())){
			return false;
		}else{
			idSet.add(client.getId());
		}
		List<User> list = systemMapper.getAllAdmin();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss");
		String content="A new client  created at "+format.format(new Date())+",Information is id:"+client.getId();
		if(client.getCompanyName()!=null){
			content=content.concat(",companyname:"+client.getCompanyName());
		}
		if(client.getWebSite()!=null){
			content=content.concat(",website:"+client.getWebSite());
		}
		if(client.getDays()!=null){
			content=content.concat(",work days/hours:"+client.getDays());
		}
		if(client.getSize()!=null){
			content=content.concat(",size:"+client.getSize());
		}
		for (User user : list) {
          Message message=createEmail(content,user.getEmail());
            // 5、发送邮件
          sendEmail(message);
		}

		return false;
	}
    
	public  void sendEmail(Message message) throws MessagingException{
		ts.sendMessage(message, message.getAllRecipients());
		ts.close();
	}
	public Message createEmail(String content, String address)
			throws AddressException, MessagingException {
		
		prop.setProperty("mail.host", "smtp.163.com");
		prop.setProperty("mail.transport.protocol", "smtp");
		prop.setProperty("mail.smtp.auth", "true");
		prop.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		prop.setProperty("mail.smtp.port", "465");
		prop.setProperty("mail.smtp.socketFactory.port", "465");
		// 使用JavaMail发送邮件的5个步骤
		// 1、创建session
	     Session session = Session.getInstance(prop);
		// 开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
		session.setDebug(true);
		// 2、通过session得到transport对象
		 ts = session.getTransport();
		// 3、使用邮箱的用户名和密码连上邮件服务器，发送邮件时，发件人需要提交邮箱的用户名和密码给smtp服务器，用户名和密码都通过验证之后才能够正常发送邮件给收件人。
		// connect第三个参数为授权码
		ts.connect("smtp.163.com", "13262908892@163.com", "hehe123456");
		
		// 创建邮件对象
		Message message = new MimeMessage(session);
		// 指明邮件的发件人
		message.setFrom(new InternetAddress("13262908892@163.com"));
		// 指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
		// message.setRecipient(Message.RecipientType.TO, new
		// InternetAddress("13262908892@163.com"));
		message.setRecipient(Message.RecipientType.TO, new InternetAddress(address));
		// 邮件的标题
		message.setSubject("Notification!");
		// 邮件的文本内容
		message.setText(content);
		// 返回创建好的邮件对象
		return message;
	}

	@Override
	public boolean sendCustomMail(String content, String id) throws MessagingException {
		Client client=clientMapper.getaClient(id);
		Invoice invoice=new Invoice();
		invoice.setId(id);
		invoice=invoiceMapper.getaInvoiceAll(invoice);
		List<String > list=new ArrayList<String>();
		if(userMapper.getaUser(invoice.getPic()).getEmail().contains("@")){
			list.add(userMapper.getaUser(invoice.getPic()).getEmail());
		}
		if(invoice.getPic2()!=null&&userMapper.getaUser(invoice.getPic2()).getEmail().contains("@")){
			list.add(userMapper.getaUser(invoice.getPic2()).getEmail());
		}
        for(String address:list){
//        	try{
        	Message message=createEmail(content,address);
        	message.setSubject("An invoice is activated!");
        	sendEmail(message);
//        	}catch(com.sun.mail.smtp.SMTPAddressFailedException e){
//        		return false;
//        	}
        }
		return false;
	}

	@Override
	public UserInfo getUserInfo(User user) {
		  UserInfo ui1=invoiceMapper.getUserInfo(user);
          UserInfo ui2=invoiceMapper.getUserCommission(user);
          UserInfo ui3=invoiceMapper.getUserCommissionPlus(user);
          UserInfo clientQty=invoiceMapper.getClientQty(user);
          if(null==ui2){
        	  ui2=new UserInfo();
          }
          if(null==ui3){
        	  ui3=new UserInfo();
          }
          ui1.setClientQty(clientQty.getClientQty());
          ui1.setCommission(String.valueOf(Double.valueOf(ui2.getCommission())+(Double.valueOf(ui3.getCommission()))));
		return ui1;
	}

	@Override
	public UserInfo getUserInfo4Admin(User user) {
		
		return invoiceMapper.getUserInfo4Admin(user);
	}

	
}
