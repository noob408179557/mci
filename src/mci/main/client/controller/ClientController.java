package mci.main.client.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import mci.main.client.pojo.Assign;
import mci.main.client.pojo.AssignQuery;
import mci.main.client.pojo.Client;
import mci.main.client.pojo.ClientHistory;
import mci.main.client.pojo.ClientQuery;
import mci.main.client.pojo.ContactPerson;
import mci.main.client.service.ClientService;
import mci.main.invoice.pojo.Invoice;
import mci.main.system.Mss;
import mci.main.system.service.SystemService;
import mci.main.user.pojo.User;
import mci.main.user.service.UserService;
import mci.main.user.service.impl.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ClientController {

	@Autowired
	private ClientService clientServiceImpl;
	
	@Autowired
	private SystemService systemServiceImpl;
	
	@Autowired
	private UserService userServiceImpl;

	@ResponseBody
	@RequestMapping(value = "deleteRemark", method = RequestMethod.POST)
	public String  deleteRemark(String id){
		try{
			clientServiceImpl.deleteRemark(id);
		}catch (Exception e){
			e.printStackTrace();
			return "1";
		}
		return "0";
	}
	
	@ResponseBody
	@RequestMapping(value = "saveRemark", method = RequestMethod.POST)
	public String  saveRemark(ClientHistory ch){
		try{
			clientServiceImpl.saveRemark(ch);
		}catch (Exception e){
			e.printStackTrace();
			return "1";
		}
		return "0";
	}
	
	@ResponseBody
	@RequestMapping(value = "getaClient", method = RequestMethod.POST)
	public Client getaClient(ClientHistory ch,HttpSession session){
		ch.setClient(ch.getId());
		session.setAttribute("clientHistory", ch);
		return clientServiceImpl.getaClient(ch.getId());
	}
	@ResponseBody
	@RequestMapping(value = "getRemark", method = RequestMethod.POST)
	public ClientHistory getRemark(ClientHistory ch) {
		return clientServiceImpl.getRemark(ch);
	}

	@ResponseBody
	@RequestMapping(value = "cancelInactiveClient", method = RequestMethod.POST)
	public String cancelInactiveClient(HttpSession session) {
		try {
			Client client = (Client) session.getAttribute("editClient");
			clientServiceImpl.activeClient(client);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "setCreateInvoiceLimit", method = RequestMethod.POST)
	public String setCreateInvoiceLimit(Client client, HttpSession session) {
		try {
			session.removeAttribute("createInvoiceLimit");
			session.setAttribute("createInvoiceLimit", client);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "getCreateInvoiceLimit", method = RequestMethod.POST)
	public Client getCreateInvoiceLimit(HttpSession session) {
		Client client = (Client) session.getAttribute("createInvoiceLimit");
		return client;
	}

	@ResponseBody
	@RequestMapping(value = "blockClient", method = RequestMethod.POST)
	public String blockClient(Client client) {
		try {
			Client c1 = clientServiceImpl.getaClient(client.getId());
			if (c1.getState().equals("2")) {
				clientServiceImpl.blockClient(client);
				return "0";
			} else {
				return "2";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "setClientLimit", method = RequestMethod.POST)
	public String setClientLimit(HttpSession session, Client client) {
		try {
			session.removeAttribute("clientLimit");
			session.setAttribute("clientLimit", client);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}

	}

	@ResponseBody
	@RequestMapping(value = "getClientQuery", method = RequestMethod.POST)
	public Client getClientQuery(HttpSession session) {
		Client cq = (Client) session.getAttribute("clientLimit");
		return cq;
	}

	@ResponseBody
	@RequestMapping(value = "searchActiveClient", method = RequestMethod.POST)
	public String searchActiveClient(ClientQuery cq, HttpSession session) {
		try {
			session.removeAttribute("clientQuery");
			session.setAttribute("clientQuery", cq);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	@ResponseBody
	@RequestMapping(value = "loadSearchClient", method = RequestMethod.POST)
	public List<Client> loadSearchClient(HttpSession session) {
		ClientQuery cq = (ClientQuery) session.getAttribute("clientQuery");
		User user = (User) session.getAttribute("user");
		cq.setType(user.getType());
		cq.setPic(user.getId());
		cq.setStartIndex((cq.getPageIndex() - 1) * ClientQuery.getPageSize());
		return clientServiceImpl.searchActiveClient(cq);
	}

	@ResponseBody
	@RequestMapping(value = "loadSearchClientCount", method = RequestMethod.POST)
	public int loadSearchClientCount(HttpSession session) {
		ClientQuery cq = (ClientQuery) session.getAttribute("clientQuery");
		User user = (User) session.getAttribute("user");
		cq.setType(user.getType());
		cq.setPic(user.getId());
		cq.setStartIndex((cq.getPageIndex() - 1) * ClientQuery.getPageSize());
		int totalCount = clientServiceImpl.searchActiveClientCount(cq);
		int totalPage;
		if ((totalCount % ClientQuery.getPageSize()) == 0) {
			totalPage = totalCount / ClientQuery.getPageSize();
		} else {
			totalPage = totalCount / ClientQuery.getPageSize() + 1;
		}
		return totalPage;
	}

	// 获取权限
	@ResponseBody
	@RequestMapping(value = "getPow", method = RequestMethod.POST)
	public User getPow(HttpSession session) {
		User user = ((User) (session.getAttribute("user")));
		return user;
	}

	// activeClient
	@ResponseBody
	@RequestMapping(value = "activeClient", method = RequestMethod.POST)
	public String activeClient(Client client) {
		try {
			clientServiceImpl.activeClient(client);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}

	}

	//
	@ResponseBody
	@RequestMapping(value = "autoCPList", method = RequestMethod.POST)
	public List<ContactPerson> autoCPList() {
		return clientServiceImpl.autoCPList();
	}

	// History系列功能
	// 将查询条件存到session中
	@ResponseBody
	@RequestMapping(value = "getClientHistory", method = RequestMethod.POST)
	public String getClientHistory(ClientHistory ch, HttpSession session) {
		try {
			session.removeAttribute("clientHistory");
			session.setAttribute("clientHistory", ch);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	// 获取clientHistory分页
	@ResponseBody
	@RequestMapping(value = "loadClientHistory", method = RequestMethod.POST)
	// 参数ch为分页条件信息
	public List<ClientHistory> loadClientHistory(ClientHistory ch,
			HttpSession session) {
		// 获取session中的原查询条件
		ClientHistory ch1 = (ClientHistory) session.getAttribute("clientHistory");
		List<ClientHistory> list = clientServiceImpl.getClientHistory(ch1);
		session.removeAttribute("clientHistoryResult");
		session.setAttribute("clientHistoryResult", list);
		ch.setStartIndex((ch.getPageIndex() - 1) * ch.getPageSize());
		if (list.size() > (ch.getStartIndex() + ch.getPageSize())) {
			list = list.subList(ch.getStartIndex(),
					ch.getStartIndex() + ch.getPageSize());
		} else {
			list = list.subList(ch.getStartIndex(), list.size());
		}
		return list;

	}

	// 获取clientHistory的总页数
	@ResponseBody
	@RequestMapping(value = "loadClientHistoryCount", method = RequestMethod.POST)
	public int loadClientHistoryCount(HttpSession session) {
		List<ClientHistory> list = clientServiceImpl
				.getClientHistory((ClientHistory) (session
						.getAttribute("clientHistory")));
		int totalCount = list.size();
		int totalPage;
		if ((totalCount % ClientHistory.getPageSize()) == 0) {
			totalPage = totalCount / ClientHistory.getPageSize();
		} else {
			totalPage = totalCount / ClientHistory.getPageSize() + 1;
		}
		return totalPage;
	}

	@ResponseBody
	@RequestMapping(value = "addClientHistory", method = RequestMethod.POST)
	public String addClientHistory(ClientHistory ch, HttpSession session) {

		ch.setClient((String) (session.getAttribute("editClientId")));
		User user = (User) session.getAttribute("user");
		ch.setUser(user.getId());
		clientServiceImpl.addClientHistory(ch);
		return "0";

	}

	//创建时执行的update
	@ResponseBody
	@RequestMapping(value = "createClient", method = RequestMethod.POST)
	public String createClient(Client client) {
		try {
			clientServiceImpl.createClient(client);
			systemServiceImpl.sendEmailToAdmin();
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}
	// update Client
	@ResponseBody
	@RequestMapping(value = "updateClient", method = RequestMethod.POST)
	public String updateClient(Client client) {
		String i = "0";
		try {
			client.setState("0");
			clientServiceImpl.updateClient(client);
		} catch (Exception e) {
			e.printStackTrace();
			i = "1";
		}
		return i;
	}

	// 获取一个Client下的所有ContactPerson
	@ResponseBody
	@RequestMapping(value = "loadAllContactPerson", method = RequestMethod.POST)
	public List<ContactPerson> loadAllContactPerson(HttpSession session) {
		String id = (String) session.getAttribute("editClientId");
		return clientServiceImpl.loadAllContactPerson(id);
	}

	// 把要编辑的ClientId存到session中
	@ResponseBody
	@RequestMapping(value = "preEditClient", method = RequestMethod.POST)
	public Client preEditClient(String id, HttpSession session) {
		System.out.println("id:" + id);
		session.removeAttribute("editClientId");
		session.setAttribute("editClientId", id);
		System.out.println("clientId:"
				+ (String) session.getAttribute("editClientId"));
		session.setMaxInactiveInterval(-1);
		return clientServiceImpl.getaClient(id);
	}

	// 编辑一个Client
	@ResponseBody
	@RequestMapping(value = "editClient", method = RequestMethod.POST)
	public Client editClient(HttpSession session) {
		String id = (String) session.getAttribute("editClientId");
		return clientServiceImpl.editClient(id);
	}

	// 删除一个Client
	@ResponseBody
	@RequestMapping(value = "deleteClient", method = RequestMethod.POST)
	public String deleteClient(String id) {
		String i = "0";
		try {
			clientServiceImpl.deleteClient(id);
		} catch (Exception e) {
			e.printStackTrace();
			i = "1";
			return i;
		}
		return i;
	}

	@ResponseBody
	@RequestMapping(value = "loadFirstCP", method = RequestMethod.POST)
	public ContactPerson loadFirstCP(String id) {

		return clientServiceImpl.loadFirstCP(id);
	}

	// 添加一个Client
	@ResponseBody
	@RequestMapping(value = "addClient", method = RequestMethod.POST)
	public String addClient(Client client, HttpSession session) {
			User user = (User) session.getAttribute("user");
			client.setPic(user.getId());
			
			clientServiceImpl.addClient(client);
		return client.getId();
	}

	@ResponseBody
	@RequestMapping(value = "addContactPerson", method = RequestMethod.POST)
	public String addContactPerson(ContactPerson cp) {
		try {
			System.out.println(cp.toString());
			clientServiceImpl.addContactPerson(cp);
			return cp.getId();
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	@ResponseBody
	@RequestMapping(value = "loadContactPerson", method = RequestMethod.POST)
	public ContactPerson loadContactPerson(String id) {
		return clientServiceImpl.loadContactPerson(id);
	}

	@ResponseBody
	@RequestMapping(value = "deleteContactPerson", method = RequestMethod.POST)
	public void deleteContactPerson(String id) {
		clientServiceImpl.deleteContactPerson(id);
	}

	@ResponseBody
	@RequestMapping(value = "updateContactPerson", method = RequestMethod.POST)
	public String updateContactPerson(ContactPerson cp) {
		clientServiceImpl.updateContactPerson(cp);
		return cp.getId();
	}

	@ResponseBody
	@RequestMapping(value = "addCPFK", method = RequestMethod.POST)
	public String addCPFK(ContactPerson cp) {
		try {
			cp.setState("0");
			clientServiceImpl.addCPFK(cp);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	// staffClient页面的请求--------------------------------
	@ResponseBody
	@RequestMapping(value = "loadClientCount", method = RequestMethod.POST)
	public int loadClientCount(HttpSession session) {
		ClientQuery cq = (ClientQuery) session.getAttribute("clientQuery");
		return clientServiceImpl.loadClientCount(cq);
	}

	@ResponseBody
	@RequestMapping(value = "loadClient", method = RequestMethod.POST)
	public List<Client> loadClient(ClientQuery cq, HttpSession session) {
		User user = (User) session.getAttribute("user");
		session.removeAttribute("clientQuery");
		cq.setType(user.getType());
		cq.setPic(user.getId());
		session.setAttribute("clientQuery", cq);
		return clientServiceImpl.loadClient(cq);
	}

	// createInvoice页面请求
	@ResponseBody
	@RequestMapping(value = "loadActivedClient", method = RequestMethod.POST)
	public List<Client> loadActivedClient(ClientQuery cq, HttpSession session) {
		User user = (User) session.getAttribute("user");
		cq.setType(user.getType());
		cq.setPic(user.getId());
		return clientServiceImpl.loadActivedClient(cq);
	}

	@ResponseBody
	@RequestMapping(value = "loadActivedClientCount", method = RequestMethod.POST)
	public int loadActivedClientCount(ClientQuery cq, HttpSession session) {
		User user = (User) session.getAttribute("user");
		cq.setType(user.getType());
		cq.setPic(user.getId());
		return clientServiceImpl.loadActivedClientCount(cq);
	}

	// assign的功能
	@ResponseBody
	@RequestMapping(value = "getUser", method = RequestMethod.POST)
	public List<User> getUser(AssignQuery aq,HttpSession session) {
		 List<User> list=clientServiceImpl.getUser(aq);
		 String clientid=(String)session.getAttribute("editClientId");
		 Client client=(Client)clientServiceImpl.getaClient(clientid);
		 User user=userServiceImpl.getaUser(client.getPic());
		 for(int i=0;i<list.size();i++){
			 if(list.get(i).getEmail().equals(user.getEmail())){
				 list.remove(i);
			 }
		 }
		return list;
	}

	@ResponseBody
	@RequestMapping(value = "getUserCount", method = RequestMethod.POST)
	public int getUserCount() {
		return clientServiceImpl.getUserCount();
	}

	@ResponseBody
	@RequestMapping(value = "getUserName", method = RequestMethod.POST)
	public Client getUserName(User user,HttpSession session) {
		session.setAttribute("editClientId", user.getId());
		return clientServiceImpl.getUserName(user);
	}

	@ResponseBody
	@RequestMapping(value = "assignToPic", method = RequestMethod.POST)
	public String assignToPic(Assign as) {
		try {
			clientServiceImpl.assignToPic(as);
			ClientHistory ch = new ClientHistory();
			ch.setClient(as.getClient());
			ch.setUser(as.getUser());
			ch.setType(as.getType());    
			ch.setEditRemark("assign to "+userServiceImpl.getaUser(as.getUser()).getRealName());
			clientServiceImpl.addClientHistory(ch);
			return "0";
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
	}

	// 获取单个client下的所有invoice
	@ResponseBody
	@RequestMapping(value = "getAccount", method = RequestMethod.POST)
	public String getAccount(Client client, HttpSession session) {
		try {
			List<Invoice> list1 = clientServiceImpl.getAccount(client);
			// 获取当前user
			User user = (User) session.getAttribute("user");
			// 对list进行截取
			List<Invoice> list = new ArrayList<Invoice>();
			System.out.println("user.getId():" + user.getId());
			if ((user.getType()).equals("1")) {
				for (int i = 0; i < list1.size(); i++) {
					if ((user.getId()).equals(list1.get(i).getPic())) {
						list.add(list1.get(i));
					}
				}
			} else {
				list = list1;
			}
			if (list.size() == 0) {
				return "2";
			}
			session.removeAttribute("clientAccountQuery");
			session.setAttribute("clientAccountQuery", client);
			session.removeAttribute("clientAccount");
			session.setAttribute("clientAccount", list);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 获取acount下的分页
	@ResponseBody
	@RequestMapping(value = "getAccountPage", method = RequestMethod.POST)
	public List<Invoice> getAccountPage(ClientQuery cq, HttpSession session) {
		Client query = (Client) session.getAttribute("clientAccountQuery");
		if(null==query){
		 query=new Client();
		 query.setId(cq.getId());
		}
		query.setStartIndex(cq.getPageIndex());
		List<Invoice> list1 = clientServiceImpl.getAccount(query);
		System.out.println("list1.size()" + list1.size());
		User user = (User) session.getAttribute("user");
		// 对list进行截取
		List<Invoice> list = new ArrayList<Invoice>();
		if ((user.getType()).equals("1")) {
			for (int i = 0; i < list1.size(); i++) {
				if ((user.getId()).equals(list1.get(i).getPic())) {
					list.add(list1.get(i));
				}
			}
		} else {
			list = list1;
		}

		cq.setStartIndex((cq.getPageIndex() - 1) * ClientQuery.getPageSize());
		if (list.size() > (cq.getStartIndex() + ClientQuery.getPageSize())) {
			// if((cq.getStartIndex()+ClientQuery.getPageSize())>list.size()){
			// list = list.subList(cq.getStartIndex(),list.size());
			// }else{
			list = list.subList(cq.getStartIndex(), cq.getStartIndex()
					+ ClientQuery.getPageSize());
			// }
		} else {
			list = list.subList(cq.getStartIndex(), list.size());
		}
		return list;
	}

	@ResponseBody
	@RequestMapping(value = "loadClientAccountCount", method = RequestMethod.POST)
	public int getClientAccountCount(HttpSession session) {
		Client query = (Client) session.getAttribute("clientAccountQuery");
		List<Invoice> list1 = clientServiceImpl.getAccount(query);
		User user = (User) session.getAttribute("user");
		// 对list进行截取
		List<Invoice> list = new ArrayList<Invoice>();
		if (!(user.getType()).equals("2")) {
			for (int i = 0; i < list1.size(); i++) {
				if ((user.getId()).equals(list1.get(i).getPic())||(user.getId()).equals(list1.get(i).getPic2())) {
					list.add(list1.get(i));
				}
			}
		} else {
			list = list1;
		}
		int totalCount = list.size();
		int totalPage;
		if ((totalCount % ClientQuery.getPageSize()) == 0&&(totalCount/ClientQuery.getPageSize()) != 0) {
			System.out.println("list:" + list.size()
					+ "   ClientQuery.getPageSize()"
					+ ClientQuery.getPageSize()
					+ "   list.size()%ClientQuery.getPageSize():"
					+ (totalCount % ClientQuery.getPageSize()));
			totalPage = totalCount / ClientQuery.getPageSize();
			System.out.println("totalPage:" + totalPage);
		} else {
			totalPage = totalCount / ClientQuery.getPageSize() + 1;
		}
		return totalPage;
	}

	@ResponseBody
	@RequestMapping(value = "autoClientList", method = RequestMethod.POST)
	public List<Client> autoClientList() {
		return clientServiceImpl.autoClientList();
	}

	// search client部分
	@ResponseBody
	@RequestMapping(value = "searchClient", method = RequestMethod.POST)
	public String searchClient(Client client, HttpSession session) {
		System.out.println(client.getStartDate());

		User user = (User) session.getAttribute("user");
		// 将搜索条件存到session中

		client.setType(user.getType());
		client.setPic(user.getId());
		try {
			SimpleDateFormat format1 = new SimpleDateFormat("MM/dd/yyyy");
			SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");
			if (null != client.getStartDate() && client.getStartDate() != "") {
				client.setStartDate(format2.format(format1.parse(client
						.getStartDate())));
			}
			if (null != client.getEndDate() && client.getEndDate() != "") {
				client.setEndDate(format2.format(format1.parse(client
						.getEndDate())));
			}
			List<Client> list = clientServiceImpl.searchClient(client);
			session.removeAttribute("clientQuery");
			session.setAttribute("clientQuery", client);
			session.removeAttribute("clientResult");
			session.setAttribute("clientResult", list);
		} catch (Exception e) {
			e.printStackTrace();
			return "1";
		}
		return "0";
	}

	// 分页显示Client的查询结果
	@ResponseBody
	@RequestMapping(value = "loadClientResult", method = RequestMethod.POST)
	public List<Client> loadClientResult(ClientQuery cq, HttpSession session) {
		// 获取session中的查询条件
		Client client = (Client) session.getAttribute("clientQuery");
		List<Client> list = clientServiceImpl.searchClient(client);
		session.removeAttribute("clientResult");
		session.setAttribute("clientResult", list);
		cq.setStartIndex((cq.getPageIndex() - 1) * ClientQuery.getPageSize());
		if (list.size() > (cq.getStartIndex() + ClientQuery.getPageSize())) {
			list = list.subList(cq.getStartIndex(), cq.getStartIndex()
					+ ClientQuery.getPageSize());
		} else {
			list = list.subList(cq.getStartIndex(), list.size());
		}
		return list;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "loadClientResultCount", method = RequestMethod.POST)
	public int loadClientResultCount(HttpSession session) {
		List<Client> list = (List<Client>) (session
				.getAttribute("clientResult"));
		int totalCount = list.size();
		int totalPage;
		if ((totalCount % ClientQuery.getPageSize()) == 0) {
			totalPage = totalCount / ClientQuery.getPageSize();
		} else {
			totalPage = totalCount / ClientQuery.getPageSize() + 1;
		}
		return totalPage;
	}

	@ResponseBody
	@RequestMapping(value = "getCPcount", method = RequestMethod.POST)
	public int getCPcount(Client client) {
		return clientServiceImpl.getCPcount(client);
	}

	@ResponseBody
	@RequestMapping(value = "clearClient", method = RequestMethod.POST)
	public String clearClient() throws NullPointerException {
		// 清除公司名为空的client
		clientServiceImpl.clearClient();
		// 将三个月未创建invoice的client的状态改为inactive
		List<Client> list = clientServiceImpl.autoClientList();
		Mss ms = new Mss();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String currDate = ms.dqsj();
		// Date
		// lastDate=df.parse(clientServiceImpl.getLastInvoice(list.get(i)).getCreateDate());
		for (int i = 0; i < list.size(); i++) {
			if (null != clientServiceImpl.getLastInvoice(list.get(i))) {
				long startT = ms.fromDateStringToLong(clientServiceImpl
						.getLastInvoice(list.get(i)).getCreateDate()); // 定义上机时间
				long endT = ms.fromDateStringToLong(currDate); // 定义下机时间
				long ss = (endT - startT) / (1000); // 共计秒数
				int hh = (int) ss / 3600; // 共计小时数
				int dd = (int) hh / 24; // 共计天数
				System.out.println(list.get(i).getId() + ":相差日期=" + dd);
				if (dd > 90) {
					clientServiceImpl.inactiveClient(list.get(i));
				}
			}
		}
		return "0";

	}
}
