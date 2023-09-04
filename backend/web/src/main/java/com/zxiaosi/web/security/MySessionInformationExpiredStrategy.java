package com.zxiaosi.web.security;

import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.utils.GenericRespUtils;
import com.zxiaosi.common.utils.Result;
import org.springframework.security.web.session.SessionInformationExpiredEvent;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import java.io.IOException;

/**
 * 会话过期处理
 *
 * @author zxiaosi
 * @date 2023-08-25 16:36
 */
@Component
public class MySessionInformationExpiredStrategy implements SessionInformationExpiredStrategy {

    @Override
    public void onExpiredSessionDetected(SessionInformationExpiredEvent event) throws IOException, ServletException {
        Result<?> result = Result.fail(ResponseEnum.OFFSITE_LOGIN.getMsg()); // 构建返回的结果对象
        GenericRespUtils.resp(event.getResponse(), result, ResponseEnum.UNAUTHORIZED.getCode());
    }

}
