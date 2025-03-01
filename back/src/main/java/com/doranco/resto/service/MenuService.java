package com.doranco.resto.service;

import com.doranco.resto.entity.Menu;
import com.doranco.resto.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Optional<Menu> getMenuById(Long id) {
        return menuRepository.findById(id);
    }

    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Optional<Menu> updateMenu(Long id, Menu menuDetails) {
        return menuRepository.findById(id).map(menu -> {
            menu.setDishName(menuDetails.getDishName());
            menu.setDescription(menuDetails.getDescription());
            menu.setImage(menuDetails.getImage());
            menu.setPrice(menuDetails.getPrice());
            return menuRepository.save(menu);
        });
    }

    public boolean deleteMenu(Long id) {
        return menuRepository.findById(id).map(menu -> {
            menuRepository.delete(menu);
            return true;
        }).orElse(false);
    }
}