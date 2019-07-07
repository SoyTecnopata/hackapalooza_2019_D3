
import color_segmentation
import get_favorites_twitter
import profile_pic
import user_color
import visual_rec_api


user = "@akirareiko"

page_color = user_color.get(user)

if page_color == None:
    profile_pic.get(user[1:])
    page_color = color_segmentation.get_colors("./imagenes/" + user[1:] + "/profile_pic.jpg")
    
else:
    profile_pic.get(user[1:])

print page_color ### Color que va directo a la pagina

tez, gender = visual_rec_api.get_tez_and_gender("./imagenes/" + user[1:] + "/profile_pic.jpg")

print tez, gender #### Color de piel y genero

if gender == "male":
    labels_for_clothes = get_favorites_twitter.get_tags_from_fav(user)
    print labels_for_clothes ### Labels para ordenar la ropa de los hombres
    

    