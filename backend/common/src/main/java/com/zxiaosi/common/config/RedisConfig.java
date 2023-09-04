package com.zxiaosi.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.security.jackson2.SecurityJackson2Modules;

/**
 * Redis 序列化
 *
 * @author zxiaosi
 * @date 2023-08-23 15:02
 */
@Configuration
public class RedisConfig {

    // 参考: https://blog.csdn.net/qq_48922459/article/details/126948455

    /**
     * 配置RedisTemplate序列化器
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        // 设置工厂链接
        redisTemplate.setConnectionFactory(factory);

        // 设置key序列化方式String
        redisTemplate.setKeySerializer(new StringRedisSerializer());

        // 设置value的序列化方式json
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());

        // 设置hash key序列化方式String
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        // 设置hash value序列化json
        redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());

        // 设置支持事务
        redisTemplate.setEnableTransactionSupport(true);

        // 生效
        redisTemplate.afterPropertiesSet();

        return redisTemplate;
    }

    /**
     * Spring Session Redis JSON序列化
     */
    @Bean
    public RedisSerializer<Object> redisSerializer() {
        // 创建JSON序列化器
        ObjectMapper mapper = new ObjectMapper();

        // 注册模块
        mapper.registerModules(SecurityJackson2Modules.getModules(getClass().getClassLoader()));

        return new GenericJackson2JsonRedisSerializer(mapper);
    }

}
