package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.Role;
import com.zxiaosi.common.entity.User;

import java.util.List;

/**
 * 用户 Mapper
 *
 * @author zxiaosi
 * @date 2023-08-22 16:20
 */
public interface UserMapper {
    /**
     * 根据 用户id 获取用户信息
     */
    User getUserByUserId(Integer userId);


    /**
     * 根据 openId 获取用户信息
     */
    User getUserByOpenId(String openId);

    /**
     * 插入用户信息
     */
    void insertUser(User user);

}
