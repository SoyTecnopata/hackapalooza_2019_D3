import re
import requests
from bs4 import BeautifulSoup
import numpy as np

medium = [[128,128,128],[58,151,252],[9,173,126],[42,186,69],[229,163,0],[255,86,34],[250,14,80],[185,35,231]]

def get(user):
    URL = 'https://twitter.com/'
    r = requests.get(URL+str(user))
    soup = BeautifulSoup(r.content, 'html5lib')
    search_2 = str(soup.find("style"))
    result = re.search('color: #(.*);', search_2)
    try:
        color=result.group(1)
        
        color_rgb = tuple(int(color[i:i+2], 16) for i in (0, 2, 4))

        if color_rgb == (29,161,242):
            return None
        
        medium_values = []
        for colors in medium:
        #print labels_and_colors[1]
            medium_values.append(np.linalg.norm(np.diff(np.array(colors)-np.array(color_rgb))))
            result_medium = np.argmin(medium_values)
        
    except Exception:
        return None
    return medium[result_medium]
