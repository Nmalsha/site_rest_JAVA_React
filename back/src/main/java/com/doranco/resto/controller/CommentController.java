package com.doranco.resto.controller;

import com.doranco.resto.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.doranco.resto.service.CommentService;
import org.apache.commons.text.StringEscapeUtils; 
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
  @Autowired
    private CommentService commentService;

    @GetMapping("/comment")
    public List<Comment> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        comments.forEach(comment -> comment.setContent(StringEscapeUtils.escapeHtml4(comment.getContent())));
        return comments;
        // return commentService.getAllComments();
    }

    @GetMapping("/comment/by-dish/{dishId}")
    public ResponseEntity<List<Comment>> getCommentsByDishId(@PathVariable Long dishId) {
        List<Comment> comments = commentService.getCommentsByDishId(dishId);
        comments.forEach(comment -> comment.setContent(StringEscapeUtils.escapeHtml4(comment.getContent())));
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/comment/{id}")
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @PutMapping("/comment/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        Optional<Comment> updatedComment = commentService.updateComment(id, commentDetails);
        return updatedComment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (commentService.deleteComment(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}