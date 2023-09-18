package com.zxiaosi.common.config;

import com.zxiaosi.common.interceptor.MyBatisOperateInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 针对myabtis拦截器的使用，注入至ioc容器即可
 *
 * @author zxiaosi
 * @date 2023-09-05 17:51
 */
@Configuration
public class MyBatisConfig {
    @Bean
    public MyBatisOperateInterceptor myBatisOperateInterceptor() {
        return new MyBatisOperateInterceptor();
    }
}
