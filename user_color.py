import re
import requests
from bs4 import BeautifulSoup
import numpy as np

medium = [[128,128,128],[58,151,252],[9,173,126],[42,186,69],[229,163,0],[255,86,34],[250,14,80],[185,35,231]]

mujer_dict={
'0': 'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Grey&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_336',
'1':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Blue&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_118',
 '2':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Pastel&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_937',
 '3':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Green&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_334',
 '4':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Yellow&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_762',
 '5':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Orange&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_475',
 '6':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Red&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_544',
 '7':'https://www.shein.com.mx/Best-Selling-Clothing-vc-70054.html?attr_values=Purple&icn=best-selling-clothing&ici=mx_tab01navbar03&exc_attr_id=27&attr_ids=27_536',
}

hombre_dict={
'0': 'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Grey&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_336',
'1':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Blue&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_118',
 '2':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Pastel&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_937',
 '3':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Green&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_334',
 '4':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Yellow&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_762',
 '5':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Orange&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_475',
 '6':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Red&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_544',
 '7':'https://www.shein.com.mx/Men-Clothing-c-1969.html?attr_values=Purple&icn=men-clothing&ici=mx_tab02navbar02&exc_attr_id=27&attr_ids=27_536',
}

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
            return None,None,None
        
        medium_values = []
        for colors in medium:
        #print labels_and_colors[1]
            medium_values.append(np.linalg.norm(np.diff(np.array(colors)-np.array(color_rgb))))
            result_medium = np.argmin(medium_values)
        
    except Exception:
        return None
    
    #print("88888888888888888888888",result_medium)
    return medium[result_medium], mujer_dict[str(result_medium)], hombre_dict[str(result_medium)]
