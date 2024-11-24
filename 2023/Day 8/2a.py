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

import sys, timeit

sys.setrecursionlimit(100000)
start_time = timeit.default_timer()


def travel(node, s):
    if node.endswith("Z"):
        # print(f" {node}\n-------------")
        return 0

    if next(it) == "L":
        # print(f" {node}\n  /")
        return 1 + travel(nodes[node][0], s)
    # print(f" {node}\n  \ ")
    return 1 + travel(nodes[node][1], s)


import math

steps = [travel(i, 0) for i in nodes if i.endswith("A")]
print(steps)
print(math.lcm(*steps))

print("t: ", timeit.default_timer() - start_time)
