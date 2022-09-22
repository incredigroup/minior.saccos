package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import net.javaguides.springboot.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value = "select e.* from employees e where e.email_id = :email and e.password=:password", nativeQuery = true)
    public List <Employee> findByEmailandPassword(@Param("email") String email,@Param("password") String password);
}
