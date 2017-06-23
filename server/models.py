from bson.objectid import ObjectId
from datetime import datetime
from json import JSONEncoder

def getDate(dateString):
    return datetime.strptime(dateString, '%m/%d/%Y')

class Category():
    def __init__(self, args):
        self.id = args['id']
        if 'name' in args.keys():
            self.name = args['name']
        self.weight = args['weight']
        if 'rank' in args.keys():
            self.rank = args['rank']

    def __repr__(self):
        return "{0}: {1} {2}".format(self.id, self.name, self.weight)

class TeamMember():
    def __init__(self, args, is_team_lead):
        self.user_id = args['user_id']
        self.email = args['email']
        self.picture = args['picture']
        self.is_team_lead = is_team_lead

    def __repr__(self):
        return "{0}: {1} {2}".format(self.user_id, self.email, self.picture)

class Team():
    def __init__(self, args):
        self._id = args['_id']
        self.name = args['name']
        self.description = args['description']
        self.team_lead = args['team_lead']
        members = [TeamMember(tm, tm['user_id'] == self.team_lead) for tm in args['members']]
        members = sorted(members, key=lambda m: not m.is_team_lead)
        self.members = members
        self.team_lead_email = next( (u for u in self.members if u.user_id == self.team_lead), None).email

    def __repr__(self):
        return '{0}: Lead: {4} {1} {2}: {3}'.format(self._id,
            self.name, self.description, '\n\t'.join([str(m) for m in self.members]),
            self.team_lead)

class Event():
    def __init__(self, args):
        if 'id' in args.keys() and len(args['id']) > 0:
            self._id = ObjectId(args['id'])

        if '_id' in args.keys():
            if args['_id'] is ObjectId:
                self._id = str(args['_id'])
            else:
                self._id = ObjectId(args['_id'])
        self.title = args['title']
        self.startDate = args['startDate']
        self.endDate = args['endDate']
        self.categories = [Category(c) for c in args['categories']]

        if 'teams' in args.keys():
            self.teams = sorted([Team(t) for t in args['teams']], key=lambda team: team.name)
        else:
            self.teams = None

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
        e = {'title': self.title,
            'startDate': self.startDate,
            'endDate': self.endDate,
            'categories': [c.__dict__ for c in self.categories] }

        # _id isn't assigned until Object is saved to Mongo
        if '_id' in self.__dict__.keys():
            e['_id'] = self._id

        if self.teams:
            e['teams'] = [t.__dict__ for t in self.teams]
            for t in e['teams']:
                t['members'] = [m.__dict__ for m in t['members']]

        return e

    def __repr__(self):
        return "{0}: {1} - {2} - {3} - {4} \nTeams {5}".format(
            'id', self.title, self.startDate, self.endDate,
            self.categories, '\n\t'.join(self.teams))

class TeamVote():
    def __init__(self, arg):
        self.teamId = arg['teamId']
        if 'votingTeam' in arg.keys():
            self.votingTeam = arg['votingTeam']
        else:
            self.votingTeam = ''
        self.categories = [Category(c) for c in arg['categories']]

class Vote():
    def __init__(self, arg):
        self.eventId = arg['eventId']
        self.teamVotes = [TeamVote(tv) for tv in arg['teamVotes']]
        # Flatten all votes to a list of Categories
        self.flatVotes = []
        for tv in self.teamVotes:
            flat_vote = [FlattenedVote(tv, tv.categories, c.id) for c in tv.categories]
            self.flatVotes.append(flat_vote)
        # Make a list of Team, Category, Average and Perecent Score


    def mongo_encode(self):
        v = { 'eventId': self.eventId,
            'teamVotes': [tv.__dict__ for tv in self.teamVotes]
        }
        for team in v['teamVotes']:
            team['categories'] = [c.__dict__ for c in team['categories']]

        return v

class FlattenedVote():
    def __init__(self, team_vote, categories, categoryId):
        self.teamId = team_vote.teamId
        self.votingTeam = team_vote.votingTeam
        category = next((c for c in categories if c.id == categoryId), None)
        self.categoryId = categoryId
        self.rank = category.rank
        self.weight = category.weight
        # self.categoryName = category.name

    def __repr__(self):
        return 'VotingTeam: {0} Category: {1} Rank: {2} Weight: {3}'.format(self.votingTeam,
            self.categoryId, self.rank, self.weight)

class VoteCalculator():
    def __init__(self, votes):
        self.votes = votes
        self._maxRank = 5

    def get_votes_for_team_and_category(self, teamId, categoryId):
        votes = []
        team_votes = [TeamVote(tv) for tv in self.votes if tv['teamId'] == teamId]

        for tv in team_votes:
            fv = FlattenedVote(tv, tv.categories, categoryId)
            votes.append(fv)

        return votes

    def category_average(self, teamId, categoryId):
        flat_votes = self.get_votes_for_team_and_category(teamId, categoryId)
        category_weight = 1
        if len(flat_votes) > 0:
            category_weight = flat_votes[0].weight

        averages = {}
        # Get rank totals and counts of team members
        for fv in flat_votes:
            if fv.votingTeam not in averages.keys():
                averages[fv.votingTeam] = (fv.rank, 1)
                continue
            total_rank, team_vote_count = averages[fv.votingTeam]
            averages[fv.votingTeam] = (total_rank + fv.rank, team_vote_count + 1)

        # Average the team ranks
        avg = 0
        for k,v in averages.items():
            total_rank, vote_count = v
            avg += (total_rank / vote_count) * category_weight

        # Average the averages
        avg = avg / len(averages.keys())

        percent = (100 * avg) / (self._maxRank * category_weight)
        return (int(percent), avg)

    @property
    def vote_count(self):
        return len(self.votes)

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
