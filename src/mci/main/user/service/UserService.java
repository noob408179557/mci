package mci.main.user.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mci.main.client.pojo.Client;
import mci.main.invoice.pojo.Invoice;
import mci.main.user.pojo.User;
import mci.main.user.pojo.UserQuery;

public interface UserService {

	User login(String email, String password);

	void createUser(User user);
	
	List<User> getUserList(UserQuery uq);
	
	List<User> getUserList4admin(UserQuery uq);
	
	List<User> getUserList2(UserQuery uq);
	
	List<User> getUserList24admin(UserQuery uq);
	
	List<Invoice> getInvoiceOfUser(UserQuery uq);

	int getUserPage(UserQuery uq,User user);
	
	int getUserPage1(UserQuery uq,User user);

	User getaUser(@Param("userid")String userid);
	
	void updateUser(User user);

	void blockUser(User user);
	
	void activeUser(User user);
	
	void resetPassword(@Param("userid")String userid);
	
	List<User> getUsers();

	List<Invoice> getInvoiceOfUserCount(Client client);

}
