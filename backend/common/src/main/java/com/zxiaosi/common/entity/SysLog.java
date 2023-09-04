package com.zxiaosi.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 系统日志
 *
 * @author zxiaosi
 * @date 2023-08-28 17:35
 */
@Data
public class SysLog implements Serializable {

    /**
     * URI
     */
    private String uri;

    /**
     * URL
     */
    private String url;


    /**
     * 请求类型
     */
    private String method;

    /**
     * 请求参数
     */
    private Object params;

    /**
     * IP地址
     */
    private String ip;

    /**
     * 消耗时间
     */
    private Long spendTime;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createDate;

}
