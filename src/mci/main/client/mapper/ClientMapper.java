package mci.main.client.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import mci.main.client.pojo.Assign;
import mci.main.client.pojo.AssignQuery;
import mci.main.client.pojo.Client;
import mci.main.client.pojo.ClientHistory;
import mci.main.client.pojo.ClientQuery;
import mci.main.client.pojo.ContactPerson;
import mci.main.invoice.pojo.Invoice;
import mci.main.user.pojo.User;

@Repository
public interface ClientMapper {
	
//client
	void activeClient(Client client);
	
	void addClient(Client client);
	
	void createClient(Client client);

	void addContactPerson(ContactPerson cp);
	
	ContactPerson loadContactPerson(String id);
	
	void deleteContactPerson(String id);
	
	void updateContactPerson(ContactPerson cp);
	
	void addCPFK(ContactPerson cp);
	
	List<Client> loadClient(ClientQuery cq);
	
	List<Client> loadActivedClient(ClientQuery cq);
	
	int loadClientCount(ClientQuery cq);
	//add client history
	void addClientHistory(ClientHistory ch);
	
	List<ClientHistory> getClientHistory(ClientHistory ch);
	//add invoice history
	
	
	ContactPerson loadFirstCP(@Param("id")String id);
	
	void deleteClient(@Param("id")String id);
	
	Client editClient(@Param("id")String id);
	
	List<ContactPerson> loadAllContactPerson(@Param("id")String id);
	
	void updateClient (Client client);

	int loadActivedClientCount(ClientQuery cq);
	//assign
	List<User> getUser(AssignQuery aq);
	
	int getUserCount();
	
	Client getUserName(User user);
	
	void assignToPic(Assign as);
	
	List<Invoice> getAccount(Client client);
	//edit  invoice
	Invoice getEditInvoice(Invoice invoice);
	
	List<Client> searchClient(Client client);
	
	List<Client> staffSearchClient(Client client);
	
	List<Client> autoClientList();
	
	List<ContactPerson> autoCPList();
	
	List<Client> searchActiveClient(ClientQuery cq);
	
    int searchActiveClientCount(ClientQuery cq);
    
    int getCPcount(Client client);
    
    void clearClient();
    
    void blockClient(Client client);
    
    Invoice getLastInvoice(Client client);
    
    void inactiveClient(Client client);
    
    Client getaClient(@Param("id")String id);
    
    ClientHistory getRemark(ClientHistory ch);
    
    void saveRemark(ClientHistory ch);
    
    void deleteRemark(@Param("id")String id);
    
}
