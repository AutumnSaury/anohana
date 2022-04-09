# Anohana  

Anohana是一个基于百度云提供的接口搭建的植物识别Web应用。

## 部署指南

### 开发环境部署  

`clone`本仓库，进入仓库目录后`npm install`即可。

### 生产环境部署

下载Release附带的压缩包，解压后对Web Server进行相应配置即可。  
由于使用了百度的API，为绕过CORS限制，需在Web Server上进行反向代理设置。  
以下Nginx配置可供参考：

``` nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://example.com$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /home/example/.acme.sh/example.com/fullchain.cer;
    ssl_certificate_key /home/example/.acme.sh/example.com/example.com.key;
    ssl_session_cache builtin:1000 shared:SSL:10m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    index index.html;
    root /var/www/anohana;

    location = / {
        index index.html;
    }

    location /3rd/bd-auth {
        proxy_pass https://aip.baidubce.com/oauth/2.0/token;
    }
    location /3rd/bd-bkimg/ {
        proxy_pass https://bkimg.cdn.bcebos.com/pic/;
        proxy_set_header Referer https://baike.baidu.com/;
    }
    location /3rd/bd-plant {
        proxy_pass https://aip.baidubce.com/rest/2.0/image-classify/v1/plant;
    }
}
```
