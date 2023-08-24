package com.zxiaosi.web;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.zxiaosi.common.dao")
@SpringBootApplication(scanBasePackages = {"com.zxiaosi.common", "com.zxiaosi.web"})
public class WebApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }

}
