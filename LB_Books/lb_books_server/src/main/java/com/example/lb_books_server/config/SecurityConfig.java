package com.example.lb_books_server.config;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        .csrf((csrf) -> csrf.disable())
        .authorizeHttpRequests(configurer -> configurer
               // .requestMatchers("/", "/css/**", "/images/**").permitAll()// Allows all access
                //.requestMatchers("/books/**").hasRole("ADMIN")// allows access only to those with admin roles
                .requestMatchers("/api/books/**").permitAll()
                .anyRequest().permitAll())
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl(("/authenticateTheUser"))
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .deleteCookies("JSESSIONID")
                        .permitAll())
                .exceptionHandling(configurer -> configurer
                        .accessDeniedPage("/403"));
        return http.build();
    }
}
