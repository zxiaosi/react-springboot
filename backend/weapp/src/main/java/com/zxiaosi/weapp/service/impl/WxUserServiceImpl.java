package com.zxiaosi.weapp.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.*;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.common.utils.AesCbUtils;
import com.zxiaosi.weapp.service.WxUserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * @author zxiaosi
 * @date 2023-08-11 18:23
 */
@Service
public class WxUserServiceImpl implements WxUserService {

    @Value("${config.weixin.appid}")
    private String appid;

    @Value("${config.weixin.secret}")
    private String secret;

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

    @Override
    public JSONObject byTokenCodeGetPhoneService(String accessToken, String code) {
        try {
            String url = "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token={0}";
            String requestUrl = url.replace("{0}", accessToken);

            HashMap<String, Object> params = new HashMap<>();
            params.put("code", code);
            String requestParams = JSON.toJSONString(params);

            String result = HttpUtil.post(requestUrl, requestParams);

            JSONObject object = JSONObject.parseObject(result);
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

    @Override
    public JSONObject getOpenIdSessionKeyService(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";
        String replaceUrl = url.replace("{0}", appid).replace("{1}", secret).replace("{2}", code);
        String result = HttpUtil.get(replaceUrl);

        JSONObject object = JSON.parseObject(result);

        String openId = object.getString("openid");
        if (StrUtil.isEmpty(openId)) {
            throw new CustomException("向微信服务器发送请求: code换取openId请求错误!");
        }

        return object;
    }

    @Override
    public String decryptPhoneService(String session_key, String encryptedData, String iv) {
        String decrypt = AesCbUtils.decrypt(encryptedData, session_key, iv);
        JSONObject object = JSON.parseObject(decrypt);
        System.out.println("decrypt: " + object);

        return object.getString("phone_info");
    }
}
