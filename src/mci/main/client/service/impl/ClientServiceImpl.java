package mci.main.client.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mci.main.client.mapper.ClientMapper;
import mci.main.client.pojo.Assign;
import mci.main.client.pojo.AssignQuery;
import mci.main.client.pojo.Client;
import mci.main.client.pojo.ClientHistory;
import mci.main.client.pojo.ClientQuery;
import mci.main.client.pojo.ContactPerson;
import mci.main.client.service.ClientService;
import mci.main.invoice.pojo.Invoice;
import mci.main.user.pojo.User;

@Service
public class ClientServiceImpl implements ClientService {
	@Autowired
	private ClientMapper clientMapper;

	@Override
	public void activeClient(Client client) {
     clientMapper.activeClient(client);
		
	}

	@Override
	public void addClient(Client client) {
		 client.setCreateDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		clientMapper.addClient(client);
	}

	@Override
	public void createClient(Client client) {
        clientMapper.createClient(client);
		
	}

	@Override
	public  void addContactPerson(ContactPerson cp) {
		 clientMapper.addContactPerson(cp);
	}

	@Override
	public ContactPerson loadContactPerson(String id) {
        return clientMapper.loadContactPerson(id);
	}

	@Override
	public void deleteContactPerson(String id) {
      clientMapper.deleteContactPerson(id);
	}

	@Override
	public void updateContactPerson(ContactPerson cp) {
        clientMapper.updateContactPerson(cp);
	}

	@Override
	public void addCPFK(ContactPerson cp) {
       clientMapper.addCPFK(cp);
	}
	@Override
	public List<Client> loadClient(ClientQuery cq){
		cq.setStartIndex((cq.getPageIndex()-1)*ClientQuery.getPageSize());
		System.out.println("cq.getPageIndex:"+cq.getPageIndex());
		System.out.println("cq.getStartIndex:"+cq.getStartIndex());
		return clientMapper.loadClient(cq);
	}

	@Override
	public int loadClientCount(ClientQuery cq) {
		  int totalCount=clientMapper.loadClientCount(cq);
		  int totalPage;
		  if((totalCount%ClientQuery.getPageSize())==0){
			 totalPage=totalCount/ClientQuery.getPageSize();
		  }else{
			 totalPage= totalCount/ClientQuery.getPageSize()+1;
		  }
		  return totalPage;
	}

	@Override
	public ContactPerson loadFirstCP(String id) {
        ContactPerson cp=clientMapper.loadFirstCP(id);
        //根据查询结果给cp中i赋值
        if(null==cp){
        	cp=new ContactPerson();
        	cp.setI("0");
        }else{
        	cp.setI("1");
        }
		return cp;
	}

	@Override
	public void deleteClient(String id){
       clientMapper.deleteClient(id);		
	}

	@Override
	public Client editClient(String id) {
		return  clientMapper.editClient(id);
	}

	@Override
	public List<ContactPerson> loadAllContactPerson(String id){
		return clientMapper.loadAllContactPerson(id);
	}

	@Override
	public void updateClient(Client client){
        clientMapper.updateClient(client);
	}

	@Override
	public List<Client> loadActivedClient(ClientQuery cq){
		cq.setStartIndex((cq.getPageIndex()-1)*ClientQuery.getPageSize());
		System.out.println("cq.getStartIndex:"+cq.getStartIndex());
		return clientMapper.loadActivedClient(cq);
	}

	@Override
	public int loadActivedClientCount(ClientQuery cq){
		  int totalCount=clientMapper.loadActivedClientCount(cq);
		  int totalPage;
		  if((totalCount%ClientQuery.getPageSize())==0){
			 totalPage=totalCount/ClientQuery.getPageSize();
		  }else{
			 totalPage= totalCount/ClientQuery.getPageSize()+1;
		  }
		  return totalPage;
	}

	@Override
	public void addClientHistory(ClientHistory ch){
       clientMapper.addClientHistory(ch);
	}

	@Override
	public List<ClientHistory> getClientHistory(ClientHistory ch){
		return clientMapper.getClientHistory(ch);
	}

	@Override
	public List<User> getUser(AssignQuery aq) {
		aq.setStartIndex((aq.getPageIndex()-1)*ClientQuery.getPageSize());
		return clientMapper.getUser(aq);
	}

	@Override
	public int getUserCount() {
		 int totalCount=clientMapper.getUserCount();
		  int totalPage;
		  if((totalCount%ClientQuery.getPageSize())==0){
			 totalPage=totalCount/ClientQuery.getPageSize();
		  }else{
			 totalPage= totalCount/ClientQuery.getPageSize()+1;
		  }
		return totalPage;
	}

	@Override
	public Client getUserName(User user) {
		return clientMapper.getUserName(user);
	}

	@Override
	public void assignToPic(Assign as) {
		clientMapper.assignToPic(as);
	}

	@Override
	public List<Invoice> getAccount(Client client) {
		return clientMapper.getAccount(client);
	}
	@Override
	public List<Client> searchClient(Client client) {
		return clientMapper.searchClient(client);
	}

	@Override
	public List<Client> autoClientList() {
		return clientMapper.autoClientList();
	}

	@Override
	public List<ContactPerson> autoCPList() {
		return clientMapper.autoCPList();
	}

	@Override
	public List<Client> searchActiveClient(ClientQuery cq) {
		return clientMapper.searchActiveClient(cq);
	}

	@Override
	public int searchActiveClientCount(ClientQuery cq) {
		return clientMapper.searchActiveClientCount(cq);
	}

	@Override
	public int getCPcount(Client client) {
		return clientMapper.getCPcount(client);
	}

	@Override
	public void clearClient() {
        clientMapper.clearClient();
		
	}

	@Override
	public void blockClient(Client client) {
        clientMapper.blockClient(client);
		
	}

	@Override
	public Invoice getLastInvoice(Client client) {
		return clientMapper.getLastInvoice(client);
	}

	@Override
	public void inactiveClient(Client client) {
       clientMapper.inactiveClient(client);
		
	}

	@Override
	public Client getaClient(String id) {
		return clientMapper.getaClient(id);
	}

	@Override
	public ClientHistory getRemark(ClientHistory ch) {
		return clientMapper.getRemark(ch);
	}

	@Override
	public List<Client> staffSearchClient(Client client) {

		return clientMapper.staffSearchClient(client);
	}

	@Override
	public void saveRemark(ClientHistory ch) {
             clientMapper.saveRemark(ch);
	}

	@Override
	public void deleteRemark(String id) {
             clientMapper.deleteRemark(id);
		
	}


	
}