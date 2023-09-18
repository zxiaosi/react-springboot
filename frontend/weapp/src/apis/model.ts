/**
 * 加密的用户信息
 */
export interface GetUserInfoApi {
  code?: string;
  encryptedData?: string;
  iv?: string;
}

/**
 * 更新用户信息
 */
export interface UpdateUserApi {
  id: number;
  username: string;
  password?: string;
  avatar?: string;
}