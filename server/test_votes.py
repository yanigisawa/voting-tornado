from models import VoteCalculator
from datetime import datetime, timedelta

_votes = [
    {'teamId': '123', 'userId': 'a', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 1},
        {'id': 1, 'weight': 3, 'rank': 1},
        {'id': 2, 'weight': 2, 'rank': 1}
    ]},
    {'teamId': '123', 'userId': 'b', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 2},
        {'id': 1, 'weight': 3, 'rank': 2},
        {'id': 2, 'weight': 2, 'rank': 2}
    ]},
    {'teamId': '123', 'userId': 'c', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 3},
        {'id': 1, 'weight': 3, 'rank': 3},
        {'id': 2, 'weight': 2, 'rank': 3}
    ]},
    {'teamId': '456', 'userId': 'a', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 4},
        {'id': 1, 'weight': 3, 'rank': 4},
        {'id': 2, 'weight': 2, 'rank': 4}
    ]},
    {'teamId': '456', 'userId': 'b', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 5},
        {'id': 1, 'weight': 3, 'rank': 5},
        {'id': 2, 'weight': 2, 'rank': 5}
    ]},
    {'teamId': '456', 'userId': 'c', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 1},
        {'id': 1, 'weight': 3, 'rank': 1},
        {'id': 2, 'weight': 2, 'rank': 1}
    ]},
    {'teamId': '789', 'userId': 'a', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 2},
        {'id': 1, 'weight': 3, 'rank': 2},
        {'id': 2, 'weight': 2, 'rank': 2}
    ]},
    {'teamId': '789', 'userId': 'b', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 3},
        {'id': 1, 'weight': 3, 'rank': 3},
        {'id': 2, 'weight': 2, 'rank': 3}
    ]},
    {'teamId': '789', 'userId': 'c', 'categories': [
        {'id': 0, 'weight': 5, 'rank': 4},
        {'id': 1, 'weight': 3, 'rank': 4},
        {'id': 2, 'weight': 2, 'rank': 4}
    ]}
]

_vc = VoteCalculator(_votes)
def test_score_event_category_totals():
    assert _vc.vote_count == 9

def test_average_category_score():
    assert _vc.category_average('123', 0) == 2