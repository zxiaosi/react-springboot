package com.zxiaosi.weapp.service;

import com.alibaba.fastjson2.JSONObject;

/**
 * @author zxiaosi
 * @date 2023-08-11 18:22
 */
public interface UserService {

    /**
     * 注意：个人开发者获取不到用户手机号, 只有企业开发者才能获取到用户手机号
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95">获取用户手机号</a>
     * <p>
     * 获取用户信息的两种方式:
     * 方式一: 请求微信服务器获取用户手机号 (新方式)
     *     1. 根据 appid 和 appSecret 获取能够解密手机号的 Token (getPhoneTokenService)
     *     2. 根据 Token 和 Code 获取解密后的手机号 (byTokenCodeGetPhoneService)
     * 方式二: 解密加密的用户手机号 (旧方式)
     *     1. 根据 code、encryptedData、iv 解密手机号 (decryptPhoneService)
     */

    /**
     * 根据 appid 和 appSecret 获取 openid 和 session_key, 进而创建 Token
     *
     * @param code 前端 wx.login 获取的动态令牌 code
     * @return Token
     */
    String generateTokenService(String code);


    /**
     * 请求微信服务器获取用户手机号
     * 1. 根据 appid 和 appSecret 获取能够解密手机号的 Token
     *
     * @return 能够解密手机号的 Token
     */
    String getPhoneTokenService();

    /**
     * 请求微信服务器获取用户手机号
     * 2. 根据 Token 和 Code 获取解密后的手机号
     *
     * @param accessToken 能够获取解密手机号的 access_token
     * @param code        前端 getPhoneNumber 获取的动态令牌 code
     * @return 解密后的手机号
     */
    JSONObject byTokenCodeGetPhoneService(String accessToken, String code);

    /**
     * 解密加密的用户手机号
     *
     * @param code          前端 wx.login 获取的动态令牌 code
     * @param encryptedData 加密手机号的数据
     * @param iv            加密算法的初始向量
     * @return 解密后的手机号
     */
    String decryptPhoneService(String code, String encryptedData, String iv);
}
