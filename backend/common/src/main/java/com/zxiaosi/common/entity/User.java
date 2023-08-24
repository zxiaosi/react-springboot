package com.zxiaosi.common.entity;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 用户实体类
 *
 * @author zxiaosi
 * @date 2023-08-16 16:58
 */
@Data
public class User implements UserDetails {

    /**
     * 用户id
     */
    private Integer id;

    /**
     * 用户昵称
     */
    private String username;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 用户手机号
     */
    private String phone;

    /**
     * 用户密码
     */
    private String password;

    /**
     * openid
     */
    private String openid;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 账号是否过期 - UserDetails中属性
     */
    private boolean accountNonExpired = true;

    /**
     * 账号是否被锁定 - UserDetails中属性
     */
    private boolean accountNonLocked = true;

    /**
     * 密码是否过期 - UserDetails中属性
     */
    private boolean credentialsNonExpired = true;

    /**
     * 账号是否可用 - UserDetails中属性
     */
    private boolean enabled = true;

    /**
     * 用户角色
     */
    private List<Role> roles = new ArrayList<>();

    // ------------------------------ get ----------------------------------

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * 返回权限信息
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        roles.forEach(role -> {
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(role.getName());
            authorities.add(simpleGrantedAuthority);
        });
        return authorities;
    }

}
