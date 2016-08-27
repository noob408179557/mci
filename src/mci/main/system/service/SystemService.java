package mci.main.system.service;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.MimeMessage;

import mci.main.client.pojo.Client;

public interface SystemService {
	
    
	boolean sendEmailToAdmin() throws MessagingException;
	
	MimeMessage createEmail(Session session,String content,String address) throws AddressException, MessagingException;
}
