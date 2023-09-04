package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.Role;

import java.util.List;

/**
 * 角色 Mapper
 * @author zxiaosi
 * @date 2023-08-31 18:22
 */
public interface RoleMapper {

    /**
     * 根据 用户id 获取角色集合
     */
    List<Role> getRolesByUserId(Integer userId);

    /**
     * 根据 请求url 获取角色集合
     */
    List<Role> getRolesByRequestUrl(String requestUrl);

}
