package com.zxiaosi.weapp.service;


import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.entity.vo.AccountVo;
import com.zxiaosi.common.entity.vo.UserVo;

/**
 * 用户服务
 *
 * @author zxiaosi
 * @date 2023-08-28 18:50
 */
public interface UserService {

    /**
     * 校验 appId 是否正确
     *
     * @param appId appId
     * @return true|false
     */
    boolean checkAppidService(String appId);

    /**
     * 根据 code 创建 token
     *
     * @param code wx.login() 获取的 code
     * @return token
     */
    String createTokenService(String code);

    /**
     * 根据 用户id 获取用户信息包括权限 - spring security loadUserByUsername
     *
     * @param userId 用户id
     * @return List<Role>
     */
    User getUserRolesByUserIdService(Integer userId);

    /**
     * 根据 用户id 更新用户信息
     *
     * @param accountVo 用户信息
     */
    void updateUserService(AccountVo accountVo);

    /**
     * 获取当前用户
     */
    UserVo getCurrentUser();

}
