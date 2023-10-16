package com.zxiaosi.weapp.service;

/**
 * 微信服务通知推送
 *
 * @author zxiaosi
 * @date 2023-10-16 17:49
 */
public interface WxBizSendService {

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html">根据 appid 和 appSecret 获取能够生成小程序码的 Token</a>
     */
    String getAccessTokenService();

    /**
     * <a href="https://developers.weixin.qq.com/doc/offiaccount/Subscription_Messages/api.html#send%E5%8F%91%E9%80%81%E8%AE%A2%E9%98%85%E9%80%9A%E7%9F%A5">发送模板消息</a>
     *
     * @param accessToken 通过 getAccessTokenService() 获取
     * @param issue       问题
     */
    boolean sendBizForUser(String accessToken, String issue);
}
