from bson.objectid import ObjectId
from datetime import datetime

def getDate(dateString):
    return datetime.strptime(dateString, '%m/%d/%Y')

class Category():
    def __init__(self, **args):
        self.id = args['id']
        self.name = args['name']
        self.weight = args['weight']
    
    def __repr__(self):
        return "{0}: {1} {2}".format(self.id, self.name, self.weight)

class Event():
    def __init__(self, **args):
        if '_id' in args.keys():
            if args['_id'] is ObjectId:
                self._id = str(args['_id'])
            else:
                self._id = ObjectId(args['_id'])
        self.title = args['title']
        self.startDate = getDate(args['startDate'])
        self.endDate = getDate(args['endDate'])
        self.categories = [Category(**c) for c in args['categories']]
    
    def mongo_dict(self):
        e = {}
        return e

        
    def __repr__(self):
        return "{0}: {1} - {2} - {3} - {4}".format(
            'id', self.title, self.startDate, self.endDate,
            self.categories)

