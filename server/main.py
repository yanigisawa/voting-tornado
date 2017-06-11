import tornado.ioloop
from tornado.web import RequestHandler
from tornado.log import enable_pretty_logging
import json

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
    def prepare(self):
        self.set_header('Access-Control-Allow-Origin', 'http://localhost:3000')
    

class EventHandler(BaseEventHandler):
    def put(self, id):
        if id != None:
            print(event)

        self.write("TODO - Update event")


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
        (r"/api/event/(?P<id>[^\/]+])?", EventHandler),
        (r"/api/events", EventsHandler)
    ], debug=True)

if __name__ == "__main__":
    app = make_app()
    enable_pretty_logging()
    app.listen(3500)
    tornado.ioloop.IOLoop.instance().start()


