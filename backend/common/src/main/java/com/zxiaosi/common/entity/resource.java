package com.zxiaosi.common.entity;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 资源实体类
 *
 * @author zxiaosi
 * @date 2023-08-16 18:14
 */
@Data
public class resource implements Serializable {

    /**
     * 资源id
     */
    private Long id;

    /**
     * 资源名
     */
    private String name;

    /**
     * 资源Level 0:目录 1:菜单 2:按钮 10:小程序路由
     */
    private Integer level;

    /**
     * 资源父id
     */
    private Integer pid;

    /**
     * 资源路径
     */
    private String url;

    /**
     * 资源图标
     */
    private String icon;

    /**
     * 请求url
     */
    private String requestUrl;

    /**
     * 资源code
     */
    private String permissionCode;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

}
