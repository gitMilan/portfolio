import json

from flask import render_template
from flask import Blueprint
from . import getVenues

from flask import Flask, jsonify, request, render_template


bp = Blueprint('midi_game', __name__)


@bp.route('/midi_game')
def show_map():

  return render_template('midi_game/midi_game.html')