package com.doranco.resto.controller;

public class JwtResponse {
    private String token;
    private String nickname;
    private Long id ;

    // Constructor with both fields
    public JwtResponse(String token, String nickname, Long id) {
        this.token = token;
        this.nickname = nickname;
        this.id = id;
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
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}