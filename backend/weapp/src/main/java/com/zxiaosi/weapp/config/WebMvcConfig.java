package com.zxiaosi.weapp.config;

import com.zxiaosi.common.utils.PathUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 集成图片上传
 * <a href="https://blog.csdn.net/weixin_43612925/article/details/123372621">参考</a>
 *
 * @author zxiaosi
 * @date 2023-09-18 9:24
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${config.upload.path}")
    private String UPLOAD_PATH;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //class目录下的
//        registry
//                .addResourceHandler("/**") // 以什么样的路径来访问静态资源
//                .addResourceLocations("classpath:/static/"); // 指定静态资源文件的查找路径

        // 获取绝对路径
        String staticPath = "file:" + PathUtils.getSavePath(this.getClass(), UPLOAD_PATH) + "\\";
        System.out.println("图片映射路径: " + staticPath.replaceAll("\\\\", "/"));

        //windows目录下的
        registry.addResourceHandler("/images/**").addResourceLocations(staticPath.replaceAll("\\\\", "/"));
    }
}
