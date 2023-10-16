package com.zxiaosi.common.entity.vo;

import lombok.Data;

/**
 * 模板内容
 *
 * @author zxiaosi
 * @date 2023-10-16 18:38
 */
@Data
public class TemplateDataVo {

    /**
     * 模板内容
     */
    private String value;

    public TemplateDataVo(String value) {
        this.value = value;
    }
}
