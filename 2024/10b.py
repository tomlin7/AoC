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

z = []
for i in range(n):
    for j in range(m):
        if a[i][j] == 0:
            z.append((i, j))


def dfs(start):
    queue = deque([start])
    visited = set([start])
    reachable_nines = set()

    while queue:
        x, y = queue.popleft()
        current_height = a[x][y]

        for dx, dy in d:
            nx, ny = x + dx, y + dy

            if 0 <= nx < len(a) and 0 <= ny < len(a[0]):
                next_height = a[nx][ny]

                if (nx, ny) not in visited and next_height == current_height + 1:
                    visited.add((nx, ny))
                    queue.append((nx, ny))

                    if next_height == 9:
                        reachable_nines.add((nx, ny))

    return len(reachable_nines)


def dfs(x, y, memo):
    if (x, y) in memo:
        return memo[(x, y)]

    if a[x][y] == 9:
        return 1

    count = 0
    for dx, dy in d:
        nx, ny = x + dx, y + dy
        if 0 <= nx < len(a) and 0 <= ny < len(a[0]):
            if a[nx][ny] == a[x][y] + 1:
                count += dfs(nx, ny, memo)

    memo[(x, y)] = count
    return count


total_rating = 0
memo = {}
for start in z:
    total_rating += dfs(start[0], start[1], memo)


print(total_rating)
