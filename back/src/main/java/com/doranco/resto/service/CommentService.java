package com.doranco.resto.service;

import com.doranco.resto.entity.Comment;
import com.doranco.resto.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Optional<Comment> updateComment(Long id, Comment commentDetails) {
        return commentRepository.findById(id).map(comment -> {
            comment.setContent(commentDetails.getContent());
            return commentRepository.save(comment);
        });
    }

    public boolean deleteComment(Long id) {
        return commentRepository.findById(id).map(comment -> {
            commentRepository.delete(comment);
            return true;
        }).orElse(false);
    }
    public List<Comment> getCommentsByDishId(Long dishId) {
        return commentRepository.findByMenu_Id(dishId); 
    }
}