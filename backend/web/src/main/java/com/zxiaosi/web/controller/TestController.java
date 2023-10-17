package com.zxiaosi.web.controller;

import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * 测试接口
 *
 * @author zxiaosi
 * @date 2023-10-17 15:01
 */
@RestController
@RequestMapping("/api")
public class TestController {

    @RequestMapping("/test")
    public Result<?> test() {
        String url = "temp.png";
        int[][] arr = {
                {70, 40, 56, 73},
                {155, 35, 46, 63},
                {242, 78, 47, 65},
                {165, 195, 75, 102},
                {385, 70, 47, 65},
                {390, 168, 90, 115},
                {448, 26, 47, 65}
        };

        HashMap<String, Object> result = new HashMap<>();
        result.put("url", url);
        result.put("axis", arr);

        return Result.success(result);
    }

}
