package com.doranco.resto.dto;


public class CartItemDTO {
    private Long menuId;
    private int quantity;
    private double price;
    private Long userId;
    


    public CartItemDTO(Long menuId, int quantity, double price,Long userId ) {
        this.menuId = menuId;
        this.quantity = quantity;
        this.price = price;
        this.userId = userId;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }



}