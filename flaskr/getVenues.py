import requests

api_key = "N9FIrCKZ9KJKvh40"


def getVenuesByLatLng(lat, lng):
  
  bylanglong = f"https://api.songkick.com/api/3.0/events.json?apikey={api_key}&location=geo:{lat},{lng}"
  r = requests.get(bylanglong)

  r = r.json()

  events = r['resultsPage']['results']['event']

  

  allEvents = {}

  for event in events:

    if event['venue']['displayName'] not in allEvents:

      lat = event['venue']['lat']
      lng = event['venue']['lng']
      venue_id = event['venue']['id']

      allEvents[event['venue']['displayName']] = {'lat': lat, 'lng': lng, 'venue_id': venue_id}

      
  return allEvents


def get_venues_events(venue_id):

  #https://api.songkick.com/api/3.0/venues/{venue_id}/calendar.json?apikey={your_api_key}

  venues_events_request = f"https://api.songkick.com/api/3.0/venues/{venue_id}/calendar.json?apikey={api_key}"
  r = requests.get(venues_events_request)
  r = r.json()

  events = r['resultsPage']['results']['event']

  print(events)

  # venues_events = {}

  # for event in events:
  #   print(event['displayName'])

  
  return events




