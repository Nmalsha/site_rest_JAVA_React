package com.doranco.resto.controller;

public class JwtResponse {
    private String token;
    private String nickname;

    // Constructor with both fields
    public JwtResponse(String token, String nickname) {
        this.token = token;
        this.nickname = nickname;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}