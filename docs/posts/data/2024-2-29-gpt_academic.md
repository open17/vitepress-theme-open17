---
tags:
    - nginx
    - gpt
title: 云服务器部署GPT Academic
date: 2024-02-29
---

:::info 链接
[项目地址](https://github.com/binary-husky/gpt_academic)
:::

## 准备
首先要有一个服务器,去什么服务器厂商买一个即可,最好是境外服务器,避免服务器无法直接访问openai,还需要额外配置服务器代理或者使用代理api

这里以基于Debian的linux系统(包括Ubuntu等)为例

然后登录你的服务器,推荐使用秘钥+ssh登录服务器,不建议直接使用root账号登录

## 安装
在准备工作做完之后,就可以开始安装了

我们这里采用直接安装(什么?为什么不用docker?你都会docker了直接看github wiki和issue即可~)

先克隆仓库:

```bash
cd ~
git clone --depth=1 https://github.com/binary-husky/gpt_academic.git
cd gpt_academic
```

建议开一个python的虚拟环境,不过如果服务器没别的不开也行:

```bash
#这不是个好习惯
python -m pip install -r requirements.txt
```

现在安装完毕

## 配置

你可以直接修改config.py,或者创建config_private.py

config.py对每个参数都写好了注释,你可以直接看注释

我们直接使用`vim config.py`编辑文件[^1]

[^1]: 不会vim的也可以使用nano

我们主要要修改的是API的key和修改访问端口以及登录的账号密码

在vim中使用`/`搜索`API_KEY`和`PORT`

默认PORT为-1,会自动寻找可用的端口

设置一个没有被占用的端口,比如9999

加上你的api_key(记得要对应模型的)

每对账号密码是一对元组,比如`('admin', '123456')`

然后`:wq`保存退出即可

## 启动

现在可以使用`python app.py`启动

一般云服务器商都会配有防火墙

在防火墙把你刚刚输入的端口打开(比如9999),协议TCP即可

现在在浏览器上应该能通过你的服务器ip+端口访问到你的gpt academic了

## 后台运行

当我们关闭终端时,程序会自动关闭
想要一直启用,最简单的方法就是使用`nohup python app.py &`后台启动

想要关闭的时候输入

```shell
ps aux | grep main.py
```
查询PID然后`kill PID`即可

## nginx反向代理

如果不想只通过ip访问,我们最好配置一下nginx

我们先将域名解析到我们的服务器ip(A记录)

然后安装nginx(如果没安装的话)

```shell
sudo apt update
sudo apt install nginx
```
然后配置nginx,一般在`/etc/nginx/`这

如果没有,使用find或者lacate查找配置文件
```shell
sudo find / -name nginx.conf
```

然后在`/etc/nginx/config.d`创建一个conf文件,比如`gpt.conf`:

```shell
cd nginx.conf
sudo vim conf.d/gpt.conf
```

然后在`gpt.conf`中写入如下内容:
```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
server {
        listen 80;
        server_name XXXXX #你的域名
        location / {
                proxy_pass http://127.0.0.1:9999;   #你的端口
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Upgrade $http_upgrade; 
                proxy_set_header Connection $connection_upgrade;                
                proxy_max_temp_file_size 0;
                client_max_body_size 10m;
                client_body_buffer_size 128k;
                proxy_connect_timeout 90;
                proxy_send_timeout 90;
                proxy_read_timeout 90;
                proxy_buffer_size 4k;
                proxy_buffers 4 32k;
                proxy_busy_buffers_size 64k;
                proxy_temp_file_write_size 64k;
        }
}
```

记得确保`nginx.conf`中有`include /etc/nginx/conf.d/*.conf;`

然后测试配置文件:
```shell
sudo nginx -t
```

最后启动服务:

```shell
sudo systemctl start nginx
```

如果没反应可以使用
```shell
# 检查nginx状态
sudo systemctl status nginx
```

## 大功告成
现在应该能使用域名访问服务器

我们可以关闭防火墙的9999端口了

## 后话

我们还可以开启开机自启
```shell
# 开机自启
sudo systemctl enable nginx 
```

为了安全起见,推荐加入ssl和https

也可以使用cloudflare的免费ssl和强制https

更多配置请见官方github仓库

















