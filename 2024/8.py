p = """......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#."""


with open("input.txt", "r") as f:
    p = f.read()

p = p.split("\n")
p = [list(x) for x in p]

n = len(p)
m = len(p[0])

from collections import defaultdict
from itertools import combinations

g = defaultdict(list)

for i in range(n):
    for j in range(m):
        if p[i][j].isalnum():
            g[p[i][j]].append((i, j))


def in_bounds(x, y):
    return 0 <= x < n and 0 <= y < m


anti = set()
for a, ps in g.items():
    if len(ps) == 1:
        continue

    for (i1, j1), (i2, j2) in combinations(ps, 2):
        di, dj = i2 - i1, j2 - j1
        p1 = (i1 - di, j1 - dj)
        p2 = (i2 + di, j2 + dj)
        if in_bounds(*p1):
            anti.add(p1)
        if in_bounds(*p2):
            anti.add(p2)


for i, j in anti:
    p[i][j] = "#"

for x in range(n):
    for y in range(m):
        print(p[x][y], end="")
    print()

print(len(anti))

# ......#....#
# ...#....0...
# ....#0....#.
# ..#....0....
# ....0....#..
# .#....#.....
# ...#........
# #......#....
# ........A...
# .........A..
# ..........#.
# ..........#.

# ......#....#
# ...#....0...
# ....#0....#.
# ..#....0....
# ....0....#..
# .#....A.....
# ...#........
# #......#....
# ........A...
# .........A..
# ..........#.
# ..........#.
