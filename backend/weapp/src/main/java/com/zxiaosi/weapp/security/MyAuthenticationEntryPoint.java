package com.zxiaosi.weapp.security;

import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.utils.GenericRespUtils;
import com.zxiaosi.common.utils.Result;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 未认证异常处理 - 401
 *
 * @author zxiaosi
 * @date 2023-08-22 11:12
 */
@Component
public class MyAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Result<?> result = Result.fail(authException.getMessage(), ResponseEnum.UNAUTHORIZED.getMsg());
        GenericRespUtils.resp(response, result, ResponseEnum.UNAUTHORIZED.getCode());
    }
}
