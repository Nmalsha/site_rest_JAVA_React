package com.doranco.resto.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import com.doranco.resto.entity.User; 
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;


@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtUtil {
                
     private final SecretKey secretKey;
    private final long expiration;
    // private final byte[] secretKeyBytes;
   

    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
           this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        // this.expiration = expiration;
        // this.secretKeyBytes = secret.getBytes(StandardCharsets.UTF_8);
        // byte[] secretBytes = secret.getBytes(StandardCharsets.UTF_8);
        // this.secretKey = new SecretKeySpec(secretBytes, SignatureAlgorithm.HS512.getJcaName());
        this.expiration = expiration;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                // .setSigningKey(Keys.secretKeyFor(SignatureAlgorithm.HS512))
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("nickname", ((User) userDetails).getNickname());
        claims.put("id", ((User) userDetails).getId());
        claims.put("roles", ((User) userDetails).getRoles());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                // .signWith(Keys.secretKeyFor(SignatureAlgorithm.HS512))
                // .signWith(Keys.hmacShaKeyFor(secretKeyBytes), SignatureAlgorithm.HS512)
                // .signWith(Keys.secretKeyFor(SignatureAlgorithm.HS512), SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    // public String extractNickname(String token) {
    //     return extractAllClaims(token).get("nickname", String.class);
    // }

    // public Long extractId(String token) {
    //     return extractAllClaims(token).get("id", Long.class);
    // }

    @SuppressWarnings("unchecked")
    public List<String> extractRoles(String token) {
        return extractAllClaims(token).get("roles", List.class);
    }
}