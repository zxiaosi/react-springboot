package com.zxiaosi.web.service.impl;

import com.zxiaosi.common.entity.Resource;
import com.zxiaosi.common.entity.Role;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.mapper.ResourceMapper;
import com.zxiaosi.web.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 资源服务
 *
 * @author zxiaosi
 * @date 2023-08-31 18:27
 */
@Service
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private ResourceMapper resourceMapper;

    @Override
    public List<Resource> getResourcesService() {
        Collection<? extends GrantedAuthority> authentication = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        List<String> roleNames = authentication.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()); // 将权限集合转换为角色名集合
        return buildTreeMenu(resourceMapper.getResourcesByRoleNames(roleNames));
    }

    @Override
    public List<Resource> buildTreeMenu(List<Resource> resources) {
        ArrayList<Resource> finalMenus = new ArrayList<>();

        // 给当前的menu的所有子类都找到, 先各自寻找的各自的孩子
        for (Resource menu : resources) {
            // 找到所有的一级菜单
            if (menu.getPid() == 0) {
                finalMenus.add(menu);
            }

            // 找到所有的二级菜单
            for (Resource child : resources) {
                if (menu.getId().equals(child.getPid())) {
                    menu.getChildren().add(child);
                }
            }
        }

        return finalMenus;
    }
}
