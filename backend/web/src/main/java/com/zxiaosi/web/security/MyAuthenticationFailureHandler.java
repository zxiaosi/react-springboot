package com.zxiaosi.web.security;

import com.zxiaosi.common.utils.GenericRespUtils;
import com.zxiaosi.common.utils.Result;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录失败回调
 *
 * @author zxiaosi
 * @date 2023-08-22 11:07
 */
@Component
public class MyAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        GenericRespUtils.resp(response, Result.fail(exception.getMessage()));
    }

}
