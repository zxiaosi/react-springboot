package com.zxiaosi.weapp.controller;

import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.common.utils.PathUtils;
import com.zxiaosi.common.utils.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author zxiaosi
 * @date 2023-09-15 13:41
 */
@RestController
@RequestMapping("/api")
public class UploadController {

    @Value("${config.upload.path}")
    private String UPLOAD_PATH;


    @PostMapping("/upload")
    public Result<?> upload(@RequestParam("file") MultipartFile fileUpload) throws IOException {
        if (fileUpload.isEmpty()) {
            throw new CustomException("上传文件不能为空");
        }

        // 获取文件名
        String fileName = fileUpload.getOriginalFilename();

        // 获取文件后缀名
        String suffixName = null;
        if (fileName != null) {
            suffixName = fileName.substring(fileName.lastIndexOf("."));
        }

        // 生成新的文件名
        String newFileName = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()) + suffixName;

        // 获取项目下resources/static/img路径
        File saveFile = new File(PathUtils.getSavePath(this.getClass(), UPLOAD_PATH), newFileName);
        if (!saveFile.getParentFile().exists()) {  // 不存在，则创建该文件夹
            saveFile.getParentFile().mkdirs();
        }

        // 上传文件到本地
        fileUpload.transferTo(saveFile);

        return Result.success(newFileName);
    }

}
