package com.zxiaosi.common.utils;

import cn.hutool.json.JSONUtil;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 生成响应工具类
 *
 * @author zxiaosi
 * @date 2023-08-31 12:14
 */
public class GenericRespUtils<T> {

    public static <T> void resp(HttpServletResponse response, Result<T> result) throws IOException {
        response.setContentType("application/json;charset=utf-8"); // 设置响应类型及编码
        response.getWriter().println(JSONUtil.toJsonStr(result)); // 将对象转为json字符串
        response.flushBuffer(); // 刷新缓冲区
    }

    public static <T> void resp(HttpServletResponse response, Result<T> result, int status) throws IOException {
        response.setStatus(status); // 设置响应状态码
        resp(response, result);
    }
}
