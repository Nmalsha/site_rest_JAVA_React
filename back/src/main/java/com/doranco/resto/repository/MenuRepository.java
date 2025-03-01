package com.doranco.resto.repository;

import com.doranco.resto.entity.Menu;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findAll();   
}