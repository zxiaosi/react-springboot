package com.zxiaosi.weapp.service.impl;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.entity.vo.AccountVo;
import com.zxiaosi.common.mapper.RoleMapper;
import com.zxiaosi.common.mapper.UserMapper;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.weapp.utils.JwtUtils;
import com.zxiaosi.weapp.service.UserService;
import com.zxiaosi.weapp.service.WxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

/**
 * @author zxiaosi
 * @date 2023-08-28 18:51
 */
@Service
public class UserServiceImpl implements UserService {

    @Value("${config.weixin.appid}")
    private String appid;

    @Value("${config.jwt.expire}")
    private String expire;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private WxUserService wxUserService;

    @Override
    public boolean checkAppidService(String appId) {
        return appid.equals(appId);
    }

    @Transactional
    @Override
    public String createTokenService(String code) {
        JSONObject openidSessionKey = wxUserService.getOpenIdSessionKeyService(code);
        String openId = openidSessionKey.getString("openid");

        if (StrUtil.isEmpty(openId)) {
            throw new CustomException("向微信服务器发送请求: code换取openId请求错误!");
        }

        User user = userMapper.getUserByOpenId(openId);

        if (ObjectUtils.isEmpty(user)) {
            user = new User();
            user.setOpenId(openId);
            user.setUsername("微信用户" + openId.substring(openId.length() - 4));
            user.setPassword(new BCryptPasswordEncoder().encode("123456"));
            userMapper.insertUser(user);
        }

        return JwtUtils.createToken(openId, user.getId(), Integer.parseInt(expire));
    }

    @Transactional
    @Override
    public User getUserRolesByUserIdService(Integer userId) {
        User user = userMapper.getUserByUserId(userId);

        if (ObjectUtils.isEmpty(user)) throw new CustomException("用户不存在!");

        user.setRoles(roleMapper.getRolesByUserId(user.getId()));

        return user;
    }

    @Transactional
    @Override
    public void updateUserService(AccountVo accountVo) {
        try {
            User user = new User();
            user.setId(accountVo.getId());
            user.setUsername(accountVo.getUsername());
            if (!ObjectUtils.isEmpty(accountVo.getPassword())) {
                user.setPassword(new BCryptPasswordEncoder().encode(accountVo.getPassword()));
            }
            user.setAvatar(accountVo.getAvatar());

            userMapper.updateUserByUserId(user);
        } catch (Exception e) {
            throw new CustomException("更新用户信息失败!");
        }
    }

}
