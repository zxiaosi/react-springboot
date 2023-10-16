package com.zxiaosi.common.entity.vo;

import lombok.Data;

/**
 * 跳小程序所需数据
 *
 * @author zxiaosi
 * @date 2023-10-16 18:17
 */
@Data
public class MiniProgramVo {

    /**
     * 所需跳转到的小程序appid
     */
    private String appid;

    /**
     * 所需跳转到小程序的具体页面路径，支持带参数,（示例index?foo=bar）
     */
    private String pagepath;

}
