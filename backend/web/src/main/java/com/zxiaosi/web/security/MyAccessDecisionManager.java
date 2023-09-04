package com.zxiaosi.web.security;

import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.entity.Role;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

/**
 * 权限策略管理
 *
 * @author zxiaosi
 * @date 2023-08-30 16:01
 */
@Component
public class MyAccessDecisionManager implements AccessDecisionManager {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {


        // 这里判断用户拥有的角色和该url需要的角色是否有匹配
        for (ConfigAttribute configAttribute : configAttributes) {

            // 当前请求需要的权限
            String needRole = configAttribute.getAttribute();

            // 游客不需要权限
            if ("ROLE_GUEST".equals(needRole)) {
                return;
            }

            // 方式一: 直接从当前登录用户中, 获取用户拥有的所有权限信息
            // Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();

            // 方式二: 从数据库中查询获得
            User user = (User) authentication.getPrincipal();
            List<Role> roles = roleMapper.getRolesByUserId(user.getId());

            for (Role role : roles) {
                // 包含其中一个即可访问
                if (needRole.equals(role.getName())) {
                    return;
                }
            }
        }

        // 没有匹配就抛出异常
        throw new AccessDeniedException(ResponseEnum.FORBIDDEN.getMsg());
    }

    /**
     * 此 AccessDecisionManager 实现是否可以处理传递的 ConfigAttribute
     */
    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    /**
     * 此 AccessDecisionManager 实现是否能够提供该对象类型的访问控制决策。
     */
    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}
