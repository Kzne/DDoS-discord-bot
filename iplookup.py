import sys
import json
import urllib.request as urllib2
import fileinput
import os


fo = open("iplookup.txt", "w")

ip = sys.argv[1]

url = 'http://ip-api.com/json/'
response = urllib2.urlopen('http://ip-api.com/json/'+ip+"?fields=31194943")
data = response.read()
data = str(data)
data = data.replace(',', '\n')
data = data.replace('"', ' ')
data = data.replace("'{", '')
data = data.replace("}'", '')
data = data.replace("Inc.", ' ')
data = data.replace("Inc", ' ')
data = data.replace(':', ':arrow_right:')


fo.write(data)
fo.close()

def remove_empty_lines(filename):
    if not os.path.isfile(filename):
        print("{} does not exist ".format(filename))
        return
    with open(filename) as filehandle:
        lines = filehandle.readlines()

    with open(filename, 'w') as filehandle:
        lines = filter(lambda x: x.strip(), lines)
        filehandle.writelines(lines)   

remove_empty_lines("iplookup.txt")
