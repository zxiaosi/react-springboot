package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 用户 Mapper - spring security
 *
 * @author zxiaosi
 * @date 2023-08-29 23:35
 */
public interface UserDetailsMapper {

    /**
     * 根据 用户名 获取用户信息
     */
    User loadUserByUsername(String username);

    /**
     * 根据 用户名 更新密码
     */
    Integer updatePassword(@Param("username") String username, @Param("password") String password);

}
