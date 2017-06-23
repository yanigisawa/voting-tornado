import tornado.ioloop
from tornado.web import RequestHandler
from tornado.websocket import WebSocketHandler
from tornado.log import enable_pretty_logging
import json
import jwt
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
from motor.motor_tornado import MotorClient
from bson.objectid import ObjectId
import urllib
import config
from models import Event, EventEncoder, Vote
from threading import Lock

class BaseEventHandler(RequestHandler):
    _auth0PublicKey = config.auth0PublicKey
    _db = None

    def prepare(self):
        self.set_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.set_header('Access-Control-Allow-Methods', 'PUT, POST, OPTIONS, GET')
        self.set_header('Access-Control-Allow-Headers', 'Authorization')
        self.set_header('content-type', 'application/json')

        if self.request.method == "OPTIONS":
            return

        if 'Authorization' not in self.request.headers.keys():
            self.set_status(401, reason='Authorization header required')
            return

        token = self.request.headers['Authorization'].replace('Bearer: ', '').encode()

        cert = load_pem_x509_certificate(self._auth0PublicKey, default_backend())
        try:
            decoded = jwt.decode(token, cert.public_key(), algorithm=['RS256'], audience='lM7u46F9vGIxxoERB57g2x5l4WEQrYOd')
        except:
            self.set_status(401, reason='Failed to validate JWT')
            return
        self._db = self.settings['db']

    def get_dict_from_json(self):
        return json.loads(self.request.body.decode('utf-8'))

    def options(self, param = None):
        pass

class VoteHandler(BaseEventHandler):
    async def post(self):
        req_vote = self.get_dict_from_json()
        v = Vote(req_vote).mongo_encode()
        inserted_vote = await self._db.votes.insert_one(v)
        v['_id'] = str(inserted_vote.inserted_id)
        self.write({ 'success': True, 'vote': v})

class AuthHandler(BaseEventHandler):
    """
    Place holder handler for authentication. All JWT authentication code
    lives in the BaseEventHandler
    """
    def post(self):
        self.write(dict(success=True))

class EventHandler(BaseEventHandler):
    async def put(self, id = None):
        req_event = self.get_dict_from_json()
        event_model = Event(req_event)
        result = await self._db.events.replace_one({'_id': ObjectId(req_event['id'])}, event_model.mongo_encode())
        json_event = json.dumps(dict(success=True, event=event_model), cls=EventEncoder)

        self.write(json_event)

class EventsHandler(BaseEventHandler):
    """
    Handle Event based HTTP requests
    """
    def initialize(self):
        # super(EventsHandler, self).prepare()
        pass

    async def get(self):
        events = { 'events': [] }
        if self._db == None:
            print('no db assigned')
            return

        async for e in self._db['events'].find().sort('startDate'):
            events['events'].append(Event(e))

        jsonEvents = json.dumps(events, cls=EventEncoder)
        self.write(jsonEvents)

    async def post(self):
        event = self.get_dict_from_json()
        if event == None:
            self.write({'success': False, 'message': 'No event found in post body' })
            return

        e = Event(event).mongo_encode()
        inserted_event = await self._db['events'].insert_one(e)
        event['_id'] = str(inserted_event.inserted_id)
        self.write(dict(success=True, event=event))

class VoteSocketHandler(WebSocketHandler):
    connections = set()
    _lock = Lock()

    def open(self):
        self._lock.acquire()
        try:
            self.connections.add(self)
        finally:
            self._lock.release()
        print('WebSocket opened')

    def on_message(self, message):
        # msg = json.dumps({'success': True, 'message': message})
        [con.write_message(message) for con in self.connections]

    def on_close(self):
        self._lock.acquire()
        try:
            self.connections.remove(self)
        finally:
            self._lock.release()
        print('WebSocket closed')

    # Allow localhost origin
    def check_origin(self, origin):
        """
        When hosting the client code from a separate url, it is
        required to explicitly allow origins to connect via the
        web socket. Any other domain will receive a 403

        An alternative approach could use url parsing:
            parsed_origin = urllib.parse.urlparse(origin)
            return parsed_origin.netloc.endswith(".mydomain.com")
        """
        return origin == "http://localhost:3000"

def make_app():
    """
    Main entry point for app
    Create a MotorClient and assign it to the settings for the Application.
    From the Motor Documentation:
      Warning It is a common mistake to create a new client object for every request;
      this comes at a dire performance cost. Create the client when your application
      starts and reuse that one client for the lifetime of the process,
      as shown in these examples.
    """
    server = config.dbServer
    user = urllib.parse.quote_plus(config.dbUser)
    password = urllib.parse.quote_plus(config.dbPassword)
    dbUri = 'mongodb://{0}:{1}@{2}'.format(user, password, server)
    db = MotorClient(dbUri)[config.database_name]

    return tornado.web.Application([
        (r"/api/auth", AuthHandler),
        (r"/api/event/(.+)", EventHandler),
        # (r"/api/event/(?P<id>[^\/]+])?/", EventHandler),
        (r"/api/vote", VoteHandler),
        (r"/api/ws/votes",  VoteSocketHandler),
        (r"/api/events", EventsHandler)
    ], db=db,
    debug=True)

if __name__ == "__main__":
    app = make_app()
    enable_pretty_logging()
    app.listen(3500)
    tornado.ioloop.IOLoop.instance().start()


