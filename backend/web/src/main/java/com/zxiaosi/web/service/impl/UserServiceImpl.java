package com.zxiaosi.web.service.impl;

import com.zxiaosi.common.mapper.UserMapper;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 *
 * @author zxiaosi
 * @date 2023-08-22 16:26
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserService() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userMapper.getUserByUserId(user.getId());
    }
}
