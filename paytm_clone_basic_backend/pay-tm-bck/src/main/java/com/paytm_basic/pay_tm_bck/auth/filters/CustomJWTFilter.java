package com.paytm_basic.pay_tm_bck.auth.filters;

import com.paytm_basic.pay_tm_bck.auth.entities.SignUpDetails;
import com.paytm_basic.pay_tm_bck.auth.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class CustomJWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            //Check for the auth headers
            log.info("Checking for the auth headers...");
            final String authHeaders = request.getHeader("Authorization");
            if(authHeaders==null || !authHeaders.startsWith("Bearer")){
                log.info("NO AUTH HEADERS PASSED ");
                filterChain.doFilter(request,response);
                return;
            }
            final String jwtToken = authHeaders.substring(7);
            if(jwtToken==null){
                log.info("NO JWT TOKEN PASSED ");
                filterChain.doFilter(request,response);
                return;
            }
            String userDetailsFromJwt = jwtService.parseJwtToUserDetails(jwtToken);
            log.info("Token parsed successfully to user : ",userDetailsFromJwt);
            if(userDetailsFromJwt!=null){
                SignUpDetails userDetails = (SignUpDetails) this.userDetailsService.loadUserByUsername(userDetailsFromJwt);
                if(userDetails!=null && jwtService.isTokenValid(jwtToken,userDetails)){
                    //user details fetched from the db after jwt parsed
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,
                            null,userDetails.getAuthorities());
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(token);
                }
            }
            filterChain.doFilter(request, response);
        }catch (Exception e){
            log.error("Error in CUSTOM JWT FILTER : ",e);
            filterChain.doFilter(request,response);
        }
    }

}



