package com.zxiaosi.web.service.impl;

import cn.hutool.http.Header;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.web.service.LoginService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;

/**
 * @author zxiaosi
 * @date 2023-08-17 15:36
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Value("${config.weixin.appid}")
    private String appid;

    @Value("${config.weixin.secret}")
    private String secret;

    @Override
    public String getAccessTokenService() {
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}";
        String requestUrl = url.replace("{0}", appid).replace("{1}", secret);

        String result = HttpUtil.get(requestUrl);
        JSONObject object = JSON.parseObject(result);

        return object.getString("access_token");
    }

    @Override
    public byte[] getWeappQrcodeService(String accessToken, String path, Integer width) throws IOException {
        String url = "https://api.weixin.qq.com/wxa/getwxacode?access_token={0}";
        String requestUrl = url.replace("{0}", accessToken);

        HashMap<String, Object> params = new HashMap<>();
        params.put("path", path);
        params.put("width", width);
        String requestParams = JSON.toJSONString(params);

        HttpResponse response = HttpRequest.post(requestUrl)
                .header(Header.CONTENT_TYPE, "application/json")
                .body(requestParams)
                .execute();

        //  return response.bodyStream(); // 1. 返回流, 保存到本地

        return response.bodyBytes();  // 2. 直接返回

    }
}
