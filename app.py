from flask import Flask, render_template, flash, request
from wtforms import Form, StringField, validators
import pandas as pd

import color_segmentation
import get_favorites_twitter
import profile_pic
import user_color
import visual_rec_api
import pprint

pp = pprint.PrettyPrinter(indent=4)

def hp_m(user):
    pp.pprint("USUARIO: " + user)

    page_color = user_color.get(user)

    #if page_color == None:
    #    profile_pic.get(user[:])
        #page_color = color_segmentation.get_colors("./imagenes/" + user[:] + "/profile_pic.jpg")

    #else:
    #   profile_pic.get(user[:])

    pp.pprint("COLOR DEL SITIO: " + str(page_color))  ### Color que va directo a la pagina

    tez, gender = 2,'female'#visual_rec_api.get_tez_and_gender("./imagenes/" + user[:] + "/profile_pic.jpg")

    pp.pprint("COLOR DE PIEL: " + str(tez))
    pp.pprint("GENERO: " + str(gender))  #### Color de piel y genero

    #if gender == "male":
    #labels_for_clothes = get_favorites_twitter.get_tags_from_fav(user)
    pp.pprint("CATEGORIAS Y CONCEPTOS:")
    #pp.pprint(labels_for_clothes)  ### Labels para ordenar la ropa de los hombres


def hiperpersonalizacion(user):
    pp.pprint("USUARIO: " + user)

    page_color = user_color.get(user)

    if page_color == None:
        profile_pic.get(user[:])
        page_color = color_segmentation.get_colors("./imagenes/" + user[:] + "/profile_pic.jpg")

    else:
        profile_pic.get(user[:])

    pp.pprint("COLOR DEL SITIO: " + str(page_color))  ### Color que va directo a la pagina

    tez, gender = visual_rec_api.get_tez_and_gender("./imagenes/" + user[:] + "/profile_pic.jpg")

    pp.pprint("COLOR DE PIEL: " + str(tez))
    pp.pprint("GENERO: " + str(gender))  #### Color de piel y genero

    #if gender == "male":
    labels_for_clothes = get_favorites_twitter.get_tags_from_fav(user)
    pp.pprint("CATEGORIAS Y CONCEPTOS:")
    pp.pprint(labels_for_clothes)  ### Labels para ordenar la ropa de los hombres

DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

class Inputs(Form):
    Uname = StringField(u'Username', [validators.required(), validators.length(max=10)])


@app.route('/', methods=[ 'GET', 'POST'])
def home():
    form = Inputs()
    if request.method == 'POST':
        user = request.form['username']
        print(user)
        #hiperpersonalizacion(user)
        hp_m(user)

        if form.validate():
            print(user)



    return render_template('home.html')





@app.route('/elasticity', methods=['GET', 'POST'])
def elast():
    return render_template('p_home.html', result=dict)

@app.route('/priceopt', methods=['GET', 'POST'])
def priceopt():
    return render_template('p_home.html', result=dict)
#app.run(host= "0.0.0.0", port="5000")
app.run(host='localhost' , port="80")





