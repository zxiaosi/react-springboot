package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.Resource;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

/**
 * @author zxiaosi
 * @date 2023-08-31 18:28
 */
public interface ResourceMapper {

    /**
     * 根据 角色名集合 获取资源集合
     */
    List<Resource> getResourcesByRoleNames(List<String> roleNames);

}
