package com.zxiaosi.weapp.controller;

import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.weapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return Result.success("wxLogin");
    }

}
