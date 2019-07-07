from flask import Flask, render_template, flash, request, redirect, url_for, send_from_directory
from wtforms import Form, StringField, validators
import pandas as pd

import color_segmentation
import get_favorites_twitter
import profile_pic
import user_color
import visual_rec_api
import pprint

pp = pprint.PrettyPrinter(indent=4)


page_dict={}
examples={u'Lupita_Nyongo': 'https://raw.githubusercontent.com/SoyTecnopata/hackapalooza_2019_D3/master/templates/images/site_visual_lupita_01.png', u'akirareiko':'https://raw.githubusercontent.com/SoyTecnopata/hackapalooza_2019_D3/master/templates/images/site_visual_akira_01.png', u'TomHolland1996':'https://raw.githubusercontent.com/SoyTecnopata/hackapalooza_2019_D3/master/templates/images/site_visual_tom_01.png', u'aristeguicnn':'https://raw.githubusercontent.com/SoyTecnopata/hackapalooza_2019_D3/master/templates/images/site_visual_aristegui_01.png'}
user=''
def hiperpersonalizacion(user):
    global page_dict
    
    if user in list(page_dict.keys()):
        print ('PREVIOUS USER: ',user)
        pp.pprint(page_dict[user])
        return page_dict[user]
    else:
        
        page_dict[user]={}
        pp.pprint("USUARIO: " + user)
    
        page_color, mujer_link,hombre_link = user_color.get(user)
    
        if page_color == None:
            profile_pic.get(user[:])
            page_color, mujer_link,hombre_link = color_segmentation.get_colors("./imagenes/" + user[:] + "/profile_pic.jpg")
    
        else:
            profile_pic.get(user[:])
            
        pp.pprint("COLOR DEL SITIO: " + str(page_color))  ### Color que va directo a la pagina
        page_dict[user]['color']=page_color
        try:
            tez, gender = visual_rec_api.get_tez_and_gender("./imagenes/" + user[:] + "/profile_pic.jpg")
        except:
            tez, gender = 1, 'None'
        page_dict[user]['tez']=tez
    
        pp.pprint("COLOR DE PIEL: " + str(tez))
        pp.pprint("GENERO: " + str(gender))  #### Color de piel y genero
        if gender == 'male':
            page_dict[user]['gender']='male'
            page_dict[user]['url']=hombre_link
        elif gender == 'None':
            page_dict[user]['gender']='None'
            page_dict[user]['url']='https://www.shein.com.mx/'
        else:
            page_dict[user]['gender']='female'
            page_dict[user]['url']=mujer_link
        
        #if gender == "male":
        pp.pprint("CATEGORIAS Y CONCEPTOS:")        
        labels_for_clothes = get_favorites_twitter.get_tags_from_fav(user)
        
        page_dict[user]['labels']=labels_for_clothes
        #pp.pprint(labels_for_clothes)  ### Labels para ordenar la ropa de los hombres
        return page_dict




DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

class Inputs(Form):
    Uname = StringField(u'Username', [validators.required(), validators.length(max=10)])


@app.route('/', methods=[ 'GET', 'POST'])
def home():
    global user
    user=''
    form = Inputs()
    if request.method == 'POST':
        user=''
        user = request.form['username']
        print(user)
        hiperpersonalizacion(user)
        
        return redirect(url_for('page'))




    return render_template('home.html')



@app.route('/page', methods=['GET', 'POST'])
def page():
    print('page:',user)
    try:
        url_back=examples[user]
        #return redirect((url_back))
    except:
        return redirect(page_dict[user]['url'])
       
            
        
    
    #url_back='https://raw.githubusercontent.com/SoyTecnopata/hackapalooza_2019_D3/master/templates/images/Screenshot%20from%202019-07-07%2009-21-42.png'
    return render_template('page.html', url_back=url_back)


#app.run(host= "0.0.0.0", port="5000")
app.run(host='localhost' , port="80")





