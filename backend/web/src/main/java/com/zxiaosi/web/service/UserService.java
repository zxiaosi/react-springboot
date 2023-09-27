package com.zxiaosi.web.service;

import com.zxiaosi.common.entity.vo.UserVo;

/**
 * 用户服务
 *
 * @author zxiaosi
 * @date 2023-08-22 16:25
 */
public interface UserService {

    /**
     * 获取当前用户
     */
    UserVo getCurrentUser();

}
