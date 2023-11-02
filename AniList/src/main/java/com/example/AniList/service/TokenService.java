package com.example.AniList.service;

import com.example.AniList.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TokenService {
    private final JwtEncoder encoder;
    private final JwtDecoder decoder;
    private final UserRepository userRepository;
    public TokenService(JwtEncoder encoder, JwtDecoder decoder, UserRepository userRepository)
    {
        this.encoder = encoder;
        this.decoder = decoder;
        this.userRepository = userRepository;
    }

    public String generateAccessToken(Authentication authentication)
    {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        System.out.println(scope);
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(Authentication authentication)
    {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.DAYS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .claim("token_type", "refresh_token")
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public boolean refreshTokenIsValid(String refreshToken)
    {
        Map<String, Object> refreshTokenClaims = decodeRefreshToken(refreshToken);
        if(isRefreshTokenType(refreshTokenClaims) && refreshTokenNotExpired(refreshTokenClaims))
        {
            return isRefreshTokenAssociatedWithUser(refreshTokenClaims);
        }
        return false;
    }

    public String extractRefreshToken(String refreshTokenBearer)
    {
        if(refreshTokenBearer != null && refreshTokenBearer.startsWith("Bearer "))
        {
            return refreshTokenBearer.substring(7); //Removes "Bearer "
        }
        return null;
    }

    private Map<String, Object> decodeRefreshToken(String refreshToken)
    {
        return this.decoder.decode(refreshToken).getClaims();
    }

    private boolean refreshTokenNotExpired(Map<String, Object> claims)
    {
        String exp = claims.get("exp").toString();
        Instant expiration = Instant.parse(exp);
        return !expiration.isBefore(Instant.now());
    }

    private boolean isRefreshTokenType(Map<String, Object> claims)
    {
        return claims.get("token_type").equals("refresh_token");
    }

    private boolean isRefreshTokenAssociatedWithUser(Map<String, Object> claims)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = userRepository.getUserByEmail(authentication.getName()).getBody().getEmail();
        String subject = claims.get("sub").toString();
        return userEmail.equals(subject);
    }

    public String generateAccessTokenFromRefreshToken(String refreshToken)
    {
        Map<String, Object> refreshTokenClaims = decodeRefreshToken(refreshToken);
        if(refreshTokenClaims != null)
        {
            String userEmail = refreshTokenClaims.get("sub").toString();
            String scope = refreshTokenClaims.get("scope").toString();
            Instant now = Instant.now();
            JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("self")
                    .issuedAt(now)
                    .expiresAt(now.plus(30, ChronoUnit.MINUTES))
                    .subject(userEmail)
                    .claim("scope", scope)
                    .build();
            return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        }
        else
        {
            return null;
        }
    }
}
