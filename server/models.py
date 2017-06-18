from bson.objectid import ObjectId
from datetime import datetime
from json import JSONEncoder

def getDate(dateString):
    return datetime.strptime(dateString, '%m/%d/%Y')

class Category():
    def __init__(self, args):
        self.id = args['id']
        self.name = args['name']
        self.weight = args['weight']

    def __repr__(self):
        return "{0}: {1} {2}".format(self.id, self.name, self.weight)

class TeamMember():
    def __init__(self, args):
        self.auth0_user_id = args['user_id']
        self.email = args['email']
        self.picture = args['picture']

    def __repr__(self):
        return "{0}: {1} {2}".format(self.auth0_user_id, self.email, self.picture)

class Team():
    def __init__(self, args):
        self.auth0Id = args['_id']
        self.name = args['name']
        self.description = args['description']
        self.team_lead = args['team_lead']
        self.members = [TeamMember(tm) for tm in args['members']]

    def __repr__(self):
        return '{0}: Lead: {4} {1} {2}: {3}'.format(self.auth0Id,
            self.name, self.description, '\n\t'.join([str(m) for m in self.members]),
            self.team_lead)

class Event():
    def __init__(self, args):
        if '_id' in args.keys():
            if args['_id'] is ObjectId:
                self._id = str(args['_id'])
            else:
                self._id = ObjectId(args['_id'])
        self.title = args['title']
        self.startDate = args['startDate']
        self.endDate = args['endDate']
        self.categories = [Category(c) for c in args['categories']]
        self.teams = [Team(t) for t in args['teams']]

    @property
    def startDate(self):
        return self._startDate

    @startDate.setter
    def startDate(self, value):
        tmp = value
        if value is str:
            tmp = getDate(tmp)
        self._startDate = tmp

    @property
    def endDate(self):
        return self._endDate

    @endDate.setter
    def endDate(self, value):
        tmp = value
        if isinstance(value, str):
            tmp = getDate(tmp)

        self._endDate = tmp

    @property
    def id(self):
        return str(self._id)

    def mongo_encode(self):
        e = self.__dict__
        e['categories'] = [c.__dict__ for c in self.categories]
        e['teams'] = [t.__dict__ for t in self.teams]
        for t in e['teams']:
            t['members'] = [m.__dict__ for m in t['members']]
        return e

    def __repr__(self):
        return "{0}: {1} - {2} - {3} - {4} \nTeams {5}".format(
            'id', self.title, self.startDate, self.endDate,
            self.categories, '\n\t'.join(self.teams))

class EventEncoder(JSONEncoder):
    def default(self, o): # pylint: disable=E0202
        if isinstance(o, ObjectId):
            return str(o)

        if isinstance(o, datetime):
            return o.strftime('%m/%d/%Y')

        if isinstance(o, Event):
            d = o.__dict__
            d['id'] = d['_id']
            d['startDate'] = o.startDate
            d['endDate'] = o.endDate
            return d

        return o.__dict__
