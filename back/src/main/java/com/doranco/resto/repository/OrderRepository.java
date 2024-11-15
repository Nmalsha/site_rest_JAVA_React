package com.doranco.resto.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doranco.resto.document.OrderDocument;

import java.util.List;

public interface OrderRepository extends MongoRepository<OrderDocument, String>{
	 List<OrderDocument> findByUserId(String userId);
}
