package com.zxiaosi.weapp.controller;

import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.entity.vo.AccountVo;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.weapp.service.UserService;
import com.zxiaosi.weapp.service.WxBizSendService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:42
 */
@RestController
@RequestMapping("/wxapi")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WxBizSendService wxBizSendService;

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
        return Result.success(userService.getCurrentUser());
    }

    @PostMapping("/updateUser")
    public Result<?> updateUser(@RequestBody AccountVo accountVo) {
        userService.updateUserService(accountVo);
        return Result.success();
    }

    @PostMapping("/sendBiz")
    public Result<?> sendBiz(@RequestParam(value = "issue") String issue) {
        String accessToken = wxBizSendService.getAccessTokenService();
        boolean bool = wxBizSendService.sendBizForUser(accessToken, issue);
        return bool ? Result.success() : Result.fail();
    }

}
