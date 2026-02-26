# 在 8000 端口启动 Python3 的简单静态服务器（PowerShell）
$port = 8000
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server $port
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 -m http.server $port
} else {
    Write-Host "未找到 Python。请安装 Python 3，或使用以下命令手动运行："
    Write-Host "python -m http.server 8000"
}
