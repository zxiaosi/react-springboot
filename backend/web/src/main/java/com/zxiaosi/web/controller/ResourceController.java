package com.zxiaosi.web.controller;

import com.zxiaosi.common.utils.Result;
import com.zxiaosi.web.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zxiaosi
 * @date 2023-08-31 18:38
 */
@RestController
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @GetMapping("/menu")
    public Result<?> menu(){
        return Result.success(resourceService.getResourcesService());
    }

}
