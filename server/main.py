import tornado.ioloop
from tornado.web import RequestHandler
from tornado.log import enable_pretty_logging

class BaseEventHandler(RequestHandler):
    def prepare(self):
        self.set_header('Access-Control-Allow-Origin', 'http://localhost:3000')

class EventsHandler(BaseEventHandler):
    """
    Handle Event based HTTP requests
    """
    def get(self):
        events = [
            {'id': 1, 'title': 'Event 1', 'startDate' : '5/1/2017', 'endDate' : '5/2/2017'},
            {'id': 2, 'title': 'Event 2', 'startDate' : '6/1/2017', 'endDate' : '6/2/2017'},
            {'id': 3, 'title': 'Event 3', 'startDate' : '7/1/2017', 'endDate' : '7/2/2017'},
            {'id': 4, 'title': 'Event 4', 'startDate' : '8/1/2017', 'endDate' : '8/2/2017'}]

        self.write(dict(events=events))

def make_app():
    """
    Main entry point for app
    """
    # settings = dict(debug=True)
    return tornado.web.Application([
        (r"/api/getAllEvents", EventsHandler)
    ], debug=True)
    # application = tornado.web.Application([
    #     (r"/", MainHandler) 
    # ], debug=True)

if __name__ == "__main__":
    app = make_app()
    enable_pretty_logging()
    app.listen(3500)
    tornado.ioloop.IOLoop.instance().start()
    
    # tornado.autoreload.start(tornado.ioloop.IOLoop.current())

