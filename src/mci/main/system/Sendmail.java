package mci.main.system;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Sendmail {
	public static void main(String[] args) throws Exception {
		         Properties prop = new Properties();
		         prop.setProperty("mail.host", "smtp.163.com");
		         prop.setProperty("mail.transport.protocol", "smtp");
		         prop.setProperty("mail.smtp.auth", "true");
		         prop.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		         prop.setProperty("mail.smtp.port", "465");
		         prop.setProperty("mail.smtp.socketFactory.port", "465");
		         //使用JavaMail发送邮件的5个步骤
		         //1、创建session
		         Session session = Session.getInstance(prop);
		         //开启Session的debug模式，这样就可以查看到程序发送Email的运行状态
		         session.setDebug(true);
	         //2、通过session得到transport对象
		         Transport ts = session.getTransport();
		         //3、使用邮箱的用户名和密码连上邮件服务器，发送邮件时，发件人需要提交邮箱的用户名和密码给smtp服务器，用户名和密码都通过验证之后才能够正常发送邮件给收件人。
		         //connect第三个参数为授权码
		         ts.connect("smtp.163.com", "13262908892@163.com", "ab197015");
		         //4、创建邮件
		         Message message = createClientMail(session,"");
		         //5、发送邮件
		         ts.sendMessage(message, message.getAllRecipients());
		         ts.close();
		     }
		     public static MimeMessage createClientMail(Session session,String email)
		             throws Exception {
		         //创建邮件对象
		         MimeMessage message = new MimeMessage(session);
		         //指明邮件的发件人
		         message.setFrom(new InternetAddress("13262908892@163.com"));
		         //指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
		         // message.setRecipient(Message.RecipientType.TO, new InternetAddress("13262908892@163.com"));
		         message.setRecipient(Message.RecipientType.TO, new InternetAddress("408179557@qq.com"));
		         //邮件的标题
		         message.setSubject("Notification of create new client!");
		         //邮件的文本内容
		         message.setContent("", "text/html;charset=UTF-8");
		        //返回创建好的邮件对象
		         return message;
}
}
