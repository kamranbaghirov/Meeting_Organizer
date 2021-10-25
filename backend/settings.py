# importing libraries
from flask import Flask, request, Response, jsonify,render_template

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///database.db"
app.config['SQLALCHEMY_TRACH_MODIFICATIONS']=False

