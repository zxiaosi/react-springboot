package com.zxiaosi.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Transient;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

/**
 * 资源实体类
 *
 * @author zxiaosi
 * @date 2023-08-16 18:14
 */
@Data
public class Resource implements Serializable {

    /**
     * 资源id
     */
    private Integer id;

    /**
     * 资源名
     */
    private String name;

    /**
     * 资源Level 0:目录 1:菜单 2:按钮 10:小程序路由
     */
    @JsonIgnore
    private Integer level;

    /**
     * 资源父id
     */
    @JsonIgnore
    private Integer pid;

    /**
     * 资源图标
     */
    private String icon;

    /**
     * 资源路径
     */
    private String menuUrl;

    /**
     * 请求url
     */
    @JsonIgnore
    private String requestUrl;

    /**
     * 资源code
     */
    @JsonIgnore
    private String permissionCode;

    /**
     * 是否删除
     */
    private Short isDeleted;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    /**
     * 是否是子节点
     */
    @Transient
    private ArrayList<Resource> children = new ArrayList<>();

}
