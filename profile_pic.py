import re
import requests
from bs4 import BeautifulSoup
import os
import wget


def get(user):
    URL = 'https://twitter.com/'
    newpath = r'imagenes/'+str(user)
    r = requests.get(URL+str(user))
    soup = BeautifulSoup(r.content, 'html5lib')
    try:
        img_scr = soup.find_all("img", class_='ProfileAvatar-image')[0]['src']
    except:
        return None
    else:
        if not os.path.exists(newpath):
            os.makedirs(newpath)
        img_path=  newpath+'/profile_pic.jpg'
        wget.download(img_scr, img_path)
        return img_path

