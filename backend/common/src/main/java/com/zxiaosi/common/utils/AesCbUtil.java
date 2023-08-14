package com.zxiaosi.common.utils;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.crypto.Mode;
import cn.hutool.crypto.Padding;
import cn.hutool.crypto.symmetric.AES;

import java.util.Base64;

/**
 * AES 解密工具类
 *
 * @author zxiaosi
 * @date 2023-08-14 0:04
 */
public class AesCbUtil {
    /**
     * 1. 可解密微信小程序的加密的用户信息, 解密出来也是默认的信息. (nickName、avatarUrl)
     * 2. 可解密微信小程序的加密的用户手机号. (phoneNumber、purePhoneNumber、countryCode、watermark)
     * <p>
     * <a href="https://github.com/dromara/hutool/issues/2661#issuecomment-1280567307">AES解密</a>
     * <p>
     * 注意:
     * button 触发获取手机号的那个按钮里不要写 wx.login！！！
     * 在 onLoad 里写 wx.login 保存在本地后登录的时候带上这个 code 参数就行了。
     * 否则会出现 pad block corrupted 问题。在 button 里写 wx.login 会导致 session_key 变化，导致解密失败。
     * <a href="https://blog.csdn.net/zhanglf02/article/details/100124091">pad block corrupted 问题</a>
     *
     * @param encryptedData 密文，被加密的数据
     * @param session_key   秘钥 (code 换取的 session_key)
     * @param iv            偏移量
     * @return 解密后的数据
     */
    public static String decrypt(String encryptedData, String session_key, String iv) {
        byte[] encryptedDataByte = Base64.getDecoder().decode(encryptedData);
        byte[] sessionKeyByte = Base64.getDecoder().decode(session_key);
        byte[] ivByte = Base64.getDecoder().decode(iv);

        AES aes = new AES(Mode.CBC, Padding.ISO10126Padding, sessionKeyByte, ivByte);
        String decrypt = aes.decryptStr(encryptedDataByte, CharsetUtil.CHARSET_UTF_8);

        return decrypt;
    }
}
