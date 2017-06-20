import tornado.ioloop
from tornado.web import RequestHandler
from tornado.log import enable_pretty_logging
import json
import jwt
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
from pymongo import MongoClient
from bson.objectid import ObjectId
import urllib
import config
from models import Event, EventEncoder, Vote

class BaseEventHandler(RequestHandler):
    _auth0PublicKey = config.auth0PublicKey
    _server = config.dbServer
    _user = urllib.parse.quote_plus(config.dbUser)
    _password = urllib.parse.quote_plus(config.dbPassword)
    _dbUri = 'mongodb://{0}:{1}@{2}'.format(_user, _password, _server)

    def prepare(self):
        self.set_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.set_header('Access-Control-Allow-Methods', 'PUT, POST, OPTIONS, GET')
        self.set_header('Access-Control-Allow-Headers', 'Authorization')
        self.set_header('content-type', 'application/json')
        # TODO Uncomment once client code can send Authentication header
        # if 'Authentication' not in self.request.headers.keys():
        #     self.set_status(401, reason='Authentication header required')
        #     return

        # token = self.request.headers['Authentication'].replace('Bearer: ', '').encode()
        # key = ''
        # with open(self._auth0PublicKey, 'r') as f:
        #     key = ''.join(f.readlines()).encode()

        # cert = load_pem_x509_certificate(key, default_backend())
        # try:
        #     decoded = jwt.decode(token, cert.public_key(), algorithm=['RS256'], audience='lM7u46F9vGIxxoERB57g2x5l4WEQrYOd')
        # except:
        #     self.set_status(401, reason='Failed to validate JWT')
        #     return
        self._db = db = MongoClient(self._dbUri)[config.database_name]
        # self.write(dict(success=True))

    def get_dict_from_json(self):
        return json.loads(self.request.body.decode('utf-8'))

    def options(self, param = None):
        pass

class VoteHandler(BaseEventHandler):
    def post(self):
        req_vote = self.get_dict_from_json()
        v = Vote(req_vote).mongo_encode()
        v['_id'] = str(self._db.votes.insert_one(v).inserted_id)
        self.write({ 'success': True, 'vote': v})

class AuthHandler(BaseEventHandler):
    """
    Place holder handler for authentication. All JWT authentication code
    lives in the BaseEventHandler
    """
    def post(self):
        self.write(dict(success=True))

class EventHandler(BaseEventHandler):
    def put(self, id = None):
        if id != None:
            print(id)

        req_event = self.get_dict_from_json()
        event_model = Event(req_event)
        result = self._db.events.replace_one({'_id': ObjectId(req_event['id'])}, event_model.mongo_encode())
        json_event = json.dumps(dict(success=True, event=event_model), cls=EventEncoder)

        self.write(json_event)

class EventsHandler(BaseEventHandler):
    """
    Handle Event based HTTP requests
    """
    def initialize(self):
        # super(EventsHandler, self).prepare()
        pass

    # TODO: make request async
    def get(self):
        events = { 'events': [] }
        for e in self._db['events'].find().sort('startDate'):
            events['events'].append(Event(e))

        jsonEvents = json.dumps(events, cls=EventEncoder)
        self.write(jsonEvents)

    #TODO: Make request async
    def post(self):
        event = self.get_dict_from_json()
        if event == None:
            self.write({'success': False, 'message': 'No event found in post body' })
            return

        e = Event(event).mongo_encode()
        id = self._db['events'].insert_one(e).inserted_id
        event['_id'] = str(id)
        self.write(dict(success=True, event=event))

def make_app():
    """
    Main entry point for app
    """
    return tornado.web.Application([
        (r"/api/auth", AuthHandler),
        (r"/api/event/(.+)", EventHandler),
        (r"/api/vote", VoteHandler),
        # (r"/api/event/(?P<id>[^\/]+])?/", EventHandler),
        (r"/api/events", EventsHandler)
    ], debug=True)

if __name__ == "__main__":
    app = make_app()
    enable_pretty_logging()
    app.listen(3500)
    tornado.ioloop.IOLoop.instance().start()


