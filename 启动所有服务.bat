@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║     个人主页 + TS 频道管理 完整启动脚本               ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ 未找到 Node.js，请先安装 Node.js v12+
    echo 下载链接: https://nodejs.org
    pause
    exit /b 1
)

REM 检查 Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ✗ 未找到 Python
    pause
    exit /b 1
)

echo [安装] TS 后端依赖...
cd ts-channel\server
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo ✗ 依赖安装失败
        pause
        exit /b 1
    )
)

cd ..\..

echo.
echo [启动] TS 后端服务 (3001 端口)...
start "TS 后端服务" cmd /k "cd ts-channel\server && npm start"

timeout /t 2 /nobreak

echo [启动] 前端服务 (8000 端口)...
start "前端静态服务" cmd /k python -m http.server 8000

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║           ✓ 所有服务已启动                              ║
echo ╠══════════════════════════════════════════════════════════╣
echo ║ 主页:     http://127.0.0.1:8000/                        ║
echo ║ TS页面:   http://127.0.0.1:8000/ts-channel/             ║
echo ║ 后端API:  http://127.0.0.1:3001/api                     ║
echo ║                                                          ║
echo ║ 浏览器已启动? 访问上面的链接开始测试!                    ║
echo ║ 关闭窗口会停止相应服务                                  ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

pause
