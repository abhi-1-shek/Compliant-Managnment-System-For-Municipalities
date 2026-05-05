package com.cms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cms.security.CustomUserDetailsService;
import com.cms.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
           
            .cors(cors -> {})

            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

              
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers(
                        "/auth/**",
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html"
                ).permitAll()

               
                .requestMatchers("/complaints/create", "/complaints/my").hasAuthority("CITIZEN")
                .requestMatchers(HttpMethod.DELETE, "/complaints/**").hasAuthority("CITIZEN")
                .requestMatchers(HttpMethod.POST, "/feedback/submit").hasAuthority("CITIZEN")
                .requestMatchers(HttpMethod.GET, "/feedback/complaint/**").hasAuthority("ADMIN")
                .requestMatchers("/dashboard/citizen").hasAuthority("CITIZEN")

                
                .requestMatchers("/complaints/assigned", "/complaints/*/status").hasAuthority("STAFF")
                .requestMatchers("/dashboard/staff").hasAuthority("STAFF")

           
                .requestMatchers("/complaints/all", "/complaints/*/assign").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET, "/feedback/all").hasAuthority("ADMIN")
                .requestMatchers("/dashboard/admin").hasAuthority("ADMIN")
                .requestMatchers("/users/staff").hasAuthority("ADMIN")

                .requestMatchers("/uploads/**").permitAll()

                .anyRequest().authenticated()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}