/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : stack

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 18/09/2023 18:14:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源名称',
  `level` smallint NOT NULL DEFAULT 0 COMMENT '层级: 0 目录 1 菜单 2 权限',
  `pid` int NOT NULL DEFAULT 0 COMMENT '父节点id',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标',
  `menu_url` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '页面路由',
  `request_url` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求url',
  `permission_code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限code',
  `is_deleted` smallint NULL DEFAULT 0 COMMENT '是否删除: 0 未删除 1 已删除',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES (1, '仪表盘', 1, 0, 'DashboardOutlined', '/dashboard', '/', '', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (2, '系统管理', 0, 0, 'SettingOutlined', '/system', '/system', 'sys', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (3, '用户管理', 1, 2, 'UserOutlined', '/system/user', '/user', 'sys:user', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (4, '用户列表', 2, 3, NULL, NULL, '/user/list', 'sys:user:list', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (5, '新增用户', 2, 3, NULL, NULL, '/user/add', 'sys:user:add', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (6, '编辑用户', 2, 3, NULL, NULL, '/user/update', 'sys:user:update', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (7, '角色管理', 1, 2, 'ClusterOutlined', '/system/role', '/role', 'sys:role', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (8, '资源管理', 1, 2, 'DatabaseOutlined', '/system/resource', '/resource', 'sys:resource', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (9, '公告通知', 1, 0, 'ScheduleOutlined', '/notice', '/notice', 'notice', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');
INSERT INTO `resource` VALUES (10, '日志记录', 1, 0, 'CloudServerOutlined', '/log', '/log', 'log', 0, '2023-08-26 22:47:06', '2023-08-26 22:47:06');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `description` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ROLE_ADMIN', '超级管理员', 0, '2023-08-23 18:33:20', '2023-08-23 18:33:20');
INSERT INTO `role` VALUES (2, 'ROLE_USER', '管理员', 0, '2023-08-23 18:33:20', '2023-08-23 18:33:20');
INSERT INTO `role` VALUES (3, 'ROLE_GUEST', '游客', 0, '2023-08-23 18:33:20', '2023-08-23 18:33:20');

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `role_id` int NOT NULL COMMENT '角色id',
  `resource_id` int NOT NULL COMMENT '资源id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_role_id_resource`(`role_id` ASC) USING BTREE,
  INDEX `fk_role_resource_id`(`resource_id` ASC) USING BTREE,
  CONSTRAINT `fk_role_id_resource` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES (1, 1, 1);
INSERT INTO `role_resource` VALUES (2, 1, 2);
INSERT INTO `role_resource` VALUES (3, 1, 3);
INSERT INTO `role_resource` VALUES (4, 1, 4);
INSERT INTO `role_resource` VALUES (5, 1, 5);
INSERT INTO `role_resource` VALUES (6, 1, 6);
INSERT INTO `role_resource` VALUES (7, 1, 7);
INSERT INTO `role_resource` VALUES (8, 1, 8);
INSERT INTO `role_resource` VALUES (9, 1, 9);
INSERT INTO `role_resource` VALUES (10, 1, 10);
INSERT INTO `role_resource` VALUES (11, 2, 1);
INSERT INTO `role_resource` VALUES (12, 3, 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信id',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`, `open_id`) USING BTREE,
  UNIQUE INDEX `open_id`(`open_id` ASC) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', NULL, NULL, '$2a$10$BsIORl/bIEwacv/blF62eOTwicVaNtKzQKJnDmYwLnZQRoJD/GVY6', '请输入自己的openId', 0, '2023-08-23 18:32:49', '2023-08-23 18:32:52');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` int NOT NULL COMMENT '用户id',
  `role_id` int NOT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user_id_role`(`user_id` ASC) USING BTREE,
  INDEX `fk_user_role_id`(`role_id` ASC) USING BTREE,
  CONSTRAINT `fk_user_id_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
