from pymongo import MongoClient
import urllib
from datetime import datetime
import json
import config
from models import Event, EventEncoder
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



def insert_events():
    client = MongoClient(uri)
    db = client['voting-tornado-db']
    events = db['events']
    eventIds = events.insert_many(_events)
    print(eventIds.inserted_ids)

def test_query():

    # e = {'id': 5, 'title': 'Event 0', 'startDate' : '4/1/2017',
    #     'endDate' : '4/2/2017', 'categories' : [{'id': 0, 'name': '', 'weight': 0}]}
    db = MongoClient(uri)['voting-tornado-db']
    # db['test-events'].insert_one(e)
    for e in db['events'].find().sort('startDate'):
        print(e)

def test_event_to_dict():
    from models import Category, Event
    eJson = json.loads(getJsonEvents())
    events = [Event(**e) for e in eJson]
    for e in events:
        print(e.__dict__)

def test_group_request():
    # from tornado.httpclient import HTTPClient, HTTPError, HTTPRequest
    # client = HTTPClient()
    # client.close()

    # Receive the below SSL error:
    # WARNING:tornado.general:SSL Error on 9 ('216.58.192.196', 443): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:749)
    # Error: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:749)
    # req = HTTPRequest(url='https://www.google.com')
    # resp = client.fetch(req)

    headers = { 'content-type': 'application/json' }
    data = {
        'client_id': config.auth0_clientId, 'client_secret': config.auth0_secret,
        'audience': 'urn:auth0-authz-api', 'grant_type': 'client_credentials' }
    payload = json.dumps(data)
    print(payload)
    resp = requests.post(config.auth0_url + '/oauth/token', headers=headers, data=payload)
    print('{0} - {1}'.format(resp.status_code, resp.reason))
    token_json = resp.json()

    headers = { 'authorization': token_json['token_type'] + ' ' + token_json['access_token']}

    resp = requests.get(config.auth0_authorization_url + '/groups', headers=headers)
    groups = resp.json()
    # print('Groups: {0}'.format(groups))

def test_auth0_query():
    headers = { 'content-type': 'application/json' }
    data = {
        'client_id': config.auth0_clientId, 'client_secret': config.auth0_secret,
        'audience': config.auth0_url + '/api/v2/', 'grant_type': 'client_credentials' }
    management_auth_req = requests.post(config.auth0_url + '/oauth/token', headers=headers, data=json.dumps(data))
    print('Management Auth: {0} - {1}'.format(management_auth_req.status_code, management_auth_req.reason))
    token_json = management_auth_req.json()

    headers = { 'authorization': token_json['token_type'] + ' ' + token_json['access_token']}
    users_req = requests.get(config.auth0_url + '/api/v2/users', headers=headers)
    print(users_req.text)
    # for g in groups:


if __name__ == "__main__":
    test_auth0_query()
    # insert_events()
    # main()