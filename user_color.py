import re
import requests
from bs4 import BeautifulSoup

def get(user):
    URL = 'https://twitter.com/'
    r = requests.get(URL+user)
    soup = BeautifulSoup(r.content, 'html5lib')
    search_2 = str(soup.find("style"))
    result = re.search('color: (.*);', search_2)
    color=result.group(1)
    return color
