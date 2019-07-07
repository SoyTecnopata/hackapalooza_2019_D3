import re
import requests
from bs4 import BeautifulSoup

def get(user):
    URL = 'https://twitter.com/'
    r = requests.get(URL+str(user))
    soup = BeautifulSoup(r.content, 'html5lib')
    search_2 = str(soup.find("style"))
    result = re.search('color: #(.*);', search_2)
    try:
        color=result.group(1)
        
        color_rgb = tuple(int(color[i:i+2], 16) for i in (0, 2, 4))
        
    except Exception:
        color_rgb= None
    return color_rgb
