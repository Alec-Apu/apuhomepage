@echo off
REM 在 8000 端口启动 Python3 的简单静态服务器
python -m http.server 8000 2>NUL || python3 -m http.server 8000
if errorlevel 1 (
  echo 未找到 Python，请安装 Python 3 或在 PowerShell 中运行 serve.ps1
)
pause
