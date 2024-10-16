package com.doranco.resto.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;


import com.doranco.resto.entity.User; 
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


import javax.crypto.SecretKey;


@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtUtil {
	
	  final static private SignatureAlgorithm alg = SignatureAlgorithm.HS256;
	    private final static SecretKey SECRET_KEY = generateSecretKey();

	    private static SecretKey generateSecretKey() {
	        return Keys.secretKeyFor(alg);
	    }


	    public String generateToken(UserDetails userDetails) {
	        Map<String, Object> claims = new HashMap<>();
	        claims.put("nickname", ((User) userDetails).getNickname());
	        claims.put("id", ((User) userDetails).getId());
	        claims.put("roles", ((User) userDetails).getRoles());
	        return generateToken(claims, userDetails.getUsername());
	    }
    
	    public String generateToken (Map<String, Object> extraClaims, String subject){
	        return Jwts
	                .builder()
	                .setClaims(extraClaims)
	                .setSubject(subject)
	                .setIssuedAt(new Date(System.currentTimeMillis()))
	                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 5))
	                .signWith(SECRET_KEY, alg)
	                .compact();
	    }


	    public boolean isTokenValid(String token, UserDetails userDetails) {
	        final String username = extractUsername(token);
	        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
	    }

	    public String extractUsername(String token) {
	        return extractClaim(token, Claims::getSubject);
	    }

	    private boolean isTokenExpired(String token) {
	        return extractExpiration(token).before(new Date());
	    }

	    private Date extractExpiration(String token) {
	        return extractClaim(token, Claims::getExpiration);

	    }

	    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        final Claims claims = extractAllClaims(token);
	        return claimsResolver.apply(claims);
	    }

	    private Claims extractAllClaims(String token) {
	        return Jwts
	                .parserBuilder()
	                .setSigningKey(SECRET_KEY)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	    }

}