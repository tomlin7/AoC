with open("Day 8/in") as fp:
    lines = fp.readlines()

dirs = lines[0]
nodes = lines[2:]

import re

rx = re.compile("[=|,|(|)|\s,; !]+")
nodes = [list(filter(lambda x: x, rx.split(node))) for node in nodes]
nodes = {node[0]: node[1:] for node in nodes}

from itertools import cycle

it = cycle(dirs.strip())

import sys

sys.setrecursionlimit(10000)


def travel(node, s):
    if node == "ZZZ":
        return 0

    if next(it) == "L":
        print(f"\n  /\n{node}")
        return 1 + travel(nodes[node][0], s)
    print(f"\n    \\ \n    {node}")
    return 1 + travel(nodes[node][1], s)


print(travel("AAA", 0))
