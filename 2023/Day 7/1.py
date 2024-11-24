with open("Day 7/in") as fp:
    hands = {i.split()[0]: int(i.split()[1]) for i in fp.readlines()}

import collections


def prekind(hand):
    """Prints the kind of hand
    0 -  high card
    1 - one pair
    2 - two pairs
    3 - three of a kind
    4 - full house
    5 - four of a kind
    6 - five of a kind

    eg. print(k[kind("QQQJA")])"""

    d = [hand.count(c) for c in hand]

    if 5 in d:
        return 6
    if 4 in d:
        return 5
    if 3 in d:
        if 2 in d:
            return 4
        return 3
    if d.count(2) == 4:
        return 2
    if 2 in d:
        return 1
    return 0


def rep(hand):
    if not hand:
        return [""]

    return [
        x + y
        for x in ("234567899TQKA" if hand[0] == "J" else hand[0])
        for y in rep(hand[1:])
    ]


def kind(hand):
    return max(map(prekind, rep(hand)))


order = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]
ranks = collections.defaultdict(list)
for c in hands:
    ranks[kind(c)].append(c)
ranks = dict(sorted(ranks.items(), key=lambda item: item[0]))

for r in ranks.values():
    r.sort(key=lambda x: [order.index(c) for c in x], reverse=True)

from itertools import chain

t = 0
for i, h in enumerate(list(chain.from_iterable(ranks.values()))):
    t += (i + 1) * hands[h]

print(t)
