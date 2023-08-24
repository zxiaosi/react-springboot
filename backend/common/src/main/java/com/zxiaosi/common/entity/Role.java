package com.zxiaosi.common.entity;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 角色实体类
 *
 * @author zxiaosi
 * @date 2023-08-16 18:02
 */
@Data
public class Role implements Serializable {

    /**
     * 角色id
     */
    private Integer id;

    /**
     * 角色名
     */
    private String name;

    /**
     * 角色code
     */
    private String code;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

}
