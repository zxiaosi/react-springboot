package com.zxiaosi.web.security;

import com.zxiaosi.common.entity.vo.UserVo;
import com.zxiaosi.common.utils.GenericRespUtils;
import com.zxiaosi.common.utils.Result;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录成功回调
 *
 * @author zxiaosi
 * @date 2023-08-22 11:11
 */
@Component
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(authentication.getPrincipal(), userVo); // 深拷贝
        GenericRespUtils.resp(response, Result.success(userVo));
    }

}
