package com.zxiaosi.web.controller;

import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:39
 */
@RestController
public class UserController {

    @GetMapping("/user")
    public Result<User> user() {
        User user = new User();
        Random random = new Random();
        user.setId(random.nextInt(10));
        user.setName("web" + random.nextInt(100));
        user.setAge(8082);
        return random.nextInt(10) > 5 ? Result.success(user) : Result.success("成功", user);
    }

}
