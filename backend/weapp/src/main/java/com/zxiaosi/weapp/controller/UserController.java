package com.zxiaosi.weapp.controller;

import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.weapp.config.SecurityConfig;
import com.zxiaosi.weapp.service.UserService;
import com.zxiaosi.weapp.service.WxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:42
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Result<?> login(String code, String appId) {
        if (!userService.checkAppidService(appId)) {
            return Result.fail("appid错误");
        }

        String token = userService.createTokenService(code);
        return Result.success(token);
    }

    @GetMapping("/userInfo")
    public Result<?> getUserInfo() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Result.success(principal);
    }

}
