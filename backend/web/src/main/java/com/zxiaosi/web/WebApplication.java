package com.zxiaosi.web;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.zxiaosi.common.mapper") // 扫描common包下的dao
@SpringBootApplication(scanBasePackages = {"com.zxiaosi.common", "com.zxiaosi.web"}) // 扫描common和web包下的类
public class WebApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }

}
