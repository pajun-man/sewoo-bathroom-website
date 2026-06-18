@echo off
chcp 65001
echo ==============================================
echo     SEWOO 卫浴网站 - 一键启动脚本
echo ==============================================
echo.
echo 正在启动开发服务器...
echo.

cd /d "d:\吴杨的公司\佛山市世优卫浴有限公司--SEWOO--WB Group\我做的网站，仿Jaquar版"

echo 检查Node.js环境...
node --version
if %errorlevel% equ 0 (
    echo Node.js 环境正常
) else (
    echo 错误: 未检测到Node.js，请先安装Node.js
    pause
    exit /b 1
)

echo.
echo 启动开发服务器...
echo 网站地址: http://localhost:5173/
echo 后台管理: http://localhost:5173/admin
echo.

start npm run dev

echo 等待服务器启动...
timeout /t 5 /nobreak >nul

echo 正在打开浏览器...
start http://localhost:5173/

echo.
echo 服务器已启动！按任意键关闭...
pause