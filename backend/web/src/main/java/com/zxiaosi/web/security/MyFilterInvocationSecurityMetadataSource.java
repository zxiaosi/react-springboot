package com.zxiaosi.web.security;

import com.zxiaosi.common.entity.Role;
import com.zxiaosi.common.mapper.RoleMapper;
import com.zxiaosi.common.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 动态获取url权限配置
 *
 * @author zxiaosi
 * @date 2023-08-30 16:06
 */
@Component
public class MyFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        // 获取请求 url
        String requestUrl = ((FilterInvocation) object).getRequestUrl();

        // 声明集合
        Set<ConfigAttribute> set = new HashSet<>();

        // 获取拥有url的角色集合
        List<Role> roles = roleMapper.getRolesByRequestUrl(requestUrl);

        if (!CollectionUtils.isEmpty(roles)) {
            roles.forEach(role -> {
                SecurityConfig securityConfig = new SecurityConfig(role.getName());
                set.add(securityConfig);
            });
        }

        if (ObjectUtils.isEmpty(set)) {
            return SecurityConfig.createList("ROLE_GUEST"); // 游客身份
        }

        return set;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }


    /**
     * 是否能为 Class 提供 Collection<ConfigAttribute>
     */
    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}
