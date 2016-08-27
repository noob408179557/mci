package mci.main.system.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import mci.main.user.pojo.User;

@Repository
public interface SystemMapper {
 
	List<User> getAllAdmin();
}
