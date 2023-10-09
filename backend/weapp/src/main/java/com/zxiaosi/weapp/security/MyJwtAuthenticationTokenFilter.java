package com.zxiaosi.weapp.security;

import cn.hutool.json.JSONObject;
import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.entity.User;
import com.zxiaosi.common.utils.GenericRespUtils;
import com.zxiaosi.weapp.utils.JwtUtils;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.weapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * JWT 认证过滤器 - 确保在一次请求只通过一次filter，而不需要重复执行
 *
 * @author zxiaosi
 * @date 2023-08-28 17:55
 */
@Component
public class MyJwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Value("${config.jwt.header}")
    private String header;

    @Value("${config.role.guest}")
    private String roleGuest;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String token = request.getHeader(header);

        if (ObjectUtils.isEmpty(token)) {
            chain.doFilter(request, response); // 如果没有 token 直接放行，Spring Security会因为其没有进行认证，抛出异常
            return;
        }

        if (!JwtUtils.verify(token)) { // token 格式不对
            ResponseEnum tokenFormatIssues = ResponseEnum.TOKEN_FORMAT_ISSUES;
            GenericRespUtils.resp(response, Result.fail(tokenFormatIssues.getCode(), tokenFormatIssues.getMsg()));
            return;
        }

        if (!JwtUtils.validateDate(token)) { // token 过期
            ResponseEnum tokenExpired = ResponseEnum.TOKEN_EXPIRED;
            GenericRespUtils.resp(response, Result.fail(tokenExpired.getCode(), tokenExpired.getMsg()));
            return;
        }

        // 从token中获取openId和userId
        JSONObject payloads = JwtUtils.parseToken(token).getPayloads();
        String openId = payloads.getStr("openId");
        Integer userId = payloads.getInt("userId");

        if (!ObjectUtils.isEmpty(userId) && !ObjectUtils.isEmpty(openId) && SecurityContextHolder.getContext().getAuthentication() == null) {

            User user = userService.getUserRolesByUserIdService(userId);

            List<SimpleGrantedAuthority> authorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

            if (ObjectUtils.isEmpty(authorities)) { // 如果没有角色，就给他一个游客角色
                authorities.add(new SimpleGrantedAuthority(roleGuest));
            }

            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(user, null, authorities); // 添加Token令牌
            SecurityContextHolder.getContext().setAuthentication(authRequest); // 将token加入安全上下文
            chain.doFilter(request, response);
        }
    }
}
