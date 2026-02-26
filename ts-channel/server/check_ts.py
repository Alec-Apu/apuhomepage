import socket
host='alecapu.top'
port=10011
try:
    s=socket.create_connection((host, port), timeout=5)
    print('connect ok')
    s.close()
except Exception as e:
    print('connect failed', e)