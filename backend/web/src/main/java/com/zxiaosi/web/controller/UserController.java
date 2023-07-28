package com.zxiaosi.web.controller;

import com.zxiaosi.common.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:39
 */
@RestController
public class UserController {

    @GetMapping("/user")
    public User user() {
        User user = new User();
        user.setId(1);
        user.setName("web");
        user.setAge(8082);
        return user;
    }

}
