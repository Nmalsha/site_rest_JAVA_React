package com.doranco.resto.service;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doranco.resto.document.OrderDocument;
import com.doranco.resto.repository.OrderRepository;

@Service
public class OrderService {
	  @Autowired
	   private OrderRepository orderRepository;

	   public OrderDocument saveOrder(String userId, List<OrderDocument.OrderItem> items, Double totalAmount, String paymentStatus, String paymentMethod) {
	       OrderDocument order = new OrderDocument();
	       order.setUserId(userId);
	       order.setOrderDate(LocalDateTime.now());
	       order.setItems(items);
	       order.setTotalAmount(totalAmount);
	       order.setPaymentStatus(paymentStatus);
	       order.setPaymentMethod(paymentMethod);

	       return orderRepository.save(order);
	   }

	   public List<OrderDocument> getOrdersByUserId(String userId) {
	       return orderRepository.findByUserId(userId);
	   }
}
