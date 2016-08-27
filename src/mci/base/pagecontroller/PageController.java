package mci.base.pagecontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	@RequestMapping("mci-editUser")
	public String editUser() {
		return "mci-editUser";
	}
	@RequestMapping("mci-editMyAccount")
	public String editMyAccount() {
		return "mci-editMyAccount";
	}

	@RequestMapping("mci-user")
	public String user() {
		return "mci-user";
	}

	@RequestMapping("mci-profile")
	public String profile() {
		return "mci-profile";
	}

	@RequestMapping("mci-viewP")
	public String viewP() {
		return "mci-viewP";
	}

	@RequestMapping("mci-viewC")
	public String viewC() {
		return "mci-viewC";
	}

	@RequestMapping("mci-viewT")
	public String viewT() {
		return "mci-viewT";
	}

	@RequestMapping("mci-viewF")
	public String viewF() {
		return "mci-viewF";
	}

	@RequestMapping("mci-detailP")
	public String detailP() {
		return "mci-detailP";
	}

	@RequestMapping("mci-detailC")
	public String detailC() {
		return "mci-detailC";
	}

	@RequestMapping("mci-detailT")
	public String detailT() {
		return "mci-detailT";
	}

	@RequestMapping("mci-detailF")
	public String detailF() {
		return "mci-detailF";
	}

	@RequestMapping("mci-searchCreateInvoice")
	public String searchCreateInvoice() {
		return "mci-searchCreateInvoice";
	}

	@RequestMapping("mci-mail")
	public String mail() {
		return "mci-mail";
	}

	@RequestMapping("mci-searchInvoice")
	public String searchInvoice() {
		return "mci-searchInvoice";
	}

	@RequestMapping("mci-searchClient")
	public String searchClient() {
		return "mci-searchClient";
	}

	@RequestMapping("mci-editClient")
	public String editClient() {
		return "mci-editClient";
	}

	@RequestMapping("mci-dashboard")
	public String dashboard() {
		return "mci-dashboard";
	}

	@RequestMapping("mci-editInvoiceT")
	public String editInvoiceT() {
		return "mci-editInvoiceT";
	}

	@RequestMapping("mci-editInvoiceC")
	public String editInvoiceC() {
		return "mci-editInvoiceC";
	}

	@RequestMapping("mci-editInvoiceF")
	public String editInvoiceF() {
		return "mci-editInvoiceF";
	}

	@RequestMapping("mci-editInvoiceP")
	public String editInvoiceP() {
		return "mci-editInvoiceP";
	}

	@RequestMapping("mci-createCP")
	public String createCP() {
		return "mci-createCP";
	}

	@RequestMapping("mci-invoiceT")
	public String createInvoiceT() {
		return "mci-invoiceT";
	}

	@RequestMapping("mci-invoiceF")
	public String createInvoiceF() {
		return "mci-invoiceF";
	}

	@RequestMapping("mci-invoiceP")
	public String createInvoiceP() {
		return "mci-invoiceP";
	}

	@RequestMapping("mci-invoiceC")
	public String createInvoiceC() {
		return "mci-invoiceC";
	}

	@RequestMapping("mci-createClient")
	public String createClient() {
		return "mci-createClient";
	}

	@RequestMapping("mci-createInvoice")
	public String createInvoice() {
		return "mci-createInvoice";
	}

	@RequestMapping("mci-staffInvoice")
	public String staffInvoice() {
		return "mci-staffInvoice";
	}

	@RequestMapping("mci-staffClient")
	public String staffClent() {
		return "mci-staffClient";
	}

	@RequestMapping("mci-staffDiscover")
	public String staffDiscover() {
		return "mci-staffDiscover";
	}

	@RequestMapping("mci-register")
	public String register() {
		return "mci-register";
	}

	@RequestMapping("mci-invoiceT1")
	public String invoiceT1() {
		return "mci-invoiceT1";
	}

	@RequestMapping("mci-test1")
	public String test1() {
		return "mci-test1";
	}

	@RequestMapping("login")
	public String login() {
		return "login";
	}
	@RequestMapping("newLogin")
	public String newlogin() {
		return "newLogin";
	}
}
