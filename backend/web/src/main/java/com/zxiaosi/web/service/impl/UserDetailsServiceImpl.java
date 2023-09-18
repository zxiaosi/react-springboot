package com.zxiaosi.web.service.impl;

import com.zxiaosi.common.entity.Role;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.mapper.RoleMapper;
import com.zxiaosi.common.mapper.UserDetailsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

/**
 * 实现 Spring Security 用户登录认证
 *
 * @author zxiaosi
 * @date 2023-08-29 23:51
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserDetailsPasswordService {

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private UserDetailsMapper userDetailsMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. 查询用户
        User user = userDetailsMapper.loadUserByUsername(username);
        if (ObjectUtils.isEmpty(user)) throw new UsernameNotFoundException("用户名或密码错误");

        // 2. 设置用户角色
        List<Role> roles = roleMapper.getRolesByUserId(user.getId());
        if (!roles.isEmpty()) {
            user.setRoles(roles);
        } else {
            roleMapper.getGuestRole();
            user.getRoles().add(roleMapper.getGuestRole()); // 未设置角色的用户默认为游客
        }

        return user;
    }

    @Override
    public UserDetails updatePassword(UserDetails user, String newPassword) {
        Integer result = userDetailsMapper.updatePassword(user.getUsername(), newPassword);
        if (result == 1) {
            ((User) user).setPassword(newPassword);
        }
        return user;
    }
}
