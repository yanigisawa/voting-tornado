import tornado.ioloop
from tornado.web import RequestHandler
from tornado.log import enable_pretty_logging
import json
import jwt
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend


_events = [
    {'id': 1, 'title': 'Event 1', 'startDate' : '5/1/2017', 
        'endDate' : '5/2/2017', 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 2, 'title': 'Event 2', 'startDate' : '6/1/2017', 
        'endDate' : '6/2/2017', 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 3, 'title': 'Event 3', 'startDate' : '7/1/2017', 
        'endDate' : '7/2/2017', 'categories' : [{'id': 0, 'name': '', 'weight': 0}]},
    {'id': 4, 'title': 'Event 4', 'startDate' : '8/1/2017', 
        'endDate' : '8/2/2017', 'categories' : [{'id': 0, 'name': '', 'weight': 0}]}]

class BaseEventHandler(RequestHandler):
    # TODO Make this configurable
    _auth0PublicKey = './server/voting-tornado.pem'

    def prepare(self):
        self.set_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.set_header('Access-Control-Allow-Methods', 'PUT, POST, OPTIONS, GET')
        self.set_header('Access-Control-Allow-Headers', 'Authentication')
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

        # self.write(dict(success=True))

    def options(self, param = None):
        pass

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

        event = json.loads(self.request.body.decode('utf-8'))
        global _events
        for e in _events:
            if e['id'] == id:
                e = event

        self.write(dict(success=True, event=event))


class EventsHandler(BaseEventHandler):
    """
    Handle Event based HTTP requests
    """
    def initialize(self):
        # super(EventsHandler, self).prepare()
        pass

    def get(self):
        self.write(dict(events=_events))

    def post(self):
        global _events
        print(self.request.body)
        event = json.loads(self.request.body.decode('utf-8'))
        if event != None:
            event['id'] = max([e['id'] for e in _events]) + 1
        else:
            print("No event found in post body")

        _events.append(event)
        self.write(dict(success=True, event=event))

def make_app():
    """
    Main entry point for app
    """
    return tornado.web.Application([
        (r"/api/auth", AuthHandler),
        (r"/api/event/(.+)", EventHandler),
        # (r"/api/event/(?P<id>[^\/]+])?/", EventHandler),
        (r"/api/events", EventsHandler)
    ], debug=True)

if __name__ == "__main__":
    app = make_app()
    enable_pretty_logging()
    app.listen(3500)
    tornado.ioloop.IOLoop.instance().start()


