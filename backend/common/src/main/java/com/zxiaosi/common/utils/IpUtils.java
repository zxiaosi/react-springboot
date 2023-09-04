package com.zxiaosi.common.utils;

import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * ip工具类
 *
 * @author zxiaosi
 * @date 2023-08-28 17:38
 */
public class IpUtils {
    private static final String UNKNOWN = "unknown";

    /**
     * 私有工具类, 防止 new 对象
     */
    private IpUtils() {
    }

    /**
     * 获取IP公网地址
     * <p>
     * 使用Nginx等反向代理软件， 则不能通过request.getRemoteAddr()获取IP地址
     * 如果使用了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP地址，X-Forwarded-For中第一个非unknown的有效IP字符串，则为真实IP地址
     */
    public static String getIpAddress(HttpServletRequest request) {
        if (request == null) {
            return "unknown";
        } else {
            // 获取nginx等代理的ip
            String ip = request.getHeader("x-forwarded-for");

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = request.getHeader("Proxy-Client-IP");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = request.getHeader("X-Forwarded-For");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = request.getHeader("WL-Proxy-Client-IP");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = request.getHeader("X-Real-IP");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = request.getRemoteAddr();
            }

            if ("0:0:0:0:0:0:0:1".equals(ip)) {
                ip = "127.0.0.1";
            }

            if (ip.contains(",")) {
                ip = ip.split(",")[0];
            }

            return ip;
        }
    }
}
