package com.doranco.resto.utils;


import com.doranco.resto.enums.RoleEnum;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class UserRoleExtractor {
    static public boolean isUser(Authentication authentication){
        boolean isUser = false;
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority authority : authorities){
            if (authority.getAuthority().equals(RoleEnum.ROLE_USER.toString()))
            	isUser = true;
        }
        return isUser;
    }

    static public boolean isUserAdmin(Authentication authentication){
        boolean isAdmin = false;
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority authority : authorities){
            if (authority.getAuthority().equals(RoleEnum.ROLE_ADMIN.toString()))
            	isAdmin = true;
        }
        return isAdmin;
    }
	
	
	
	
	
}
