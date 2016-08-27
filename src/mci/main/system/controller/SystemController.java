package mci.main.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import mci.main.system.service.SystemService;

@Controller
public class SystemController {

	@Autowired
	private SystemService systemService;
	
	
	@ResponseBody
	@RequestMapping(value = "sendEmailToAdmin", method = RequestMethod.POST)
	public boolean sendEmailToAdmin(){
      
		return true;
	}
}
