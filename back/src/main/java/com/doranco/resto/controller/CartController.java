package com.doranco.resto.controller;

import com.doranco.resto.dto.CartItemDTO;
import com.doranco.resto.entity.CartItem;
import com.doranco.resto.entity.Menu;
import com.doranco.resto.entity.User;
import com.doranco.resto.repository.CartItemRepository;
import com.doranco.resto.repository.MenuRepository;
import com.doranco.resto.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.doranco.resto.service.CartItemService;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    @Autowired   
    private final CartItemService cartItemService;
    
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    public CartController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCartItemsByUserId(@PathVariable Long userId) {
        List<CartItem> cartItems = cartItemService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        try {
            CartItem savedCartItem = cartItemService.addCartItem(cartItemDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCartItem);
        } catch (RuntimeException e) {
            logger.error("Error occurred while adding cart item: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred.");
        }

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
    	  try {
              cartItemService.deleteCartItem(id);
              return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); 
          } catch (RuntimeException e) {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
          } catch (Exception e) {
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                      .body("An unexpected error occurred.");
          }
    }
}