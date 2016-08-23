package mci.main.user.service.impl;

import java.util.List;

import mci.main.user.mapper.UserMapper;
import mci.main.user.pojo.User;
import mci.main.user.pojo.UserQuery;
import mci.main.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	@Override
	public User login(String email, String password) {
		return userMapper.login(email, password);
	}

	@Override
	public void createUser(User user) {
        userMapper.createUser(user);
	}

	@Override
	public List<User> getUserList(UserQuery uq) {
		return userMapper.getUserList(uq);
	}

	@Override
	public int getUserPage(UserQuery uq) {
		int totalCount = userMapper.getUserPage(uq);
		int totalPage;
		if ((totalCount % UserQuery.getPageSize()) == 0) {
			totalPage = totalCount / UserQuery.getPageSize();
		} else {
			totalPage = totalCount / UserQuery.getPageSize() + 1;
		}
		return totalPage;
	}
	@Override
	public int getUserPage1(UserQuery uq) {
		int totalCount = userMapper.getUserPage1(uq);
		int totalPage;
		if ((totalCount % UserQuery.getPageSize()) == 0) {
			totalPage = totalCount / UserQuery.getPageSize();
		} else {
			totalPage = totalCount / UserQuery.getPageSize() + 1;
		}
		return totalPage;
	}

	@Override
	public User getaUser(String userid) {
		return userMapper.getaUser(userid);
	}

	@Override
	public void updateUser(User user) {
        userMapper.updateUser(user);
		
	}

	@Override
	public void blockUser(User user) {
        userMapper.blockUser(user);
		
	}

	@Override
	public void activeUser(User user) {
        userMapper.activeUser(user);
		
	}

	@Override
	public void resetPassword(String userid) {
       userMapper.resetPassword(userid);
		
	}

	@Override
	public List<User> getUserList2(UserQuery uq) {
		return userMapper.getUserList2(uq);
	}

	@Override
	public List<User> getUsers() {
		return userMapper.getUsers();
	}

	


}
