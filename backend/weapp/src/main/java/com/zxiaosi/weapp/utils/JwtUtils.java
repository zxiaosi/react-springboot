package com.zxiaosi.weapp.utils;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import cn.hutool.jwt.JWTValidator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * JWT工具类
 *
 * @author zxiaosi
 * @date 2023-08-14 18:39
 */
@Component
public class JwtUtils {

    private static String secret;

    /**
     * 密钥
     */
    @Value("${config.jwt.secret}")
    private void setSecret(String secret) {
        JwtUtils.secret = secret;
    }

    /**
     * 生成token
     */
    public static String createToken(String openId, Integer userId, int time) {

        DateTime now = DateTime.now(); // 当前时间

        DateTime expireDate = now.offsetNew(DateField.SECOND, time); // 过期时间

        HashMap<String, Object> payload = new HashMap<>();

        payload.put(JWTPayload.ISSUED_AT, now); // 签发时间

        payload.put(JWTPayload.NOT_BEFORE, now); // 生效时间

        payload.put(JWTPayload.EXPIRES_AT, expireDate); // 过期时间

        payload.put("openId", openId); // 存储信息
        payload.put("userId", userId);

        return JWTUtil.createToken(payload, secret.getBytes());
    }

    /**
     * 检验token是否有效
     */
    public static boolean verify(String token) {
        return JWTUtil.verify(token, secret.getBytes());
    }

    /**
     * 检验token是否过期
     */
    public static boolean validateDate(String token) {
        try {
            JWTValidator.of(token).validateDate(DateTime.now());
            return true;
        } catch (ValidateException e) {
            return false;
        }
    }

    /**
     * 获取token中变量
     */
    public static String getClaim(String token, String key) {
        return (String) parseToken(token).getPayload(key);
    }

    /**
     * 解密Token
     */
    public static JWT parseToken(String token) {
        return JWTUtil.parseToken(token);
    }
}
