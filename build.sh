#/bin/bash

# 2023/11/24 后打包项目可以使用脚本执行
echo "1秒后 -- 开始打包前端代码📦" 
sleep 1
pnpm build:all

echo "1秒后 -- 开始打包后端代码📦" 
sleep 1
pnpm server:build


echo "打包📦成功 3秒后开始整合文件"
sleep 3

if [ -d "./sparrowUI-build" ];then
    rm -r "./sparrowUI-build"
fi

mkdir ./sparrowUI-build


# 这次修改成了http服务了，后续需要在nginx中配置点东西
mv packages/worker-server/server-dist ./sparrowUI-build

mv packages/site/_site ./sparrowUI-build
