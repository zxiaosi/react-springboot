package com.zxiaosi.common.config;

import com.zxiaosi.common.security.*;
import com.zxiaosi.common.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Security配置
 *
 * @author zxiaosi
 * @date 2023-08-21 17:41
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /*
     * 三种方式获取用户信息
     * 1. 基于内存的创建用户 - https://docs.spring.io/spring-security/reference/5.7/servlet/authentication/passwords/in-memory.html
     * 2. 基于数据库的创建用户信息 - https://docs.spring.io/spring-security/reference/5.7/servlet/authentication/passwords/jdbc.html
     * 3. 自定义获取用户信息 - https://docs.spring.io/spring-security/reference/5.7/servlet/authentication/passwords/user-details-service.html
     */

    @Autowired
    private MyAuthenticationSuccessHandler myAuthenticationSuccessHandler; // 登录成功处理器

    @Autowired
    private MyAuthenticationFailureHandler myAuthenticationFailureHandler; // 登录失败处理器

    @Autowired
    private MyLogoutSuccessHandler myLogoutSuccessHandler; // 退出成功处理器

    @Autowired
    private MyAuthenticationEntryPoint myAuthenticationEntryPoint; // 未认证的请求返回401

    @Autowired
    private MyUserDetailsService myUserDetailsService; // 用户信息获取

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 从数据库中获取用户信息
     */
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(myUserDetailsService); // 身份验证提供程序
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder()); // 密码编码器
        return daoAuthenticationProvider;
    }

    /**
     * 认证管理器，登录时认证使用
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(daoAuthenticationProvider());
    }

    @Order(2)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors().configurationSource(corsConfigurationSource()) // 配置跨域
                .and()
                .csrf().disable(); // 关闭csrf

        http
                .authorizeHttpRequests() // 配置请求授权
                .antMatchers("/login", "/wechat/qrcode", "/test").permitAll() // 不需要认证
                .anyRequest().authenticated() // 其他请求需要认证
                .and()
                .logout()
                .logoutUrl("/logout") // 配置登出请求路径
                .logoutSuccessHandler(myLogoutSuccessHandler) // 配置退出成功处理器
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(myAuthenticationEntryPoint); // 未认证异常处理

        // 用自定义的 jsonUsernamePasswordAuthenticationFilter 替换 UsernamePasswordAuthenticationFilter
        http.addFilterAt(webUsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        // 用自定义的 weChatUsernamePasswordAuthenticationFilter 替换 UsernamePasswordAuthenticationFilter
//        http.addFilterAt(weChatUsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * web - 自定义登录处理器
     */
    @Bean
    public WebUsernamePasswordAuthenticationFilter webUsernamePasswordAuthenticationFilter() {
        WebUsernamePasswordAuthenticationFilter filter = new WebUsernamePasswordAuthenticationFilter();

        filter.setFilterProcessesUrl("/login"); // 配置登录请求路径
        filter.setUsernameParameter("username"); // 配置登录用户名参数: 方便从json中获取
        filter.setPasswordParameter("password"); // 配置登录密码参数: 方便从json中获取
        filter.setAuthenticationSuccessHandler(myAuthenticationSuccessHandler); // 配置登录成功处理器
        filter.setAuthenticationFailureHandler(myAuthenticationFailureHandler); // 配置登录失败处理器

        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    /**
     * weapp - 自定义登录处理器
     */
    @Bean
    public WeChatUsernamePasswordAuthenticationFilter weChatUsernamePasswordAuthenticationFilter() {
        WeChatUsernamePasswordAuthenticationFilter filter = new WeChatUsernamePasswordAuthenticationFilter();

        filter.setFilterProcessesUrl("/wxlogin"); // 配置登录请求路径
        filter.setAuthenticationSuccessHandler(myAuthenticationSuccessHandler); // 配置登录成功处理器
        filter.setAuthenticationFailureHandler(myAuthenticationFailureHandler); // 配置登录失败处理器

        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }


    /**
     * 配置跨域
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true); // 允许携带cookie
        configuration.addAllowedOrigin("http://127.0.0.1:5173"); // 允许所有请求域名
        configuration.addAllowedHeader("*"); // 允许所有请求头
        configuration.addAllowedMethod("*"); // 允许所有请求方法
        configuration.addExposedHeader("*"); // 允许所有响应头

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
