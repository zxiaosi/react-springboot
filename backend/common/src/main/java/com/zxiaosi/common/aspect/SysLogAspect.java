package com.zxiaosi.common.aspect;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.filter.SimplePropertyPreFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.zxiaosi.common.entity.SysLog;
import com.zxiaosi.common.utils.IpUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 日志切片
 *
 * @author zxiaosi
 * @date 2023-08-28 17:34
 */
@Aspect
@Component
public class SysLogAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(SysLogAspect.class);

    /**
     * 切入点
     */
    @Pointcut("execution(public * com.zxiaosi.*.controller.*.*(..))")
    public void sysLog() {
    }

    /**
     * 环绕通知 @Around, 当然也可以使用 @Before(前置通知) @After(后置通知)
     */
    @Around("sysLog()")
    public Object doAround(ProceedingJoinPoint point) throws Throwable {
        // 开始时间戳
        long startTime = System.currentTimeMillis();

        // 执行方法
        Object result = point.proceed();

        // 结束时间戳
        long endTime = System.currentTimeMillis();

        // 记录日志
        saveSysLog(point, endTime - startTime);

        return result;
    }

    public void saveSysLog(ProceedingJoinPoint joinPoint, long time) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = Objects.requireNonNull(attributes).getRequest();

        SysLog sysLogVo = new SysLog();
        sysLogVo.setParams(joinPoint.getArgs());
        sysLogVo.setUri(request.getRequestURI());
        sysLogVo.setUrl(request.getRequestURL().toString());
        sysLogVo.setMethod(request.getMethod());
        sysLogVo.setIp(IpUtils.getIpAddress(request));
        sysLogVo.setSpendTime(time);
        sysLogVo.setCreateDate(new Date());

        SimplePropertyPreFilter filter = new SimplePropertyPreFilter("file"); // 过滤掉 MultipartFile file 字段
        LOGGER.info("{}", JSON.toJSONString(sysLogVo, filter));
    }
}