from pymongo import MongoClient
import urllib
from datetime import datetime
import json
import config
from models import Event, EventEncoder, Team, TeamMember
import requests

server = config.dbServer
user = urllib.parse.quote_plus(config.dbUser)
password = urllib.parse.quote_plus(config.dbPassword)
uri = 'mongodb://{0}:{1}@{2}'.format(user, password, server)

def getDate(dateString):
    return datetime.strptime(dateString, '%m/%d/%Y')

_events = [
    {'id': 1, 'title': 'Event 1', 'startDate' : getDate('5/1/2017'),
        'endDate' : getDate('5/2/2017'), 'categories' : [
            {'id': 0, 'name': 'Cat1', 'weight': 5},
            {'id': 1, 'name': 'Cat2', 'weight': 3},
            {'id': 2, 'name': 'Cat3', 'weight': 2}
            ]},
    {'id': 2, 'title': 'Event 2', 'startDate' : getDate('6/1/2017'),
        'endDate' : getDate('6/2/2017'), 'categories' : [
            {'id': 0, 'name': 'Cat1', 'weight': 5},
            {'id': 1, 'name': 'Cat2', 'weight': 3},
            {'id': 2, 'name': 'Cat3', 'weight': 2}
            ]},
    {'id': 3, 'title': 'Event 3', 'startDate' : getDate('7/1/2017'),
        'endDate' : getDate('7/2/2017'), 'categories' : [
            {'id': 0, 'name': 'Cat1', 'weight': 5},
            {'id': 1, 'name': 'Cat2', 'weight': 3},
            {'id': 2, 'name': 'Cat3', 'weight': 2}
            ]},
    {'id': 4, 'title': 'Event 4', 'startDate' : getDate('8/1/2017'),
        'endDate' : getDate('8/2/2017'), 'categories' : [
            {'id': 0, 'name': 'Cat1', 'weight': 5},
            {'id': 1, 'name': 'Cat2', 'weight': 3},
            {'id': 2, 'name': 'Cat3', 'weight': 2}
            ]},
    {'id': 5, 'title': 'Event 0', 'startDate' : getDate('4/1/2017'),
        'endDate' : getDate('4/2/2017'), 'categories' : [
            {'id': 0, 'name': 'Cat1', 'weight': 5},
            {'id': 1, 'name': 'Cat2', 'weight': 3},
            {'id': 2, 'name': 'Cat3', 'weight': 2}
            ]}]

def getJsonEvents():
    jsonArr = []
    for e in _events:
        tmp = {}
        tmp['title'] = e['title']
        tmp['startDate'] = e['startDate'].strftime('%m/%d/%Y')
        tmp['endDate'] = e['endDate'].strftime('%m/%d/%Y')
        tmp['categories'] = e['categories']
        jsonArr.append(tmp)
    return json.dumps(jsonArr)

def insert_events(events):
    client = MongoClient(uri)
    db = client['voting-tornado-db']
    db_events = db['events']
    mongo_events = [Event(e).mongo_encode() for e in events]
    inserted_events = db_events.insert_many(mongo_events)
    return insert_events

def get_auth0_groups():
    headers = { 'content-type': 'application/json' }
    data = {
        'client_id': config.auth0_clientId, 'client_secret': config.auth0_secret,
        'audience': 'urn:auth0-authz-api', 'grant_type': 'client_credentials' }
    payload = json.dumps(data)
    resp = requests.post(config.auth0_url + '/oauth/token', headers=headers, data=payload)
    resp.raise_for_status()
    token_json = resp.json()

    headers = { 'authorization': token_json['token_type'] + ' ' + token_json['access_token']}
    resp = requests.get(config.auth0_authorization_url + '/groups', headers=headers)
    resp.raise_for_status()
    return resp.json()

def get_auth0_users():
    headers = { 'content-type': 'application/json' }
    data = {
        'client_id': config.auth0_clientId, 'client_secret': config.auth0_secret,
        'audience': config.auth0_url + '/api/v2/', 'grant_type': 'client_credentials' }
    management_auth_req = requests.post(config.auth0_url + '/oauth/token', headers=headers, data=json.dumps(data))
    management_auth_req.raise_for_status()
    token_json = management_auth_req.json()

    headers = { 'authorization': token_json['token_type'] + ' ' + token_json['access_token']}
    users_req = requests.get(config.auth0_url + '/api/v2/users', headers=headers)
    return users_req.json()

def seedData():
    # Query groups from auth0
    groups = get_auth0_groups()['groups']
    teams = []
    # Query users from auth0
    users = get_auth0_users()
    for g in groups:
        members = []
        for auth0Id in g['members']:
            member = next( (u for u in users if u['user_id'] == auth0Id), None)
            if 'app_metadata' in member.keys():
                if 'team_lead' in member['app_metadata']:
                    g['team_lead'] = member['user_id']
            if member != None:
                members.append(member)
        g['members'] = members
        teams.append(g)

    # Create all teams in all events
    events = []
    for e in _events:
        ev = e
        ev.update()
        ev['teams'] = teams
        events.append(ev)
    insert_events(events)


if __name__ == "__main__":
    seedData()
