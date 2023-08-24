package com.zxiaosi.common.security;

import cn.hutool.json.JSONUtil;
import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.utils.Result;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 未认证异常处理
 *
 * @author zxiaosi
 * @date 2023-08-22 11:12
 */
@Component
public class MyAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(ResponseEnum.UNAUTHORIZED.getCode());
        Result<Object> result = Result.fail(authException.getMessage(), ResponseEnum.UNAUTHORIZED.getMsg());
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().println(JSONUtil.toJsonStr(result));
    }
}
