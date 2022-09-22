package net.javaguides.springboot.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "loan_log")
public class Loan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "user_id")
	private String userId;

	@Column(name = "amount")
	private String amount;
	
	@Column(name = "edate")
	private String edate;
	
	@Column(name = "state")
	private String state;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "rdate")
    private Date rdate;

	@PrePersist
	private void onCreate() {
		rdate = new Date();
	}

	public Loan() {
		
	}
	
	public Loan(String userId, String amount, String edate, String state, String approveId, String rdate) {
		super();
		this.userId = userId;
		this.amount = amount;
		this.edate = edate;
		this.state = state;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getEdate() {
		return edate;
	}
	public void setEdate(String edate) {
		this.edate = edate;
	}

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
}
