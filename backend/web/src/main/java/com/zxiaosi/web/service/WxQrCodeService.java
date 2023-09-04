package com.zxiaosi.web.service;

import java.io.IOException;

/**
 * 获取小程序二维码服务
 *
 * @author zxiaosi
 * @date 2023-08-17 15:15
 */
public interface WxQrCodeService {

    /*
        获取小程序二维码 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/qr-code.html
     */

    /**
     * 获取小程序码
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html">1. 根据 appid 和 appSecret 获取能够生成小程序码的 Token</a>
     */
    String getAccessTokenService();

    /**
     * 获取小程序码
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getQRCode.html">2. 根据 accessToken 和 path 获取小程序码</a>
     *
     * @param accessToken 接口调用凭证
     * @param path        扫码进入的小程序页面路径，最大长度 128 字节，不能为空
     * @param width       二维码的宽度，单位 px，最小 280px，最大 1280px
     */
    byte[] getQrCodeService(String accessToken, String path, Integer width) throws IOException;

}
