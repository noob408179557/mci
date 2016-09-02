package mci.main.system.service;

import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.MimeMessage;

import org.apache.ibatis.annotations.Param;

import mci.main.client.pojo.Client;

public interface SystemService {
	
    
	boolean sendEmailToAdmin() throws MessagingException;
	
	
	boolean sendCustomMail(@Param("content")String content,@Param("id")String id) throws NoSuchProviderException, MessagingException;
}
