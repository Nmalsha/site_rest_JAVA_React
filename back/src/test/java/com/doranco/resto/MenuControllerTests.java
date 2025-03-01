package com.doranco.resto;

import com.doranco.resto.controller.MenuController;
import com.doranco.resto.entity.Menu;
import com.doranco.resto.service.MenuService;
import com.doranco.resto.service.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class MenuControllerTests {
	private MockMvc mockMvc;

	@Mock
	private CommentService commentService;
	
	@Mock
	private MenuService menuService;

	@InjectMocks
	private MenuController menuController;

	private ObjectMapper objectMapper = new ObjectMapper();

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(menuController).build();
	}

	@Test
	void testGetAllMenus() throws Exception {
		Menu menu1 = new Menu(1L, "Pizza", "Delicious pizza", 12.99, "image.jpg");
		Menu menu2 = new Menu(2L, "Burger", "Tasty burger", 8.99, "image.jpg");
		List<Menu> menus = Arrays.asList(menu1, menu2);

		when(menuService.getAllMenus()).thenReturn(menus);

		mockMvc.perform(get("/api/menus")).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].dishName").value("Pizza"))
				.andExpect(jsonPath("$[1].dishName").value("Burger"));
	}

	@Test
	void testGetMenuById() throws Exception {
		Menu menu = new Menu(1L, "Pizza", "Delicious pizza", 12.99, "image.jpg");
		when(menuService.getMenuById(1L)).thenReturn(Optional.of(menu));

		mockMvc.perform(get("/api/menus/1")).andExpect(status().isOk())
				.andExpect(jsonPath("$.dishName").value("Pizza"));
	}

	@Test
	void testGetMenuById_NotFound() throws Exception {
		when(menuService.getMenuById(1L)).thenReturn(Optional.empty());

		mockMvc.perform(get("/api/menus/1")).andExpect(status().isNotFound());
	}

	@Test
	void testUpdateMenu() throws Exception {
		Menu menu = new Menu(1L, "Pizza", "Delicious pizza", 12.99, "image.jpg");
		when(menuService.updateMenu(eq(1L), any(Menu.class))).thenReturn(Optional.of(menu));

		mockMvc.perform(put("/api/menus/1").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(menu))).andExpect(status().isOk())
				.andExpect(jsonPath("$.dishName").value("Pizza"));
	}

// 	@Test
// 	void testDeleteMenu() throws Exception {

// 		Menu menu = new Menu(1L, "Pizza", "Delicious pizza", 12.99, "image.jpg");
// 		menu.setComments(new ArrayList<>());

// 		when(menuService.getMenuById(1L)).thenReturn(Optional.of(menu));
// 		when(menuService.deleteMenu(1L)).thenReturn(true);
// 		 when(commentService.deleteComment(anyLong())).thenReturn(true);
//  System.out.println("About to call DELETE request");
//     System.out.println("Menu to delete: " + menu);
//     System.out.println("Menu Service: " + menuService);

// 		mockMvc.perform(delete("/api/menus/1")).andExpect(status().isNoContent());
//         System.out.println("DELETE request executed");
// 	}

// 	@Test
// 	void testDeleteMenu_NotFound() throws Exception {
// 		when(menuService.getMenuById(1L)).thenReturn(Optional.empty());

// 		mockMvc.perform(delete("/api/menus/1")).andExpect(status().isNotFound());
// 	}


}
