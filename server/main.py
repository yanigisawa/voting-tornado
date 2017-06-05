import tornado.ioloop
import tornado.web

class EventsHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/api/getAllEvents", EventsHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(3500)
    tornado.ioloop.IOLoop.current().start()

