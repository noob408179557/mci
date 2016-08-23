package mci.main.client.pojo;

import java.io.Serializable;

public class ContactPerson implements Serializable {
	private static final long serialVersionUID = 1L;

	private String id;
	private String companyid;
	private String email;
	private String position;
	private String tel;
	private String mobile;
	private String billaddress;
	private String name;
	private String state;
	private String block;
	private String level;
	private String unitno;
	private String postal;
	
	private String status;
    private String i;
    
    
    
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getI() {
		return i;
	}

	public void setI(String i) {
		this.i = i;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getBilladdress() {
		return billaddress;
	}

	public void setBilladdress(String billaddress) {
		this.billaddress = billaddress;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBlock() {
		return block;
	}

	public void setBlock(String block) {
		this.block = block;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getUnitno() {
		return unitno;
	}

	public void setUnitno(String unitno) {
		this.unitno = unitno;
	}


	public String getPostal() {
		return postal;
	}

	public void setPostal(String postal) {
		this.postal = postal;
	}

	public String getCompanyid() {
		return companyid;
	}

	public void setCompanyid(String companyid) {
		this.companyid = companyid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

}
