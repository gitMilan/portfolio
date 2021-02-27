from flask import render_template
from flask import Blueprint
from . import getVenues

from flask import Flask, jsonify, request, render_template


bp = Blueprint('test', __name__)


# @bp.route('/_get_venues')
# def get_venues():

#     x = [1,2,3,4,5,6]

#     return jsonify(result = x)


@bp.route('/test')
def test_page():
    return render_template('test/test.html')