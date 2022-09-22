package net.javaguides.springboot.controller;

import java.util.List;
import java.util.Map;

import org.aspectj.bridge.MessageUtil;
import org.jboss.logging.BasicLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Loan;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.LoanRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class LoanController {

	@Autowired
	private LoanRepository loanRepository;

	@GetMapping("/loans")
	public List<Map<Loan, Employee>> getLoans(){
		return loanRepository.getLoanWithUserandRole();
	}

	@GetMapping("/roles")
	public List<Map<Loan, Employee>> getRoles(){
		return loanRepository.getRoles();
	}

	// create loan rest api
	@PostMapping("/loans")
	public Loan createLoan(@RequestBody Loan loan){
		return loanRepository.save(loan);
	}

	//approve requested loan by Logined stuff
	@PostMapping("/approveloan")
	public List<Map<Loan, Employee>> approveLoanByStuff(@RequestBody Map<String, String> userMap) {
		String userId = (String) userMap.get("authid");
		String loanId = (String) userMap.get("loanid");
		loanRepository.insertApprovedLoan(loanId, userId);
		return loanRepository.getLoanWithUserandRole();
	}

	// get loan by id rest api
	@GetMapping("/loans/{id}")
	public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
		Loan loan = loanRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Loan not exist with id :" + id));
		return ResponseEntity.ok(loan);
	}	
}
