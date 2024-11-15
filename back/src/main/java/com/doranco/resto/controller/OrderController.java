package com.doranco.resto.controller;

import com.doranco.resto.document.OrderDocument;
import com.doranco.resto.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	   @Autowired
	   private OrderService orderService;

	   @PostMapping("/checkout")
	   public OrderDocument checkoutOrder(
	       @RequestParam String userId,
	       @RequestBody List<OrderDocument.OrderItem> items,
	       @RequestParam Double totalAmount,
	       @RequestParam String paymentStatus,
	       @RequestParam String paymentMethod) {
	       return orderService.saveOrder(userId, items, totalAmount, paymentStatus, paymentMethod);
	   }

	   @GetMapping("/user/{userId}")
	   public List<OrderDocument> getUserOrders(@PathVariable String userId) {
	       return orderService.getOrdersByUserId(userId);
	   }
}
