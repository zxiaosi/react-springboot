package com.zxiaosi.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.config.annotation.web.http.SpringHttpSessionConfiguration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * 使用 redis 存储 HttpSession
 * <pre>
 *     spring-boot 两种方式启用 spring-session + redis
 *     1、使用 @EnableRedisHttpSession 注解
 *     2、在application.properties 配置 spring.session.store-type: redis
 *     优先级：@EnableRedisHttpSession > application.properties
 * </pre>
 *
 * @author zxiaosi
 * @date 2023-08-25 18:36
 */
@Configuration
@EnableRedisHttpSession
public class SessionConfig {

    // https://blog.yl-online.top/posts/74b23c9e.html
    // https://blog.csdn.net/weixin_43272781/article/details/114939668

    @Autowired
    private RedisSerializer<Object> redisSerializer; // 使用 redis 序列化

    /**
     * spring-session 使用 redis 序列化
     * <p>bean name 要配置成 <strong>springSessionDefaultRedisSerializer</strong>，否则不生效，参考：
     * {@link RedisHttpSessionConfiguration#setDefaultRedisSerializer(RedisSerializer)}</p>
     */
    @Bean
    @Qualifier("springSessionDefaultRedisSerializer")
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return redisSerializer;
    }

    /**
     * cookie serializer 等用于 eg: service.servlet.session.cookie.path = /
     * <p>
     * {@link SpringHttpSessionConfiguration#setCookieSerializer(org.springframework.session.web.http.CookieSerializer)}
     */
    @Bean
    @Qualifier("cookieSerializer")
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
//        serializer.setCookieName("JSESSIONID"); // spring-session 默认为 SESSION
        serializer.setCookiePath("/"); // 一定要设置, 否则无法在浏览器无法看到 cookie, 且无法获取
        serializer.setUseHttpOnlyCookie(false); // cookie 是否只读, 设置为false方便前端获取
        serializer.setCookieMaxAge(24 * 60 * 60); // 配置session时间 单位 秒
        return serializer;
    }

}