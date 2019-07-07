from flask import Flask, render_template, flash, request
from wtforms import Form, StringField, validators
import pandas as pd


DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

class Inputs(Form):
    name = StringField(u'Username', [validators.required(), validators.length(max=10)])


@app.route('/', methods=[ 'GET', 'POST'])
def home():
    form = Inputs()
    if request.method == 'POST':
        user = request.form['name']

        if form.validate():
            print(user)






    return render_template('home.html')


@app.route('/elasticity', methods=['GET', 'POST'])
def elast():
    return render_template('p_home.html', result=dict)

@app.route('/priceopt', methods=['GET', 'POST'])
def priceopt():
    return render_template('p_home.html', result=dict)
app.run(host= "0.0.0.0", port="5000")
#app.run(host='localhost' , port="80")



