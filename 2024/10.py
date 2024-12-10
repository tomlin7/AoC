from collections import deque

p = """89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732"""

with open("2024/inp.txt", "r") as f:
    p = f.read()

d = ((0, 1), (1, 0), (0, -1), (-1, 0))
a = [list(map(int, x)) for x in p.split()]
n = len(a)
m = len(a[0])

z = set()
for i in range(n):
    for j in range(m):
        if a[i][j] == 0:
            z.add((i, j))


def dfs(x, y, visited, ends):
    visited.add((x, y))
    cur = a[x][y]

    if cur == 9:
        ends.add((x, y))

    for dx, dy in d:
        nx, ny = x + dx, y + dy
        if (
            0 <= nx < len(a)
            and 0 <= ny < len(a[0])
            and (nx, ny) not in visited
            and a[nx][ny] == a[x][y] + 1
        ):
            dfs(nx, ny, visited, ends)


total_score = 0
for x, y in z:
    visited = set()
    ends = set()
    dfs(x, y, visited, ends)
    total_score += len(ends)

print(total_score)
