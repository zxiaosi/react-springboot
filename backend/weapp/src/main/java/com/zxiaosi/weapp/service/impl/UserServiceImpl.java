package com.zxiaosi.weapp.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.*;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.common.utils.AesCbUtil;
import com.zxiaosi.weapp.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * @author zxiaosi
 * @date 2023-08-11 18:23
 */
@Service
public class UserServiceImpl implements UserService {

    @Value("${config.weixin.appid}")
    private String appid;

    @Value("${config.weixin.secret}")
    private String secret;

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html">
     * 官网链接【根据appid、secret、code换取session_key、openid】
     * </a>
     * <p>
     * 根据 appid 和 appSecret 获取 openid 和 session_key, 进而创建 Token
     *
     * @param code 前端 wx.login 获取的动态令牌 code
     * @return token
     */
    @Override
    public String generateTokenService(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";
        String replaceUrl = url.replace("{0}", appid).replace("{1}", secret).replace("{2}", code);
        String res = HttpUtil.get(replaceUrl);

        JSONObject object = JSON.parseObject(res);
        String openId = object.getString("openid");
        if (StrUtil.isEmpty(openId)) {
            throw new CustomException("向微信服务器发送请求: code换取openId请求错误!");
        }

        // 生成 token
        System.out.println("object: " + object);

        return null;
    }

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html">
     * 官网链接【根据appid、secret换取access_token】
     * </a>
     * <p>
     * 请求微信服务器获取用户手机号
     * 1. 根据 appid 和 appSecret 获取能够解密手机号的 Token
     *
     * @return 能够解密手机号的 Token
     */
    @Override
    public String getPhoneTokenService() {
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}";
        String requestUrl = url.replace("{0}", appid).replace("{1}", secret);
        String res = HttpUtil.get(requestUrl);

        String accessToken = JSON.parseObject(res).getString("access_token");
        if (StrUtil.isEmpty(accessToken)) {
            throw new CustomException("向微信服务器发送请求: 获取解密手机号的token失败!");
        }

        return accessToken;
    }

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html">
     * 官网链接【根据accessToken、code换取phone】
     * </a>
     * <p>
     * 请求微信服务器获取用户手机号
     * 2. 根据 Token 和 Code 获取解密后的手机号
     *
     * @param accessToken 能够获取解密手机号的 access_token (通过 getUserTokenService 获取)
     * @param code        前端 getPhoneNumber 获取的动态令牌 code
     * @return 解密后的手机号
     */
    @Override
    public JSONObject byTokenCodeGetPhoneService(String accessToken, String code) {
        try {
            String url = "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token={0}";
            String requestUrl = url.replace("{0}", accessToken);

            HashMap<String, Object> params = new HashMap<>();
            params.put("code", code);
            String requestParams = JSON.toJSONString(params);

            HttpResponse response = HttpRequest.post(requestUrl)
                    .header(Header.CONTENT_TYPE, "application/json")
                    .body(requestParams)
                    .execute();

            JSONObject object = JSONObject.parseObject(response.body());
            Integer errcode = object.getInteger("errcode");

            if (errcode != 0) {
                throw new CustomException("向微信服务器发送请求: 格式错误, 解密手机号失败!");
            }

            return object.getJSONObject("phone_info");
        } catch (HttpException e) {
            e.printStackTrace();
            throw new CustomException("向微信服务器发送请求: 解密手机号请求出错!");
        }
    }

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html">
     * 官网链接【根据appid、secret、code换取session_key、openid】
     * </a>
     * <p>
     * <a href="https://doc.hutool.cn/pages/SymmetricCrypto/#aes%E5%B0%81%E8%A3%85">AES封装</a>
     * <p>
     * <a href="https://github.com/dromara/hutool/issues/2661#issuecomment-1280567307">Github示例</a>
     * <p>
     * 解密加密的用户手机号
     *
     * @param code          前端 wx.login 获取的动态令牌 code
     * @param encryptedData 加密手机号的数据
     * @param iv            加密算法的初始向量
     * @return 解密后的手机号
     */
    @Override
    public String decryptPhoneService(String code, String encryptedData, String iv) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";
        String replaceUrl = url.replace("{0}", appid).replace("{1}", secret).replace("{2}", code);
        String res = HttpUtil.get(replaceUrl);

        JSONObject object = JSON.parseObject(res);
        String openId = object.getString("openid");
        if (StrUtil.isEmpty(openId)) {
            throw new CustomException("向微信服务器发送请求: code换取openId请求错误!");
        }

        String session_key = object.getString("session_key");
        String decrypt = AesCbUtil.decrypt(encryptedData, session_key, iv);
        System.out.println("decrypt: " + JSON.parseObject(decrypt));

        return null;
    }

}
