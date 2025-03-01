package com.doranco.resto.controller;

import com.doranco.resto.entity.Menu;
import com.doranco.resto.entity.Comment;
import com.doranco.resto.service.MenuService;
import com.doranco.resto.service.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;

import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;


@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private CommentService commentService ;

     @Autowired
    private ObjectMapper objectMapper; 

    // Provide a default value
    @Value("${file.upload-dir:src/main/resources/static/images/}")
    private String uploadDir;

    @Value("${server.port}")
    private String serverPort;

    @GetMapping
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        Optional<Menu> menu = menuService.getMenuById(id);
        return menu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

   @PostMapping(consumes = { "multipart/form-data" })
   @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Menu> createMenu(
        @RequestPart("menu") String menuJson, 
        @RequestPart("image") MultipartFile image
    ) {
        try {   
            Menu menu = objectMapper.readValue(menuJson, Menu.class);
            System.out.println("menu object: " + menu);
            if (image != null && !image.isEmpty()) {
                // Save the image to the filesystem
                String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                Path imagePath = Paths.get(uploadDir, fileName);

            
                Files.createDirectories(imagePath.getParent());

                Files.copy(image.getInputStream(), imagePath);
                
                // menu.setImage("/images/" + fileName);

                String imageUrl = "http://localhost:" + serverPort + "/images/" + fileName;
                menu.setImage(imageUrl);

             
            }
          
            Menu savedMenu = menuService.createMenu(menu);
            System.out.println("Saved menu: " + savedMenu); 
if (savedMenu == null) {
    System.out.println("Failed to save menu.");
}
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMenu);
        } catch (IOException e) {
             e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menuDetails) {
        Optional<Menu> updatedMenu = menuService.updateMenu(id, menuDetails);
        return updatedMenu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        Optional<Menu> menuOptional = menuService.getMenuById(id);

        if (menuOptional.isPresent()) {
            Menu menu = menuOptional.get();

           
            if (menu.getImage() != null) {
                String fileName = menu.getImage().substring(menu.getImage().lastIndexOf("/") + 1);
                Path imagePath = Paths.get(uploadDir, fileName);

                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
             
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
            }
            List<Comment> comments = menu.getComments();
            for (Comment comment : comments) {
           
                commentService.deleteComment(comment.getId());
            }
           
            if (menuService.deleteMenu(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
     
    }
}