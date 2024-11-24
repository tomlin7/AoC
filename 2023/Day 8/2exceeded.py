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

sys.setrecursionlimit(1000000)
start_time = timeit.default_timer()


def travel(ns, s):
    if all(node.endswith("Z") for node in ns):
        print(*ns)
        print("-------------")
        return 0

    if next(it) == "L":
        print(*ns)
        print("  /" * len(ns))
        return 1 + travel([nodes[n][0] for n in ns], s)
    print(*ns)
    print(f" \ " * len(ns))
    return 1 + travel([nodes[n][1] for n in ns], s)


print(travel([i for i in nodes if i.endswith("A")], 0))
print("t: ", timeit.default_timer() - start_time)
