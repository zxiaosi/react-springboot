## Demo

### 项目目录

```sh
⊢ backend																				# 后端
	⨽ common																			# 公共模块
		⨽ src
			⨽ main
				⨽ java
					⨽ com.zxiaosi.common
						⨽ dao															# dao层
						⨽ entity														# 实体类
						⨽ security														# 安全配置
						⨽ utils															# 工具类
				⨽ resources
					⨽ mapper															# mapper
		⨽ pom.xml																		# 包文件
	⨽ weapp
		⨽ src
			⨽ main
				⨽ java
					⨽ com.zxiaosi.weapp
						⨽ controller													# 控制层
						⨽ WeappApplication.java											 # 启动入口
				⨽ resources
					⨽ application.yml													 # 配置文件
		⨽ pom.xml																		# 包文件
	⨽ web
		⨽ src
			⨽ main
				⨽ java
					⨽ com.zxiaosi.web
						⨽ controller													# 控制层
						⨽ WebApplication.java											 # 启动入口
				⨽ resources
					⨽ application.yml													 # 配置文件
		⨽ pom.xml																		# 包文件
⊢ frontend
	⨽ weapp
		⨽ config																		# 配置文件
		⨽ src
			⨽ pages																		# 页面
				⨽ index
					⨽ index.config.ts
					⨽ index.module.less
					⨽ index.tsx
			⨽ app.config.ts																# 项目全局配置
			⨽ app.less																	# 样式文件
			⨽ app.ts																	# 根组件
			⨽ index.html																# 项目入口
		⨽ types
		⨽ project.config.json															# 小程序配置
		⨽ tsconfig.json																	# 编译配置
	⨽ web
		⨽ src
			⨽ assets																	# 静态文件
				⨽ css
				⨽ img
				⨽ js
					⨽ global.ts															# 全局配置文件
			⨽ components																# 封装的组件
			⨽ router																	# 路由
			⨽ stores																	# 状态管理
			⨽ views																		# 页面
			⨽ App.vue																	# 根组件
			⨽ main.ts																	# 入口文件
		⨽ index.html																	# 项目入口
		⨽ vite.config.ts
⊢ nginx.conf
⊢ README.md
```



