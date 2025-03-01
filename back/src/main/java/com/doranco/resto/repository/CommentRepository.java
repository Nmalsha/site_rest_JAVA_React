package com.doranco.resto.repository;

import com.doranco.resto.entity.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  List<Comment> findAll();   
  List<Comment> findByMenu_Id(Long menuId);
}