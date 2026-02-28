@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo ====================================================
echo =            主页本地服务启动 (11451)              =
echo ====================================================
echo.
echo 本机访问: http://127.0.0.1:11451/
echo 局域网访问: http://你的电脑IP:11451/
echo 按 Ctrl+C 可停止服务
echo.

python --version >nul 2>&1
if not errorlevel 1 (
    echo 服务已启动，访问地址: http://127.0.0.1:11451/
    python -m http.server 11451
    goto :end
)

py -3 --version >nul 2>&1
if not errorlevel 1 (
    echo 服务已启动，访问地址: http://127.0.0.1:11451/
    py -3 -m http.server 11451
    goto :end
)

echo 未找到 Python，请先安装 Python 3。
echo 下载地址: https://www.python.org/downloads/

:end
pause
