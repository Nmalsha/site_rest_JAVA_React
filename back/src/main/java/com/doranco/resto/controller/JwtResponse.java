package com.doranco.resto.controller;

;

public class JwtResponse {
    private String token;
  
  

    // Constructor with both fields
    public JwtResponse(String token) {
        this.token = token;
    
       
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    
}