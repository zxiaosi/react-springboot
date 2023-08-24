package com.zxiaosi.common.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

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
     * RedisTemplate配置
     *
     * @param factory
     * @return
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        // 设置工厂链接
        redisTemplate.setConnectionFactory(factory);

        // 创建一个json的序列化对象
        GenericJackson2JsonRedisSerializer jackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

        // 设置key序列化方式String
        redisTemplate.setKeySerializer(new StringRedisSerializer());

        // 设置value的序列化方式json
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);

        // 设置hash key序列化方式String
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        // 设置hash value序列化json
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);

        // 设置支持事务
        redisTemplate.setEnableTransactionSupport(true);

        // 生效
        redisTemplate.afterPropertiesSet();

        return redisTemplate;
    }

    /**
     * Spring Session Redis JSON序列化
     *
     * @return
     */
    @Bean
    public RedisSerializer<Object> redisSerializer() {
        // 创建JSON序列化器
        ObjectMapper mapper = new ObjectMapper();

        // 指定要序列化的域,field,get和set,以及修饰符范围，ANY是都有包括private和public
        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);

        // enableDefaultTyping 方法已经过时，使用新的方法activateDefaultTyping
        // objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        // 必须设置，否则无法将JSON转化为对象，会转化成Map类型
        mapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);

        return new GenericJackson2JsonRedisSerializer(mapper);
    }

}
