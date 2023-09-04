package com.zxiaosi.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.*;

/**
 * 用户实体类
 *
 * @author zxiaosi
 * @date 2023-08-16 16:58
 */
@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS) // 防止 spring session 序列化 直接访问接口报错
public class User implements UserDetails, Serializable {

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
    @JsonIgnore
    private String password;

    /**
     * openId
     */
    @JsonIgnore
    private String openId;

    /**
     * 是否删除
     */
    private Short isDeleted;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    /**
     * 账号是否过期 - UserDetails中属性
     */
    @JsonIgnore
    private boolean accountNonExpired = true;

    /**
     * 账号是否被锁定 - UserDetails中属性
     */
    @JsonIgnore
    private boolean accountNonLocked = true;

    /**
     * 密码是否过期 - UserDetails中属性
     */
    @JsonIgnore
    private boolean credentialsNonExpired = true;

    /**
     * 账号是否可用 - UserDetails中属性
     */
    @JsonIgnore
    private boolean enabled = true;

    /**
     * 用户角色
     */
    @JsonIgnore
    private List<Role> roles = new ArrayList<>();

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
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        roles.forEach(role -> {
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(role.getName());
            authorities.add(simpleGrantedAuthority);
        });
        return authorities;
    }

}
