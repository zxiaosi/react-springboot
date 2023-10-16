package com.zxiaosi.weapp.service.impl;

import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.entity.vo.MiniProgramVo;
import com.zxiaosi.common.entity.vo.TemplateDataVo;
import com.zxiaosi.common.entity.vo.WxBizSendVo;
import com.zxiaosi.weapp.service.WxBizSendService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 微信服务通知推送
 *
 * @author zxiaosi
 * @date 2023-10-16 17:59
 */
@Service
public class WxBizSendServiceImpl implements WxBizSendService {

    @Value("${config.weixin.appid}")
    private String appid;

    @Value("${config.weixin.secret}")
    private String secret;

    @Value("${config.weixin.tmplId}")
    private String tmplId;

    @Override
    public String getAccessTokenService() {
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}";
        String requestUrl = url.replace("{0}", appid).replace("{1}", secret);

        String result = HttpUtil.get(requestUrl);
        JSONObject object = JSON.parseObject(result);

        return object.getString("access_token");
    }

    @Override
    public boolean sendBizForUser(String accessToken, String issue) {
        String url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token={0}";
        String requestUrl = url.replace("{0}", accessToken);

        // 跳转小程序所需数据
        MiniProgramVo miniProgramVo = new MiniProgramVo();
        miniProgramVo.setAppid(appid);
        miniProgramVo.setPagepath("views/home/index");

        // 模板内容
        HashMap<String, TemplateDataVo> params = new HashMap<>();
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        params.put("phrase6", new TemplateDataVo("已提交"));
        params.put("thing3", new TemplateDataVo(issue));
        params.put("time5", new TemplateDataVo(simpleDateFormat.format(date)));

        // 模板消息
        WxBizSendVo wxBizSendVo = new WxBizSendVo();
        wxBizSendVo.setTemplate_id(tmplId);
        wxBizSendVo.setMiniprogram(miniProgramVo);
        wxBizSendVo.setData(params);
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        wxBizSendVo.setTouser(principal.getOpenId());

        String result = HttpUtil.post(requestUrl, JSONObject.toJSONString(wxBizSendVo));
        JSONObject object = JSON.parseObject(result);

        return object.getString("errmsg").equals("ok");
    }
}
