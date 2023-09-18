package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.User;

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

    /**
     * 根据 用户id 更新用户信息
     */
    void updateUserByUserId(User user);

    /**
     * 根据 用户名 获取用户信息
     */
    User getUserByUsername(String username);

}
