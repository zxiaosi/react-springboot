package com.zxiaosi.common.utils;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * @author zxiaosi
 * @date 2023-08-14 18:39
 */
@Component
public class JwtUtils {
    /**
     * 密钥
     */
    @Value("${config.jwt.secret}")
    private String secret;

    /**
     * 生成JWT
     */
    public String jwtCreate(long userId, String openId, String appId, int time) {
        // 当前时间
        DateTime now = DateTime.now();
        // 过期时间
        DateTime expireDate = now.offsetNew(DateField.SECOND, time);

        HashMap<String, Object> payload = new HashMap<>();
        // 签发时间
        payload.put(JWTPayload.ISSUED_AT, now);
        // 过期时间
        payload.put(JWTPayload.EXPIRES_AT, expireDate);
        // 生效时间
        payload.put(JWTPayload.NOT_BEFORE, now);
        // 存储信息
        payload.put("userId", userId + "");
        payload.put("openId", openId);
        payload.put("appId", appId);

        return JWTUtil.createToken(payload, secret.getBytes());
    }

    /**
     * JWT验证
     */
    public boolean jwtVerify(String token) {
        return JWTUtil.verify(token, secret.getBytes());
    }

    /**
     * 获取JWT中变量
     */
    public String jwtParse(String token, String key) {
        JWT parseToken = JWTUtil.parseToken(token);
        return (String) parseToken.getPayload(key);
    }
}
