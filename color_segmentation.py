import numpy as np
import skimage.segmentation as seg
import skimage.color as color
import cv2


light = [[192,192,192],[159,214,255],[169,255,228],[146,255,159],[255,219,146],[252,175,151],[252,172,186],[211,152,249]]
medium = [[128,128,128],[58,151,252],[9,173,126],[42,186,69],[229,163,0],[255,86,34],[250,14,80],[185,35,231]]
hard = [[72,72,72],[0,87,140],[6,91,65],[8,94,14],[160,100,4],[124,46,31],[122,26,54],[92,24,137]]


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

def get_colors(image_path):

    image = cv2.imread(image_path)
    
    #image_w_filter = cv2.GaussianBlur(image,(21,21),0)
    
    image_slic = seg.slic(image,n_segments=5)
    #image_seg = color.label2rgb(image_slic, image, kind='overlay')
    image_seg_avg = color.label2rgb(image_slic, image, kind='avg')
    
    #cv2.imshow("imagen_procesada", image)
    #cv2.imshow("imagen_procesada_avg", image_seg_avg)
    
    labels_and_colors = dict()
    
    for label in np.unique(image_slic):
        x, y = np.where(image_slic == label)[0][0] , np.where(image_slic == label)[1][0]
        b, g, r =  image_seg_avg[x,y] 
        
        labels_and_colors[label] = [r,g,b]
    
    light_values = []
    high_values = []
    
    for colors in light:
        #print labels_and_colors[0]
        light_values.append(np.linalg.norm(np.diff(np.array(colors)-np.array(labels_and_colors[0]))))
        result_light = np.argmin(light_values)
    
    
    for colors in hard:
        #print labels_and_colors[1]
        high_values.append(np.linalg.norm(np.diff(np.array(colors)-np.array(labels_and_colors[1]))))
        result_high = np.argmin(high_values)
        
    #RETURNS THE TWO COLORS THAT ECOMMERCE PAGE WILL USE#    
    return [light[result_light], hard[result_high]], mujer_dict[str(result_light)], hombre_dict[str(result_light)]
        
