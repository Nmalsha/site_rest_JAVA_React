package com.doranco.resto.repository;


import com.doranco.resto.entity.CartItem;
import com.doranco.resto.entity.User;
import java.util.Optional;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
