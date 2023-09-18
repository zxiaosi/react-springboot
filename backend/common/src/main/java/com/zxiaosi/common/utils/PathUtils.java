package com.zxiaosi.common.utils;

import org.springframework.boot.system.ApplicationHome;

/**
 * 路径工具类
 *
 * @author zxiaosi
 * @date 2023-09-18 15:14
 */
public class PathUtils {

    public PathUtils() {

    }

    /**
     * 获取绝对路径
     *
     * @param clazz 父类
     * @param path  路径
     * @return 绝对路径
     */
    public static String getSavePath(Class<?> clazz, String path) {
        // 这里需要注意的是ApplicationHome是属于SpringBoot的类
        // 获取项目下resources/static/img路径
        ApplicationHome applicationHome = new ApplicationHome(clazz);

        // 保存目录位置根据项目需求可随意更改
        return applicationHome.getDir().getParentFile().getParentFile().getAbsolutePath() + path;
    }

}
