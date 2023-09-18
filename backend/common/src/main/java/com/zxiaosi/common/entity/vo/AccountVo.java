package com.zxiaosi.common.entity.vo;

import lombok.Data;

/**
 * 账号
 *
 * @author zxiaosi
 * @date 2023-09-14 10:04
 */
@Data
public class AccountVo {

    private Integer id;

    private String username;

    private String password;

    private String avatar;
}
