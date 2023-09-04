package com.zxiaosi.weapp.security;

import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.utils.GenericRespUtils;
import com.zxiaosi.common.utils.Result;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 无权限异常处理 - 403
 *
 * @author zxiaosi
 * @date 2023-08-28 16:34
 */
public class MyAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        Result<?> result = Result.fail(accessDeniedException.getMessage(), ResponseEnum.FORBIDDEN.getMsg());
        GenericRespUtils.resp(response, result, ResponseEnum.FORBIDDEN.getCode());
    }

}
