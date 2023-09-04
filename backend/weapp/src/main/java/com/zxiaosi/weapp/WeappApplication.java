package com.zxiaosi.weapp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.zxiaosi.common.mapper")
@SpringBootApplication(scanBasePackages = {"com.zxiaosi.common", "com.zxiaosi.weapp"})
public class WeappApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeappApplication.class, args);
    }

}
