package com.zxiaosi.web.service.impl;

import com.zxiaosi.common.dao.UserDao;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

/**
 * @author zxiaosi
 * @date 2023-08-22 16:26
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User listUser() {
        return userDao.selectUser(1);
    }

}
