# node 环境构建 vue 项目
FROM node:14 as build-stage

# 设置工作目录
WORKDIR /usr/src/app

# 复制文件到镜像中
COPY . .

# 安装依赖 
RUN npm install
RUN npm run build

# 配置 nginx 代理
FROM nginx:latest

# 在Nginx容器中新建目录
RUN mkdir -p /var/myapp/admin/dist

# 复制 nginx 配置文件到容器目录
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将Vue项目的构建产物复制到新建的目录
COPY --from=build-stage /usr/src/app/dist /var/myapp/admin/dist

# 暴露Nginx的80端口
EXPOSE 80

# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]