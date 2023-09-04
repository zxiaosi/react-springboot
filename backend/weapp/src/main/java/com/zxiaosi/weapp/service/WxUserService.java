package com.zxiaosi.weapp.service;

import com.alibaba.fastjson2.JSONObject;

/**
 * 微信用户服务
 *
 * @author zxiaosi
 * @date 2023-08-11 18:22
 */
public interface WxUserService {

    /*
      注意：个人开发者获取不到用户手机号, 只有企业开发者才能获取到用户手机号
      <p>
      <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95">获取用户手机号</a>
      <p>
      获取用户信息的两种方式:
      方式一: 请求微信服务器获取用户手机号 (新方式)
          1.1 根据 appid 和 appSecret 获取能够解密手机号的 Token (getPhoneTokenService)
          1.2 根据 Token 和 Code 获取解密后的手机号 (byTokenCodeGetPhoneService)
      方式二: 解密加密的用户手机号 (旧方式)
          2.1 根据 appid 和 appSecret 获取 openid 和 session_key (getOpenidSessionKeyService)
          2.2 根据 session_key、encryptedData、iv 解密手机号 (decryptPhoneService)
     */

    /**
     * 方式一: 请求微信服务器获取用户手机号 (新方式)
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html">
     * 1.1 根据 appid 和 appSecret 获取能够解密手机号的 Token
     * </a>
     *
     * @return 能够解密手机号的 Token
     */
    String getPhoneTokenService();

    /**
     * 方式一: 请求微信服务器获取用户手机号 (新方式)
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html">
     * 1.2 根据 Token 和 Code 获取解密后的手机号
     * </a>
     *
     * @param accessToken 能够获取解密手机号的 access_token
     * @param code        前端 getPhoneNumber 获取的动态令牌 code
     * @return 解密后的手机号
     */
    JSONObject byTokenCodeGetPhoneService(String accessToken, String code);

    /**
     * 方式二: 解密加密的用户手机号 (旧方式)
     * <p>
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html">
     * 2.1 根据 appid 和 appSecret 获取 openid 和 session_key
     * </a>
     *
     * @param code 前端 wx.login 获取的动态令牌 code
     * @return {openid, session_key}
     */
    JSONObject getOpenIdSessionKeyService(String code);

    /**
     * 方式二: 解密加密的用户手机号 (旧方式)
     * <p>
     * <<a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html">
     * 2.2 根据 session_key、encryptedData、iv 解密手机号
     * </a>
     *
     * @param session_key   会话密钥
     * @param encryptedData 加密手机号的数据
     * @param iv            加密算法的初始向量
     * @return 解密后的手机号
     */
    String decryptPhoneService(String session_key, String encryptedData, String iv);

}
