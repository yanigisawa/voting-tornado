from models import VoteCalculator
from datetime import datetime, timedelta

_votes = [
    {'teamId': '123', 'votingTeam': '456', 'userId': 'd', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 1},
        {'id': 1, 'weight': 0.5, 'rank': 1},
        {'id': 2, 'weight': 0.4, 'rank': 1}
    ]},
    {'teamId': '123', 'votingTeam': '456','userId': 'e', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 2},
        {'id': 1, 'weight': 0.5, 'rank': 2},
        {'id': 2, 'weight': 0.4, 'rank': 2}
    ]},
    {'teamId': '123', 'votingTeam': '456','userId': 'f', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 3},
        {'id': 1, 'weight': 0.5, 'rank': 3},
        {'id': 2, 'weight': 0.4, 'rank': 3}
    ]},
    {'teamId': '123', 'votingTeam': '789', 'userId': 'g', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 1},
        {'id': 1, 'weight': 0.5, 'rank': 1},
        {'id': 2, 'weight': 0.4, 'rank': 1}
    ]},
    {'teamId': '123', 'votingTeam': '789', 'userId': 'h', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 2},
        {'id': 1, 'weight': 0.5, 'rank': 2},
        {'id': 2, 'weight': 0.4, 'rank': 2}
    ]},
    {'teamId': '123', 'votingTeam': '789', 'userId': 'i', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 3},
        {'id': 1, 'weight': 0.5, 'rank': 3},
        {'id': 2, 'weight': 0.4, 'rank': 3}
    ]},
    {'teamId': '456', 'votingTeam': '123', 'userId': 'a', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 4},
        {'id': 1, 'weight': 0.5, 'rank': 4},
        {'id': 2, 'weight': 0.4, 'rank': 4}
    ]},
    {'teamId': '456', 'votingTeam': '123', 'userId': 'b', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 5},
        {'id': 1, 'weight': 0.5, 'rank': 5},
        {'id': 2, 'weight': 0.4, 'rank': 5}
    ]},
    {'teamId': '456', 'votingTeam': '123', 'userId': 'c', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 1},
        {'id': 1, 'weight': 0.5, 'rank': 1},
        {'id': 2, 'weight': 0.4, 'rank': 1}
    ]},
    {'teamId': '456', 'votingTeam': '789', 'userId': 'g', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 3},
        {'id': 1, 'weight': 0.5, 'rank': 3},
        {'id': 2, 'weight': 0.4, 'rank': 3}
    ]},
    {'teamId': '456', 'votingTeam': '789', 'userId': 'h', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 4},
        {'id': 1, 'weight': 0.5, 'rank': 4},
        {'id': 2, 'weight': 0.4, 'rank': 4}
    ]},
    {'teamId': '456', 'votingTeam': '789', 'userId': 'i', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 5},
        {'id': 1, 'weight': 0.5, 'rank': 5},
        {'id': 2, 'weight': 0.4, 'rank': 5}
    ]},
    {'teamId': '789', 'votingTeam': '123', 'userId': 'a', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 2},
        {'id': 1, 'weight': 0.5, 'rank': 2},
        {'id': 2, 'weight': 0.4, 'rank': 2}
    ]},
    {'teamId': '789', 'votingTeam': '123', 'userId': 'b', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 3},
        {'id': 1, 'weight': 0.5, 'rank': 3},
        {'id': 2, 'weight': 0.4, 'rank': 3}
    ]},
    {'teamId': '789', 'votingTeam': '123', 'userId': 'c', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 4},
        {'id': 1, 'weight': 0.5, 'rank': 4},
        {'id': 2, 'weight': 0.4, 'rank': 4}
    ]},
    {'teamId': '789', 'votingTeam': '456','userId': 'd', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 4},
        {'id': 1, 'weight': 0.5, 'rank': 4},
        {'id': 2, 'weight': 0.4, 'rank': 4}
    ]},
    {'teamId': '789', 'votingTeam': '456','userId': 'e', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 2},
        {'id': 1, 'weight': 0.5, 'rank': 2},
        {'id': 2, 'weight': 0.4, 'rank': 2}
    ]},
    {'teamId': '789', 'votingTeam': '456','userId': 'f', 'categories': [
        {'id': 0, 'weight': 0.8, 'rank': 3},
        {'id': 1, 'weight': 0.5, 'rank': 3},
        {'id': 2, 'weight': 0.4, 'rank': 3}
    ]}
]

_vc = VoteCalculator(_votes)
def test_score_event_category_totals():
    assert _vc.vote_count == 18

def test_average_category_score():
    assert _vc.category_average('123', 0)[0] == 40
    assert _vc.category_average('789', 2)[0] == 60