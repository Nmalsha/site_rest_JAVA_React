package com.doranco.resto.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
public class OrderDocument {

   @Id
   private String id;
   private String userId;
   private LocalDateTime orderDate;
   private List<OrderItem> items;
   private Double totalAmount;
   private String paymentStatus;
   private String paymentMethod;

   // Nested class to represent each item in the order
   public static class OrderItem {
       private String menuItemId;
       private String itemName;
       private int quantity;
       private double price;

       // Getters and setters
   }

public String getId() {
	return id;
}

public void setId(String id) {
	this.id = id;
}

public String getUserId() {
	return userId;
}

public void setUserId(String userId) {
	this.userId = userId;
}

public LocalDateTime getOrderDate() {
	return orderDate;
}

public void setOrderDate(LocalDateTime orderDate) {
	this.orderDate = orderDate;
}

public List<OrderItem> getItems() {
	return items;
}

public void setItems(List<OrderItem> items) {
	this.items = items;
}

public Double getTotalAmount() {
	return totalAmount;
}

public void setTotalAmount(Double totalAmount) {
	this.totalAmount = totalAmount;
}

public String getPaymentStatus() {
	return paymentStatus;
}

public void setPaymentStatus(String paymentStatus) {
	this.paymentStatus = paymentStatus;
}

public String getPaymentMethod() {
	return paymentMethod;
}

public void setPaymentMethod(String paymentMethod) {
	this.paymentMethod = paymentMethod;
}
}