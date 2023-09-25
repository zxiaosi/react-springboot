package com.zxiaosi.common.utils;

import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

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
     * 获取图片存放路径
     * <a href="https://blog.csdn.net/weixin_43612925/article/details/123372621">参考</a>
     *
     * @return 绝对路径
     */
    public static String getSystemImagePath(String imagesPath) {
        String imagePath = "";
        try {
            // 获取根目录
            File path = new File(ResourceUtils.getURL("classpath:").getPath());
            if (!path.exists()) {
                path = new File("");
            }

            // 如果上传目录为/images/,则可以如下获取
            File upload = new File(path.getAbsolutePath() + imagesPath);
            if (!upload.exists()) {
                upload.mkdirs();
            }

            // 需要拼接一个 / 上面方法生成的路径缺少/
            imagePath = upload.getAbsolutePath() + File.separator;
        } catch (FileNotFoundException e) {
            System.out.println("getSystemImagePath 异常" + e);
        }

//        System.out.println("getSystemImagePath generate path = " + imagePath);
        return imagePath;
    }

}
