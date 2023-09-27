package com.zxiaosi.web.service.impl;

import com.zxiaosi.common.entity.vo.UserVo;
import com.zxiaosi.common.mapper.UserMapper;
import com.zxiaosi.web.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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
    public UserVo getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(authentication.getPrincipal(), userVo); // 深拷贝
        userVo.setRoleName(authentication.getAuthorities().toArray()[0].toString());

        return userVo;
    }
}
