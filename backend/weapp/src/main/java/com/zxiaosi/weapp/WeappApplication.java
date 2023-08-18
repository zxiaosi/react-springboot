package com.zxiaosi.weapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class WeappApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeappApplication.class, args);
    }

}
