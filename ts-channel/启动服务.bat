@echo off
chcp 65001 >nul
echo.
echo ====================================================
echo =       TeamSpeak 频道管理系统 - 启动脚本          =
echo ====================================================
echo.

REM 获取脚本所在目录
cd /d "%~dp0"

REM 检查 Node.js
echo [检查] Node.js 环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ 未找到 Node.js，请先安装 Node.js v12+
    echo 下载链接: https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js 已安装

REM 检查 Python
echo [检查] Python 环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo ✗ 未找到 Python
    pause
    exit /b 1
)
echo ✓ Python 已安装

echo.
echo [安装] 后端依赖...
cd server
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo ✗ 依赖安装失败
        pause
        exit /b 1
    )
)
echo ✓ 后端依赖已就位

echo.
echo [启动] 后端服务...
start "TS 后端服务 (3001)" cmd /k npm start

cd ..

REM 等待后端启动
timeout /t 2 /nobreak

echo [启动] 前端服务...
start "TS 前端服务 (8000)" cmd /k python -m http.server 8000

echo.
echo ====================================================
echo ====================================================
echo =              ✓ 所有服务已启动                  =
echo ====================================================
echo = 前端页面: http://127.0.0.1:8000/ts-channel/      =
echo = 后端 API:  http://127.0.0.1:3001/api            =
echo =                                              =
echo = 提示: 浏览器访问上面的链接即可开始测试     =
echo = 关闭任意窗口将停止该服务                  =
echo ====================================================
echo.

pause
