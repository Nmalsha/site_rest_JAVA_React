package com.doranco.resto.repository;


import com.doranco.resto.entity.User;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
//	@Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);


    boolean existsByEmail(String email);
}
