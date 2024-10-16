package com.doranco.resto.service;

import com.doranco.resto.entity.CartItem;
import com.doranco.resto.entity.User;
import com.doranco.resto.entity.Menu;
import com.doranco.resto.repository.CartItemRepository;
import com.doranco.resto.dto.CartItemDTO;
import com.doranco.resto.repository.MenuRepository;
import com.doranco.resto.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;


import java.util.List;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CartItem> getCartItemsByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public CartItem addCartItem(CartItemDTO cartItemDTO) {
         
           Optional<Menu> optionalMenu = menuRepository.findById(cartItemDTO.getMenuId());
           if (!optionalMenu.isPresent()) {
               throw new RuntimeException("Menu item not found");
           }
           Menu menu = optionalMenu.get();
          
           Optional<User> optionalUser = userRepository.findById(cartItemDTO.getUserId());
           if (!optionalUser.isPresent()) {
               throw new RuntimeException("User not found");
           }
           User user = optionalUser.get();
          
           CartItem cartItem = new CartItem();
    cartItem.setMenu(menu);
    cartItem.setUser(user);  
    cartItem.setQuantity(cartItemDTO.getQuantity());
    cartItem.setPrice(cartItemDTO.getPrice());

   
    return cartItemRepository.save(cartItem);
        // Optional<Menu> optionalMenu = menuRepository.findById(cartItem.getMenu().getId());
        
        // if (optionalMenu.isPresent()) {
        //     // Set the Menu on the CartItem if found
        //     cartItem.setMenu(optionalMenu.get());
        //     return cartItemRepository.save(cartItem);
        // } else {
        //     throw new RuntimeException("Menu item not found");
        // };
    }

    public void deleteCartItem(Long id) {
    	  if (!cartItemRepository.existsById(id)) {
              throw new RuntimeException("Cart item not found");
          }

               cartItemRepository.deleteById(id);
    }
}