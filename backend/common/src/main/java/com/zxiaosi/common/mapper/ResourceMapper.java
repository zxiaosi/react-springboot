package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.Resource;

import java.util.List;

/**
 * @author zxiaosi
 * @date 2023-08-31 18:28
 */
public interface ResourceMapper {

    /**
     * 根据 用户id 获取资源集合
     */
    List<Resource> getResourcesByUserId(Integer userId);

}
