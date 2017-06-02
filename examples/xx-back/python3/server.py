import socket
import sys

server = socket.socket(socket.AF_INET , socket.SOCK_STREAM)

host = socket.gethostname()
print(host)
port = 8080
server.bind((host,port))
server.listen(5)

while True:
	# ddd
	print("accepting....")
	clientsocket,addr = server.accept()      
	s1 = str(addr)
	ss = f"连接地址:{s1}"
	print(ss)
	msg=ss+ "\r\n"
	clientsocket.send(msg.encode('utf-8'))
	clientsocket.close()