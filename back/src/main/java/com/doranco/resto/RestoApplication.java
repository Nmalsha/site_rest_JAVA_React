package com.doranco.resto;


 import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.boot.autoconfigure.domain.EntityScan;
 import org.springframework.context.annotation.ComponentScan;
 import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.doranco.resto.util.JwtUtil;

import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
 @ComponentScan(basePackages = "com.doranco.resto")
 @EntityScan(basePackages = "com.doranco.resto.entity")
 @EnableJpaRepositories(basePackages = "com.doranco.resto.repository")
@EnableConfigurationProperties(JwtUtil.class)
public class RestoApplication {

	public static void main(String[] args) {
		 SpringApplication.run(RestoApplication.class, args);

		
	}
}
