package com.zxiaosi.web.controller;

import com.zxiaosi.common.entity.vo.QrCodeVo;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.web.service.WxQrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * 用户扫描小程序二维码
 *
 * @author zxiaosi
 * @date 2023-08-29 23:53
 */
@RestController
public class WxQrCodeController {

    @Autowired
    private WxQrCodeService wxQrCodeService;

    @PostMapping("/wechat/qrcode")
    public Result<?> qrcode(@RequestBody QrCodeVo qrCodeVo) throws IOException {
        String accessToken = wxQrCodeService.getAccessTokenService();
        byte[] qrcode = wxQrCodeService.getQrCodeService(accessToken, qrCodeVo.getPath(), qrCodeVo.getWidth());

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
