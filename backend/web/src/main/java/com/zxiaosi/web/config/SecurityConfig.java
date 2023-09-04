package com.zxiaosi.web.config;

import com.zxiaosi.web.security.*;
import com.zxiaosi.web.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.session.security.SpringSessionBackedSessionRegistry;
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

    @Value("${config.domain}")
    private String domain;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl; // 用户信息获取

    @Autowired
    private FindByIndexNameSessionRepository<? extends Session> sessionRepository; // 会话仓库

    /**
     * 密码编码器
     */
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
        daoAuthenticationProvider.setHideUserNotFoundExceptions(false); // 关闭 隐藏找不到用户异常
        daoAuthenticationProvider.setUserDetailsService(userDetailsServiceImpl); // 身份验证提供程序
        daoAuthenticationProvider.setUserDetailsPasswordService(userDetailsServiceImpl); // 更新密码提供程序
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

    /**
     * 配置请求授权、登录、登出、异常处理、session
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // 配置跨域
                .cors()
                .configurationSource(corsConfigurationSource())

                // 关闭csrf
                .and()
                .csrf()
                .disable()

                // 配置请求授权
                .authorizeHttpRequests()
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O o) {
                        o.setSecurityMetadataSource(new MyFilterInvocationSecurityMetadataSource());
                        o.setAccessDecisionManager(new MyAccessDecisionManager());
                        return o;
                    }
                })
                .antMatchers("/login", "/wechat/qrcode").permitAll() // 不需要认证
                .anyRequest().authenticated() // 其他请求需要认证

                // 配置登出
                .and()
                .logout()
                .logoutUrl("/logout") // 登出请求路径
                .invalidateHttpSession(true) // 使HttpSession失效
                .clearAuthentication(true) // 清除认证信息
                .logoutSuccessHandler(new MyLogoutSuccessHandler()) // 退出成功处理器

                // 配置异常处理
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new MyAuthenticationEntryPoint()) // 未认证异常处理
                .accessDeniedHandler(new MyAccessDeniedHandler()) // 无权限异常处理

                // 配置session
                .and()
                .sessionManagement()
                .maximumSessions(1)// 允许会话最大并发只能一个客户端 (使用addFilterAt时, 这里的配置不生效)
                .maxSessionsPreventsLogin(false) // 当达到最大会话数时，阻止后面的登录
//                .sessionRegistry(sessionRegistry()) // 使用session提供的会话注册表 - 自定义addFilterAt时不生效
                .expiredSessionStrategy(new MySessionInformationExpiredStrategy()); // 会话过期处理

        // 使用 自定义登录过滤器 替换 UsernamePasswordAuthenticationFilter
        http.addFilterAt(myUsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * 配置自定义登录过滤器
     */
    @Bean
    public MyUsernamePasswordAuthenticationFilter myUsernamePasswordAuthenticationFilter() {
        MyUsernamePasswordAuthenticationFilter filter = new MyUsernamePasswordAuthenticationFilter();

        filter.setFilterProcessesUrl("/login");
        filter.setUsernameParameter("username");
        filter.setPasswordParameter("password");
        filter.setAuthenticationSuccessHandler(new MyAuthenticationSuccessHandler());
        filter.setAuthenticationFailureHandler(new MyAuthenticationFailureHandler());
        // 使用session提供的会话注册表: https://www.jianshu.com/p/053e6dd24793
        filter.setSessionAuthenticationStrategy(new ConcurrentSessionControlAuthenticationStrategy(sessionRegistry()));
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
        configuration.addAllowedOriginPattern(domain); // 允许所有请求域名
        configuration.addAllowedHeader("*"); // 允许所有请求头
        configuration.addAllowedMethod("*"); // 允许所有请求方法

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /**
     * <a href="https://juejin.cn/post/7155620833027686408">参考链接</a>
     * <p>
     * SpringSessionBackedSessionRegistry是Session为Spring Security提供的用于在集群环境中控制并发会话的注册表实现类
     */
    @Bean
    public SpringSessionBackedSessionRegistry<?> sessionRegistry() {
        return new SpringSessionBackedSessionRegistry<>(sessionRepository);
    }

}
