package com.zxiaosi.web.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zxiaosi.common.constants.ResponseEnum;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 自定义Json登录过滤器
 *
 * @author zxiaosi
 * @date 2023-08-21 18:12
 */
public class MyUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 1. 判断当前登录请求是否是 POST 请求. 如果不是, 则抛出异常
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException(ResponseEnum.METHOD_NOT_ALLOWED.getMsg());
        }

        // 2. 判断请求格式是否是 JSON
        if (!request.getContentType().equalsIgnoreCase(MediaType.APPLICATION_JSON_VALUE)) {
            throw new AuthenticationServiceException(ResponseEnum.BAD_REQUEST.getMsg());
        }

        // 3. 接受请求参数
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String, String>>() {
        };

        Map<String, String> map = mapper.readValue(request.getInputStream(), typeReference);


        String username = map.get(getUsernameParameter()); // 获取用户名
        String password = map.get(getPasswordParameter()); // 获取密码

        if (ObjectUtils.isEmpty(username)) {
            throw new AuthenticationServiceException(ResponseEnum.EMPTY_USERNAME.getMsg());
        }

        if (ObjectUtils.isEmpty(password)) {
            throw new AuthenticationServiceException(ResponseEnum.EMPTY_PASSWORD.getMsg());
        }

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username.trim(), password); // 创建UsernamePasswordAuthenticationToken对象

        // Allow subclasses to set the "details" property
        setDetails(request, authRequest);
        return this.getAuthenticationManager().authenticate(authRequest); // 调用AuthenticationManager.authenticate()方法进行认证
    }
}
