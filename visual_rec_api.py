import json
from ibm_watson import VisualRecognitionV3
import cv2
import numpy as np

visual_recognition = VisualRecognitionV3(
    '2018-03-19',
    iam_apikey='VGX5XvPUg7OwLFT8Np2YPpBoETXKOLSRU6W1BmbmQsXu')


file_name = './oscar.jpg'

tez_color = [[216, 187,171],[167,129,95],[109,73,55]]

def get_tez_and_gender(file_name):

    with open(file_name, 'rb') as images_file:
        faces = visual_recognition.detect_faces(images_file).get_result()
    #print(json.dumps(faces, indent=2))
    
    #dict_values = faces.viewvalues()
    info_dict = faces["images"][0]["faces"][0]
    
    location = info_dict["face_location"]
    
    x,y,w,h = location["left"], location["top"], location["width"], location["height"]
    
    image = cv2.imread(file_name)
    image_crop = image[y:y+h,x:x+w:]
    
    #################################################################
    #BASED ON FILTER
    d_for_filter = min(image_crop.shape[0:2])
    
    if d_for_filter%2 == 0:
        d_for_filter = d_for_filter - 1
    
    image_crop_w_filter = cv2.GaussianBlur(image_crop,(d_for_filter,d_for_filter),0)
    
    rgb_mean =  [image_crop_w_filter[:,:,2].mean(), image_crop_w_filter[:,:,1].mean(), image_crop_w_filter[:,:,0].mean()]
    
    
    results = []
    
    for pantone in tez_color:
        results.append(np.linalg.norm(np.array(pantone) - np.array(rgb_mean)))
        
        
    tez_result = np.argmin(results) ######### result
    # RETURNS THE COLOR OF THE PERSON 
    
    # 0 is white
    # 1 is latin
    # 2 is afroamerican
    
    gender = info_dict["gender"]["gender_label"] ####### result

    return tez_result, gender



"""
##################################################################
#BASED ON FILTER AND K MEANS CLUSTERING

import skimage.color as color
import skimage.segmentation as seg


image_slic = seg.slic(image_crop_w_filter,n_segments=2)
image_seg_avg = color.label2rgb(image_slic, image_crop_w_filter, kind='avg')

cv2.imshow("imagen_procesada_avg", image_seg_avg)

cv2.imshow("cara_con_filtro", image_crop_w_filter)
cv2.imshow("cara", image_crop)
"""



