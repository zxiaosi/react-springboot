package com.zxiaosi.web.service.impl;

import com.zxiaosi.common.entity.Resource;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.mapper.ResourceMapper;
import com.zxiaosi.web.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Resource> resources = resourceMapper.getResourcesByUserId(user.getId());
        return buildTreeMenu(resources);
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
