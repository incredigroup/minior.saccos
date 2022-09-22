package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Loan;

import javax.transaction.Transactional;
import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long>{
    @Query(value = "select loan.*," +
            "emp.first_name as firstName," +
            "emp.last_name as lastName, " +
            "emp.email_id as emailId," +
            "emp_role.role_name as roleName,  " +
            "loan_number.number, " +
            "approve.approve_number " +
            "from loan_log as loan " +
            "left join employees as emp on emp.id = loan.user_id " +
            "left join employee_role as emp_role on emp_role.id = emp.role_id " +
            "left join loan_number_setting as loan_number on emp_role.id = loan_number.role_id" +
            " LEFT JOIN (SELECT COUNT(loan_id) AS approve_number, loan_id FROM loan_approve GROUP BY loan_id) AS approve ON approve.loan_id = loan.id", nativeQuery = true)
    public List<Map<Loan, Employee>> getLoanWithUserandRole();
    @Modifying
    @Query(value = "Insert into loan_approve (user_id, loan_id) values (:userid, :loanid)", nativeQuery = true)
    @Transactional
    void insertApprovedLoan(@Param("loanid") String loanid, @Param("userid") String userid);

    @Query(value = "Select role.*, " +
            "setting.number " +
            "from employee_role as role " +
            "left join loan_number_setting as setting " +
            "on role.id = setting.role_id", nativeQuery = true)
    public List<Map<Loan, Employee>> getRoles();
}
