package com.zxiaosi.web.controller;

import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:39
 */
@RestController
public class UserController {

    @GetMapping("/user")
    public Result<User> user() {
        User user = new User();
        user.setId(1);
        user.setName("web");
        user.setAge(8082);
        return Result.success(user);
    }

}
