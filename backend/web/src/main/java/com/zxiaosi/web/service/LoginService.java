package com.zxiaosi.web.service;

import java.io.IOException;

/**
 * @author zxiaosi
 * @date 2023-08-17 15:15
 */
public interface LoginService {

    /*
        获取小程序二维码 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/qr-code.html
     */

    /**
     * 获取小程序码
     * 1. 根据 appid 和 appSecret 获取能够生成小程序码的 Token
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html">获取小程序全局唯一后台接口调用凭据</a>
     */
    String getAccessTokenService();

    /**
     * 获取小程序码
     * 2. 根据 accessToken 和 path 获取小程序码
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getQRCode.html">获取小程序码</a>
     */
    byte[] getWeappQrcodeService(String accessToken, String path, Integer width) throws IOException;

}
