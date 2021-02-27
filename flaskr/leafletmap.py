import json

from flask import render_template
from flask import Blueprint
from . import getVenues

from flask import Flask, jsonify, request, render_template


bp = Blueprint('map', __name__)

@bp.route('/map')
def show_map():

  lat = 53.219383
  lng = 6.566502

  # events = getVenues.getEventsByLatLng(lat, lng)

  # data = {"Name": "Potato", "Type": "Vegetable"}, {"Name": "Cherry", "Type": "Fruit"}

  # return render_template('map/map.html', data=events)
  return render_template('map/map.html')


@bp.route('/_get_venues', methods=['POST', 'GET'])
def get_venues():

    if request.method == 'POST':
        data = json.loads(request.data)
        

    lat = data['lat']
    lng = data['lng']

    events = getVenues.getVenuesByLatLng(lat, lng)

    return jsonify(events)


@bp.route('/_get_venues_events', methods=['POST', 'GET'])
def get_venues_events():
    if request.method == 'POST':
        data = json.loads(request.data)
        

    events = getVenues.getVenuesByLatLng(lat, lng)

    return jsonify(events)




@bp.route('/test', methods=['GET', 'POST'])
def testfn():    # GET request
    if request.method == 'GET':
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers    # POST request
    if request.method == 'POST':
        print(request.get_json())  # parse as JSON
        return 'Sucesss', 200