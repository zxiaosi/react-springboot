/**
 * 加密的用户信息
 */
export interface GetUserInfoApi {
  code: string;
  encryptedData: string;
  iv: string;
}