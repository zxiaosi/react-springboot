package com.zxiaosi.common.security;

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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * web - 自定义Json登录过滤器
 *
 * @author zxiaosi
 * @date 2023-08-21 18:12
 */
public class WebUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 1. 判断当前登录请求是否是 POST 请求. 如果不是, 则抛出异常
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException(ResponseEnum.METHOD_NOT_ALLOWED.getMsg() + request.getMethod());
        }

        // 2. 判断请求格式是否是 JSON
        if (request.getContentType().equalsIgnoreCase(MediaType.APPLICATION_JSON_VALUE)) {

            ObjectMapper mapper = new ObjectMapper();
            TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String, String>>() {
            };

            Map<String, String> map = mapper.readValue(request.getInputStream(), typeReference); // 从输入流中获取json数据

            String username = map.get(getUsernameParameter()); // 获取用户名
            String password = map.get(getPasswordParameter()); // 获取密码

            if (username == null) {
                throw new AuthenticationServiceException("用户名不能为空!");
            }

            if (password == null) {
                throw new AuthenticationServiceException("密码不能为空!");
            }

            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username.trim(), password); // 创建UsernamePasswordAuthenticationToken对象

            // Allow subclasses to set the "details" property
            setDetails(request, authRequest);
            return this.getAuthenticationManager().authenticate(authRequest); // 调用AuthenticationManager.authenticate()方法进行认证
        }

        return super.attemptAuthentication(request, response); // 兼容原有的表单登录
    }
}
