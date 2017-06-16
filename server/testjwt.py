from pymongo import MongoClient
import urllib
from datetime import datetime
import json
import config 

server = config.dbServer
user = urllib.parse.quote_plus(config.dbUser)
password = urllib.parse.quote_plus(config.dbPassword)
uri = 'mongodb://{0}:{1}@{2}'.format(user, password, server)

def getDate(dateString):
    return datetime.strptime(dateString, '%m/%d/%Y')

_events = [
    {'id': 1, 'title': 'Event 1', 'startDate' : getDate('5/1/2017'), 
        'endDate' : getDate('5/2/2017'), 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 2, 'title': 'Event 2', 'startDate' : getDate('6/1/2017'), 
        'endDate' : getDate('6/2/2017'), 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 3, 'title': 'Event 3', 'startDate' : getDate('7/1/2017'), 
        'endDate' : getDate('7/2/2017'), 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 4, 'title': 'Event 4', 'startDate' : getDate('8/1/2017'), 
        'endDate' : getDate('8/2/2017'), 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 5, 'title': 'Event 0', 'startDate' : getDate('4/1/2017'), 
        'endDate' : getDate('4/2/2017'), 'categories' : [{'id': 0, 'name': '', 'weight': 0}]}]

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
    events = db['test-events']
    eventIds = events.insert_many(_events)
    print(eventIds.inserted_ids)

def test_query():

    # e = {'id': 5, 'title': 'Event 0', 'startDate' : '4/1/2017', 
    #     'endDate' : '4/2/2017', 'categories' : [{'id': 0, 'name': '', 'weight': 0}]}
    db = MongoClient(uri)['voting-tornado-db']
    # db['test-events'].insert_one(e)
    for e in db['test-events'].find().sort('startDate'):
        print(e)

def main():
    from models import Category, Event
    eJson = json.loads(getJsonEvents())
    events = [Event(**e) for e in eJson]
    for e in events:
        print(e)

if __name__ == "__main__":
    # insert_events()
    main()