package com.zxiaosi.weapp.config;

import com.zxiaosi.weapp.security.MyAccessDeniedHandler;
import com.zxiaosi.weapp.security.MyAuthenticationEntryPoint;
import com.zxiaosi.weapp.security.MyJwtAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security配置
 *
 * @author zxiaosi
 * @date 2023-08-21 17:41
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MyJwtAuthenticationTokenFilter myJwtAuthenticationTokenFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // 配置跨域
                .cors()

                // 关闭csrf
                .and()
                .csrf()
                .disable()

                // 配置请求授权
                .authorizeHttpRequests()
                .antMatchers("/api/login", "/images/**").permitAll() // 不需要认证
                .anyRequest().authenticated() // 其他请求需要认证

                // 配置异常
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new MyAuthenticationEntryPoint())
                .accessDeniedHandler(new MyAccessDeniedHandler())

                // 禁用session
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // 配置JWT登录过滤器
        http.addFilterBefore(myJwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
