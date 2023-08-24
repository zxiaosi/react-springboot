package com.zxiaosi.common.service;

import com.zxiaosi.common.dao.UserDao;
import com.zxiaosi.common.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

/**
 * 根据用户名获取用户信息 - spring security 自定义获取用户信息
 *
 * @author zxiaosi
 * @date 2023-08-23 18:37
 */
@Service
public class MyUserDetailsService implements UserDetailsService, UserDetailsPasswordService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. 查询用户
        User user = userDao.loadUserByUsername(username);
        if (ObjectUtils.isEmpty(user)) throw new UsernameNotFoundException("用户名或密码错误");

        // 2. 设置用户角色
        user.setRoles(userDao.getRolesByUserId(user.getId()));

        return user;
    }

    @Override
    public UserDetails updatePassword(UserDetails user, String newPassword) {
        Integer result = userDao.updatePassword(user.getUsername(), newPassword);
        if (result == 1) {
            ((User) user).setPassword(newPassword);
        }
        return user;
    }
}
