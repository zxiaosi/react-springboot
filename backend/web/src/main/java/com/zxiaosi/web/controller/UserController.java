package com.zxiaosi.web.controller;

import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.web.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Random;

/**
 * @author zxiaosi
 * @date 2023-07-28 13:39
 */
@RestController
public class UserController {

    @Autowired
    private LoginService loginService;

    @GetMapping("/user")
    public Result<User> user() {
        User user = new User();
        Random random = new Random();
        user.setId((long) random.nextInt(10));
        user.setName("web" + random.nextInt(100));
        user.setOpenid(String.valueOf(8082));
        return random.nextInt(10) > 5 ? Result.success(user) : Result.success("成功", user);
    }

    @GetMapping(value = "/wechat/qrcode")
    public Result<?> login() throws IOException {
        String accessToken = loginService.getAccessTokenService();
        String path = "pages/home/index";
        byte[] qrcode = loginService.getWeappQrcodeService(accessToken, path, 100);

        // 1. 存到本地
//        try {
//            // 1K的数据缓冲
//            byte[] bs = new byte[1024];
//            // 读取到的数据长度
//            int len;
//
//            BufferedInputStream inputStream = new BufferedInputStream(qrcode);
//            File file = new File("D:\\qrcode.jpg");
//            if (!file.exists()) {
//                file.createNewFile();
//            }
//
//            FileOutputStream fileOutputStream = new FileOutputStream(file);
//
//            while ((len = inputStream.read(bs)) != -1) {
//                fileOutputStream.write(bs, 0, len);
//                fileOutputStream.flush();
//            }
//            fileOutputStream.close();
//
//            return Result.success();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return Result.fail();
//        }

        // 2. 直接返回二进制流
        return Result.success(qrcode);
    }

}
