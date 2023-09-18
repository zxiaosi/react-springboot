package com.zxiaosi.web.controller;

import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 用户控制层
 *
 * @author zxiaosi
 * @date 2023-07-28 13:39
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/userInfo")
    public Result<?> user() {
        return Result.success(userService.getUserService());
    }

}
