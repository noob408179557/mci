package mci.main.user.mapper;

import java.util.List;

import mci.main.user.pojo.User;
import mci.main.user.pojo.UserQuery;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {

	User login(@Param("email")String email,@Param("password")String password);

	void createUser(User user);
	
	List<User> getUserList(UserQuery uq);
	
	List<User> getUserList2(UserQuery uq);
	
	int getUserPage(UserQuery uq);
	
	int getUserPage1(UserQuery uq);
	
	int getUserPage4admin(UserQuery uq);

	int getUserPage14admin(UserQuery uq);
	
	User getaUser(@Param("userid")String userid);
	
	void updateUser(User user);
	
	void blockUser(User user);
	
	void activeUser(User user);

	void resetPassword(@Param("userid")String userid);

	List<User> getUsers();
	
	List<User> getUserList4admin(UserQuery uq);
	
	List<User> getUserList24admin(UserQuery uq);
}
