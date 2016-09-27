package mci.main.invoice.mapper;

import java.util.List;

import mci.main.client.pojo.Client;
import mci.main.client.pojo.ContactPerson;
import mci.main.invoice.pojo.Cheque;
import mci.main.invoice.pojo.Invoice;
import mci.main.invoice.pojo.InvoiceHistory;
import mci.main.invoice.pojo.InvoiceKey;
import mci.main.invoice.pojo.InvoiceQuery;
import mci.main.invoice.pojo.ItemC;
import mci.main.invoice.pojo.ItemF;
import mci.main.invoice.pojo.ItemP;
import mci.main.invoice.pojo.ItemT;
import mci.main.invoice.pojo.ItemTotal;
import mci.main.invoice.pojo.PayHistory;
import mci.main.invoice.pojo.WorkerC;
import mci.main.user.pojo.User;
import mci.main.user.pojo.UserQuery;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceMapper {

	// invoice
	List<ItemC> loadInvoiceItemC(Invoice invoice);
	
	Invoice commission(Invoice invoice);
	
	void updateInvoice(Invoice invoice);
	
	Invoice getaInvoice(Invoice invoice);
	
	Invoice getaInvoiceAll(Invoice invoice);
	
	void activeInvoice(Invoice invoice);

	List<Invoice> loadInvoice(InvoiceQuery iq);

	int loadInvoiceCount(InvoiceQuery iq);

	List<ContactPerson> getCP(String id);

	void addInvoice(Invoice in);

	Client getClient(String id);

	ContactPerson getaCP(String id);

	// invoiceF
	void addInvoicefFK(InvoiceKey ik);

	int createItemF(ItemF item);

	void clearItemF();

	void updateItemF(ItemF item);

	void removeItemF(String id);

	void addInvoiceRemark(Invoice in);

	// invoiceP
	void createItemP(ItemP item);

	void addInvoicepFK(InvoiceKey ik);

	void updateItemP(ItemP item);

	void addInvoiceTotal(Invoice in);
	
	// invoiceC
	void removeItemOfWorkerC(WorkerC worker);
	
	void addWorkerC(WorkerC worker);
	
	void addItemC(ItemC item);
	
	void removeItemC(ItemC item);
	
	void removeWorkerC(WorkerC worker);
	
	void updateItemC(ItemC item);
	
	void updateWorkerC(WorkerC worker);
	// invoiceT
    void removeItemOfWorkerT(WorkerC worker);
	
	void addWorkerT(WorkerC worker);
	
	void addItemT(ItemT item);
	
	void removeItemT(ItemT item);
	
	
	void removeWorkerT(WorkerC worker);
	
	void updateItemT(ItemT item);
	
	void updateWorkerT(WorkerC worker);
	//edit Invoice
	Invoice getEditInvoice(Invoice invoice);
	
	List<WorkerC> getEditWorkersC(String invoiceid);
	
	List<ItemC> getEditItemC(String str);
	
	User getaPIC(String id);
	
	List<WorkerC> getEditWorkersT(String invoiceid);
	
	List<ItemT> getEditItemT(@Param("id")String id);
	
	List<ItemF> getEditItemF(@Param("id")String invoiceid);
	
	List<ItemP> getEditItemP(@Param("id")String invoiceid);
	
	void removeItemP(@Param("id")String invoiceid);
	
	void deleteInvoice(@Param("id")String invoiceid);
	
	void removeItemFOfInvoice(@Param("id")String invoiceid);
	
	void removeItemPOfInvoice(@Param("id")String invoiceid);
	
	List<User> autoConsultantList();
	
	List<Invoice> searchInvoice(Invoice invoice);
	
	List<InvoiceHistory> getInvoiceHistory(InvoiceHistory ih);
	
	void addInvoiceHistory(InvoiceHistory ih);
	
	void cancelInvoice(Invoice invoice);
	
	void confirmInvoice(Invoice invoice);
	
	ContactPerson getCPOI(Invoice invoice);
	
	void getCommission(Invoice invoice);
	
	void createCheque(Cheque cq);
	
	Invoice getPic(Invoice invoice);
	
	void addPayHistory(PayHistory ph);
	
	void clearInvoice();
	
	String getWorkerTHours(ItemT t);
	
	List<PayHistory> getPayHistory(Invoice invoice);
	
	void setCommission(Invoice invoice);
	
	String setItemTotalF(ItemTotal it);
	
	String setItemTotalC(ItemTotal it);
	
	String setItemTotalT(ItemTotal it);
	
	List<Invoice> loadInvoiceForPrint(InvoiceQuery iq);
	
	List<Invoice> searchInvoiceForPrint(Invoice invoice);
	//获取type类型invoice的最大id
	String getLastIdByType(@Param("type")String type);

	List<Invoice> getInvoiceOfUser(UserQuery uq);
	
	List<Invoice> getInvoiceOfUserCount(Client client);
}
