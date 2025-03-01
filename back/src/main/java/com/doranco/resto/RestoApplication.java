package com.doranco.resto;


 import javax.crypto.SecretKey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.boot.autoconfigure.domain.EntityScan;
 import org.springframework.context.annotation.ComponentScan;
 import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.doranco.resto.security.JwtUtil;

import java.security.SecureRandom;
import java.util.Base64;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
 @ComponentScan(basePackages = "com.doranco.resto")
 @EntityScan(basePackages = "com.doranco.resto.entity")
 @EnableJpaRepositories(basePackages = "com.doranco.resto.repository")
@EnableConfigurationProperties(JwtUtil.class)
public class RestoApplication {

	public static void main(String[] args) {
		 SpringApplication.run(RestoApplication.class, args);
//		  SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//
//	        // Convert to base64 for easy usage in configuration
//	        String base64Key = Base64.getEncoder().encodeToString(secretKey.getEncoded());
//
//	        System.out.println("Generated JWT Secret Key (Base64): " + base64Key);
		
	}
}
