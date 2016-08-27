package mci.main.user.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import mci.main.client.pojo.ClientQuery;
import mci.main.user.pojo.User;
import mci.main.user.pojo.UserQuery;
import mci.main.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mysql.jdbc.exceptions.MySQLIntegrityConstraintViolationException;

@Controller
public class UserController {
	@Autowired
	private UserService userServiceImpl;

	@ResponseBody
	@RequestMapping(value = "activeUser", method = RequestMethod.POST)
	public String activeUser(User user){
		try{
			userServiceImpl.activeUser(user);
			return "0";
		}catch(Exception e){
			e.printStackTrace();
			return "1";
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "blockUser", method = RequestMethod.POST)
	public String blockUser(User user){
		try{
			userServiceImpl.blockUser(user);
			return "0";
		}catch(Exception e){
			e.printStackTrace();
			return "1";
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "resetPassword", method = RequestMethod.POST)
	public String resetPassword(String userid){
		try{
			userServiceImpl.resetPassword(userid);
			return "0";
		}catch(Exception e){
			e.printStackTrace();
			return "1";
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "saveUser", method = RequestMethod.POST)
	public String saveUser(User user, HttpSession session) {
		try {
			String userid = (String) session.getAttribute("editUserId");
			User old=userServiceImpl.getaUser(userid);
			user.setId(userid);
			user.setPassword(old.getPassword());
			userServiceImpl.updateUser(user);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "preEditUser", method = RequestMethod.POST)
	public String preEditUser(String id, HttpSession session) {
		try {
			session.removeAttribute("editUserId");
			session.setAttribute("editUserId", id);
			session.setMaxInactiveInterval(-1);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "getEditUser", method = RequestMethod.POST)
	public User getEditUser(HttpSession session) {
		String userid = (String) session.getAttribute("editUserId");
		User user = (User) userServiceImpl.getaUser(userid);
		return user;

	}

	@ResponseBody
	@RequestMapping(value = "loadUserPage", method = RequestMethod.POST)
	public int loadUserCount(HttpSession session) {
		UserQuery cq = (UserQuery) session.getAttribute("userQuery");
		return userServiceImpl.getUserPage(cq);
	}
	@ResponseBody
	@RequestMapping(value = "loadUserPage1", method = RequestMethod.POST)
	public int loadUserCount1(HttpSession session) {
		UserQuery cq = (UserQuery) session.getAttribute("userQuery1");
		return userServiceImpl.getUserPage1(cq);
	}

	@ResponseBody
	@RequestMapping(value = "getUserList", method = RequestMethod.POST)
	public List<User> loadUserList(UserQuery uq, HttpSession session) {

		uq.setStartIndex((uq.getPageIndex() - 1) * UserQuery.getPageSize());
		session.removeAttribute("userQuery");
		session.setAttribute("userQuery", uq);
		return userServiceImpl.getUserList(uq);
	}
	@ResponseBody
	@RequestMapping(value = "getUserList2", method = RequestMethod.POST)
	public List<User> loadUserList2(UserQuery uq, HttpSession session) {

		uq.setStartIndex((uq.getPageIndex() - 1) * UserQuery.getPageSize());
		session.removeAttribute("userQuery1");
		session.setAttribute("userQuery1", uq);
		return userServiceImpl.getUserList2(uq);
	}
	@ResponseBody
	@RequestMapping(value = "getLoginUser", method = RequestMethod.POST)
	public User getLoginUser(HttpSession session) {
		User user = (User) session.getAttribute("user");
		return user;
	}

	@ResponseBody
	@RequestMapping(value = "createUser", method = RequestMethod.POST)
	public String createUser(User user) {
		try {
			List<User> list=userServiceImpl.getUsers();
			for(User u1:list){
				if(u1.getEmail().equals(user.getEmail())){
					return "3";
				}
			}
			userServiceImpl.createUser(user);
			return "0";
		}catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "user_login", method = RequestMethod.POST)
	public User login(String email, String password, HttpSession session) {
		int i = 0;
		User user = null;
		try {
			List<User> list=userServiceImpl.getUsers();
			for(User us:list){
				if(us.getEmail().equals(email)&&us.getPassword().equals(password)){
					user=us;
				}
			}
			
			if (null == user) {
				// 如果找不到这个User
				user.setI("3");
			} else if (user.getState().equals("0")) {
				// 这个用户没有激活
				user.setI("2");
			} else {
				// 这个用户的状态不为0，即已激活
				// 将user对象添加到session中,并设置session不过期
				user.setI("1");
				session.removeAttribute("user");
				session.setAttribute("user", user);
				session.setMaxInactiveInterval(-1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			user = new User();
			user.setI("0");
			return user;
		}
		return user;
	}

	@ResponseBody
	@RequestMapping(value = "user_logout", method = RequestMethod.POST)
	public String logout(HttpSession session) {
		try {
			session.removeAttribute("user");
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}
}
