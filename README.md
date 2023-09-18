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

### nginx

```sh
server {
    listen       80;
    listen  [::]:80;
    server_name  zxiaosi.cn;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/vue3_fastapi;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html; # 防止页面刷新404
    }

    location /api {
        client_max_body_size 5m;
        proxy_pass http://fastapi:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/avatar/ {
        proxy_pass http://fastapi:8000/static/avatar/;
    }

    location /api/docs {
        proxy_pass http://fastapi:8000/docs;
    }

    location /api/redoc {
        proxy_pass http://fastapi:8000/redoc;
    }

    location /openapi.json { # openapi 地址 (如果代理上述文档地址, 请务必添加 openapi 的代理)
        proxy_pass http://fastapi:8000/openapi.json;
    }
}

server {
    listen       443 ssl;
    listen  [::]:443 ssl;
    server_name  zxiaosi.cn;

    ssl_certificate  /etc/nginx/conf.d/zxiaosi.cn_bundle.crt;
    ssl_certificate_key /etc/nginx/conf.d/zxiaosi.cn.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;

    location / {
        root   /usr/share/nginx/html/weapp_web;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html; # 防止页面刷新404
    }

    location /api {
        client_max_body_size 5m;
        proxy_pass http://springboot-web:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /wxapi/ {
        client_max_body_size 5m;
        proxy_pass http://springboot-weapp:8081/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
