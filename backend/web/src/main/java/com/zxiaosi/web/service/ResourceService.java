package com.zxiaosi.web.service;

import com.zxiaosi.common.entity.Resource;

import java.util.List;

/**
 * 资源服务实现类
 *
 * @author zxiaosi
 * @date 2023-08-31 18:26
 */
public interface ResourceService {

    /**
     * 得到用户资源集合
     */
    List<Resource> getResourcesService();

    /**
     * 组装菜单
     */
    List<Resource> buildTreeMenu(List<Resource> resources);

}
