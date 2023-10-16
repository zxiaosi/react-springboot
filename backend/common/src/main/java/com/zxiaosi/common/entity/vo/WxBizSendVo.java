package com.zxiaosi.common.entity.vo;

import lombok.Data;

import java.util.Map;

/**
 * 小程序服务通知推送所需数据
 *
 * @author zxiaosi
 * @date 2023-10-16 18:15
 */
@Data
public class WxBizSendVo {

    /** 接收者（用户）的 openid */
    private String touser;

    /** 所需下发的订阅模板id */
    private String template_id;

    /** 跳转网页时填写 */
    private String page = "views/home/index";

    /** 跳转小程序时填写 */
    private MiniProgramVo miniprogram;

    /** 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } } */
    private Map<String, TemplateDataVo> data;
}
