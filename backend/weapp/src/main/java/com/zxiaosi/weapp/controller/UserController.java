package com.zxiaosi.weapp.controller;

import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.weapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:42
 */
@RestController
public class UserController {

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public Result<?> getUserInfo(String code, String iv, String encryptedData) {
        logger.info("code: {}, encryptedData: {}, iv: {}", code, encryptedData, iv);
        userService.getOpenidSessionKeyService(code);
        return Result.success("wxLogin");
    }

    @GetMapping("/test")
    public Result<User> user() {
        User user = new User();
        Random random = new Random();
        user.setId(random.nextInt(10));
        user.setUsername("web" + random.nextInt(100));
        user.setOpenid(String.valueOf(8082));
        return random.nextInt(10) > 5 ? Result.success(user) : Result.success(user, "成功");
    }

}
