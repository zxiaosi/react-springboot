package com.zxiaosi.common.dao;

import com.zxiaosi.common.entity.Role;
import com.zxiaosi.common.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 用户Dao
 *
 * @author zxiaosi
 * @date 2023-08-22 16:20
 */
public interface UserDao {

    User selectUser(@Param("id") Integer id);

    /**
     * 根据用户名获取用户信息
     */
    User loadUserByUsername(String username);

    /**
     * 根据用户 id 查询角色信息方法
     */
    List<Role> getRolesByUserId(Integer id);

    /**
     * 根据用户名更新密码方法
     */
    Integer updatePassword(@Param("username") String username, @Param("password") String password);

}
